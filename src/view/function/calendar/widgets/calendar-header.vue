<template>
  <div id="todo-calendar-header">
    <div id="header-left">
      <view-switcher
        :isWeekSelected="isWeekSelected"
        :isMonthSelected="isMonthSelected"
        @switchWeek="switchToWeek"
        @switchMonth="switchToMonth"
      />
    </div>
    <div class="header-center">
      <span class="month-text">{{monthText}}</span>
      <div class="switcher-button">
        <icon-left @click.native="toPrevView" />
        <span class="back-today" @click="toCurrentView">
          {{ isWeekSelected ? '本周' : isMonthSelected ? '本月' : '' }}
        </span>
        <icon-right @click.native="toNextView" />
      </div>
    </div>
    <div id="header-right">
      <todo-adder />
    </div>
  </div>
</template>

<script setup lang="ts">
import IconLeft from '../component/calendar/icon/icon-left.vue'
import IconRight from '../component/calendar/icon/icon-right.vue'

import ViewSwitcher from './view-switcher.vue'
import TodoAdder from './todo-adder.vue'
import {isEqualMonth, isEqualWeek} from '../component/calendar/utils/date'
import {IEventInfo} from '../component/calendar/type'
import {toTimeStart} from "../utils/toDateStart";
import {toTimeEnd} from "../utils/toDateEnd";
import {useCalendarService} from "../component/calendar";
import useService from "@/service/useService";
import {computed, onBeforeMount, onBeforeUnmount, watch, watchEffect} from "vue";
import {toEventList} from "../utils/toEventList";

const {
  eventService,
  miniCalendarService,
  monthCalendarService,
  weekCalendarService
} = useCalendarService()
const {todoService} = useService()

const props = defineProps<{
  isWeekSelected: boolean,
  isMonthSelected: boolean
}>()

const emitEvent = defineEmits(['switchMonth', 'switchWeek'])

const selectedDate = miniCalendarService.selectedDate
const selectedWeekDate = weekCalendarService.selectedDate
const selectedMonthDate = monthCalendarService.selectedDate

const monthText = computed(() =>  {
  const year = selectedDate.value.getFullYear()
  const month = String(selectedDate.value.getMonth() + 1).padStart(2, '0')

  return  `${year}年${month}月`
})

const todoList = computed(() => todoService.todoList)

const monthDateList = miniCalendarService.monthDateList

const monthStartTime = computed(() => {
  if (!monthDateList.value || monthDateList.value.length === 0) {
    return 0
  }

  return toTimeStart(new Date(monthDateList.value[0].date))
})

const monthEndTime = computed(() => {
  if (!monthDateList.value || monthDateList.value.length === 0) {
    return 0
  }

  return toTimeEnd(monthDateList.value.at(-1).date)
})

onBeforeMount(() => {
  eventService.on('onEventSelected', onEventSelected)
})
onBeforeUnmount(() => {
  eventService.off('onEventSelected', onEventSelected)
})


function toNextView() {
  if (props.isWeekSelected) {
    weekCalendarService.toNextWeek()
  }
  if (props.isMonthSelected) {
    monthCalendarService.toNextMonth()
  }
}
function toPrevView() {
  if (props.isWeekSelected) {
    weekCalendarService.toPrevWeek()
  }
  if (props.isMonthSelected) {
    monthCalendarService.toPrevMonth()
  }
}
function toCurrentView() { miniCalendarService.goBackToday() }

function getMonthTodoEventList() {
  const dateList = miniCalendarService.monthDateList.value

  if (dateList.length === 0) {
    return
  }

  return todoService
    .getTimeRangeTodoList(monthStartTime.value, monthEndTime.value)
    .then(todoList => eventService.replaceEvent(toEventList(todoList)))
}

function onEventSelected(todoEvent: IEventInfo) {
  todoService.next('onTodoSelected', todoService.getTodoViaId(todoEvent.eventId))
}
function switchToMonth() {
  if (props.isWeekSelected) {
    getMonthTodoEventList()
    emitEvent('switchMonth')
  }
}
function switchToWeek() {
  if (props.isMonthSelected) {
    getMonthTodoEventList()
    emitEvent('switchWeek')
  }
}


watch(selectedDate, (date, prevDate) => {
  weekCalendarService.toCertainDate(date)
  monthCalendarService.toCertainDate(date)

  if (props.isMonthSelected && (!prevDate || !isEqualMonth(date, prevDate))) {
    getMonthTodoEventList()
  }

  if (props.isWeekSelected && (!prevDate || !isEqualWeek(date, prevDate))) {
    getMonthTodoEventList()
  }
}, {immediate: true})

watch(selectedWeekDate, () => miniCalendarService.toCertainDate(selectedWeekDate.value))
watch(selectedMonthDate, () => {
  console.warn('selectedMonthDate', selectedMonthDate.value.getMonth() + 1)
  miniCalendarService.toCertainDate(selectedMonthDate.value)
})

watchEffect(() => eventService.replaceEvent(toEventList(todoList.value)))
</script>
<style lang="less">
@import "@/stylus/hover-effect";

#todo-calendar-header {
  height: 72px;
  display: flex;
  flex-shrink: 0;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  user-select: none;

  #header-left, #header-right {
    min-width: 150px;
    width: 20%;
  }
  #header-right {
    text-align: right;
  }

  .header-center {
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;

    .month-text {
      font-size: 18px;
      font-weight: bold;
    }

    .switcher-button {
      height: 32px;
      display: flex;

      margin-left: 16px;
      border-radius: 4px;
      border: 1px solid #E8E8E8;
      box-sizing: border-box;

      .icon-left, .icon-right, .back-today {
        display: flex;
        align-items: center;
        justify-content: center;

        .hover-effect();

        border-radius: 0 !important;
      }
      .icon-left, .icon-right {
        width: 30px;
        height: 30px;
      }
      .back-today {
        width: 48px;
      }
    }
  }
}
</style>
