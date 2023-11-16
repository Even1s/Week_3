<script setup>
import { onMounted, ref } from 'vue';
import { getDate, getPostData, getPostsIdNew } from '@/assets/myFunctions';
import TheLoading from '@/components/TheLoading/TheLoading.vue';
import ReloadButton from '@/components/ReloadButton/ReloadButton.vue';
import _ from "lodash";

let postsIdNew = [];
const postsData = [];
const toLoadKey = ref(0);
let start = 0;
const isLoading = ref(false);
function getPostsData(postsId, start = 0, end = start + 20) {
  postsId.slice(start, end).forEach((postId, index, array) => {
    getPostData(postId)
      .then((data) => {
        postsData.push(data);
        toLoadKey.value++;
        if (index === array.length - 1) {
          postsData.sort((post1, post2) => (post1.time < post2.time ? 1 : post1.time > post2.time ? -1 : 0));
          isLoading.value = false;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
}
function rewritePosts(postsId, start) {
  console.log("start rewriting")
  postsId.slice(0, start + 20).forEach((postId, index, array) => {
    getPostData(postId)
      .then((data) => {
        if (!_.isEqual(data, postsData[index])) {
          postsData[index] = data;
          toLoadKey.value++;
        }
        if (index === array.length - 1) {
          postsData.sort((post1, post2) => (post1.time < post2.time ? 1 : post1.time > post2.time ? -1 : 0));
          isLoading.value = false;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
}
const options = {
  rootMargin: '160px',
  threshold: 0.5,
};
const observerCallback = (entries) => {
  isLoading.value = true;
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      start += 20;
      getPostsData(postsIdNew, start);
    }
  });
};
function reloadPosts() {
  getPostsIdNew()
    .then((data) => {
      postsIdNew = data;
      rewritePosts(postsIdNew, 0);
    })
    .catch((error) => {
      console.log(error);
    });
}
const observer = new IntersectionObserver(observerCallback, options);

onMounted(() => {
  getPostsIdNew()
    .then((data) => {
      postsIdNew = data;
      isLoading.value = true;
      getPostsData(postsIdNew);
    })
    .catch((error) => {
      console.log(error);
    });
  observer.observe(document.querySelector('#observer'));
  // setInterval(() => {
  //   reloadPosts();
  // }, 60 * 1000);
});
</script>

<template>
  <main class="main">
    <div class="container">
      <div class="reload-block">
        <ReloadButton @click="reloadPosts()"/>
        <p>Reload Posts</p>
      </div>
      <ul :key="toLoadKey" class="news">
        <li
            v-for="postData in postsData"
            class="news__list"
            :key="postData.id"
        >
          <div class="news__title-block">
            <a class="news__title" :href="postData.url">{{ postData.title }}</a>
            <span class="news__author"> by {{ postData.by }}</span>
          </div>
          <router-link
              :to="`/post/${postData.id}`"
              class="news__to-post"
          >{{ getDate(postData.time) }}, {{ postData.descendants }} comments, {{ postData.score }} karma</router-link>
        </li>
        <TheLoading v-if="isLoading"/>
      </ul>
      <div id="observer" v-if="start<=60 && !isLoading.value"></div>
    </div>
  </main>
</template>

<style scoped lang="scss">
@import "MainPage";
</style>
<style lang="scss">
.main button.reload {
  position: unset;
}
</style>
