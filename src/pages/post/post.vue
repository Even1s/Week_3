<script setup>
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute(),
    postId = route.params.postId,
    url = `https://hacker-news.firebaseio.com/v0/item/${postId}.json`,
    postData = await axios.get(url)
        .then(response => {
          return new Promise(resolve => setTimeout(()=> {
            resolve(response.data)
          },3000))
        })

</script>

<template>
  <main class="post">
    <div class="container">
      <a class="post__title" :href="postData.url">{{ postData.title }}</a>
    </div>
  </main>
</template>

<style scoped lang="scss">

</style>