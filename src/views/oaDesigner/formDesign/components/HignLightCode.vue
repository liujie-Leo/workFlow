<template>
  <pre>
    <code >
      {{props.data}}
    </code>
  </pre>
</template>
<script setup>
import 'highlight.js/styles/atom-one-dark.css'
import hljs from 'highlight.js/lib/core'
import json from 'highlight.js/lib/languages/json'
import vue from 'highlight.js/lib/languages/xml'
import { onMounted } from 'vue'

const props = defineProps({
  data: {
    type: String || Object || Array,
    default: () => {
      return []
    },
  },
  language: {
    type: String,
    default: 'vue',
  },
})

const languageObj = {
  json,
  vue,
}

onMounted(() => {
  hljs.highlightAll()
})
hljs.registerLanguage(props.language, languageObj[props.language])
</script>
