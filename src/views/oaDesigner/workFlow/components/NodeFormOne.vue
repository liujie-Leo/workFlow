<!-- 
  author:Leo
  date: - 
 -->
<template>
  <div>
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="设置发起人" name="1">
        <div class="text-sm text-gray-600">发起人类型</div>
        <el-radio-group v-model="nodeData.originatorType">
          <el-radio label="1" value="1">组织内成员</el-radio>
          <el-radio label="2" value="2">组织外成员</el-radio>
        </el-radio-group>
        <div class="text-sm text-gray-600 mb-1 mt-6">谁可以提交</div>
        <el-select v-model="nodeData.canCommitPersons" placeholder="请选择">
          <el-option label="张三" value="1"></el-option>
          <el-option label="李四" value="2"></el-option>
          <el-option label="王五" value="3"></el-option>
        </el-select>
      </el-tab-pane>
      <el-tab-pane label="表单操作权限" name="2"> 321 </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  node: {
    type: Object,
    default: () => {
      return {}
    },
  },
})

const emits = defineEmits(['update:modelValue'])

const nodeData = computed({
  get: () => {
    return props.node
  },
  set: (value) => {
    emits('update:modelValue', value)
  },
})

const activeName = ref('1')
</script>

<style lang="scss" scoped></style>
