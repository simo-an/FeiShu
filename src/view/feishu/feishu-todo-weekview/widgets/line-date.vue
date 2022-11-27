<template>
  <div ref="lineDate" class="line-date">
    <div class="item-hour" v-for="hour in hourList" :key="hour"/>
  </div>
</template>
<script setup lang="ts">
import {ref} from "vue";


const {date} = defineProps<{date: Date}>()

const lineDate = ref<HTMLDivElement>(null)


const hourList = [
  0, 1, 2, 3, 4, 5, 6, 7,
  8, 9, 10, 11, 12, 13, 14, 15,
  16, 17, 18, 19, 20, 21, 22, 23,
]
</script>

<style lang="less">
.line-date {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  .item-hour {
    height: 48px;
    display: flex;
    flex-shrink: 0;
    cursor: pointer;

    border-left: 1px solid #dee0e3;
    border-bottom: 1px solid #dee0e3;
    box-sizing: border-box;
  }
}
</style>
