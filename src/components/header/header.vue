<script setup>

</script>

<template>
  <header class="header">
    <h1>header</h1>
    <div class="header__links-block">
      <router-link to="/" class="header__link">main</router-link>
      <router-link to="/news" class="header__link">news</router-link>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@import "header";
</style>