<script setup>
import axios from "axios";
import {ref} from "vue";

let props = defineProps({
  commentsId: Array,
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
async function getComments(commentsId, commentsData, toLoad) {
  await commentsId.forEach((commentId, index, arr)=>{
    const url = `https://hacker-news.firebaseio.com/v0/item/${commentId}.json`
    axios.get(url).then(response=>{
      const comment = response.data
      if (!comment.deleted) commentsData.push(comment)
      if (arr.length-1 === index) {
        toLoad.value++
      }
    })
  })
}
let toLoad = ref(0)
let commentsData = []
if (props.commentsId) getComments(props.commentsId, commentsData, toLoad)
</script>

<template>
  <ul class="comment" :key="toLoad">
    <li v-for="commentData in commentsData" class="comment__list">
      <div class="comment__block">
        <p class="comment__author">by {{commentData.by}}, {{getDate(commentData.time)}}</p>
        <p class="comment__text" v-html="commentData.text"></p>
      </div>
      <comment v-if="commentData.kids" :commentsId="commentData.kids" :key="commentData.id"/>
    </li>
  </ul>
</template>

<style scoped lang="scss">
@import "comment";
</style>