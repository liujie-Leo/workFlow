<!-- 
  author:Leo
  date: - 
 -->
<template>
  <div class="h-screen w-screen flex justify-center items-center bg-gray-100">
    <div class="w-96 h-96 shadow-xl rounded p-4 flex flex-col justify-center gap-4 bg-white">
      <div class="text-xl">选择要登录的用户</div>
      <div
        v-for="user in userList"
        :key="user.name"
        class="flex justify-between items-center rounded shadow p-2 bg-gray-50 cursor-pointer hover:scale-105 transform transition"
        @click="onSelectUser(user)"
      >
        <div class="flex gap-2 items-center">
          <div class="iconfont icon-chaosong text-blue-500 w-8 h-8 rounded bg-white flex justify-center items-center"></div>
          <div class="text-sm text-gray-600">{{ user.name }}</div>
        </div>
        <div class="iconfont icon-right"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import useUserStore from 'store/modules/user'
import { useRouter } from 'vue-router'
import { userList } from 'utils/const'
const userStore = useUserStore()

const router = useRouter()

const onSelectUser = (user) => {
  userStore.login(user).then(() => {
    router.push('/')
  })
}
</script>

<style lang="scss" scoped></style>
