<template>
  <div id="table-full-day">
    <time-line v-if="isEqualWeekWithToday" />
    <line-date-label />
    <line-date v-for="week in weekList"
               :key="week"
               :date="getDate(week)"
    />
  </div>
</template>

<script setup lang="ts">
import TimeLine from './time-line.vue'
import LineDate from './line-date/index.vue'
import {isEqualWeek} from '../../utils/date'
import LineDateLabel from './line-date/line-date-label.vue'
import {computed, ref} from "vue";
import {useCalendarService} from "@/view/function/calendar/component/calendar";

const {weekCalendarService} = useCalendarService()

const weekList = ref([0, 1, 2, 3, 4, 5, 6])

const selectedDate = computed(() => { return weekCalendarService.selectedDate.value })
const isEqualWeekWithToday = computed(() => { return isEqualWeek(selectedDate.value, new Date()) })


function getDate(week: number): Date {
  const date = new Date(selectedDate.value)
  const weekOffset = week - date.getDay()

  date.setDate(date.getDate() + weekOffset)

  return date
}
</script>
