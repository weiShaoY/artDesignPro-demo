<!-- 响应式输入框 -->
<script setup lang="ts">
defineProps({
  label: String,
  prop: String,
})

const modelValue = defineModel<string>({
  required: true,
})

</script>

<template>
  <el-col
    :xs="24"
    :sm="12"
    :lg="6"
  >
    <el-form-item
      :label="`${label}：`"
      :prop="prop"
    >
      <el-input
        v-model="modelValue"
        :placeholder="`请输入${label}`"
      />
      <!-- <el-input :placeholder="`请输入${label}`" :model-value="value" @input="inputChange" clearable/> -->
    </el-form-item>
  </el-col>
</template>

<style lang="scss" scoped></style>
