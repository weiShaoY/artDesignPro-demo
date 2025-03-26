<script setup lang="ts">
import { onMounted, ref } from 'vue'

const route = useRoute()

const iframeRef = ref<HTMLIFrameElement | null>(null)

const isLoading = ref(true)

const iframeUrl = ref('')

onMounted(() => {
  if (route.meta.link) {
    iframeUrl.value = route.meta.link as string
  }
})

function handleIframeLoad() {
  isLoading.value = false
}
</script>

<template>
  <div
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
  min-height: calc(100vh - 120px);
  border: none;
}
</style>
