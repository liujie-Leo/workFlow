<template>
  <div class="flex justify-center flex-col gap-2 items-center bg-white rounded shadow-xl p-4 pb-8">
    <el-form v-if="Object.keys(elementData).length > 0" label-width="80px">
      <el-divider content-position="center">组件属性</el-divider>
      <!-- 键 key -->
      <template v-if="hasKey('key')">
        <el-form-item label="Key">
          <el-input v-model="elementData.key" placeholder="请输入key"></el-input>
        </el-form-item>
      </template>
      <!-- 标题 label -->
      <template v-if="hasKey('label')">
        <el-form-item label="标题">
          <el-input v-model="elementData.label" placeholder="请输入标题"></el-input>
        </el-form-item>
      </template>
      <!-- 占位提示 placeholder -->
      <template v-if="hasKey('placeholder')">
        <el-form-item label="占位提示">
          <el-input v-model="elementData.placeholder" placeholder="请输入占位提示"></el-input>
        </el-form-item>
      </template>
      <!-- 默认值 defaultValue -->
      <template v-if="hasKey('defaultValue')">
        <el-form-item label="默认值">
          <el-input placeholder="请输入默认值"></el-input>
        </el-form-item>
      </template>
      <!-- 字符长度 maxlength -->
      <template v-if="hasKey('maxlength')">
        <el-form-item label="最多输入">
          <el-input placeholder="请输入字符长度"></el-input>
        </el-form-item>
      </template>
      <!-- 是否必填 required -->
      <template v-if="hasKey('required')">
        <el-form-item label="是否必填">
          <el-switch v-model="elementData.required"></el-switch>
        </el-form-item>
      </template>
      <!-- 是否禁用 disabled -->
      <template v-if="hasKey('disabled')">
        <el-form-item label="是否禁用">
          <el-switch v-model="elementData.disabled"></el-switch>
        </el-form-item>
      </template>
      <template v-if="hasKey('options') && props.element.tag === 'cascader'">
        <el-form-item label="是否多选">
          <el-switch v-model="elementData.props.props.multiple"></el-switch>
        </el-form-item>
      </template>
      <!-- 选项 options -->
      <template v-if="hasKey('options')">
        <el-divider content-position="center">选项</el-divider>
        <!-- select 选项 -->
        <div v-if="['select', 'radioGroup', 'checkboxGroup'].includes(props.element.tag)">
          <div
            v-for="(item, index) in elementData.options"
            :key="index"
            class="flex justify-between items-center mb-2 gap-2 bg-gray-100 p-2 rounded"
          >
            <div class="flex gap-2">
              <el-input v-model="item.label" class="text-sm" placeholder="Label" />
              <el-input v-model="item.value" class="text-sm" placeholder="Value" />
            </div>
            <span class="iconfont icon-delete cursor-pointer" @click="onDeleteOption(index)"></span>
          </div>
          <div class="flex justify-center items-center mt-2 gap-1 cursor-pointer" @click="onAddOption">
            <span class="iconfont icon-add"></span>
            <span class="text-xs text-gray-600">添加选项</span>
          </div>
        </div>
        <!-- 级联选项 -->
        <div v-if="props.element.tag === 'cascader'">
          <div>
            <div class="flex justify-center items-center mt-2 gap-1 cursor-pointer" @click="onAddCascaderOption">
              <span class="iconfont icon-add"></span>
              <span class="text-xs text-gray-600">添加 / 查看 JSON 数据</span>
            </div>
          </div>
          <el-dialog v-model="cascaderJsonDialog" title="级联选择器 Options">
            <el-input v-model="cascaderJsonString" rows="14" type="textarea" placeholder="请输入JSON数据"></el-input>
            <template #footer>
              <el-button @click="onCancelInputCascaderJson">取消</el-button>
              <el-button type="primary" @click="onConfirmInputCascaderJson">确定</el-button>
            </template>
          </el-dialog>
        </div>
      </template>
    </el-form>
    <el-empty v-else description="暂无激活表单"></el-empty>
  </div>
</template>

<script setup>
import { ElNotification } from 'element-plus'
import { computed, ref } from 'vue'
const props = defineProps({
  element: {
    type: Object,
    default: () => {
      return {}
    },
  },
})

const emits = defineEmits(['change'])

const elementData = computed({
  get: () => {
    return props.element
  },
  set: (newValue) => {
    emits('change', newValue)
  },
})

const hasKey = (key) => {
  return props.element[key] !== undefined
}

const onAddOption = () => {
  elementData.value.options.push({
    label: '',
    value: '',
  })
}
const onDeleteOption = (index) => {
  elementData.value.options.splice(index, 1)
}

const cascaderJsonDialog = ref(false)
const cascaderJsonString = ref('')
const onAddCascaderOption = () => {
  cascaderJsonString.value = JSON.stringify(elementData.value.options)
  cascaderJsonDialog.value = true
}
const onConfirmInputCascaderJson = () => {
  try {
    if (cascaderJsonString.value[0] !== '[') {
      throw false
    }
    let str = `${cascaderJsonString.value}`
    elementData.value.options = JSON.parse(str)
  } catch (error) {
    ElNotification({
      title: '错误提示',
      message: '请输入合法的JSON数据',
    })
    return false
  }
  ElNotification({
    type: 'success',
    title: 'Success',
    message: '数据添加成功！',
  })
  cascaderJsonDialog.value = false
}
const onCancelInputCascaderJson = () => {
  cascaderJsonString.value = ''
  cascaderJsonDialog.value = false
}
</script>
