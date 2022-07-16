<!-- 
  author:Leo
  date: - 
 -->
<template>
  <div class="w-52 content bg-gray-500">
    <el-menu default-active="2" class="el-menu-vertical-demo">
      <MenuItem :data="userStore.menu"></MenuItem>
    </el-menu>
  </div>
</template>

<script setup>
import useUserStore from 'store/modules/user'
import MenuItem from './menuItem.vue'
const userStore = useUserStore()

console.log('@@@@@@@@@@')
console.log(userStore.menu)
</script>

<style lang="scss" scoped>
.content {
  height: calc(100vh - 42.5px);
}
:deep(.el-menu) {
  height: 100%;
  // padding: 12px 0;
}
</style>
