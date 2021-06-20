// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router/index.js'
import { policies } from './router/policies.js'
import VueSweetalert2 from 'vue-sweetalert2'
import Antd from 'ant-design-vue'
import jquery from 'jquery'
import _ from 'lodash'

// require('ant-design-vue/dist/antd.css');

Vue.use(VueSweetalert2)
Vue.use(Vuex)
Vue.use(Antd)
Object.defineProperty(Vue.prototype, '$_', {value: _})
Object.defineProperty(Vue.prototype, '$', {value: jquery})
Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    loginMode: 'none',
    user: window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : undefined
  },
  mutations: {
    changLogState (state, mode) {
      state.loginMode = mode
    },
    setUser (state, user) {
      state.user = user
      window.localStorage.setItem('user', JSON.stringify(user))
    },
    logout (state) {
      state.user = undefined
      window.localStorage.removeItem('user')
    }
  }
})

// the router pre hook as policies
policies(router, store)

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
