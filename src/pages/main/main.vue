<script setup>
import {getDate, getPostData, getPostsIdNew} from "@/assets/myFunctions";
import {onMounted, ref} from "vue";
import Loading from "@/components/loading/loading.vue";
import ReloadButton from "@/components/reloadButton/reloadButton.vue";
let postsIdNew = []
let postsData = []
let toLoadKey = ref(0)
let start = 0
let isLoading = ref(false)
function getPostsData(postsId, start = 0, end = start+20) {
  postsId.slice(start, end).forEach((postId, index, array)=>{
    getPostData(postId)
        .then((data)=>{
          postsData.push(data)
          toLoadKey.value++
          if (index === array.length-1) {
            postsData.sort((post1, post2)=>{
              return post1.time < post2.time ? 1 : post1.time > post2.time ? -1 : 0;
            })
            isLoading.value = false
          }
        })
        .catch((error)=>{
          console.log(error)
        })
  })
}
function reShowPosts(postsId, start) {
  postsId.slice(0, start+20).forEach((postId, index, array)=>{
    getPostData(postId)
        .then((data)=>{
          postsData[index] = data
          toLoadKey.value++
          if (index === array.length-1) {
            postsData.sort((post1, post2)=>{
              return post1.time < post2.time ? 1 : post1.time > post2.time ? -1 : 0;
            })
            isLoading.value = false
          }
        })
        .catch((error)=>{
          console.log(error)
        })
  })
}
let options = {
  rootMargin: "120px",
  threshold: .5,
}
let observerCallback = (entries) =>{
  isLoading.value = true
  entries.forEach((entry)=>{
    if (entry.isIntersecting) {
      start+=20
      getPostsData(postsIdNew, start)
    }
  })
}
let observer = new IntersectionObserver(observerCallback, options)

onMounted(()=>{
  getPostsIdNew()
      .then((data)=>{
        postsIdNew = data
        isLoading.value = true
        getPostsData(postsIdNew)
      })
      .catch((error)=>{
        console.log(error)
      })
  observer.observe(document.querySelector("#observer"))
  setInterval(()=>{
    getPostsIdNew()
        .then((data)=>{
          postsIdNew = data
          reShowPosts(postsIdNew, 0)
        })
        .catch((error)=>{
          console.log(error)
        })
  },60*1000)
})
</script>

<template>
  <main class="main">
    <div class="container">
      <div class="reload-block">
        <reload-button
            @click="
            getPostsIdNew()
                .then((data)=>{
                  postsIdNew = data
                  reShowPosts(postsIdNew, 0)
                })
                .catch((error)=>{
                  console.log(error)
                })
            "
        />
        <p>Reload Posts</p>
      </div>
      <ul :key="toLoadKey" class="news">
        <li v-for="postData in postsData" class="news__list">
          <div class="news__title-block">
            <a class="news__title" :href="postData.url">{{ postData.title }}</a>
            <span class="news__author"> by {{ postData.by }}</span>
          </div>
          <router-link
              :to="`/post/${postData.id}`"
              class="news__to-post"
          >{{ getDate(postData.time) }}, Comments: {{ postData.descendants }}, {{ postData.score }} karma</router-link>
        </li>
      </ul>
      <div id="observer" v-if="start<=80 && !isLoading.value"/>
      <loading v-if="isLoading"/>
    </div>
  </main>
</template>

<style scoped lang="scss">
@import "main";
</style>