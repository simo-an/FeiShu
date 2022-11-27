<template>
  <div class="item-hour">
    <div class="item-hour-top"
         content="top"
         @dragenter="onEventDropEnter"
         @dragleave="onEventDropLeave"
         @drop="onEventDrop"
    ></div>
    <div class="item-hour-bottom"
         content="bottom"
         @dragenter="onEventDropEnter"
         @dragleave="onEventDropLeave"
         @drop="onEventDrop"
    ></div>
  </div>
</template>

<script setup lang="ts">

const {date, startHour} = defineProps<{
  date: Date,
  startHour: number
}>()
const emit = defineEmits(['drop'])


function onEventDrop(dEvent: DragEvent) {
  inactiveHourContent(dEvent.target as HTMLElement)
  emit('drop', dEvent)
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

