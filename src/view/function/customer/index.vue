<template>
  <div id="manage-customer">
    <customer-header :idList="selectedCustomerIdList"/>
    <n-data-table
      :bordered="false"
      :single-line="false"
      :remote="true"
      :columns="customerTableColumns"
      :data="customerList"
      :pagination="{pageSize: 20}"
      :row-key="(row: TableColumn) => row.id"
      @update:checked-row-keys="onCheckUpdate"
    />
  </div>

</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import moment from 'dayjs'
import {DataTableColumns} from "naive-ui";
import CustomerHeader from "./customer-header.vue";
import useService from "@/service/useService";
import {getWorkTimeRangeViaTimezone} from "../../../utils/timezone";
import {getProgress} from "./utils/getProgress";


const {customerService} = useService()
const selectedCustomerIdList = ref<Array<number>>([])

interface TableColumn {
  id: number
  name: string
  type: string
  country: string
  address: string
  website: string
  progress: string
  remark: string
  workTime: string
  createTime: string
}

function createTableColumns(): DataTableColumns<TableColumn> {
  return [
    {type: 'selection'},
    {title: '编号', key: 'id', sortOrder: 'ascend'},
    {title: '客户名称', key: 'name'},
    {title: '类型', key: 'type'},
    {title: '地区', key: 'country'},
    {title: '地址', key: 'address'},
    {title: '网址', key: 'website'},
    {title: '工作时间', key: 'workTime'},
    {title: '流程状态', key: 'progress'},
    {title: '客户备注', key: 'remark'},
    {title: '创建时间', key: 'createTime'},
  ]
}

const customerTableColumns = createTableColumns()

const customerList = computed(() => {
  const result = customerService.customerList.value.map(customer => {
    const item: TableColumn = {
      id: customer.id,
      name: customer.name,
      type: customer.type,
      country: customer.country,
      address: customer.address,
      website: customer.website,
      progress: getProgress(customer.progress),
      remark: customer.remark,
      workTime: getWorkTimeRangeViaTimezone(customer.zoneId),
      createTime: moment(customer.createTime).format('YYYY-MM-DD HH:mm')
    }

    return item
  })

  return result
})

customerService.getCustomerList().catch(() => {})

// 方法
function onCheckUpdate(rowKeys: number[]) {
  selectedCustomerIdList.value = rowKeys
}
</script>

<style lang="less">
#manage-customer {
  display: flex;
  flex-direction: column;

  background-color: #EFEFEF;
}
</style>