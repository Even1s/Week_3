import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'main',
            component: ()=> import('@/pages/MainPage/MainPage.vue')
        },
        {
            path: '/post/:postId',
            name: 'post',
            component: ()=> import('@/pages/PostPage/PostPage.vue')
        }
    ]
})

export default router