import { createRouter, createWebHistory } from 'vue-router'
import mainPage from '@/pages/main/main.vue'
import newsPage from '@/pages/news/news.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'main',
            component: mainPage
        },
        {
            path: '/news',
            name: 'news',
            component: newsPage
        }
    ]
})

export default router