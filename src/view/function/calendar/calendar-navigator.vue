<template>
  <div id="calendar-navigator">
    <mini-calendar class="mini-calendar" />
    <n-collapse title="我的待办日历">
      <div class="scheduled-todo-list">
        <n-checkbox class="collapse-item"
                    v-model="displayUnFinishedTodo"
        >进行中</n-checkbox>
        <n-checkbox class="collapse-item"
                    v-model="displayFinishedTodo"
        >未完成</n-checkbox>
      </div>
    </n-collapse>
  </div>
</template>

<script setup lang="ts">
import NCollapse from '@/widget/NCollapse.vue'

import {useCalendarComponent, useCalendarService} from "./component/calendar";
import {ref, watchEffect} from "vue";

const {eventService} = useCalendarService()
const {MiniCalendar} = useCalendarComponent()

const displayUnFinishedTodo = ref(true)
const displayFinishedTodo = ref(false)

watchEffect(() => {
  if (displayUnFinishedTodo.value) {
    eventService.hideUnFinishedEvent(false)
  }
  if (displayFinishedTodo.value) {
    eventService.hideFinishedEvent(false)
  }
})
</script>

<style lang="less">
#calendar-navigator {
  display: flex;
  flex-direction: column;
  width: 260px;
  padding: 0 10px;

  .mini-calendar {
    margin: 20px auto 0;
  }

  .n-collapse {
    margin-top: 12px;

    +.n-collapse {
      flex-grow: 1;
      padding-bottom: 12px;
      .collapse-content {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
      }
    }

    .scheduled-todo-list {
      display: flex;
      flex-direction: column;

      .collapse-item {
        display: flex;
        align-items: center;
        height: 30px;
        padding-left: 24px;
      }
    }

    .unscheduled-todo-list {
      height: 1px;
      display: flex;
      flex-grow: 1;
      flex-direction: column;
    }
  }
}
</style>
