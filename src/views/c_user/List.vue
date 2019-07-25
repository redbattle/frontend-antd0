<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="6" :sm="24">
            <a-form-item label="账号名">
              <a-input v-model="queryParam.username" placeholder="手机号或邮箱"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label="状态">
              <a-select v-model="queryParam.status" placeholder="请选择" default-value="">
                <a-select-option value="">全部</a-select-option>
                <a-select-option v-for="(item, key) in statusMap" :key="key" :value="item.key">{{ item.text }}</a-select-option>
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
import { tableTextFilter, tableStatusFilter } from '@/utils/filter'

let statusMap = {}

export default {
  components: {
    saveForm,
    STable
  },
  data () {
    return {
      queryParam: {},
      statusMap: {},
      // 表头
      columns: [
        {
          title: 'ID',
          dataIndex: 'id'
        },
        {
          title: '手机号',
          dataIndex: 'phone'
        },
        {
          title: '邮箱',
          dataIndex: 'email'
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
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getCUserList(Object.assign(parameter, this.queryParam))
          .then(res => {
            if (res.code === 200) {
              this.statusMap = statusMap = res.data.status_lists
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
    statusFilter (key) {
      return tableTextFilter(key, statusMap)
    },
    statusTypeFilter (key) {
      return tableStatusFilter(key, statusMap)
    }
  },
  methods: {
    handleEdit (record) {
      this.$refs.saveModal.edit(record, statusMap)
    },
    handleOk () {
      this.$refs.table.refresh()
    }
  }
}
</script>
