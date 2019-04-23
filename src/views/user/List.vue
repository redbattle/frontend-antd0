<template>
  <a-card :bordered="false">

    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="$refs.saveModal.add()">新建</a-button>
    </div>

    <s-table
      ref="table"
      size="default"
      rowKey="key"
      :columns="columns"
      :data="loadData"
    >
      <span slot="serial" slot-scope="text, record, index">
        {{ index + 1 }}
      </span>
      <span slot="status" slot-scope="text">
        <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
      </span>

      <span slot="action" slot-scope="text, record">
        <a @click="handleEdit(record)">编辑</a>
      </span>
    </s-table>
    <save-form ref="saveModal" @ok="handleOk" />
  </a-card>
</template>

<script>
import moment from 'moment'
import { STable } from '@/components'
import { getRoleList, getServiceList } from '@/api/manage'
import saveForm from './Form'

const statusMap = {
  0: {
    status: 'default',
    text: '关闭'
  },
  1: {
    status: 'processing',
    text: '运行中'
  },
  2: {
    status: 'success',
    text: '已上线'
  },
  3: {
    status: 'error',
    text: '异常'
  }
}

export default {
  name: 'TableList',
  components: {
    saveForm,
    STable
  },
  data () {
    return {
      // 表头
      columns: [
        {
          title: '#',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '规则编号',
          dataIndex: 'no'
        },
        {
          title: '描述',
          dataIndex: 'description'
        },
        {
          title: '服务调用次数',
          dataIndex: 'callNo',
          needTotal: true,
          customRender: (text) => text + ' 次'
        },
        {
          title: '状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '更新时间',
          dataIndex: 'updatedAt',
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        console.log('loadData.parameter', parameter)
        return getServiceList(Object.assign(parameter, this.queryParam))
          .then(res => {
            return res.result
          })
      }
    }
  },
  filters: {
    statusFilter (type) {
      return statusMap[type].text
    },
    statusTypeFilter (type) {
      return statusMap[type].status
    }
  },
  methods: {
    handleEdit (record) {
      console.log(record)
      record.form_title = '编辑'
      this.$refs.saveModal.edit(record)
    },
    handleOk () {
      this.$refs.table.refresh()
    }
  }
}
</script>
