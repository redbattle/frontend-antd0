import Vue from 'vue'
import App from './App.vue'
import { Layout, Menu, Icon, Table, Popconfirm, Input } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import VueRouter from 'vue-router'

Vue.config.productionTip = false

Vue.use(Layout)
Vue.use(Menu)
Vue.use(Icon)
Vue.use(Table)
Vue.use(Popconfirm)
Vue.use(Input)

Vue.use(VueRouter)

new Vue({
  render: h => h(App),
}).$mount('#app')
