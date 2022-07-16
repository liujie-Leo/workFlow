<template>
  <div class="flex-1 h-full flex justify-center items-center flex-col">
    <div class="ipad" :style="{ width: ipadConfig.width, height: ipadConfig.height }">
      <div class="ipad-screen bg-white h-full w-full">
        <slot></slot>
      </div>
    </div>
    <svg
      t="1656917529458"
      class="rotate mt-12 cursor-pointer"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="2280"
      width="32"
      height="32"
      @click="onRotate"
    >
      <path
        d="M694.4 960H195.2C131.7 960 80 908.4 80 845.1V462c0-63.4 51.7-114.9 115.2-114.9h499.2c63.5 0 115.2 51.6 115.2 114.9v383.1c0 63.3-51.7 114.9-115.2 114.9zM195.2 423.7c-21.2 0-38.4 17.2-38.4 38.3v383.1c0 21.1 17.2 38.3 38.4 38.3h499.2c21.2 0 38.4-17.2 38.4-38.3V462c0-21.1-17.2-38.3-38.4-38.3H195.2z"
        p-id="2281"
      ></path>
      <path
        d="M905.6 450.3c-14.8 0-28.9-8.6-35.2-23C788.6 240.8 592.7 213 483.2 213c-21.2 0-38.4-17.2-38.4-38.3s17.2-38.3 38.4-38.3c218.2 0 385 94.9 457.6 260.3 8.5 19.4-0.4 42-19.8 50.5-5 2.1-10.3 3.1-15.4 3.1z"
        p-id="2282"
      ></path>
      <path
        d="M473.6 285.4c-9.8 0-19.7-3.7-27.2-11.2l-72.5-72.4c-15-15-15-39.2 0-54.2l72.5-72.4c15-15 39.3-15 54.3 0s15 39.2 0 54.2l-45.4 45.3 45.4 45.3c15 15 15 39.2 0 54.2-7.4 7.4-17.3 11.2-27.1 11.2z"
        p-id="2283"
      ></path>
    </svg>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const ipadConfig = ref({
  width: '700px',
  height: '500px',
})
const onRotate = () => {
  ipadConfig.value.width = ipadConfig.value.width === '700px' ? '400px' : '700px'
  ipadConfig.value.height = ipadConfig.value.height === '500px' ? '640px' : '500px'
}
</script>

<style lang="scss" scoped>
.ipad {
  padding: 20px;
  background-color: #000;
  border-radius: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.4s;
  box-shadow: 4px 8px 24px rgba(0, 0, 0, 0.3);
}
.ipad-screen {
  border-radius: 8px;
  padding: 16px;
  overflow-y: auto;
  padding-bottom: 32px;
}
.ipad-screen::-webkit-scrollbar {
  width: 0px;
  background-color: none;
}
</style>
