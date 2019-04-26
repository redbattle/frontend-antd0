import { axios } from '@/utils/request'

const api = {
  a_user_list: 'http://127.0.0.1:8002/admin/a_user/list',
  a_user_save: 'http://127.0.0.1:8002/admin/a_user/save'
}

export default api

function axiosPost (url, params) {
  return axios({
    url: url,
    method: 'post',
    params: params
  })
}

export function getAUserList (parameter) {
  return axiosPost(api.a_user_list, parameter)
}

export function getAUserSave (parameter) {
  return axiosPost(api.a_user_save, parameter)
}
