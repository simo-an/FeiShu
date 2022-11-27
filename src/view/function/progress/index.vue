<template>
  <div id="manage-progress">
    manage-progress
  </div>
</template>

<script setup lang="ts">
import useService from "@/service/useService";

const {progressService} = useService()

progressService.getProgressList().then(result => {
  console.warn(result)
})

</script>

<style lang="less">
#manage-progress {
  display: flex;

  background-color: #999999;
}
</style>