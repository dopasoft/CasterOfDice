'use strict'

import _ from 'lodash'

export function policies (router, store) {
  router.beforeEach((to, from, next) => {
    if (to.roles) {
      if (!store.state.user || _.intersection(store.state.user.roles, to.roles).length < 0) {
        next( {path: '/'} )
      }
      next()
    }
    next()
  })
}
