<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import { blogMittBus } from '@/utils'

// 简化后的处理函数
function handleSingleLaunch() {
  blogMittBus.emit('triggerFireworks')
}
</script>

<template>
  <div
    class="page-content"
  >
    <h1>
      菜单-1
    </h1>

    <button
      @click="handleSingleLaunch"
    >
      打开烟花
    </button>
  </div>
</template>

<style lang="less" scoped>

</style>
