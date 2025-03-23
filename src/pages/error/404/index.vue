<script lang="ts" setup>

import { useRouter } from 'vue-router'

const router = useRouter()

function back() {
  router.push('/')
}
</script>

<template>
  <div
    class="m-auto max-w-[400px]"
  >
    <div
      class="flex flex-col items-center justify-center px-2"
    >
      <div
        class="m-b-3 text-center text-2xl color-[#1F1F1F] font-semibold"
      >
        404! 找不到页面！
      </div>

      <div
        class="text-center color-[#A4A4A4]"
      >
        抱歉,我们找不到您要查找的页面.也许您输入了错误的URL?请务必检查您的拼写!
      </div>

      <div
        class=""
      >
        <SvgIcon
          icon="error-404"
          :size="400"
        />
      </div>

      <button
        key="back"
        class="rounded-md bg-black p-4 text-xl color-white font-semibold"
        @click="back"
      >
        转至主页
      </button>
    </div>

  </div>
</template>

<style scoped lang="less">

</style>
