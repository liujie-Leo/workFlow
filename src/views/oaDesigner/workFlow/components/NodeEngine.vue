<!-- 
  author:Leo
  date: - 
  根据 node type 渲染对应组件
 -->
<template>
  <div v-for="node in props.sNode" :key="node.renderIndex">
    <div class="flex flex-col items-center">
      <!-- 发起人 type = 1 -->
      <div
        v-if="node.type === 1"
        class="shadow rounded overflow-hidden w-48 cursor-pointer border relative hover:border-green-500"
        @click="onClickNode(node)"
        @mouseenter="onFormItemEnter"
        @mouseleave="onFormItemOut"
      >
        <div class="bg-green-500 px-2 py-1 text-xs text-white">
          {{ node.title }}
        </div>
        <div class="flex p-2 text-xs items-center justify-between bg-white">
          <span class="">
            {{ node.content }}
          </span>
          <span class="iconfont icon-right"></span>
        </div>
        <div
          class="absolute top-0 right-1 hidden del-icon iconfont icon-delete"
          @click.stop="onRemoveNode({ pNode: props.pNode, node })"
        ></div>
      </div>
      <!-- 审批人 type = 2 -->
      <div
        v-if="node.type === 2"
        class="shadow rounded overflow-hidden w-48 cursor-pointer border relative hover:border-red-500"
        @click="onClickNode(node)"
        @mouseenter="onFormItemEnter"
        @mouseleave="onFormItemOut"
      >
        <div class="bg-red-500 px-2 py-1 text-xs text-white">
          {{ node.title }}
        </div>
        <div class="flex p-2 text-xs items-center justify-between bg-white">
          <span class="">
            {{ node.content }}
          </span>
          <span class="iconfont icon-right"></span>
        </div>
        <div
          class="absolute top-0 right-1 hidden del-icon iconfont icon-delete"
          @click.stop="onRemoveNode({ pNode: props.pNode, node })"
        ></div>
      </div>
      <!-- 抄送人 type = 3  -->
      <div
        v-if="node.type === 3"
        class="shadow rounded overflow-hidden w-48 cursor-pointer border relative hover:border-blue-500"
        @click="onClickNode(node)"
        @mouseenter="onFormItemEnter"
        @mouseleave="onFormItemOut"
      >
        <div class="bg-blue-500 px-2 py-1 text-xs text-white">
          {{ node.title }}
        </div>
        <div class="flex p-2 text-xs items-center justify-between bg-white">
          <span class="">
            {{ node.content }}
          </span>
          <span class="iconfont icon-right"></span>
        </div>
        <div
          class="absolute top-0 right-1 hidden del-icon iconfont icon-delete"
          @click.stop="onRemoveNode({ pNode: props.pNode, node })"
        ></div>
      </div>
      <!-- 条件节点 type = 4 -->
      <div v-if="node.type === 4" class="flex flex-col items-center mx-12">
        <div
          class="bg-white px-2 w-24 text-center py-1 rounded-full shadow flex justify-center text-sm text-gray-600 cursor-pointer transform hover:scale-105 transition"
          @click="onAddCondition(node)"
        >
          添加条件
        </div>
        <div class="line"></div>
        <div class="flex justify-between gap-24 border-b-2 border-t-2">
          <!-- 条件 -->
          <div
            v-for="(conditionNode, index) in node.conditions"
            :key="conditionNode.renderIndex"
            :class="[
              'flex flex-col items-center relative ',
              index === 0 ? 'condition-before' : '',
              index === node.conditions.length - 1 ? 'condition-after' : '',
            ]"
          >
            <div class="line"></div>
            <div
              class="p-2 shadow rounded cursor-pointer relative transform hover:scale-105 transition bg-white"
              @click="onClickNode(node, conditionNode)"
              @mouseenter="onFormItemEnter"
              @mouseleave="onFormItemOut"
            >
              <div class="text-xs whitespace-nowrap">优先级{{ index + 1 }}</div>
              <span class="text-xs whitespace-nowrap">{{ conditionNode.title }}</span>
              <div
                class="absolute top-0 right-1 hidden del-icon iconfont icon-delete"
                @click.stop="onRemoveNode({ pNode: props.pNode, node, conditionNode })"
              ></div>
            </div>
            <div class="line"></div>
            <OprateButton :node="conditionNode" @click-button="onAddNode"></OprateButton>
            <div class="line"></div>
            <div v-if="conditionNode.children.length > 0">
              <NodeEngine
                :s-node="conditionNode.children"
                :p-node="conditionNode"
                @add-node="onAddNode"
                @add-condition="onAddCondition"
                @remove-node="onRemoveNode"
              ></NodeEngine>
            </div>
          </div>
        </div>
      </div>

      <div class="line-xl"></div>
      <!-- 操作按钮 -->
      <OprateButton :node="node" @click-button="onAddNode"></OprateButton>

      <div class="line-xl"></div>
    </div>
    <!-- 递归渲染组件 -->
    <div v-if="node.children.length > 0">
      <NodeEngine
        :s-node="node.children"
        :p-node="node"
        @add-node="onAddNode"
        @add-condition="onAddCondition"
        @remove-node="onRemoveNode"
      ></NodeEngine>
    </div>
  </div>
  <el-drawer v-model="drawer" :append-to-body="true" :title="currentNodeForm.title" direction="rtl">
    <NodeFormOne v-if="currentNodeForm.type === 1" v-model="currentNodeForm" :node="currentNodeForm"></NodeFormOne>
  </el-drawer>
</template>

<script setup>
import OprateButton from './OprateButtons.vue'
import NodeFormOne from './NodeFormOne.vue'
import { ref } from 'vue'

const props = defineProps({
  sNode: {
    type: Array,
    default: () => {
      return []
    },
  },
  pNode: {
    type: Array,
    default: () => {
      return {}
    },
  },
})

const emits = defineEmits(['add-node', 'add-condition', 'remove-node'])

const onAddNode = (option) => {
  emits('add-node', option)
}

const onAddCondition = (node) => {
  emits('add-condition', node)
}

const drawer = ref(false)
const currentNodeForm = ref({})
const onClickNode = (node, conditionNode) => {
  drawer.value = true
  currentNodeForm.value = node
}

const onRemoveNode = ({ pNode, node, conditionNode }) => {
  if (node.type === 4) {
    let index = node.conditions.findIndex((i) => {
      return i.renderIndex === conditionNode.renderIndex
    })
    node.conditions.splice(index, 1)

    if (node.conditions.length <= 1) {
      // 如果条件数量 <= 1 则移除该条件节点
      emits('remove-node', { pNode, node, conditionNode })
    }
  }
  if ([2, 3].includes(node.type)) {
    emits('remove-node', { pNode, node, conditionNode })
  }
}
const onFormItemEnter = (event) => {
  event.currentTarget.classList.add('hover-active')
}
const onFormItemOut = (event) => {
  event.currentTarget.classList.remove('hover-active')
}
</script>
<script>
export default {
  name: 'NodeEngine',
}
</script>

<style lang="scss" scoped>
.content {
  width: 100vw;
  overflow-x: scroll;
}
.line {
  width: 2px;
  background-color: #d1d5db;
  min-height: 32px;
  height: 100%;
}
.line-xl {
  width: 2px;
  background-color: #d1d5db;
  height: 54px;
}
.condition-before::before {
  content: '';
  width: 50%;
  height: 2px;
  background-color: #f3f4f6;
  position: absolute;
  top: -2px;
  left: -1px;
}
.condition-before::after {
  content: '';
  width: 50%;
  height: 2px;
  background-color: #f3f4f6;
  position: absolute;
  bottom: -2px;
  left: -1px;
}
.condition-after::before {
  content: '';
  width: 50%;
  height: 2px;
  background-color: #f3f4f6;
  position: absolute;
  top: -2px;
  right: -1px;
}
.condition-after::after {
  content: '';
  width: 50%;
  height: 2px;
  background-color: #f3f4f6;
  position: absolute;
  bottom: -2px;
  right: -1px;
}
.hover-active .del-icon {
  display: block;
}
</style>
