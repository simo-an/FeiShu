<template>
  <div id="view-switcher">
    <div class="view-week"
         :class="{'view-selected': isWeekSelected}"
         @click="emitEvent('switchWeek')"
    >周</div>
    <div class="view-month"
         :class="{'view-selected': isMonthSelected}"
         @click="emitEvent('switchMonth')"
    >月</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isWeekSelected: boolean,
  isMonthSelected: boolean
}>()

const emitEvent = defineEmits(['switchWeek', 'switchMonth'])
</script>

<style lang="less">
@import "@/stylus/hover-effect";

#view-switcher {
  width: 128px;
  height: 36px;
  padding: 2px;
  display: flex;
  justify-content: space-between;
  border: 1px solid #E8E8E8;
  border-radius: 4px;

  .view-week, .view-month {
    width: 49%;
    display: flex;
    align-items: center;
    justify-content: center;

    .hover-effect()
  }

  .view-selected {
    background-color: var(--primary-color) !important;
    color: #FFFFFF;
  }
}
</style>
