<template>
  <div id="feishu">
    <feishu-todo-weekview />
  </div>
</template>
<script setup lang="ts">
import FeishuTodoWeekview from './feishu-todo-weekview/index.vue'
</script>
<style lang="less">
#feishu {
  display: flex;
  //align-items: center;
  justify-content: center;

}
</style>