<template>
  <div id="line-date-label">
    <div class="hour-label" v-for="hour in HourList" :key="hour">
      <div>{{hour}}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {HourList} from "../../../utils/const";

</script>
