<script setup>

</script>

<template>
  <header class="header">
    <div class="container">
      <h1>header</h1>
      <div class="header__links-block">
        <router-link to="/" class="header__link">main</router-link>
        <router-link to="/post/38221552" class="header__link">news 1</router-link>
        <router-link to="/post/38222909" class="header__link">news 2</router-link>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@import "header";
</style>