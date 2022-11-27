<template>
  <n-card
    id="customer-adder"
    style="width: 600px"
    :title="customer ? '编辑客户' : '添加客户'"
    :bordered="false"
    :closable="true"
    size="small"
    aria-modal="true"
  >
    <div class="customer-name">
      <label>客户名称</label>
      <n-input v-model:value="data.name" type="text" placeholder="请输入客户名称" />
    </div>
    <div class="customer-country">
      <label>所在时区</label>
      <timezone-selector
        :zoneId="data.zoneId"
        @selected="onTimezoneSelected"/>
    </div>

    <div class="customer-website">
      <label>客户网址</label>
      <n-input v-model:value="data.website" type="text" placeholder="请输入客户网址" />
    </div>

    <div class="customer-address">
      <label>客户地址</label>
      <n-input v-model:value="data.address" type="text" placeholder="请输入客户地址" />
    </div>

    <div class="customer-type">
      <label>客户类型</label>
      <n-input v-model:value="data.type" type="text" placeholder="请输入客户类型" />
    </div>

    <div class="customer-remark">
      <label>客户备注</label>
      <n-input v-model:value="data.remark" type="textarea" placeholder="请输入备注" />
    </div>

    <template #footer>
      <n-button @click="emitEvent('close')">取消</n-button>
      <n-button type="primary" @click="saveCustomer">确认</n-button>
    </template>
  </n-card>
</template>

<script setup lang="ts">
import {defineProps, reactive} from "vue";
import CustomerEntity from "@/backend/entity/CustomerEntity";
import {useMessage} from "naive-ui";
import TimezoneSelector from "./widget/timezone-selector.vue";
import {TimeZoneItem} from "../../../utils/timezone/timezone-date";
import useService from "@/service/useService";

const {customerService} = useService()
const message = useMessage()


const props = defineProps<{
  customer?: CustomerEntity
}>()
const emitEvent = defineEmits<{
  (event: 'close'): void
}>()

const data = props.customer || reactive(new CustomerEntity())

async function saveCustomer() {
  await customerService.saveCustomer(data)

  emitEvent('close')
  message.success('添加成功')
}


function onTimezoneSelected(timezone: TimeZoneItem) {
  console.warn(timezone)
  data.country = timezone.cnZoneName
  data.zoneId = timezone.zoneId
}

</script>

<style lang="less">

#customer-adder {
  .n-card__content {
    >div { margin: 8px 0; }
  }
  .n-card__footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    > button {
      margin-left: 12px;
    }
  }
}
</style>