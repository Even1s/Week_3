<script setup>
import MyFooter from '@/components/footer/footer.vue';
import MyHeader from '@/components/header/header.vue';
</script>

<template>
  <my-header />
  <router-view />
  <my-footer />
</template>

<style lang="scss">
@import "@/assets/app";
</style>
