<!-- 
  author:Leo
  date: - 
 -->
<template>
  <template v-for="item in props.data" :key="item.authKey">
    <template v-if="item?.child.length > 0 && item.show">
      <el-sub-menu :index="item.authKey">
        <template #title>
          <div class="flex items-center gap-2">
            <div :class="['iconfont text-xl w-5', item.icon]"></div>
            <span>{{ item.title }}</span>
          </div>
        </template>
        <MenuItem :data="item?.child"></MenuItem>
      </el-sub-menu>
    </template>
    <template v-else>
      <el-menu-item v-if="item.show" :index="item.authKey" @click="onRoute(item)">
        <div class="flex items-center gap-2">
          <div :class="['iconfont text-xl w-5', item.icon]"></div>
          <span>{{ item.title }}</span>
        </div>
      </el-menu-item>
    </template>
  </template>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
  data: {
    type: Object || Array,
    default: {},
  },
})

const onRoute = (e) => {
  router.push(e.path)
}
</script>

<style lang="scss" scoped></style>
