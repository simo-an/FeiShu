<template>
  <svg class="n-icon" aria-hidden="true">
    <use :xlink:href="nIcon"></use>
  </svg>
</template>

<script setup lang="ts">
const nIconProp = defineProps<{
  icon: string
}>()

const nIcon = `#sk-${nIconProp.icon}`

</script>

<style lang="less">
.n-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>