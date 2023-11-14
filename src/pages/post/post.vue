<script setup>
import { useRoute } from "vue-router";
import {computed, onMounted, ref, watch} from "vue";
import loading from '@/components/loading/loading.vue'
import comment from "@/components/comment/comment.vue";
import { getDate, getPostData } from "@/assets/myFunctions.js";
import _ from "lodash";
import ReloadButton from "@/components/reloadButton/reloadButton.vue";

const route = useRoute()
const link = computed(()=> route.params.postId)
let postData
let isLoaded = ref(false)

onMounted(()=>{
  getPostData(route.params.postId)
      .then((data)=>{
        postData = data
        isLoaded.value = true
      })
      .catch((error)=>{
        console.log(error)
        isLoaded.value = false
      })
  setInterval(()=>{
    getPostData(route.params.postId)
        .then((data)=>{
          if (!_.isEqual(data, postData)) {
            postData = data
            isLoaded.value = true
          }
        })
        .catch((error)=>{
          console.log(error)
          isLoaded.value = false
        })
  }, 60*1000)
})
function reloadPost(postId) {
  isLoaded.value = false
  getPostData(postId)
      .then((data)=>{
        postData = data
        isLoaded.value = true
      })
      .catch((error)=>{
        console.log(error)
        isLoaded.value = false
      })
}
watch(link,(newValue)=>{
  reloadPost(newValue)
})
</script>

<template>
  <main class="post">
    <div class="container">
      <loading v-if="!isLoaded"/>
      <div v-else class="post__main-block">
        <a class="post__title" :href="postData.url">{{ postData.title }} <span class="post__author">by {{ postData.by }}</span></a>
        <p class="post__date">Date: {{ getDate(postData.time) }}</p>
        <p class="post__comments-count">Comments: {{ postData.descendants }}</p>
        <reload-button @click="reloadPost(link)"/>
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