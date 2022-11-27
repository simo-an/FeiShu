<template>
  <div class="icon-close" @click="$emit('click')">
    <svg t="1665294256534" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
         p-id="2535" :width="size" :height="size" :fill="color">
      <path
        d="M504.224 470.288l207.84-207.84a16 16 0 0 1 22.608 0l11.328 11.328a16 16 0 0 1 0 22.624l-207.84 207.824 207.84 207.84a16 16 0 0 1 0 22.608l-11.328 11.328a16 16 0 0 1-22.624 0l-207.824-207.84-207.84 207.84a16 16 0 0 1-22.608 0l-11.328-11.328a16 16 0 0 1 0-22.624l207.84-207.824-207.84-207.84a16 16 0 0 1 0-22.608l11.328-11.328a16 16 0 0 1 22.624 0l207.824 207.84z"
        p-id="2536"></path>
    </svg>
  </div>
</template>
<script setup lang="ts">

withDefaults(defineProps<{
  size: number | string,
  color: string | `#${string}`
}>(), {
  size: 16,
  color: "#333333"
})
</script>
