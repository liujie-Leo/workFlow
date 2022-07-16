<template>
  <div class="w-full flex flex-col gap-4 mx-6 items-center bg-white py-6 rounded shadow-xl">
    <div>表单组件</div>
    <draggable
      :sort="false"
      class="w-full flex-wrap flex gap-2 justify-center"
      :group="{ pull: 'clone', name: 'people', put: false }"
      v-bind="dragOptions"
      :list="commonComponents"
      item-key="name"
      @end="onLeftEnd"
    >
      <template #item="{ element }">
        <div
          class="item w-28 border flex justify-between items-center px-2 py-1 rounded text-sm hover:border-blue-500"
          @click="onAddField(element)"
        >
          <span class="text-gray-600 text-xs">{{ element.label }}</span>
          <span>+</span>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script setup>
import draggable from 'vuedraggable'
import { commonComponents } from 'views/oaDesigner/formDesign/js/config'

const dragOptions = {
  animation: 200,
  disabled: false,
}

const emits = defineEmits(['add-field', 'left-end'])

const onAddField = (e) => {
  emits('add-field', e)
}

const onLeftEnd = (e) => {
  emits('left-end', e)
}
</script>

<style lang="less" scoped>
.left-group {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: center;
}
.item:hover {
  border-style: dashed;
  cursor: move;
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
</style>
