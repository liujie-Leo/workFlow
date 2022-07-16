<!-- 
  author:Leo
  date: - 
 -->
<template>
  <div class="content flex pt-4 save-wrapper bg-gray-100 flex-col items-center justify-center pb-12">
    <div class="fixed right-12 top-12 w-24">
      <el-slider v-model="scale"></el-slider>
    </div>
    <div :style="scaleStyle" class="flex flex-col items-center">
      <NodeEngine :s-node="flows" @add-node="onAddNode" @add-condition="onAddCondition" @remove-node="onRemoveNode"></NodeEngine>
      <EndNode></EndNode>
    </div>
  </div>
</template>

<script setup>
import NodeEngine from './components/NodeEngine.vue'
import { createNode, tree, insertNode, createInitNode, addCondition } from './util/node'
import EndNode from './components/EndNode.vue'
import { ref, computed } from 'vue'
import { deepClone } from 'utils/tools'

const scale = ref(50)
const scaleStyle = computed(() => {
  return {
    transform: `scale(${scale.value * 0.02})`,
  }
})

const flows = ref(createInitNode())

const onAddNode = (option) => {
  insertNode(createNode(option.type), option.node)
  console.log(flows.value)
}
const onAddCondition = (node) => {
  addCondition(node)
}
const onRemoveNode = ({ pNode, node, conditionNode }) => {
  let n = deepClone(node.children)
  pNode.children = n
}
</script>

<script>
export default {
  name: 'WorkFlow',
}
</script>

<style lang="scss" scoped></style>
