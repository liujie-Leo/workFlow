<template>
  <div class="flex bg-gray-100 save-wrapper">
    <!-- components -->
    <div class="w-80 flex justify-center items-center">
      <AllFormComponent @add-field="onAddField" @left-end="onLeftEnd"></AllFormComponent>
    </div>

    <!-- board -->
    <div class="flex-1">
      <IpadDevice>
        <FormSimulator
          :active-item="activeItem"
          :drawing-list="drawingList"
          @change="onSimulatorDragChange"
          @click-item="onClickSimulatorItem"
        ></FormSimulator>
      </IpadDevice>
    </div>

    <!-- config -->
    <div class="w-80 flex flex-col justify-center px-6">
      <ComponentForm :element="activeItem" @change="onActiveItemChange"></ComponentForm>
    </div>

    <!-- set -->
    <div class="fixed right-8 bottom-8 transition hover:rotate-45 cursor-pointer">
      <el-popover placement="top-start" trigger="click">
        <template #reference>
          <span class="iconfont icon-set text-indigo-500 text-4xl"></span>
        </template>
        <div class="flex flex-col gap-3">
          <div class="flex gap-1 items-center cursor-pointer hover:bg-gray-100 px-2 py-1" @click="onShowCode">
            <span class="iconfont icon-code w-5 text-indigo-500"></span>
            <span>查看源码</span>
          </div>
          <div class="flex gap-1 items-center cursor-pointer hover:bg-gray-100 px-2 py-1" @click="onShowJson">
            <span class="iconfont icon-10json w-5 text-indigo-500"></span>
            <span>查看 JSON</span>
          </div>
        </div>
      </el-popover>
    </div>
    <!-- json dialog -->
    <el-dialog v-if="showJsonDialog" v-model="showJsonDialog" title="JSON">
      <div>
        <HighLightCode language="json" :data="drawingList"> </HighLightCode>
      </div>
    </el-dialog>
    <!-- code dialog -->
    <el-dialog v-if="showCodeDialog" v-model="showCodeDialog" title="Code">
      <HighLightCode language="vue" data="vueTemplate"> </HighLightCode>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { deepClone } from 'utils/tools'
import ComponentForm from './components/CompForm.vue'
import IpadDevice from './components/IpadDevice.vue'
import AllFormComponent from './components/AllFormCoponent.vue'
import FormSimulator from './components/FormSimulator.vue'
import HighLightCode from './components/HignLightCode.vue'

// all form components
const onAddField = (e) => {
  let component = deepClone({ renderIndex: drawingList.value.length, ...e })
  drawingList.value.push(component)
  activeItem.value = component
  sortDrawingList()
}
const onLeftEnd = (e) => {
  if (e.to !== e.from) {
    activeItem.value = drawingList.value[e.newIndex]
    sortDrawingList()
  }
}

// right section
const drawingList = ref([])
const activeItem = ref({})

const onClickSimulatorItem = (e) => {
  activeItem.value = e
}
const onSimulatorDragChange = (e) => {
  // 新增
  if (e.added) {
    let obj = deepClone({ renderIndex: e.added.newIndex, ...drawingList.value[e.added.newIndex] })
    drawingList.value[e.added.newIndex] = obj
  }
  // 移动
  if (e.moved) {
    activeItem.value = e.moved.element
  }
  // 删除
  if (e.removed) {
    drawingList.value.splice(e.removed.element.renderIndex, 1)
    activeItem.value = {}
  }
  sortDrawingList()
}

const onActiveItemChange = (value) => {
  activeItem.value = value
}

// drawingList renderIndex重新排序
const sortDrawingList = () => {
  let index = 0
  drawingList.value.forEach((item) => {
    item.renderIndex = index++
  })
}

const showJsonDialog = ref(false)
const onShowJson = () => {
  showJsonDialog.value = true
}

const showCodeDialog = ref(false)
const onShowCode = () => {
  showCodeDialog.value = true
}
</script>
<script>
export default {
  name: 'FormEditor',
}
</script>

<style lang="less" scoped>
:deep(.el-dialog__body) {
  padding-top: 0px;
}
</style>
