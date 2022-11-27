<template>
  <div class="date-item">
    <div class="date-text"
         :class="{
           [dateEventClass]: true,
           'date-selected': isSelected,
           'date-today': dateItem.isToday,
           'date-curr-month': dateItem.inCurrMonth,
           'date-prev-month': dateItem.inPrevMonth,
           'date-next-month': dateItem.inNextMonth,
         }">
      {{dateItem.day}}
    </div>
  </div>
</template>

<script setup lang="ts">

import {IDateItem} from '../../type'
import {computed} from "vue";
import {useCalendarService} from "@/view/function/calendar/component/calendar";

const {eventService} = useCalendarService()

const {dateItem, isSelected} = defineProps<{
  dateItem: IDateItem,
  isSelected: boolean
}>()

const dateEventClass = computed(() => {
  const currentTime = dateItem.date
  const timeText = `${currentTime.getMonth() + 1}/${currentTime.getDate()}`

  const eventList = eventService.eventMap[timeText]

  if (!eventList || eventList.length === 0) {
    return ''
  }

  if (eventList.some(event => event.isOvertime)) {
    return 'data-has-event-urgent'
  }

  if (eventList.length < 3) {
    return 'data-has-event-low'
  }

  if (eventList.length < 5) {
    return 'data-has-event-normal'
  }

  return 'data-has-event-high'
})
</script>
