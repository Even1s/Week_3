<script setup>
import { onMounted, ref } from 'vue';
import { getComments, getDate } from '@/assets/myFunctions.js';
import TheLoading from '@/components/TheLoading/TheLoading.vue';
import RepliesButton from '@/components/RepliesButton/RepliesButton.vue';

const props = defineProps({
  commentsId: Array,
});
const toLoadKey = ref(0);
const commentsData = [];
onMounted(() => {
  props.commentsId?.forEach((commentId) => {
    getComments(commentId)
      .then((data) => {
        commentsData.push(data);
        toLoadKey.value++;
      })
      .catch((error) => {
        console.log(error);
      });
  });
  setInterval(() => {
    props.commentsId?.forEach((commentId, index) => {
      getComments(commentId)
        .then((data) => {
          commentsData[index] = data;
          toLoadKey.value++;
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }, 60 * 1000);
});
</script>

<template>
  <ul class="comment" :key="toLoadKey">
    <li
        v-for="commentData in commentsData"
        class="comment__list"
        :key="commentData.id"
    >
      <div class="comment__block" v-if="!commentData.deleted">
        <p class="comment__author">by {{ commentData.by }}, {{ getDate(commentData.time) }}</p>
        <div class="comment__text" v-html="commentData.text"></div>
        <RepliesButton
            @click="commentData.showComments.value = !commentData.showComments.value;"
            v-if="commentData.kids"
        />
      </div>
      <div v-else class="comment__block">
        <p class="comment__text">DELETED COMMENT</p>
      </div>
      <PostComment
          v-if="commentData.kids && commentData.showComments.value"
          :commentsId="commentData.kids"
          :key="commentData.id"/>
    </li>
    <TheLoading v-if="toLoadKey === 0 || props.commentsId.length > commentsData.length"/>
  </ul>
</template>

<style scoped lang="scss">
@import "PostComment";
</style>
