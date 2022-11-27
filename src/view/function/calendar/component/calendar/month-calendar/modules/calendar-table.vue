<template>
  <div id="calendar-table" @click="closeMoreEventModal">
    <div class="calendar-content">
      <week-line
        v-for="(dataList, idx) in weekDateMap"
        :key="idx"
        :date-list="dataList"
        @showMoreEvent="onShowMoreEvent"
      />
      <date-event-modal
        ref="moreEventModal"
        v-if="isMoreEventModalVisible"
        :event-list="moreEventList"
        :style="{
          left: `${modalLeft}px`,
          bottom: `${modalBottom}px`,
        }"
      ></date-event-modal>
    </div>
  </div>
</template>
<script setup lang="ts">
import WeekLine from './week-line/index.vue'
import DateEventModal from '../../widgets/date-event-modal.vue'
import {IDateItem} from "../../type";
import {IViewDateEvent} from "../../utils";
import {useCalendarService} from "@/view/function/calendar/component/calendar";
import {computed, nextTick, onBeforeUnmount, onMounted, ref} from "vue";

const {monthCalendarService} = useCalendarService()

const moreEventModal = ref<DateEventModal>(null)

const moreEventList = ref<Array<IViewDateEvent>>([])

const isMoreEventModalVisible = ref(false)
const modalLeft = ref(0)
const modalBottom = ref(0)
const moreButton = ref<HTMLDivElement>(null)


const dateList = computed(() => { return monthCalendarService.monthDateList.value })
const weekDateMap = computed(() => {
  const weekNum = dateList.value.length / 7
  const weekDateMap: Array<IDateItem[]> = []

  for (let i = 0; i < weekNum; i++) {
    weekDateMap[i] = dateList.value.slice(i * 7, (i + 1) * 7)
  }

  return weekDateMap
})

onMounted(() => {
  window.addEventListener('resize', onWindowResize)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', onWindowResize)
})


async function onShowMoreEvent(_moreEventList: Array<IViewDateEvent>, _moreButton: HTMLDivElement) {
  if (isMoreEventModalVisible.value && moreEventList.value === _moreEventList) {
    return closeMoreEventModal()
  }

  moreEventList.value = _moreEventList
  moreButton.value = _moreButton

  isMoreEventModalVisible.value = true

  await nextTick()

  updateModalPosition()
}
function closeMoreEventModal() {
  if (!isMoreEventModalVisible.value) {
    return
  }

  isMoreEventModalVisible.value = false
  moreEventList.value = []
  moreButton.value = null
}
function updateModalPosition() {
  const appWidth = document.body.clientWidth
  const appHeight = document.body.clientHeight

  const modalWidth = moreEventModal.value.clientWidth
  const modalHeight = moreEventModal.value.clientHeight

  const rect = moreButton.value.getBoundingClientRect()

  const {x: pageX, y: pageY} = rect

  modalLeft.value = pageX
  modalBottom.value = appHeight - pageY

  if (modalLeft.value + modalWidth > appWidth) {
    modalLeft.value = appWidth - modalWidth - 14
  }
  if (modalBottom.value + modalHeight > appHeight) {
    modalBottom.value = appHeight - modalHeight -14
    modalLeft.value = pageX - modalWidth - 4
  }
}
function onWindowResize() {
  if (isMoreEventModalVisible.value) {
    updateModalPosition()
  }
}
</script>
