<template>
  <el-form label-width="100px" style="height: 100%; width: 100%; position: relative">
    <draggable class="right-group" v-bind="dragOptions" :list="props.drawingList" group="people" item-key="name" @change="onChange">
      <template #item="{ element }">
        <el-form-item
          :required="element.required"
          :label="element.label"
          :class="[element.renderIndex === activeItem.renderIndex ? 'active' : '', 'relative']"
          @click="onClickItem(element)"
          @mouseenter="onFormItemEnter"
          @mouseleave="onFormItemOut"
        >
          <div class="list-group-item">
            <FiledItem v-model="formDetail[element.key]" :element="element" @change="onFieldItemChange"></FiledItem>
          </div>
          <div
            class="absolute del-icon right-0 -top-6 w-4 h-6 rounded-full hidden icon-delete iconfont cursor-pointer text-3xl"
            @click.stop="onDeleteItem(element)"
          ></div>
        </el-form-item>
      </template>
    </draggable>
    <div v-if="props.drawingList.length <= 0" class="no-data">从左侧拖入或点选表单进行设计</div>
  </el-form>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import draggable from 'vuedraggable'
import FiledItem from './FiledItem.vue'

const props = defineProps({
  drawingList: {
    type: Array,
    default: () => {
      return []
    },
  },
  activeItem: {
    type: Object,
    default: () => {
      return {}
    },
  },
})

const formDetail = ref({})

const dragOptions = {
  animation: 200,
  group: 'description',
  disabled: false,
}

const emits = defineEmits(['change', 'click-item'])

const onChange = (e) => {
  emits('change', e)
}
const onClickItem = (e) => {
  emits('click-item', e)
}
const onDeleteItem = (e) => {
  let obj = {
    removed: {
      element: e,
    },
  }
  emits('change', obj)
}
const onFormItemEnter = (event) => {
  event.currentTarget.classList.add('hover-active')
}
const onFormItemOut = (event) => {
  event.currentTarget.classList.remove('hover-active')
}
</script>

<style lang="less" scoped>
.no-data {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  transform: translateX(-50%);
  color: #6366f1;
  font-size: 14px;
}
.right-group {
  height: 100%;
  width: 100%;
  display: block;
}
.right-group .sortable-ghost {
  position: relative;
  display: block;
  height: 60px;
  width: 100%;
  overflow: hidden;
}
.right-group .sortable-ghost::before {
  content: ' ';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 3px;
  background: #3b82f6;
  z-index: 2;
}
.right-group .list-group-item {
  width: 100%;
  cursor: move;
}

:deep(.el-form-item:hover) {
  border: 1px dashed #3b82f6;
}
:deep(.el-form-item) {
  border: 1px dashed #fff;
  padding: 6px;
  border-radius: 4px;
  cursor: move;
}
:deep(.el-form-item__label) {
  cursor: move;
}
.active {
  border: 1px dashed #3b82f6 !important;
}
.hover-active .del-icon {
  display: block;
}
</style>
