<template>
<div id="home-header">
  <content-user/>
  <content-event/>
  <content-operation/>
</div>
</template>

<script setup lang="ts">
import ContentUser from "./content-user.vue";
import ContentEvent from "./content-event.vue";
import ContentOperation from "./content-operation.vue";

</script>

<style lang="less">
#home-header {
  height: 48px;
  width: 100%;

  display: flex;
  flex-shrink: 0;

  >#user-content {
    min-width: 200px;
  }
  >#event-content {
    flex-grow: 1;
  }

  >#user-content, #event-content {
    -webkit-app-region: drag;

    >* { -webkit-app-region: no-drag; }
  }
}
</style>