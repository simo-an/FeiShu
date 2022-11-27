<template>
  <div id="calendar-header">
    <div id="header-left"></div>
    <div class="header-center">
      <span class="month-text">{{monthText}}</span>
      <div class="month-switcher">
        <icon-left @click.native="toPrevMonth" />
        <span class="back-this-month" @click="toCurrentMonth">本月</span>
        <icon-right @click.native="toNextMonth" />
      </div>
    </div>
    <div id="header-right"></div>
  </div>
</template>

<script setup lang="ts">
import IconLeft from '../../icon/icon-left.vue'
import IconRight from '../../icon/icon-right.vue'
import {useCalendarService} from "@/view/function/calendar/component/calendar";
import {computed} from "vue";

const {monthCalendarService} = useCalendarService()


const selectedDate = computed(() => { return monthCalendarService.selectedDate.value })
const monthText = computed(() => {
  const year = selectedDate.value.getFullYear()
  const month = `${selectedDate.value.getMonth() + 1}`.padStart(2, '0')

  return `${year}年${month}月`
})


function toNextMonth() { monthCalendarService.toNextMonth() }
function toPrevMonth() { monthCalendarService.toPrevMonth() }
function toCurrentMonth() { monthCalendarService.toCurrentMonth() }
</script>
