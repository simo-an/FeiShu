<template>
  <div ref="timeLine" id="time-line"
       :style="{top: `${timeLineMarginTop}px`}">
    <span class="time-line-text">{{timeLineText}}</span>
    <div class="time-line-content"></div>
    <div class="time-line-mark" :style="{left: `${timeLineMarkMarginLeft}px`}"></div>
  </div>
</template>
<script setup lang="ts">
import {DayInterval} from '../../utils/const'
import {nextTick, onBeforeUnmount, onMounted, ref} from "vue";

const timeLineMarginTop = ref(-1000)
const timeLineMarkMarginLeft = ref(-1000)
const timeLineText = ref('00:00')

const timeLine = ref<HTMLDivElement>(null)

onMounted(async () => {
  updateTimeLineMarginTop()
  window.addEventListener('resize', updateTimeLineMark)

  await nextTick()

  timeLine.value.scrollIntoView({behavior: 'auto', block: 'center'})
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateTimeLineMark)
})


function updateTimeLineMarginTop() {
  const today = new Date() // '2022/09/10 20:00'
  const hour = today.getHours()
  const minute = today.getMinutes()

  timeLineMarginTop.value = (24 * 72) * ((hour * 60 * 60 * 1000 + minute * 60 * 1000) / DayInterval) - 1
  timeLineText.value = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`

  updateTimeLineMark()

  const nextMinuteInterval = (60 - today.getSeconds()) * 1000

  setTimeout(() => updateTimeLineMarginTop(), nextMinuteInterval)
}

function updateTimeLineMark() {
  if (!timeLine.value) {
    return
  }
  const weekWidth = timeLine.value.clientWidth / 7
  const currentWeek = new Date().getDay()

  timeLineMarkMarginLeft.value = weekWidth * currentWeek + weekWidth / 2
}
</script>
