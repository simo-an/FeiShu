<template>
  <div id="calendar-week">
    <div class="week-item" v-for="(week, idx) in WeekList" :key="week">
      {{week}}
    </div>
  </div>
</template>

<script setup lang="ts">

const WeekList = ['日', '一', '二', '三', '四', '五', '六']

</script>

<style lang="less">
#calendar-week {
  width: 100%;
  height: 32px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  color: #999999;

  .week-item {
    width: 34px;
    text-align: center;
  }
}
</style>