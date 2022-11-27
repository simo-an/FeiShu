<template>
  <div id="calendar-table">
    <div class="calendar-content">
      <date-item v-for="dateItem in dataList"
                 :key="dateItem.id"
                 :date-item="dateItem"
                 :class="{
                   [`is-week-selected week-${dateItem.date.getDay()}`]: isWeekMark && isWeekSelected(dateItem)
                 }"
                 :is-selected="isDateSelected(dateItem)"
                 @click.native="selectDate(dateItem)"
      ></date-item>
    </div>
  </div>
</template>
<script setup lang="ts">
import DateItem from './date-item.vue'

import {isEqualDay, isEqualWeek} from '../../utils/date'
import {useCalendarService} from "@/view/function/calendar/component/calendar";


const {miniCalendarService} = useCalendarService()

const isWeekMark = miniCalendarService.isEqualWeekMarked
const selectedDate = miniCalendarService.selectedDate
const dataList = miniCalendarService.monthDateList


function selectDate(dateItem) {
  miniCalendarService.toCertainDate(dateItem.date)
}
function isDateSelected(dateItem) {
  return isEqualDay(dateItem.date, selectedDate.value)
}
function isWeekSelected(dateItem) {
  return isEqualWeek(dateItem.date, selectedDate.value)
}
</script>
