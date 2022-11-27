<template>
  <div id="line-date-label">
    <div class="hour-label" v-for="hour in hourList" :key="hour">
      <div>{{hour}}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const hourList = [
  '', '01:00', '02:00', '03:00', '04:00', '05:00',
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
  '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
]

</script>
<style lang="less">
#line-date-label {
  display: flex;
  flex-direction: column;
  min-width: 56px;

  .hour-label {
    height: 48px;
    flex-shrink: 0;
    text-align: center;

    font-size: 10px;
    color: #8f959e;

    > div {
      line-height: 16px;
      margin-top: -8px;
    }
  }
}
</style>