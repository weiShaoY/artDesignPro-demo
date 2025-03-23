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
        500! 内部服务器错误!
      </div>

      <div
        class="text-center color-[#A4A4A4]"
      >
        出现错误,请稍后重试!
      </div>

      <div
        class=""
      >
        <SvgIcon
          icon="error-500"
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

<style scoped >

</style>
