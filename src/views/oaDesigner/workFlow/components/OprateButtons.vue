<!-- 
  author:Leo
  date: - 
 -->
<template>
  <el-popover placement="right" :width="200" trigger="hover">
    <template #reference>
      <div
        class="pb-0.5 text-xl w-7 h-7 bg-blue-500 text-white rounded-full flex justify-center items-center cursor-pointer transform hover:scale-105 transition"
        @click="onSelectButton"
      >
        +
      </div>
    </template>
    <div class="flex justify-between gap-2">
      <div class="flex flex-col items-center gap-1" @click="onAddNode(2)">
        <div class="cursor-pointer transform hover:scale-110 transition icon-zhang iconfont text-2xl text-red-500"></div>
        <div class="text-xs text-gray-500 select-none">审批人</div>
      </div>
      <div class="flex flex-col items-center gap-1" @click="onAddNode(3)">
        <div class="cursor-pointer transform hover:scale-110 transition iconfont icon-chaosong text-blue-500 text-2xl"></div>
        <div class="text-xs text-gray-500 select-none">抄送人</div>
      </div>
      <div class="flex flex-col items-center gap-1" @click="onAddNode(4)">
        <div class="cursor-pointer transform hover:scale-110 transition iconfont icon-jiagou text-2xl"></div>
        <div class="text-xs text-gray-500 select-none">条件分支</div>
      </div>
    </div>
  </el-popover>
</template>

<script setup>
const props = defineProps({
  node: {
    type: Object,
    default: () => {
      return {}
    },
  },
})

const emits = defineEmits(['click-button'])

const onAddNode = (type) => {
  emits('click-button', { type, node: props.node })
}
</script>

<style lang="scss" scoped></style>
