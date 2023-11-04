import { createRouter, createWebHistory } from 'vue-router'
import mainPage from '@/pages/main/main.vue'
import postPage from '@/pages/post/post.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'main',
            component: mainPage
        },
        {
            path: '/post/:postId',
            name: 'post',
            component: postPage
        }
    ]
})

export default router