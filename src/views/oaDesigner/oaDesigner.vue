<!-- 
  author:Leo
  date: - 
 -->
<template>
  <div>
    <div class="h-12 bg-white flex justify-between items-center px-4 z-10 shadow sticky top-0 left-0">
      <div class="w-12">
        <div class="iconfont icon-arrow-left-bold text-xl cursor-pointer"></div>
      </div>
      <div class="flex gap-8 text-sm items-center">
        <div
          v-for="tab in tabs"
          :key="tab.index"
          :class="['cursor-pointer flex items-center gap-1 text-sm text-gray-600', active === tab.index ? 'tab-acitve' : '']"
          @click="onTabChange(tab)"
        >
          <span class="text-xl">{{ tab.head }}</span
          >{{ tab.title }}
        </div>
      </div>
      <div class="flex items-center gap-1">
        <el-button size="small">预览</el-button>
        <el-button size="small">发布</el-button>
      </div>
    </div>
    <div v-if="active === 1">
      <BaseSetting></BaseSetting>
    </div>
    <div v-if="active === 2">
      <FormDesign></FormDesign>
    </div>
    <div v-if="active === 3">
      <WorkFlow></WorkFlow>
    </div>
    <div v-if="active === 4">
      <AdvanceSetting></AdvanceSetting>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FormDesign from './formDesign/index.vue'
import WorkFlow from './workFlow/index.vue'
import BaseSetting from './baseSetting/index.vue'
import AdvanceSetting from './advanceSetting/index.vue'

const tabs = [
  {
    index: 1,
    head: '①',
    title: '基础设置',
  },
  {
    index: 2,
    head: '②',
    title: '表单设计',
  },
  {
    index: 3,
    head: '③',
    title: '流程设计',
  },
  {
    index: 4,
    head: '④',
    title: '高级设置',
  },
]

const active = ref(1)
const onTabChange = (e) => {
  active.value = e.index
}
</script>

<style lang="scss" scoped>
.tab-acitve {
  // background-color: rgba($color: #fff, $alpha: 0.2);
  color: #3b82f6;
}
</style>
