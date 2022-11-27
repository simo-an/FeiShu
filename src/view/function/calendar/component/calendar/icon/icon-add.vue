<template>
  <div class="icon-add">
    <svg t="1664249061175" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
         p-id="1554" :width="size || 16" :height="size || 16">
      <path
        d="M512 832a32 32 0 0 0 32-32v-256h256a32 32 0 0 0 0-64h-256V224a32 32 0 0 0-64 0v256H224a32 32 0 0 0 0 64h256v256a32 32 0 0 0 32 32"
        p-id="1555"></path>
    </svg>
  </div>
</template>
<script setup lang="ts">
withDefaults(defineProps<{
  size?: number
}>(), {
  size: 16
})
</script>
