<template>
  <div id="calendar-week">
    <div class="hour-label"></div>
    <div class="week-item"
         v-for="(week, idx) in weekList"
         :class="{
           'week-selected': isEqualDate(week.date)
         }"
         :key="idx"
         @click="selectDate(week.date)"
    >
      <span class="week-day">{{week.day}}</span>
      <span class="week-text">{{week.text}}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {isEqualDay} from '../../utils/date'
import {computed} from "vue";
import {useCalendarService} from "@/view/function/calendar/component/calendar";

const {weekCalendarService} = useCalendarService()

const selectedDate = computed(() => { return weekCalendarService.selectedDate.value })
const weekList = computed(() => { return weekCalendarService.selectedWeekList.value })

function isEqualDate(date) { return isEqualDay(date, new Date()) }
function selectDate(date) { weekCalendarService.next('onDateSelected', date) }
</script>
