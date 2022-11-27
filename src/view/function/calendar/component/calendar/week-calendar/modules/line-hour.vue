<template>
  <div class="line-hour">
    <div class="line-hour-label">
      <span>{{ hour }}</span>
    </div>
    <item-hour v-for="(day, idx) in dayList"
               :key="idx"
    >
    </item-hour>
  </div>
</template>

<script setup lang="ts">
import ItemHour from './item-hour.vue'
import {defineProps, ref} from "vue";

const {hour} = defineProps<{
  hour: String
}>()

const dayList = ref<[1, 2, 3, 4, 5, 6, 7]>()
</script>
