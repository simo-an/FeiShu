<template>
  <svg t="1666706230195" class="icon icon-arrow-left" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
       p-id="2730"
       :width="size" :height="size"
       :fill="color">
    <path
      d="M704 932.9c-9.9 0-19.1-3.8-26.1-10.8l-384-384c-14.4-14.4-14.4-37.8 0-52.2l384-384c7-7 16.2-10.8 26.1-10.8 9.9 0 19.1 3.8 26.1 10.8 7 7 10.8 16.2 10.8 26.1s-3.8 19.1-10.8 26.1L372.2 512l357.9 357.9c7 7 10.8 16.2 10.8 26.1s-3.8 19.1-10.8 26.1c-7 7-16.2 10.8-26.1 10.8z"
      p-id="2731"></path>
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