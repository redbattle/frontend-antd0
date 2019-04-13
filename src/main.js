import Vue from 'vue'
import App from './App.vue'
import { Layout, Menu, Breadcrumb, Icon } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css'

Vue.config.productionTip = false

Vue.use(Layout, Menu, Breadcrumb, Icon);

new Vue({
  render: h => h(App),
}).$mount('#app')
