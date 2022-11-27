<template>
  <svg t="1666706192418" class="icon icon-collapse-off" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
       p-id="2586"
       :width="size" :height="size"
       :fill="color">
    <path
      d="M320 288a32 32 0 0 1 52.48-24.576l302.08 251.648a32 32 0 0 1 0 49.216l-302.08 251.648a32 32 0 0 1-52.48-24.576V288z"
      p-id="2587"></path>
  </svg>
</template>
<script setup lang="ts">

import {withDefaults} from "vue"

interface IIconProps {
  size?: string | number
  color?: string
}

withDefaults(defineProps<IIconProps>(), {
  size: 16,
  color: '#333333'
})

</script>