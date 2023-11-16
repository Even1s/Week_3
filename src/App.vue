<script setup>
import MyFooter from '@/components/TheFooter/TheFooter.vue';
import MyHeader from '@/components/TheHeader/TheHeader.vue';

</script>

<template>
  <MyHeader/>
  <RouterView/>
  <MyFooter/>
</template>

<style lang="scss">
@import "@/assets/app";
</style>
