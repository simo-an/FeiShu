<template>
  <div ref="weekLine" class="week-line" @dblclick="printDetails">
    <div class="date-list">
      <date-item v-for="dateItem in dateList"
                 :key="dateItem.id"
                 :date-item="dateItem"
                 :class="{
                   [`is-week-selected week-${dateItem.date.getDay()}`]: isWeekMark && isWeekSelected(dateItem)
                 }"
                 :is-selected="isToday(dateItem)"
                 @click.native="selectDate(dateItem)"
      ></date-item>
    </div>

    <div class="date-event-list">
      <date-event-item
        v-for="({style, isHidden,event}) in dateEventList"
        :class="{'event-item__hidden': isHidden}"
        :style="{...style, position: 'absolute'}"
        :key="event.id"
        :event-item="event"
      ></date-event-item>
      <div v-for="(dateText, idx) in hiddenEventMap.keys()"
           :key="idx"
           class="more-button"
           :style="{left: hiddenEventMap.get(dateText)[0].style.left}"
           @click.stop="showMoreEvent($event, dateText)"
      >
        还有{{hiddenEventMap.get(dateText).length}}项 ...
      </div>
    </div>


  </div>
</template>

<script setup lang="ts">
import DateEventItem from '../../../widgets/date-event-item.vue'
import DateItem from '../date-item.vue'
import {IDateItem} from '../../../type'
import {isEqualDay, isEqualWeek} from '../../../utils/date'
import {getDisplayEventList} from './utils'
import {IViewDateEvent} from "../../../utils";
import {computed, nextTick, onBeforeUnmount, onMounted, ref, watch} from "vue";
import {useCalendarService} from "@/view/function/calendar/component/calendar";

const {monthCalendarService, eventService} = useCalendarService()

const {dateList} = defineProps<{
  dateList: Array<IDateItem>
}>()

const weekLine = ref<HTMLDivElement>(null)


const dateEventList = ref<Array<IViewDateEvent>>([])
const dateEventMap = ref<Map<string, Array<IViewDateEvent>>>(new Map())
const hiddenEventMap = ref<Map<string, Array<IViewDateEvent>>>(new Map())


const resizeTime = ref<NodeJS.Timer>(null)
const dateItemWidth = ref(0)
const dateItemHeight = ref(0)


const isWeekMark = computed(() => { return monthCalendarService.isEqualWeekMarked.value })
const selectedDate = computed(() => { return monthCalendarService.selectedDate.value })
const eventList = computed(() => { return eventService.displayEventList })

const emit = defineEmits(['showMoreEvent'])

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


function selectDate(dateItem: IDateItem) {
  monthCalendarService.next('onDateSelected', dateItem.date)
  monthCalendarService.toCertainDate(dateItem.date)
}
function isToday(dateItem: IDateItem): boolean { return isEqualDay(dateItem.date, new Date()) }
function isWeekSelected(dateItem: IDateItem): boolean { return isEqualWeek(dateItem.date, selectedDate.value) }
function getDateEventList() {
  if (dateItemWidth.value === 0) {
    return
  }

  const eventList = eventService.getWeekEventList(dateList[0].date)

  const _dateEventList = getDisplayEventList(
    eventList, dateItemWidth.value, dateItemHeight.value,
    dateList[0].date
  )

  dateEventMap.value.clear()
  hiddenEventMap.value.clear()
  _dateEventList.find((dateEvent) => {
    const date = dateEvent.event.startTime
    const dateText = `${date.getMonth() + 1}/${date.getDate()}`

    const mapEventList: Array<IViewDateEvent> = dateEventMap.value.get(dateText) || []

    if (mapEventList.length === 0) {
      dateEventMap.value.set(dateText, mapEventList)
    }

    if (dateEvent.isHidden) {
      if (!hiddenEventMap.value.get(dateText)) {
        hiddenEventMap.value.set(dateText, [])
      }

      hiddenEventMap.value.get(dateText).push(dateEvent)
    }

    const eventIdx = mapEventList.findIndex((e) => e.event.startTime > dateEvent.event.startTime)

    if (eventIdx === -1) {
      mapEventList.push(dateEvent)
    } else {
      mapEventList.splice(eventIdx, 0, dateEvent)
    }
  })

  dateEventList.value = _dateEventList
}

function onWindowResize() {
  if (resizeTime.value) {
    clearTimeout(resizeTime.value)
  }

  dateItemWidth.value = weekLine.value.clientWidth / 7
  dateItemHeight.value = weekLine.value.clientHeight

  resizeTime.value = setTimeout(() => {
    getDateEventList()
  }, 50)
}

function showMoreEvent(pEvent: PointerEvent, dateText: string) {
  emit('showMoreEvent', dateEventMap.value[dateText] || [], pEvent.target)
}
function printDetails() {
  console.warn(dateEventMap.value, JSON.parse(JSON.stringify(dateEventMap.value)))

  getDateEventList()
}

watch(eventList, () => getDateEventList(), {immediate: true})
</script>
