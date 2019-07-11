<template>
  <a-card :bordered="false">

    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="handleCreate()">新建</a-button>
    </div>

    <s-table
      ref="table"
      size="default"
      :columns="columns"
      :data="loadData"
    >
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
import { STable } from '@/components'
import { getCUserList } from '@/api/manage'
import saveForm from './Form'

const statusMap = {}

export default {
  components: {
    saveForm,
    STable
  },
  data () {
    return {
      // 表头
      columns: [
        {
          title: 'ID',
          dataIndex: 'id'
        },
        {
          title: '昵称',
          dataIndex: 'nickname'
        },
        {
          title: '用户名',
          dataIndex: 'phone'
        },
        {
          title: '用户名',
          dataIndex: 'email'
        },
        {
          title: '状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
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
        return getCUserList(Object.assign(parameter, this.queryParam))
          .then(res => {
            if (res.code === 200) {
              for (const i in res.data.status_lists) {
                statusMap[i] = {
                  status: i <= 0 ? 'error' : 'success',
                  text: res.data.status_lists[i]
                }
              }
              const result = res.data.lists
              return {
                data: result.data,
                pageNo: result.current_page,
                pageSize: result.per_page,
                totalCount: result.total,
                totalPage: result.last_page
              }
            }
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
    handleCreate () {
      this.$refs.saveModal.add(statusMap)
    },
    handleEdit (record) {
      this.$refs.saveModal.edit(record, statusMap)
    },
    handleOk () {
      this.$refs.table.refresh()
    }
  }
}
</script>
