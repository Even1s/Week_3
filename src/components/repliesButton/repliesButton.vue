<script setup>
const imgUrlFirst = "/src/assets/open_full.svg"
const imgUrlSecond = "/src/assets/close_fullscreen.svg"
let count = true
function switchImg(buttonImg) {
  if (buttonImg.tagName==='BUTTON') buttonImg = buttonImg.querySelector('img')
  switch (count) {
    case true:
      count = false
      buttonImg.src = imgUrlSecond;
        break;
    case false:
      count = true
      buttonImg.src = imgUrlFirst;
        break;
    default:
      console.log(buttonImg.src);
        break
  }
}
</script>

<template>
  <button @click="switchImg($event.target, count)">
    <img src="/src/assets/open_full.svg" alt="replies">
  </button>
</template>

<style scoped lang="scss">
@import "repliesButton";
</style>