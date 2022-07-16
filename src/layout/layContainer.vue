<!-- 
  author:Leo
  date: - 
 -->
<template>
  <div>
    <LayHeader></LayHeader>
    <div class="flex">
      <LayLeftAsider></LayLeftAsider>
      <LayContent></LayContent>
    </div>
  </div>
</template>

<script setup>
import LayHeader from './layHeader.vue'
import LayLeftAsider from './layLeftAsider.vue'
import LayContent from './layContent.vue'
</script>

<style lang="scss" scoped></style>
