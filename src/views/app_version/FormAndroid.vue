<template>
  <a-modal
    :title="title"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item
          label="客户端"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-select v-decorator="['client', {initialValue: params.client, rules: [{required: true, message: '必填'}]}]" :disabled="true" placeholder="请选择" default-value="">
            <a-select-option v-for="(item, key) in clientMap" :key="key" :value="item.key">{{ item.text }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="版本名称"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['name', {initialValue: params.name, rules: [{required: true, max:30, message: '必填且不超过30字符'}]}]" placeholder="必填且不超过30字符"/>
        </a-form-item>
        <a-form-item
          label="强更版本"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['code', {initialValue: params.code, rules: [{required: true, message: '必填纯数字'}]}]" placeholder="必填纯数字"/>
        </a-form-item>
        <a-form-item
          label="描述"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-textarea v-decorator="['desc', {initialValue: params.desc, rules: [{max: 200, message: '不超过200字符'}]}]" placeholder="不超过200字符" :autosize="{ minRows: 3, maxRows: 5 }" />
        </a-form-item>
        <a-form-item
          label="是否提示"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-radio-group v-decorator="['is_tips', {initialValue: params.is_tips, rules: [{required: true, message: '必填'}]}]">
            <a-radio v-for="(item, key) in tipsMap" :key="key" :value="item.key">{{ item.text }}</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          label="安装包"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-upload :action="url_upload_app" :fileList="fileList" @change="handleChange" :headers="upload_headers">
            <a-button>
              <a-icon type="upload" /> Upload
            </a-button>
          </a-upload>
        </a-form-item>
        <a-form-item
          label="安装包大小"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['file_size', {initialValue: params.file_size}]" :disabled="true"/>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>

import Vue from 'vue'
import { getAppVersionSave, urlUploadApp } from '@/api/manage'
import {
  ACCESS_TOKEN
} from '@/store/mutation-types'

export default {
  data () {
    return {
      url_upload_app: urlUploadApp,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      upload_headers: {
        'Access-Token': Vue.ls.get(ACCESS_TOKEN)
      },
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      title: '',
      tipsMap: {},
      clientMap: {},
      params: {},
      fileList: []
    }
  },
  methods: {
    handleChange (info) {
      let fileList = [...info.fileList]
      // 1. Limit the number of uploaded files
      // 显示最新的一条
      fileList = fileList.slice(-1)
      // 2. read from response and show file link
      fileList = fileList.map((file) => {
        if (file.response) {
          if (file.response.code === 200) {
            // Component will show file.url as link
            file.url = file.response.data.full_link
            // 参数赋值
            this.params.file_name = file.name
            this.params.link = file.response.data.file_link
            this.params.file_size = file.response.data.file_size
          } else {
            file.status = 'error'
            file.response = file.response.msg // custom error message to show
          }
        } else {
          file.status = 'error'
        }
        return file
      })
      this.fileList = fileList
    },
    add (tipsMap, clientMap) {
      this.form.resetFields()
      this.visible = true
      this.title = '新建'
      this.tipsMap = tipsMap
      this.clientMap = clientMap
      this.params = {
        id: '',
        name: '',
        code: '',
        client: 'android',
        link: '',
        file_name: '',
        file_size: '',
        is_tips: 1
      }
      this.fileList = []
    },
    edit (params, tipsMap, clientMap) {
      this.form.resetFields()
      this.visible = true
      this.title = '编辑'
      this.params = params
      this.tipsMap = tipsMap
      this.clientMap = clientMap
      this.fileList = [{
        uid: '1',
        name: this.params.file_name,
        status: 'done',
        url: this.params.link
      }]
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          values.id = this.params.id
          values.link = this.params.link
          values.file_name = this.params.file_name
          getAppVersionSave(values)
            .then(res => {
              if (res.code === 200) {
                this.visible = false
                this.confirmLoading = false
                this.$emit('ok', values)
              }
              this.confirmLoading = false
            })
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.visible = false
    }
  }
}
</script>
