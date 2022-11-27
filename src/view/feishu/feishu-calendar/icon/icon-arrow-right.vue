<template>
  <svg t="1666706260558" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
       p-id="2878"
       :width="size" :height="size"
       :fill="color">
    <path
      d="M320 932.9c-9.9 0-19.1-3.8-26.1-10.8-7-7-10.8-16.2-10.8-26.1s3.8-19.1 10.8-26.1L651.8 512 293.9 154.1c-7-7-10.8-16.2-10.8-26.1 0-9.9 3.8-19.1 10.8-26.1 7-7 16.2-10.8 26.1-10.8s19.1 3.8 26.1 10.8l384 384c14.4 14.4 14.4 37.8 0 52.2l-384 384c-7 7-16.2 10.8-26.1 10.8z"
      p-id="2879"></path>
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