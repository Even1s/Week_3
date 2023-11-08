<script setup>
import { useRoute } from "vue-router";
import {onMounted, ref} from "vue";
import axios from "axios";
import loading from '@/components/loading/loading.vue'
import comment from "@/components/comment/comment.vue";

const route = useRoute()
const url = `https://hacker-news.firebaseio.com/v0/item/${route.params.postId}.json`
let postData
let isLoaded = ref(false)
let date
let commentsCount = ref(0)
onMounted(()=>{
  axios.get(url).then(response => {
    postData = response.data
    isLoaded.value = !isLoaded.value
    date = getDate(postData.time)
    // postData.comments = getComments(postData.kids)
  })
})
function getDate(unixTime) {
  let agoTime
  let now = Math.floor(Date.now()/1000)
  agoTime = now - unixTime
  if (agoTime < 60) return Math.round(agoTime) + ' seconds ago'
  else if (agoTime < 60 * 60) return Math.round(agoTime/60) + ' minutes ago'
  else if (agoTime < 60 * 60 * 24) return Math.round(agoTime/(60 * 60)) + ' hours ago'
  else if (agoTime < 60 * 60 * 24 * 30) return Math.round(agoTime/(60 * 60 * 24)) + ' days ago'
  else if (agoTime < 60 * 60 * 24 * 30 * 365) return Math.round(agoTime/(60 * 60 * 24 * 30)) + ' months ago'
  else return Math.round(agoTime/(60 * 60 * 24 * 30 * 365)) + ' years ago'
}
// function getComments(commentsId) {
//   let comments = []
//   commentsId.forEach((commentId)=>{
//     const url = `https://hacker-news.firebaseio.com/v0/item/${commentId}.json`
//     axios.get(url).then(response=>{
//       const commentData = response.data
//       if (commentData.kids) {
//         commentsCount.value += commentData.kids.length
//       }
//       comments.push(commentData)
//     })
//   })
//   return comments
// }
</script>

<template>
  <main class="post">
    <div class="container">
      <loading v-if="!isLoaded"/>
      <div v-else class="post__main-block">
        <a class="post__title" :href="postData.url">{{ postData.title }} <span class="post__author">by {{ postData.by }}</span></a>
        <p class="post__date">Date: {{ date }}</p>
        <p class="post__comments-count">Comments: {{ commentsCount }}</p>
      </div>
      <div class="post__comments-block" v-if="isLoaded">
        <comment :commentsId="postData.kids"/>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
@import "post";
</style>