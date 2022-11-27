<template>
  <div class="n-collapse">
    <div class="collapse-header" @click="toggleCollapse">
      <n-icon v-if="!isCollapsed" icon="arrow-fill-bottom"></n-icon>
      <n-icon v-if="isCollapsed" icon="arrow-fill-right"></n-icon>
      <span class="title">{{ title }}</span>
    </div>
    <div v-if="!(isCollapsed && destroyCollapsed)"
         class="collapse-content"
         :class="{'collapse-content-collapsed': isCollapsed}">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import NIcon from "./NIcon.vue"
import {ref} from 'vue'

const props = withDefaults(defineProps<{
  title: string,
  collapsed?: boolean,
  destroyCollapsed?: boolean
}>(), {
  collapsed: false,
  destroyCollapsed: true
})

const isCollapsed = ref(props.collapsed)

function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value
}

</script>

<style lang="less">
@import "src/stylus/hidden-scroll";
@import "src/stylus/hover-effect";

.n-collapse {
  width: 100%;

  display: flex;
  flex-direction: column;

  cursor: pointer;
  user-select: none;

  .collapse-header {
    height: 30px;
    padding: 0 8px;

    display: flex;
    align-items: center;

    > i { color: #999999; }
    >.title {
      margin-left: 4px;
      font-weight: bold;
    }
  }
  .collapse-content {
    margin-top: 4px;
    transition: height 300ms ease-in-out;
    .hidden-scroll();
  }

  .collapse-header, .collapse-content {
    width: 100%;
    box-sizing: border-box;
  }

  .collapse-header, .collapse-item {
    .hover-effect();
  }

  .collapse-content-collapsed {
    display: none !important;
  }
}
</style>

