<script setup>
  function reloadAnimate(buttonImg) {
    if (buttonImg.tagName==='BUTTON') buttonImg = buttonImg.querySelector('img')
    buttonImg.setAttribute('style','transition: all 0.4s ease-out; transform: rotate(-360deg);')
    setTimeout(()=>{
      buttonImg.setAttribute('style', "")
    }, 400)
  }
</script>

<template>
  <button id="reload" @click="reloadAnimate($event.target)">
    <img src="@/assets/replay.svg" alt="replies">
  </button>
</template>

<style scoped lang="scss">
@import "reloadButton";
</style>