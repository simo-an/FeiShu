<template>
  <div id="calendar-header">
    <div class="month-text">{{ monthText }}</div>
    <div class="month-switcher">
      <icon-left @click.native="toPrevMonth" />
      <icon-right @click.native="toNextMonth" />
    </div>
  </div>
</template>

<script setup lang="ts">
import IconLeft from '../../icon/icon-left.vue'
import IconRight from '../../icon/icon-right.vue'
import {computed} from "vue";
import {useCalendarService} from "@/view/function/calendar/component/calendar";

const {miniCalendarService} = useCalendarService()


const selectedDate = computed(() => { return miniCalendarService.selectedDate.value })
const monthText = computed(() => {
  const year = selectedDate.value.getFullYear()
  const month = `${selectedDate.value.getMonth() + 1}`.padStart(2, '0')

  return `${year}年${month}月`
})


function toNextMonth() {
  miniCalendarService.toNextMonth()
}
function toPrevMonth() {
  miniCalendarService.toPrevMonth()
}
</script>
