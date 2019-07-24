import { axios } from '@/utils/request'
let url
if (process.env.NODE_ENV === 'production') {
  // 线上
  url = 'http://cpbtest.rasp.isnows.xin:8081/admin'
} else if (process.env.NODE_ENV === 'development') {
  // 本地
  url = 'http://127.0.0.1:8002/admin'
}
const api = {
  get_info: url + '/a_user/info',
  a_user_list: url + '/a_user/list',
  a_user_save: url + '/a_user/save',
  a_user_upload_app: url + '/a_user/upload_app',
  c_user_list: url + '/c_user/list',
  c_user_save: url + '/c_user/update',
  app_version_list: url + '/app_version/list',
  app_version_save: url + '/app_version/save',
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
  console.log(process.env.NODE_ENV)
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

export function getAppVersionList (parameter) {
  return axiosPost(api.app_version_list, parameter)
}

export function getAppVersionSave (parameter) {
  return axiosPost(api.app_version_save, parameter)
}

export function uploadAppFile (parameter) {
  return axiosPost(api.a_user_upload_app, parameter)
}
