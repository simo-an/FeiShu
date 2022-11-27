<template>
<div id="home-navigator">
  <n-menu
    v-model:value="selectedMenu"
    :root-indent="36"
    :indent="12"
    :options="navMenuList"
    @update-value="onMenuSelected"
  />
</div>
</template>

<script setup lang="ts">
import {onBeforeMount, ref} from "vue";
import router from "../../router";

const navMenuList = [
  // { label: '客户管理', key: 'customer' },
  // { label: '进度管理', key: 'progress' },
  // { label: '待办', key: 'todo' },
  { label: '日历', key: 'feishu' },
  // { label: '设置', key: 'setting' },
]

const selectedMenu = ref(navMenuList[0].key)

onBeforeMount(() => {
  onMenuSelected(selectedMenu.value)
})

function onMenuSelected(menu: string) {
  router.push(`/home/${menu}`)
}

</script>

<style lang="less">
#home-navigator {
  height: 100%;
  width: 156px;
  display: none;
}
</style>