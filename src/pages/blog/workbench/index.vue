<script setup lang="ts">

const MapChart = defineAsyncComponent(() => import('./MapChart.vue'))

</script>

<template>
  <div>
    <MapChart />
  </div>
</template>

<style lang="scss" scoped>
  .page-content {
  height: 100%;
}
</style>
