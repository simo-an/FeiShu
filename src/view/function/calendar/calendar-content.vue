<template>
  <div id="calendar-content">
    <calendar-header
      :isWeekSelected="isWeekView"
      :isMonthSelected="isMonthView"
      @switchWeek="switchToWeek"
      @switchMonth="switchToMonth" />
    <week-calendar v-if="isWeekView" :hideHeader="true" />
    <month-calendar v-if="isMonthView" :hideHeader="true" />
  </div>
</template>

<script setup lang="ts">
import CalendarHeader from './widgets/calendar-header.vue'
import useService from "@/service/useService";
import {useCalendarComponent, useCalendarService} from "./component/calendar";
import {computed, onBeforeUnmount, watchEffect} from "vue";
import {ETodoViewMode} from "@/type/todo.type";
import {toEventList} from "./utils/toEventList";

const {eventService, miniCalendarService, monthCalendarService, weekCalendarService} = useCalendarService()
const {MiniCalendar, WeekCalendar, MonthCalendar} = useCalendarComponent()
const {todoService} = useService()

function switchToMonth() {
  todoService.switchTodoViewMode(ETodoViewMode.MONTH)
  miniCalendarService.unmarkEqualWeek()
}
function switchToWeek() {
  todoService.switchTodoViewMode(ETodoViewMode.WEEK)
  miniCalendarService.markEqualWeek()
}

const isWeekView = computed(() => todoService.todoViewMode.value === ETodoViewMode.WEEK)
const isMonthView = computed(() => todoService.todoViewMode.value === ETodoViewMode.MONTH)

watchEffect(async () => {
  eventService.replaceEvent(toEventList(await todoService.initTodoList()))
})


onBeforeUnmount(() => {
  todoService.release()
  miniCalendarService.release()
  monthCalendarService.release()
  weekCalendarService.release()
})
</script>

<style lang="less">
#calendar-content {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  #week-calendar, #month-calendar {
    width: 100%;
    min-width: 620px;
    min-height: 540px;
  }
}
</style>
