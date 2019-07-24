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
          <a-select v-decorator="['client', {initialValue: params.client, rules: [{required: true, message: '必填'}]}]" @change="changeClient" placeholder="请选择" default-value="">
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
          <a-input v-decorator="['link', {initialValue: params.link, rules: [{required: true, message: '必填'}]}]" :disabled="appInfoDisabled" placeholder="必填"/>
        </a-form-item>
        <a-form-item
          label="安装包大小"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['size', {initialValue: params.size, rules: [{required: true, max:20, message: '必填且不超过20字符'}]}]" :disabled="appInfoDisabled" placeholder="必填且不超过20字符"/>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { getAppVersionSave } from '@/api/manage'
export default {
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      visible: false,
      confirmLoading: false,
      appInfoDisabled: false,
      form: this.$form.createForm(this),
      title: '',
      tipsMap: {},
      clientMap: {},
      params: {}
    }
  },
  methods: {
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
        size: '',
        is_tips: 1
      }
    },
    edit (params, tipsMap, clientMap) {
      this.form.resetFields()
      this.visible = true
      this.title = '编辑'
      this.params = params
      this.tipsMap = tipsMap
      this.clientMap = clientMap
      this.appInfoDisabled = params.client === 'android'
    },
    changeClient (field) {
      this.appInfoDisabled = field === 'android'
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          values.id = this.params.id
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
