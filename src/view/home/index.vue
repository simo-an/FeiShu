<template>
  <div id="home">
    <home-header/>
    <div class="home-content">
      <router-view class="view-content"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import HomeHeader from "./home-header.vue";

</script>

<style lang="less">
#home {
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  #home-header, >.home-content {
    background-color: #F5F5F5;
  }

  >.home-content {
    display: flex;
    flex-grow: 1;
    overflow: hidden;

    #home-navigator {
      flex-shrink: 0;
      border-radius: 4px;
    }

    > .view-content {
      flex-grow: 1;
      border-top-left-radius: 4px;
      padding: 2px;
      background-color: #FFFFFF;
    }
  }
}
</style>