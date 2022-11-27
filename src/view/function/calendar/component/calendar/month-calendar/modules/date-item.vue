<template>
  <div class="date-item"
       :class="{'date-item-selected': isSelected}"
       @dragenter.self="onEventDropEnter"
       @dragleave.self="onEventDropLeave"
       @drop.self="onEventDrop">
    <div class="date-text"
         :class="{
           'date-selected': isSelected,
           'date-today': dateItem.isToday,
           'date-curr-month': dateItem.inCurrMonth,
           'date-prev-month': dateItem.inPrevMonth,
           'date-next-month': dateItem.inNextMonth,
         }">
      {{ !isSelected && dateItem.day === 1 ? `${dateItem.month}月1日` : dateItem.day }}
    </div>
  </div>
</template>

<script setup lang="ts">
import {IDateItem} from '../../type'
import {useCalendarService} from "../../index";

const {monthCalendarService} = useCalendarService()

const {dateItem, isSelected} = defineProps<{
  dateItem: IDateItem,
  isSelected: Boolean
}>()


function onEventDrop(dEvent: DragEvent) {
  inactiveHourContent(dEvent.target as HTMLElement)
  monthCalendarService.next('onDateDrop', this.dateItem.date)
}

function onEventDropEnter(dEvent: DragEvent) {
  activeHourContent(dEvent.target as HTMLElement)
}

function onEventDropLeave(dEvent: DragEvent) {
  inactiveHourContent(dEvent.target as HTMLElement)
}

function activeHourContent(hourElement: HTMLElement) {
  hourElement.style.backgroundColor = '#69adfc'
}

function inactiveHourContent(hourElement: HTMLElement) {
  hourElement.style.backgroundColor = '#FFFFFF'
}
</script>
