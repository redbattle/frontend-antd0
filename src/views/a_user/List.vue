<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="账号名">
              <a-input v-model="queryParam.username" placeholder="账号名"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="状态">
              <a-select v-model="queryParam.status" placeholder="请选择" default-value="">
                <a-select-option value="">全部</a-select-option>
                <a-select-option v-for="value in statusLists" :value="value.key">{{ value.value }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <span class="table-page-search-submitButtons" :style="{ float: 'right', overflow: 'hidden' }">
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
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
import { getAUserList } from '@/api/manage'
import saveForm from './Form'

const statusMap = {}

export default {
  components: {
    saveForm,
    STable
  },
  data () {
    return {
      queryParam: {},
      statusLists: {},
      // 表头
      columns: [
        {
          title: 'ID',
          dataIndex: 'id'
        },
        {
          title: '账号名',
          dataIndex: 'username'
        },
        {
          title: '昵称',
          dataIndex: 'nickname'
        },
        {
          title: '状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getAUserList(Object.assign(parameter, this.queryParam))
          .then(res => {
            if (res.code === 200) {
              for (const i in res.data.status_lists) {
                statusMap[i] = {
                  status: res.data.status_lists[i].key <= 0 ? 'error' : 'success',
                  text: res.data.status_lists[i].value
                }
                this.statusLists = res.data.status_lists
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
