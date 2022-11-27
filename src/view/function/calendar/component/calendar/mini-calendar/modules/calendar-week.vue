<template>
  <div id="calendar-week">
    <div class="week-item"
         v-for="(week, idx) in WeekList"
         :key="idx"
    >{{week}}</div>
  </div>
</template>

<script setup lang="ts">
import {WeekList} from '../../utils/const'
</script>
