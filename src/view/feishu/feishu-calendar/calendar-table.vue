<template>
  <div id="calendar-table">
    <div class="calendar-content">
      <calendar-date
        v-for="(date, idx) in dateList"
        :key="idx"
        :date-item="date"
        :is-selected="isDateSelected(date)"
        @click.native="calendarService.toCertainDate(date.date)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import CalendarDate from "./calendar-date.vue";
import calendarService from './calendar-service'
import {ICalendarDate} from "calendar";
import {isEqualDate} from './getMonthDateList'

const dateList = calendarService.monthDateList

console.warn(dateList)


function isDateSelected(dateItem: ICalendarDate) {
  return isEqualDate(dateItem.date, calendarService.selectedDate.value)
}

</script>

<style lang="less">
#calendar-table {
  width: 100%;
  height: 204px;

  justify-content: center;

  .calendar-content {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>