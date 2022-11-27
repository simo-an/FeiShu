<template>
  <div id="line-full-day" :style="hiddenStyle">
    <div class="full-day-label">全天</div>
    <div class="full-day-table" ref="fullDayTable">
      <item-day v-for="(day, idx) in dayList" :key="idx"/>

      <div class="date-event-list">
        <date-event-item
          v-for="({style, event}) in weekEventList"
          :style="{...style, position: 'absolute'}"
          :key="event.id"
          :event-item="event"
        ></date-event-item>
      </div>
    </div>

  </div>
</template>
<script setup lang="ts">
import ItemDay from './item-day.vue'
import DateEventItem from '../../widgets/date-event-item.vue'
import {isEqualDay} from "../../utils/date";
import {getHorizontalDisplayEventList, IViewDateEvent} from "../../utils";
import {computed, nextTick, onBeforeUnmount, onMounted, ref, watch} from "vue";
import {useCalendarService} from "@/view/function/calendar/component/calendar";

const {eventService, weekCalendarService} = useCalendarService()

const fullDayTable = ref<HTMLDivElement>(null)

const weekEventList = ref<Array<IViewDateEvent>>([])
const dayList = ref([1, 2, 3, 4, 5, 6, 7])
const resizeTimer = ref<NodeJS.Timer>(null)
const itemWidth = ref(0)
const itemHeight = ref(0)
const isHidden = ref(false)


const eventList = computed(() => {
  return eventService.displayEventList
})
const hiddenStyle = computed(() => {
  if (!isHidden.value) return {}

  return {
    height: '0px',
    overflow: 'hidden'
  }
})

onMounted(() => {
  window.addEventListener('resize', onWindowResize)
  nextTick(() => {
    onWindowResize()
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onWindowResize)
})


function getWeekEventList() {
  if (itemWidth.value === 0) return

  const eventList = eventService
    .getWeekEventList(weekCalendarService.selectedDate.value)
    .filter(event => event.isFullDay || !isEqualDay(event.startTime, event.endTime))

  weekEventList.value = getHorizontalDisplayEventList(
    eventList, itemWidth.value, itemHeight.value,
    weekCalendarService.selectedDate.value
  )

  isHidden.value = weekEventList.value.length === 0
}

function onWindowResize() {
  if (isHidden.value) {
    return
  }
  if (resizeTimer.value) {
    clearTimeout(resizeTimer.value)
  }

  itemWidth.value = fullDayTable.value.clientWidth / dayList.value.length
  itemHeight.value = fullDayTable.value.clientHeight

  resizeTimer.value = setTimeout(() => {
    getWeekEventList()
  }, 50)
}

watch(eventList, () => {
  getWeekEventList()
}, {
  immediate: true,
  deep: true
})

</script>
  