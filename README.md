# Caster Of Dice

Caster of Dice is a full stack website that for Online TRPG game play.

## Language
This readme will be updated version, but we do have a Chinese version[中文版文档](README.cn.md) for it.

## Before You Begin
Before you begin we recommend you read about the basic building blocks that assemble to this application:
* MEAN.js - Also this project is modified far from the original MEAN.js, the base framework is still based on it.  If you have any plan Develop on the base of COD, please read through the basic information of MEAN.js to get better understand of how this project is structured.

## Prerequisites
Make sure you have installed all of the following prerequisites on your development machine:
* Git - [Download & Install Git](https://git-scm.com/downloads). OSX and Linux machines typically have this already installed.
* Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager. If you encounter any problems, you can also use this [GitHub Gist](https://gist.github.com/isaacs/579814) to install Node.js.
* MongoDB - [Download & Install MongoDB](http://www.mongodb.org/downloads), and make sure it's running on the default port (27017).

### Run the application on your own
The recommended way to get COD is to use git to directly clone the COD repository:

```bash
$ git clone https://github.com/dopasoft/CasterOfDice.git
```

## Quick Install

To install the dependencies, run this in the application folder from the command-line:

```bash
$ npm install
```

Run your application using npm:

```bash
$ npm start
```

Your application should run on port 3000 with the *development* environment configuration, so in your browser just go to [http://localhost:3000](http://localhost:3000)

### Running in Production mode
To run your application with *production* environment configuration:

```bash
$ npm run start:prod
```

Explore `config/env/production.js` for production environment configuration options.

### Running with User Seed
To have default account(s) seeded at runtime:

In Development:
```bash
MONGO_SEED=true npm start
```
It will try to seed the users 'user' and 'admin'. If one of the user already exists, it will display an error message on the console. Just grab the passwords from the console.

In Production:
```bash
MONGO_SEED=true npm start:prod
```
This will seed the admin user one time if the user does not already exist. You have to copy the password from the console and save it.

## Running your application with Gulp

The COD project integrates Gulp as build tools and task automation.

We have wrapped Gulp tasks with npm scripts so that regardless of the build tool running the project is transparent to you.

To use Gulp directly, you need to first install it globally:

```bash
$ npm install gulp -g
```

Then start the development environment with:

```bash
$ gulp
```

To run your application with *production* environment configuration, execute gulp as follows:

```bash
$ gulp prod
```

It is also possible to run any Gulp tasks using npm's run command and therefore use locally installed version of gulp, for example: `npm run gulp eslint`

## License
[The MIT License](LICENSE.md)