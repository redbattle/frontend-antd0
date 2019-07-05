import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import {
  VueAxios
} from './axios'
import notification from 'ant-design-vue/es/notification'
import {
  ACCESS_TOKEN
} from '@/store/mutation-types'

// 创建 axios 实例
const service = axios.create({
  baseURL: '/api', // api base_url
  timeout: 6000 // 请求超时时间
})

// request interceptor
service.interceptors.request.use(config => {
  const token = Vue.ls.get(ACCESS_TOKEN)
  if (token) {
    config.headers['Access-Token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  return config
})

// response interceptor
service.interceptors.response.use((response) => {
  if (response.data.code === 0) {
    if (response.data.err_code === 'invalid_token') {
      store.dispatch('Logout').then(() => {
        this.$router.push({ name: 'login' })
      })
    } else {
      notification.error({
        message: '失败',
        description: response.data.msg,
        duration: 4
      })
    }
  }
  return response.data
}, (err) => {
  notification.error({
    message: '错误',
    description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
    duration: 4
  })
})

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, service)
  }
}

export {
  installer as VueAxios,
  service as axios
}
