import { axios } from '@/utils/request'

const api = {
  get_a_user_list: 'http://127.0.0.1:8002/admin/a_user/list'
}

export default api

export function getAUserList (parameter) {
  return axios({
    url: api.get_a_user_list,
    method: 'post',
    params: parameter
  })
}
