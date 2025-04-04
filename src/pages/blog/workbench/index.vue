<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)

function onLoaded() {
  loading.value = false
}

const MapChart = defineAsyncComponent(() => import('./MapChart.vue'))
</script>

<template>
  <div
    v-loading="loading"
    class="page-content"
    element-loading-text="加载中..."
  >
    <MapChart />
    <!-- @on-render-complete="onLoaded" -->

  </div>
</template>

<style lang="scss" scoped>
  .page-content {
  height: 100%;
}
</style>
