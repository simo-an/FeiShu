<template>
<div id="operation-content">
  <n-icon icon="minimize" @click="minimizeWindow"/>
  <n-icon icon="maximize" @click="maximizeWindow"/>
  <n-icon icon="close" @click="closeWindow"/>
</div>
</template>

<script setup lang="ts">
import NIcon from "@/widget/NIcon.vue"
import useService from "@/service/useService";

const {electronService} = useService()

function minimizeWindow() { electronService.minimizeWindow() }
function maximizeWindow() { electronService.maximizeWindow() }
function closeWindow() { electronService.closeWindow() }

</script>

<style lang="less">
#operation-content {
  display: flex;
  align-items: center;

  -webkit-app-region: no-drag;

  >.n-icon {
    width: 24px;
    height: 16px;
    margin-right: 2px;
    padding: 4px 6px;
    cursor: pointer;

    &:hover {
      background-color: #EFEFEF;
    }
    &:last-of-type {
      margin-right: 8px;

      &:hover {
        background-color: #b93b16;
        color: #FFFFFF;
      }
    }
  }
}

</style>