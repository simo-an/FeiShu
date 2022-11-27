<template>
  <div id="calendar-week">
    <div class="timezone">{{timezone}}</div>
    <div class="week-item" v-for="(week,idx) in weekList"
         :key="idx"
          :class="{
            'is-today': week.isToday,
            'is-passed-day': !week.isToday && isPassedDate(week.date)
          }">
      <div class="week-text">{{week.text}}</div>
      <div class="day-text">{{week.day}}</div>
    </div>
  </div>
</template>

<script setup lang="ts">

import weekTodoService from "./week-todo-service";
import {computed} from "vue";

const weekList = computed(() => weekTodoService.selectedWeekList.value)

const today = new Date()
const offset = -today.getTimezoneOffset()/60

const timezone = `GMT${offset >= 0 ? '+' : '-'}${Math.abs(offset)}`

function isPassedDate(date: Date) {
  return date.getTime() < today.getTime()
}

</script>

<style lang="less">
#calendar-week {
  height: 60px;
  width: 100%;

  display: flex;
  flex-shrink: 0;

  box-shadow: 0 2px 4px 0 rgba(0,0,0, 8%);

  .timezone {
    min-width: 56px;
    display: flex;
    align-items: flex-end;
    justify-content: center;

    font-size: 11px;
    color: #8f959e;

    padding-bottom: 8px; // 1
  }

  .week-item {
    width: 14%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly; // 2
    padding: 0 8px;
    border-left: 1px solid #dee0e3;

    cursor: pointer;

    &:hover {
      background-color: #FAFAFA;
    }
    &:focus {
      background-color: #EFEFEF;
    }

    .week-text {

    }
    .day-text {
      font-size: 24px;
    }
  }
  .is-today {
    color: #3370ff;
  }
  .is-passed-day {
    color: #999999;
  }
}
</style>