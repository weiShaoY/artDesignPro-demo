<script setup lang="ts">
import { ElLoading } from 'element-plus'

import { onMounted, ref } from 'vue'

import { useRoute } from 'vue-router'

const route = useRoute()

const iframeRef = ref<HTMLIFrameElement | null>(null)

const isLoading = ref(true)

const iframeUrl = ref('')

const iframeContainer = ref<HTMLDivElement | null>(null)

let loadingInstance: any = null // 存储 loading 实例

onMounted(() => {
  if (route.meta.iframeUrl) {
    iframeUrl.value = route.meta.iframeUrl as string

    // 显示 loading
    loadingInstance = ElLoading.service({
      lock: true,
      text: '加载中',
      background: 'rgba(0, 0, 0, 0.7)',
      target: iframeContainer.value as HTMLDivElement,
    })
  }
  else {
    console.warn('iframeUrl 未找到，请确保 meta 中包含 iframeUrl')
  }
})

function handleIframeLoad() {
  isLoading.value = false

  // 关闭 loading
  if (loadingInstance) {
    loadingInstance.close()
    loadingInstance = null
  }
}
</script>

<template>
  <div
    ref="iframeContainer"
    class="iframe-container"
  >
    <iframe
      v-if="iframeUrl"
      ref="iframeRef"
      :src="iframeUrl"
      frameborder="0"
      class="iframe-content"
      @load="handleIframeLoad"
    />
  </div>
</template>

<style scoped>
.iframe-container {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}

.iframe-content {
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 140px);
  border: none;
}
</style>
