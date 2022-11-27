<template>
  <div id="calendar-table">
    <time-line v-if="isEqualWeekWithToday" />
    <line-date-label />
    <line-date v-for="week in weekList"
               :key="week"
               :date="getDate(week)"
    />
  </div>
</template>

<script setup lang="ts">
import TimeLine from './widgets/time-line.vue';
import LineDate from './widgets/line-date.vue';
import LineDateLabel from './widgets/line-date-label.vue';
import isEqualWeek from "./algorithm/isEqualWeek";
import {computed, ref} from "vue";

import weekTodoService from "./week-todo-service";

const weekList = ref([0, 1, 2, 3, 4, 5, 6])

const selectedDate = computed(() => { return weekTodoService.selectedDate.value })
const isEqualWeekWithToday = computed(() => { return isEqualWeek(selectedDate.value, new Date()) })


function getDate(week: number): Date {
  const date = new Date(selectedDate.value)
  const weekOffset = week - date.getDay()

  date.setDate(date.getDate() + weekOffset)

  return date
}
</script>
<style lang="less">
@import "./stylus/hidden-scroll";

#calendar-table {
  display: flex;
  overflow: hidden;
  position: relative;

  .hidden-scroll();
}
</style>
