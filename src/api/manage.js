import { axios } from '@/utils/request'

const api = {
  login: 'http://127.0.0.1:8002/admin/login',
  logout: 'http://127.0.0.1:8002/admin/a_user/logout',
  get_info: 'http://127.0.0.1:8002/admin/a_user/info',
  a_user_list: 'http://127.0.0.1:8002/admin/a_user/list',
  a_user_save: 'http://127.0.0.1:8002/admin/a_user/save'
}

function axiosPost (url, params = {}) {
  return axios({
    url: url,
    method: 'post',
    data: params
  })
}

export function getAUserList (parameter) {
  return axiosPost(api.a_user_list, parameter)
}

export function getAUserSave (parameter) {
  return axiosPost(api.a_user_save, parameter)
}

export function login (parameter) {
  return axiosPost(api.login, parameter)
}

export function getInfo () {
  return axiosPost(api.get_info)
}

export function logout () {
  return axiosPost(api.logout)
}
