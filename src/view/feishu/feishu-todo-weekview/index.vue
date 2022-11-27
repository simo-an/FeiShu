<template>
  <div id="feishu-tido-weekview">
    <calendar-week/>
    <calendar-table/>
  </div>
</template>

<script setup lang="ts">
import CalendarWeek  from './calendar-week.vue'
import weekTodoService from "./week-todo-service";
import CalendarTable from "./calendar-table.vue";

weekTodoService.initWeekDateList()
</script>

<style lang="less">
#feishu-tido-weekview {
  width: 100%;
  font-size: 14px;
  display: flex;
  flex-direction: column;
}
</style>