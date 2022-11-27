<template>
<div id="customer-header">
  <div class="header-left">
    <span v-if="idList.length === 0">客户列表</span>
    <div v-else class="operation">
      已选中<span class="selected-num">{{idList.length}}</span>项
      <n-button text :disabled="idList.length > 1" @click="editCustomer"><n-icon icon="edit"/> 编辑</n-button>
      <n-button text @click="deleteCustomer"><n-icon icon="trash"/> 删除</n-button>
    </div>
  </div>
  <div class="header-right">
    <n-button type="primary"
              @click="addCustomer"
    ><n-icon icon="add"/> 添加客户</n-button>
  </div>

  <n-modal v-model:show="isCustomerAdderVisible">
    <customer-adder
      :customer="customer"
      @close="isCustomerAdderVisible = false"/>
  </n-modal>
</div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import NIcon from "@/widget/NIcon.vue"
import CustomerAdder from "./customer-adder.vue";
import {useDialog} from "naive-ui";
import useService from "@/service/useService";
import CustomerEntity from "@/backend/entity/CustomerEntity";

const props = defineProps<{
  idList: Array<number>
}>()

const deleteDialog = useDialog()
const {customerService} = useService()

const isCustomerAdderVisible = ref<boolean>(false)
const customer = ref<CustomerEntity>(null)

function deleteCustomer() {
  deleteDialog.warning({
    title: '删除客户',
    content: `确认删除客户当前选中的${props.idList.length}位客户?`,
    positiveText: '确定',
    negativeText: '取消',
    showIcon: false,
    onPositiveClick: () => {
      customerService.deleteCustomer(props.idList)
    },
    onNegativeClick: () => {}
  })
}

async function addCustomer() {
  customer.value = null
  isCustomerAdderVisible.value = true
}

async function editCustomer() {
  customer.value = await customerService.getCustomer(props.idList[0])
  isCustomerAdderVisible.value = true

}

</script>

<style lang="less">

#customer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  flex-shrink: 0;

  padding: 0 12px;

  .header-left {
    .operation {
      display: flex;
      .selected-num {
        color: var(--primary-color);
        margin: 0 4px;
      }
      .n-button {
        margin-left: 12px;
        .n-icon { margin-right: 2px; }
      }
    }
  }
  .header-right {
    .n-button {
      .n-icon { margin-right: 4px; }
    }
  }
}
</style>