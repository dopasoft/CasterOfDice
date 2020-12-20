import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Home from '@/components/HomePage'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [{
        path: '/home',
        name: 'home',
        component: Home
      }]
    }
  ]
})

export default router
