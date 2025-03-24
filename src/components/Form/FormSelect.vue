<!-- 响应式选择器 -->
<script setup lang="ts">
defineProps({
  /**
   *  @description: 标签
   */
  label: String,

  /**
   *  @description: prop
   */
  prop: String,

  /**
   *  @description: 选项
   */
  options: {
    type: Array as any,
    default: () => [],
  },
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
      <el-select
        v-model="modelValue"
        clearable
        placeholder="请选择"
        style="width: 100%"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
  </el-col>
</template>

<style lang="scss" scoped></style>
