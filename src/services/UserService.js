import Api from '@/services/Api'

export default {
  signup (params) {
    return Api().post('/api/auth/signup', params)
  },
  signin (params) {
    return Api().post('/api/auth/signin', params)
  },
  update (params) {
    return Api().put('/api/users', params)
  },
  changePassword (params) {
    return Api().post('/api/users/password', params)
  }
}
