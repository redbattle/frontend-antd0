import { axios } from '@/utils/request'

const api = {
  role: '/role',
  service: '/service',
  orgTree: '/org/tree'
}

export default api

export function getUserList (parameter) {
  return axios({
    url: api.service,
    method: 'get',
    params: parameter
  })
}
