<template>
<div id="calendar-header">
  <div class="month-text">
    {{monthText}}
  </div>
  <div class="month-switcher">
    <icon-arrow-left size="12px" color="#717171"
                     @click.native.stop="calendarService.toPrevMonth()"/>
    <icon-arrow-right size="12px" color="#717171"
                      @click.native.stop="calendarService.toNextMonth()"/>
  </div>
</div>
</template>

<script setup lang="ts">
import IconArrowLeft from "./icon/icon-arrow-left.vue";
import IconArrowRight from "./icon/icon-arrow-right.vue";
import {computed} from "vue";
import calendarService from './calendar-service'

const monthText = computed(() => {
  const selectedDate = calendarService.selectedDate.value

  const year = selectedDate.getFullYear()
  const month = `${selectedDate.getMonth() + 1}`.padStart(2, '0')


  return `${year}年 ${month}月`
})

</script>

<style lang="less">
#calendar-header {
  width: 100%;
  height: 32px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .month-text {
    margin-left: 8px;
  }
  .month-switcher {
    display: flex;
    align-items: center;
    padding-right: 4px;
    .icon {
      margin-left: 12px;
      padding: 4px;
      cursor: pointer;
      border-radius: 4px;

      &:hover { background-color: #d0d3d3; }
      &:active { background-color: #bcbfc1; }
    }
  }
}
</style>