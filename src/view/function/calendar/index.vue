<template>
  <div id="todo-calendar">
    <calendar-navigator/>
    <calendar-content/>
  </div>
</template>

<script setup lang="ts">
import CalendarNavigator from "./calendar-navigator.vue";
import CalendarContent from "./calendar-content.vue";
</script>

<style lang="less">
#todo-calendar {
  position: relative;
  display: flex;
}
</style>
