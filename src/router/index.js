import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Home from '@/components/HomePage'
import ChatarcterNav from '@/components/characters/CharacterNav'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: Main,
      children: [{
        path: '/',
        name: 'home',
        component: Home
      }, {
        path: 'character',
        name: 'characterNav',
        component: ChatarcterNav
      }]
    }
  ]
})

export default router
