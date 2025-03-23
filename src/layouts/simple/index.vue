<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import Header from './components/header/index.vue'
</script>

<template>
  <div
    class="h-screen w-full flex flex-col"
  >
    <Header />

    <Suspense>
      <template
        #default
      >
        <router-view />
      </template>

      <template
        #fallback
      >
        <Loading />
      </template>
    </Suspense>
  </div>
</template>

<style  scoped>

</style>
