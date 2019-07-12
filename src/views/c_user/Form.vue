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
          label="昵称"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['nickname', {initialValue: params.nickname, rules: [{required: true, max:30, message: '必填且不超过30字符'}]}]" placeholder="必填且不超过30字符"/>
        </a-form-item>
        <a-form-item
          label="手机号"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['phone', {initialValue: params.phone, rules: [{required: true, max:60, message: '必填且不超过60字符'}]}]" placeholder="必填且不超过60字符"/>
        </a-form-item>
        <a-form-item
          label="邮箱"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['email', {initialValue: params.email, rules: [{max:60, message: '不超过60字符'}]}]" placeholder="不超过60字符"/>
        </a-form-item>
        <a-form-item
          label="密码"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['password', {initialValue: ''}]" type="password" placeholder="编辑时，若不修改则留空"/>
        </a-form-item>
        <a-form-item
          label="状态"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-radio-group v-decorator="['status', {initialValue: params.status, rules: [{required: true, message: '必填'}]}]">
            <a-radio v-for="(item, key) in statusMap" :key="key" :value="item.key">{{ item.value }}</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { getCUserSave } from '@/api/manage'
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
      form: this.$form.createForm(this),
      title: '',
      statusMap: {},
      params: {}
    }
  },
  methods: {
    edit (params, statusMap) {
      this.form.resetFields()
      this.visible = true
      this.title = '编辑'
      this.params = params
      this.statusMap = statusMap
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          values.id = this.params.id
          getCUserSave(values)
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
