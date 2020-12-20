import Api from '@/services/Api'

export default {
  create (params) {
    return Api().post('/api/assets', params)
  },
  upload (params, id) {
    return Api().put('/api/assets/' + id, params, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
