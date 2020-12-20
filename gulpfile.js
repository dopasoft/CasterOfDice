'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
  fs = require('fs'),
  defaultAssets = require('./config/assets/default'),
  testAssets = require('./config/assets/test'),
  testConfig = require('./config/env/test'),
  gulp = require('gulp'),
  gulpLoadPlugins = require('gulp-load-plugins'),
  runSequence = require('run-sequence'),
  wiredep = require('wiredep').stream,
  path = require('path'),
  endOfLine = require('os').EOL,
  semver = require('semver');

// Local settings
var changedTestFiles = [];


// Set NODE_ENV to 'development'
gulp.task('env:dev', function () {
  process.env.NODE_ENV = 'development';
});

// Set NODE_ENV to 'production'
gulp.task('env:prod', function () {
  process.env.NODE_ENV = 'production';
});

// Nodemon task
gulp.task('nodemon', function () {

  // Node.js v7 and newer use different debug argument
  var debugArgument = semver.satisfies(process.versions.node, '>=7.0.0') ? '--inspect' : '--debug';

  return plugins.nodemon({
    script: 'server.js',
    nodeArgs: [debugArgument],
    ext: 'js,html',
    verbose: true,
    watch: _.union(defaultAssets.server.views, defaultAssets.server.allJS, defaultAssets.server.config)
  });
});

// Nodemon task without verbosity or debugging
gulp.task('nodemon-nodebug', function () {
  return plugins.nodemon({
    script: 'server.js',
    ext: 'js,html',
    watch: _.union(defaultAssets.server.views, defaultAssets.server.allJS, defaultAssets.server.config)
  });
});

// Watch Files For Changes
gulp.task('watch', function () {
  // Start livereload
  plugins.refresh.listen();

  // Add watch rules
  gulp.watch(defaultAssets.server.views).on('change', plugins.refresh.changed);
  gulp.watch(defaultAssets.server.allJS, ['eslint']).on('change', plugins.refresh.changed);

  if (process.env.NODE_ENV === 'production') {
    gulp.watch(defaultAssets.server.gulpConfig, ['templatecache', 'eslint']);
  } else {
    gulp.watch(defaultAssets.server.gulpConfig, ['eslint']);
  }
});

// Imagemin task
gulp.task('imagemin', function () {
  return gulp.src(defaultAssets.client.img)
    .pipe(plugins.imagemin({
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('public/dist/img'));
});

// Copy local development environment config example
gulp.task('copyLocalEnvConfig', function () {
  var src = [];
  var renameTo = 'local-development.js';

  // only add the copy source if our destination file doesn't already exist
  if (!fs.existsSync('config/env/' + renameTo)) {
    src.push('config/env/local.example.js');
  }

  return gulp.src(src)
    .pipe(plugins.rename(renameTo))
    .pipe(gulp.dest('config/env'));
});

// Make sure upload directory exists
gulp.task('makeUploadsDir', function () {
  return fs.mkdir('modules/users/client/img/profile/uploads', function (err) {
    if (err && err.code !== 'EEXIST') {
      console.error(err);
    }
  });
});

// Angular template cache task
gulp.task('templatecache', function () {
  return gulp.src(defaultAssets.client.views)
    .pipe(plugins.templateCache('templates.js', {
      root: '/modules/',
      module: 'core',
      templateHeader: '(function () {' + endOfLine + '	\'use strict\';' + endOfLine + endOfLine + '	angular' + endOfLine + '		.module(\'<%= module %>\'<%= standalone %>)' + endOfLine + '		.run(templates);' + endOfLine + endOfLine + '	templates.$inject = [\'$templateCache\'];' + endOfLine + endOfLine + '	function templates($templateCache) {' + endOfLine,
      templateBody: '		$templateCache.put(\'<%= url %>\', \'<%= contents %>\');',
      templateFooter: '	}' + endOfLine + '})();' + endOfLine
    }))
    .pipe(gulp.dest('build'));
});

// Mocha tests task
gulp.task('mocha', function (done) {
  var mongooseService = require('./config/lib/mongoose');
  var testSuites = changedTestFiles.length ? changedTestFiles : testAssets.tests.server;
  var error;

  // Connect mongoose
  mongooseService.connect(function (db) {
    // Load mongoose models
    mongooseService.loadModels();

    gulp.src(testSuites)
      .pipe(plugins.mocha({
        reporter: 'spec',
        timeout: 10000
      }))
      .on('error', function (err) {
        // If an error occurs, save it
        error = err;
      })
      .on('end', function () {
        mongooseService.disconnect(function (err) {
          if (err) {
            console.log('Error disconnecting from database');
            console.log(err);
          }

          return done(error);
        });
      });
  });
});

// Prepare istanbul coverage test
gulp.task('pre-test', function () {

  // Display coverage for all server JavaScript files
  return gulp.src(defaultAssets.server.allJS)
    // Covering files
    .pipe(plugins.istanbul())
    // Force `require` to return covered files
    .pipe(plugins.istanbul.hookRequire());
});

// Karma test runner task
gulp.task('karma', function (done) {
  var KarmaServer = require('karma').Server;
  new KarmaServer({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

// Run karma with coverage options set and write report
gulp.task('karma:coverage', function (done) {
  var KarmaServer = require('karma').Server;
  new KarmaServer({
    configFile: __dirname + '/karma.conf.js',
    preprocessors: {
      'modules/*/client/views/**/*.html': ['ng-html2js'],
      'modules/core/client/app/config.js': ['coverage'],
      'modules/core/client/app/init.js': ['coverage'],
      'modules/*/client/*.js': ['coverage'],
      'modules/*/client/config/*.js': ['coverage'],
      'modules/*/client/controllers/*.js': ['coverage'],
      'modules/*/client/directives/*.js': ['coverage'],
      'modules/*/client/services/*.js': ['coverage']
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: 'coverage/client',
      reporters: [
        { type: 'lcov', subdir: '.' }
        // printing summary to console currently weirdly causes gulp to hang so disabled for now
        // https://github.com/karma-runner/karma-coverage/issues/209
        // { type: 'text-summary' }
      ]
    }
  }, done).start();
});

// Drops the MongoDB database, used in e2e testing
gulp.task('dropdb', function (done) {
  // Use mongoose configuration
  var mongooseService = require('./config/lib/mongoose');

  mongooseService.connect(function (db) {
    db.dropDatabase(function (err) {
      if (err) {
        console.error(err);
      } else {
        console.log('Successfully dropped db: ', db.databaseName);
      }

      mongooseService.disconnect(done);
    });
  });
});

// Seed Mongo database based on configuration
gulp.task('mongo-seed', function (done) {
  var db = require('./config/lib/mongoose');
  var seed = require('./config/lib/mongo-seed');

  // Open mongoose database connection
  db.connect(function () {
    db.loadModels();

    seed
      .start({
        options: {
          logResults: true
        }
      })
      .then(function () {
        // Disconnect and finish task
        db.disconnect(done);
      })
      .catch(function (err) {
        db.disconnect(function (disconnectError) {
          if (disconnectError) {
            console.log('Error disconnecting from the database, but was preceded by a Mongo Seed error.');
          }

          // Finish task with error
          done(err);
        });
      });
  });

});

// Downloads the selenium webdriver if protractor version is compatible
gulp.task('webdriver_update', function (done) {
  return require('gulp-protractor').webdriver_update(done);
});

// Start the standalone selenium server
// NOTE: This is not needed if you reference the
// seleniumServerJar in your protractor.conf.js
gulp.task('webdriver_standalone', function (done) {
  return require('gulp-protractor').webdriver_standalone(done);
});

// Protractor test runner task
gulp.task('protractor', ['webdriver_update'], function () {
  var protractor = require('gulp-protractor').protractor;
  gulp.src([])
    .pipe(protractor({
      configFile: 'protractor.conf.js'
    }))
    .on('end', function () {
      console.log('E2E Testing complete');
      // exit with success.
      process.exit(0);
    })
    .on('error', function (err) {
      console.error('E2E Tests failed:');
      console.error(err);
      process.exit(1);
    });
});

// Lint CSS and JavaScript files.
gulp.task('lint', function (done) {
  runSequence('eslint', done);
});

// Call the webpack and build the front-end output
gulp.task('build', function () {
  return require('config/webpack.config/build.js')
})

// Lint project files and minify them into two production files.
// gulp.task('build', function (done) {
//   runSequence('env:dev', 'wiredep:prod', 'lint', done);
// });

// Run the project in development mode with node debugger enabled
gulp.task('default', function (done) {
  runSequence('env:dev', ['copyLocalEnvConfig', 'makeUploadsDir'], ['nodemon', 'watch'], done);
});

// Run the project in production mode
gulp.task('prod', function (done) {
  runSequence(['copyLocalEnvConfig', 'makeUploadsDir', 'templatecache'], 'build', 'env:prod', ['nodemon-nodebug', 'watch'], done);
});

// Run Mongo Seed with default environment config
gulp.task('seed', function (done) {
  runSequence('env:dev', 'mongo-seed', done);
});

// Run Mongo Seed with production environment config
gulp.task('seed:prod', function (done) {
  runSequence('env:prod', 'mongo-seed', done);
});
