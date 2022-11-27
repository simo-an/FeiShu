<template>
  <svg t="1666795489613" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
       p-id="2586"
       :width="size" :height="size"
       :fill="color"
  >
    <path
      d="M754.688 356.672a32 32 0 0 1 24.576 52.48l-251.648 302.08a32 32 0 0 1-49.216 0l-251.648-302.08a32 32 0 0 1 24.576-52.48h503.36z"
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