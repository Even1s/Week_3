<script setup>
import {onMounted, ref} from "vue";
import {getComments, getDate} from "@/assets/myFunctions.js";
import Loading from "@/components/loading/loading.vue";
import RepliesButton from "@/components/repliesButton/repliesButton.vue";

let props = defineProps({
  commentsId: Array,
})
let toLoadKey = ref(0)
let commentsData = []
onMounted(()=>{
  props.commentsId?.forEach((commentId)=>{
    getComments(commentId)
        .then((data)=>{
          commentsData.push(data)
          toLoadKey.value++
        })
        .catch((error)=>{
          console.log(error)
        })
  })
  setInterval(()=>{
    props.commentsId?.forEach((commentId, index)=>{
      getComments(commentId)
          .then((data)=>{
            commentsData[index] = data
            toLoadKey.value++
          })
          .catch((error)=>{
            console.log(error)
          })
    })
  }, 60*1000)
})
</script>

<template>
  <ul class="comment" :key="toLoadKey">
    <li v-for="commentData in commentsData" class="comment__list">
      <div class="comment__block" v-if="!commentData.deleted">
        <p class="comment__author">by {{commentData.by}}, {{getDate(commentData.time)}}</p>
        <div class="comment__text" v-html="commentData.text"></div>
        <replies-button
            @click="commentData.showComments.value = !commentData.showComments.value;"
            v-if="commentData.kids"
        />
      </div>
      <div v-else class="comment__block">
        <p class="comment__text">DELETED COMMENT</p>
      </div>
      <comment
          v-if="commentData.kids && commentData.showComments.value"
          :commentsId="commentData.kids"
          :key="commentData.id"/>
    </li>
    <loading v-if="toLoadKey === 0 || props.commentsId.length > commentsData.length" />
  </ul>
</template>

<style scoped lang="scss">
@import "comment";
</style>