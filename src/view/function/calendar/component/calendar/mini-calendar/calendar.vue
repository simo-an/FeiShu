<template>
  <div id="mini-calendar">
    <calendar-header />
    <calendar-week />
    <calendar-table />
  </div>
</template>
<script setup lang="ts">

import CalendarHeader from './modules/calendar-header.vue'
import CalendarWeek from './modules/calendar-week.vue'
import CalendarTable from './modules/calendar-table.vue'
</script>

<style lang="less">
@import "./style/calendar.less";
</style>
