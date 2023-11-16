<script setup>
import { useRoute } from 'vue-router';
import { computed, onMounted, ref, watch } from 'vue';
import _ from 'lodash';
import TheLoading from '@/components/TheLoading/TheLoading.vue';
import PostComment from '@/components/PostComment/PostComment.vue';
import ReloadButton from '@/components/ReloadButton/ReloadButton.vue';
import { getDate, getPostData } from '@/assets/myFunctions.js';

const route = useRoute();
const link = computed(() => route.params.postId);
let postData;
const isLoaded = ref(false);

onMounted(() => {
  getPostData(route.params.postId)
    .then((data) => {
      postData = data;
      isLoaded.value = true;
    })
    .catch((error) => {
      console.log(error);
      isLoaded.value = false;
    });
  setInterval(() => {
    getPostData(route.params.postId)
      .then((data) => {
        if (!_.isEqual(data, postData)) {
          postData = data;
          isLoaded.value = true;
        }
      })
      .catch((error) => {
        console.log(error);
        isLoaded.value = false;
      });
  }, 60 * 1000);
});
function reloadPost(postId) {
  isLoaded.value = false;
  getPostData(postId)
    .then((data) => {
      postData = data;
      isLoaded.value = true;
    })
    .catch((error) => {
      console.log(error);
      isLoaded.value = false;
    });
}
watch(link, (newValue) => {
  reloadPost(newValue);
});
</script>

<template>
  <main class="post">
    <div class="container">
      <TheLoading v-if="!isLoaded"/>
      <div v-else class="post__main-block">
        <a class="post__title" :href="postData.url">{{ postData.title }}</a>
        <span class="post__author"> by {{ postData.by }}</span>
        <p class="post__data">{{ getDate(postData.time) }}, {{ postData.descendants }} comments, {{ postData.score }} karma</p>
        <ReloadButton
            @click="reloadPost(link)"
            :isSlot="false"
        />
      </div>
      <div class="post__comments-block" v-if="isLoaded && postData.kids">
        <PostComment :commentsId="postData.kids"/>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
@import "PostPage";
</style>
