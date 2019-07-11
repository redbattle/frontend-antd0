import { axios } from '@/utils/request'
const url = 'http://127.0.0.1:8002/admin'
const api = {
  get_info: url + '/a_user/info',
  a_user_list: url + '/a_user/list',
  a_user_save: url + '/a_user/save',
  c_user_list: url + '/c_user/list',
  c_user_save: url + '/c_user/update',
  login: url + '/login',
  logout: url + '/a_user/logout'
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

export function getCUserList (parameter) {
  return axiosPost(api.c_user_list, parameter)
}

export function getCUserSave (parameter) {
  return axiosPost(api.c_user_save, parameter)
}
