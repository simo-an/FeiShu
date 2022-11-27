<template>
  <div id="month-calendar">
    <calendar-header v-if="!hideHeader" />
    <calendar-week />
    <calendar-table />
  </div>
</template>

<script setup lang="ts">
import CalendarHeader from './modules/calendar-header.vue'
import CalendarWeek from './modules/calendar-week.vue'
import CalendarTable from './modules/calendar-table.vue'

defineProps<{
  hideHeader: boolean
}>()

</script>

<style lang="less">
@import "./style/calendar";
</style>
