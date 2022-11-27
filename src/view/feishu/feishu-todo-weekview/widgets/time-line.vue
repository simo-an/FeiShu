<template>
  <div ref="timeLine" id="time-line"
       :style="{top: `${timeLineMarginTop}px`}">
    <span class="time-line-text">{{timeLineText}}</span>
    <div class="time-line-content"></div>
    <div class="time-line-mark" :style="{left: `${timeLineMarkMarginLeft}px`}"></div>
  </div>
</template>
<script setup lang="ts">
import {nextTick, onBeforeUnmount, onMounted, ref} from "vue";
import getTimeLinePosition from "../algorithm/getTimeLinePosition";

const timeLineMarginTop = ref(-1000)
const timeLineMarkMarginLeft = ref(-1000)
const timeLineText = ref('00:00')

const timeLine = ref<HTMLDivElement>(null)

onMounted(async () => {
  updateTimeLineMarginTop()
  window.addEventListener('resize', updateTimeLineMarginTop)

  await nextTick()

  timeLine.value.scrollIntoView({behavior: 'auto', block: 'center'})
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateTimeLineMarginTop)
})


function updateTimeLineMarginTop() {
  const today = new Date()

  const hour = today.getHours()
  const minute = today.getMinutes()

  const {left, top} = getTimeLinePosition(today, timeLine.value.clientWidth/7, 48)

  timeLineMarginTop.value = top
  timeLineMarkMarginLeft.value = left - 3

  timeLineText.value = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`

  const nextMinuteInterval = (60 - today.getSeconds()) * 1000

  setTimeout(() => updateTimeLineMarginTop(), nextMinuteInterval)
}
</script>
<style lang="less">
#time-line {
  position: absolute;
  width: calc(100% - 56px);
  left: 56px;
  z-index: 1;

  .time-line-text {
    position: absolute;
    left: -56px;
    top: -8px;

    width: 56px;
    font-size: 10px;
    line-height: 16px;

    color: #f54a45;
    text-align: center;
    background-color: white;

  }

  .time-line-content {
    height: 1px;
    background-color: #f54a45;
  }
  .time-line-mark {
    position: absolute;
    width: 7px;
    height: 7px;
    top: -3px;

    border-radius: 50%;
    background-color: #f54a45;
  }
}
</style>