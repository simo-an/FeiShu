<template>
  <div ref="lineDate" class="line-date" @click="onDateSelected">
    <item-hour v-for="hour in hourList"
               :key="hour"
               :date="date"
               :start-hour="hour"
               @drop="onDateDropped"
    />
    <div class="date-event-list">
      <date-event-rect
        v-for="({style,event}) in dateEventList"
        :style="{...style, position: 'absolute'}"
        :key="event.id"
        :event-item="event"
      ></date-event-rect>
    </div>
  </div>
</template>
<script setup lang="ts">
import ItemHour from "./item-hour.vue";
import {isEqualDay} from "../../../utils/date";
import {getVerticalDisplayEventList, IViewDateEvent} from "../../../utils";
import DateEventRect from '../../../widgets/date-event-rect.vue'
import {computed, nextTick, onBeforeUnmount, onMounted, ref, watch} from "vue";
import {useCalendarService} from "@/view/function/calendar/component/calendar";

const {eventService, weekCalendarService} = useCalendarService()


const {date} = defineProps<{date: Date}>()

const lineDate = ref<HTMLDivElement>(null)

const dateEventList = ref<Array<IViewDateEvent>>([])


const hourList = [
  0, 1, 2, 3, 4, 5, 6, 7,
  8, 9, 10, 11, 12, 13, 14, 15,
  16, 17, 18, 19, 20, 21, 22, 23,
]
const resizeTimer = ref<NodeJS.Timer>(null)
const itemWidth = ref(0)
const itemHeight = ref(0)

const eventList = computed(() => { return eventService.displayEventList })


onMounted(() => {
  window.addEventListener('resize', onWindowResize)

  nextTick(() => {
    onWindowResize()
    getDateEventList()
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onWindowResize)
})


function onWindowResize() {
  if (resizeTimer.value) {
    clearTimeout(resizeTimer.value)
  }

  itemWidth.value = lineDate.value.clientWidth
  itemHeight.value = lineDate.value.scrollHeight / hourList.length

  resizeTimer.value = setTimeout(() => {
    getDateEventList()
  }, 50)
}

function getDateEventList() {
  if (itemWidth.value === 0) {
    return
  }

  const dataEventList = eventService
    .getDateEventList(date)
    .filter(event => !event.isFullDay && isEqualDay(event.startTime, event.endTime))

  dateEventList.value = getVerticalDisplayEventList(dataEventList, itemWidth.value, itemHeight.value)
}

function getTimeRange(hourElement: HTMLElement) {
  const content = hourElement.getAttribute('content')

  if (content !== 'top' && content !== 'bottom') {
    return
  }
  const itemHeight = hourElement.getClientRects()[0].height * 2
  const hour = Math.floor(hourElement.offsetTop / itemHeight)
  //
  const startDate = new Date(date)
  const endDate = new Date(date)

  if (content === 'top') {
    startDate.setHours(hour)
    endDate.setHours(hour)
    startDate.setMinutes(0, 0, 0)
    endDate.setMinutes(30, 0, 0)
  } else {
    startDate.setHours(hour)
    endDate.setHours(hour + 1)
    startDate.setMinutes(30, 0, 0)
    endDate.setMinutes(0, 0, 0)
  }

  return {startDate, endDate}

}

function onDateDropped(dEvent: DragEvent) {
  const itemElement = dEvent.target as HTMLDivElement
  const timeRange  = getTimeRange(itemElement)

  if (timeRange) {
    weekCalendarService.next('onTimeRangeDrop', timeRange)
  }
}

function onDateSelected(pEvent: PointerEvent) {
  const itemElement = pEvent.target as HTMLDivElement
  const timeRange  = getTimeRange(itemElement)

  if (timeRange) {
    weekCalendarService.next('onTimeRangeSelected', timeRange)
  }
}

watch(eventList, () => getDateEventList(), {immediate: true})
</script>
