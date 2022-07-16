<script>
import { h } from 'vue'
import {
  ElInput,
  ElInputNumber,
  ElSelect,
  ElOption,
  ElCascader,
  ElSlider,
  ElRate,
  ElDatePicker,
  ElTimePicker,
  ElSwitch,
  ElRadioGroup,
  ElRadio,
  ElCheckboxGroup,
  ElCheckbox,
} from 'element-plus'
import 'element-plus/dist/index.css'

export default {
  props: {
    element: {
      type: Object,
      default: () => {
        return {}
      },
    },
    form: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  emits: ['update:modelValue', 'change'],
  computed: {
    elementData: {
      get: () => {
        return this.element
      },
      set: (newValue) => {
        this.$emit('change', newValue)
      },
    },
  },
  methods: {
    getElement() {
      const elements = {
        input: {
          component: ElInput,
          children: [],
        },
        inputNumber: {
          component: ElInputNumber,
          children: [],
        },
        select: {
          component: ElSelect,
          children: [],
        },
        cascader: {
          component: ElCascader,
        },
        slider: {
          component: ElSlider,
        },
        rate: {
          component: ElRate,
        },
        datePicker: {
          component: ElDatePicker,
        },
        timePicker: {
          component: ElTimePicker,
        },
        switch: {
          component: ElSwitch,
        },
        radioGroup: {
          component: ElRadioGroup,
          children: [],
        },
        checkboxGroup: {
          component: ElCheckboxGroup,
          children: [],
        },
      }
      return elements[this.element.tag]
    },
  },
  render() {
    let comp = this.getElement()
    if (this.element.tag === 'select') {
      this.element.options.forEach((item) => {
        comp.children.push(h(ElOption, item))
      })
    }
    if (this.element.tag === 'radioGroup') {
      this.element.options.forEach((item) => {
        comp.children.push(h(ElRadio, item))
      })
    }
    if (this.element.tag === 'checkboxGroup') {
      this.element.options.forEach((item) => {
        comp.children.push(h(ElCheckbox, item))
      })
    }
    return h(
      comp.component,
      {
        ...this.element,
        modelValue: this.form[this.element.key],
        'onUpdate:modelValue': (value) => this.$emit('update:modelValue', value),
      },
      comp.children,
    )
  },
}
</script>
