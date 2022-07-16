<!-- 
  author:Leo
  date: - 
 -->
<template>
  <div class="flex justify-center save-wrapper bg-gray-100 p-4">
    <div class="bg-white shadow rounded p-4">
      <el-form label-position="top">
        <div class="flex gap-2">
          <div class="w-10 h-10 rounded bg-blue-500"></div>
          <el-form-item label="表单名称" required>
            <el-input placeholder="请输入" style="width: 400px"></el-input>
          </el-form-item>
        </div>

        <el-form-item label="所在分组" required>
          <el-input placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="表单说明">
          <el-input type="textarea" rows="6" maxlength="100" placeholder="请输入" show-word-limit resize="none"></el-input>
        </el-form-item>
        <el-form-item label="谁可以发起">
          <el-input placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="模板管理员">
          <el-input placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
