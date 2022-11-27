<template>
  <div id="todo-adder">
    <div class="create-button" @click="createTodo">
      <icon-add /> 创建日程
    </div>
  </div>
</template>

<script setup lang="ts">
import IconAdd from "../component/calendar/icon/icon-add.vue";
import {useCalendarService} from "../component/calendar";
import {onBeforeUnmount} from "vue";

const {
  weekCalendarService,
  monthCalendarService,
} = useCalendarService()


weekCalendarService.on('onDateSelected', createFullDayTodo)
monthCalendarService.on('onDateSelected', createFullDayTodo)

weekCalendarService.on('onTimeRangeSelected', createTimeRangeTodo)

onBeforeUnmount(() => {
  weekCalendarService.off('onDateSelected', createFullDayTodo)
  monthCalendarService.off('onDateSelected', createFullDayTodo)

  weekCalendarService.off('onTimeRangeSelected', createTimeRangeTodo)
})

function createTodo() {
  console.warn('createTodo')
}
function createFullDayTodo(date) {
  console.warn(date)
}

function createTimeRangeTodo({startDate, endDate}) {
  console.warn(startDate, endDate)
}
</script>

<style lang="less">
@import "@/stylus/hover-effect";
@import "@/stylus/layout";

#todo-adder {
  display: flex;
  justify-content: flex-end;

  .create-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 88px;
    height: 32px;
    border: 1px solid var(--primary-color);
    color: var(--primary-color);

    .hover-effect();

    .icon-add {
      margin-right: 4px;
      fill: var(--primary-color);

      .flex-center();
    }
  }
}
</style>
