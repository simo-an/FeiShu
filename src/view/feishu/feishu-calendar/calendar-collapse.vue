<template>
  <div class="calendar-collapse">
    <div class="collapse-header" @click="toggleCollapse">
      <icon-collapse-on v-if="!isCollapsed" color="#646464"/>
      <icon-collapse-off v-else color="#646464"/>

      <slot name="header" />
    </div>
    <div v-if="!isCollapsed" class="collapse-content">
      <slot name="content"/>
    </div>
  </div>

</template>

<script setup lang="ts">
import {ref, withDefaults} from 'vue'
import IconCollapseOn from "./icon/icon-collapse-on.vue";
import IconCollapseOff from "./icon/icon-collapse-off.vue";

interface ICollapseProps {
  collapsed: boolean
}

const props = withDefaults(defineProps<ICollapseProps>(), {
  collapsed: false
})

const emitEvent = defineEmits<{
(event: 'collapse', isCollapsed: boolean): void
}>()

const isCollapsed = ref(props.collapsed)

function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value

  emitEvent('collapse', isCollapsed.value)
}

</script>

<style lang="less">
.calendar-collapse {
  width: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  .collapse-header {
    height: 34px;
    padding-left: 8px;
    padding-right: 4px;
    display: flex;
    align-items: center;
    border-radius: 4px;

    &:hover { background-color: #EFEFEF; }
  }
  .collapse-content {
    margin-top: 4px;
  }
}
</style>