<template>
  <div id="calendar-header">
    <div id="header-left"></div>
    <div class="header-center">
      <span class="week-text">{{monthText}}</span>
      <div class="week-switcher">
        <icon-left @click.native="toPrevWeek" />
        <span class="back-this-week" @click="toCurrentWeek">本周</span>
        <icon-right @click.native="toNextWeek" />
      </div>
    </div>
    <div id="header-right"></div>
  </div>
</template>

<script setup lang="ts">
import IconLeft from '../../icon/icon-left.vue'
import IconRight from '../../icon/icon-right.vue'
import {computed} from "vue";
import {useCalendarService} from "@/view/function/calendar/component/calendar";

const {weekCalendarService} = useCalendarService()


const selectedDate = computed(() => { return weekCalendarService.selectedDate.value })

const monthText = computed(() => {
  const year = selectedDate.value.getFullYear()
  const month = `${selectedDate.value.getMonth() + 1}`.padStart(2, '0')

  return `${year}年${month}月`
})


function toNextWeek() { weekCalendarService.toNextWeek() }
function toPrevWeek() { weekCalendarService.toPrevWeek() }
function toCurrentWeek() { weekCalendarService.toCurrentWeek() }
</script>
