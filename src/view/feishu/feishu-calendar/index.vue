<template>
<div id="feishu-calendar">
  <calendar-collapse>
    <template #header>
      <calendar-header/>
    </template>
    <template #content>
      <calendar-week/>
      <calendar-table/>
    </template>
  </calendar-collapse>
</div>
</template>
<script setup lang="ts">
import CalendarHeader from "./calendar-header.vue";
import CalendarWeek from "./calendar-week.vue";
import CalendarTable from './calendar-table.vue';
import calendarService from './calendar-service'
import CalendarCollapse from "./calendar-collapse.vue";

calendarService.initMonthDateList()
</script>
<style lang="less">
#feishu-calendar {
  display: flex;
  flex-direction: column;
  width: 240px;
  height: 300px;
}
</style>