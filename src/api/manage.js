import { axios } from '@/utils/request'

const api = {
  role: '/role',
  service: '/service',
  orgTree: '/org/tree'
}

export default api

export function getRoleList (parameter) {
  return axios({
    url: api.role,
    method: 'get',
    params: parameter
  })
}

export function getServiceList (parameter) {
  return axios({
    url: api.service,
    method: 'get',
    params: parameter
  })
}
