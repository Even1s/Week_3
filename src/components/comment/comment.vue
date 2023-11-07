<script setup>
import axios from "axios";
import {onMounted, ref} from "vue";

let props = defineProps({
  commentsId: Array,
})
let toLoad = ref(0)
async function getComments(commentsId) {
  let comments = []
  await commentsId.forEach((commentId)=>{
    const url = `https://hacker-news.firebaseio.com/v0/item/${commentId}.json`
    axios.get(url).then(response=>{
      const commentData = response.data
      comments.push(commentData)
    })
  })
  console.log("end of getComments")
  return comments
}
let commentsData = ref([])
onMounted(async ()=>{
  await getComments(props.commentsId).then(response=>{
    commentsData = ref(response)
  })
  console.log(commentsData) // array(0)
  setTimeout(()=>{
    console.log(commentsData)
    toLoad.value ++
  },350) // array(6) (из 12)
  setTimeout(()=>{
    console.log(commentsData)
    toLoad.value ++
  },450) // array(12)
})
</script>

<template>
  <ul class="comment" :key="toLoad">
    <li v-for="commentData in commentsData" class="comment__block">
      <p class="comment__author">by {{ commentData.by }}</p>
      <p class="comment__text" v-html="commentData.text"></p>
    </li>
  </ul>
</template>

<style scoped lang="scss">
@import "comment";
</style>