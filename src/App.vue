<script setup>
import MyFooter from '@/components/footer/footer.vue';
import MyHeader from '@/components/header/header.vue';

const pending = ()=> {
  console.log("pending")
}
const resolve = ()=> {
  console.log("resolve")
}
const fallback = ()=> {
  console.log("fallback")
}
</script>

<template>
  <my-header />
  <Suspense @pending="pending" @resolve="resolve" @fallback="fallback">
    <template #default>
      <router-view />
    </template>
    <template #fallback>
      <div class="container">
        <img src="/loading-thinking.gif" alt="Loading...">
      </div>
    </template>
  </Suspense>
  <my-footer />
</template>

<style lang="scss">
@import "@/assets/app";
</style>
