<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="6" :sm="24">
            <a-form-item label="版本名称">
              <a-input v-model="queryParam.name" placeholder="版本名称"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label="强更版本">
              <a-input v-model="queryParam.code" placeholder="强更版本"/>
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <span class="table-page-search-submitButtons" :style="{ float: 'left'}">
              <a-button type="primary" icon="plus" @click="handleCreate()">新建iOS</a-button>
              <a-button style="margin-left: 8px" type="primary" icon="plus" @click="handleCreateAndroid()">新建Android</a-button>
            </span>
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
      <span slot="is_tips" slot-scope="key">
        <a-badge :status="key | tipsStatusFilter" :text="key | tipsTextFilter" />
      </span>
      <span slot="client" slot-scope="key">
        <a-icon :type="key | clientStatusFilter"/>
        {{ key | clientTextFilter }}
      </span>
      <span slot="action" slot-scope="text, record">
        <a @click="handleEdit(record)">编辑</a>
      </span>
      <p slot="expandedRowRender" slot-scope="record" style="margin: 0">
        安装：<a :href="record.link">{{ record.file_name || record.link }}</a><br>
        描述：{{ record.desc }}
      </p>
    </s-table>
    <save-form ref="saveModal" @ok="handleOk" />
    <save-form-android ref="saveModalAndroid" @ok="handleOk" />
  </a-card>
</template>

<script>
import { STable } from '@/components'
import { getAppVersionList } from '@/api/manage'
import saveForm from './Form'
import saveFormAndroid from './FormAndroid'
import { tableTextFilter, tableStatusFilter } from '@/utils/filter'

let tipsMap = {}
let clientMap = {}

export default {
  components: {
    saveForm,
    saveFormAndroid,
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
          title: '版本名称',
          dataIndex: 'name'
        },
        {
          title: '强更版本',
          dataIndex: 'code'
        },
        {
          title: '安装包大小',
          dataIndex: 'file_size'
        },
        {
          title: '客户端类型',
          dataIndex: 'client',
          scopedSlots: { customRender: 'client' }
        },
        {
          title: '是否提示',
          dataIndex: 'is_tips',
          scopedSlots: { customRender: 'is_tips' }
        },
        {
          title: '时间',
          dataIndex: 'updated_at'
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getAppVersionList(Object.assign(parameter, this.queryParam))
          .then(res => {
            if (res.code === 200) {
              tipsMap = res.data.tips_lists
              clientMap = res.data.client_lists
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
    tipsTextFilter (key) {
      return tableTextFilter(key, tipsMap)
    },
    tipsStatusFilter (key) {
      return tableStatusFilter(key, tipsMap)
    },
    clientTextFilter (key) {
      return tableTextFilter(key, clientMap)
    },
    clientStatusFilter (key) {
      return tableStatusFilter(key, clientMap)
    }
  },
  methods: {
    handleCreate () {
      this.$refs.saveModal.add(tipsMap, clientMap)
    },
    handleCreateAndroid () {
      this.$refs.saveModalAndroid.add(tipsMap, clientMap)
    },
    handleEdit (record) {
      if (record.client === 'android') {
        this.$refs.saveModalAndroid.edit(record, tipsMap, clientMap)
      } else {
        this.$refs.saveModal.edit(record, tipsMap, clientMap)
      }
    },
    handleOk () {
      this.$refs.table.refresh()
    }
  }
}
</script>
