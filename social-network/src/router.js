import { createRouter, createWebHistory } from 'vue-router'
import UserPage from './views/UserPage.vue';
import FriendsPage from './views/FriendsPage.vue';
import FeedPage from './views/FeedPage.vue';

export default createRouter({
    // История переходов сохраняется
    history: createWebHistory(),


    // Роуты и компоненты
    routes: [
        {
            path: '/',
            name: 'profile',
            component: UserPage
        },
        {
            path: '/friends',
            name: 'friends',
            component: FriendsPage
        },
        {
            path: '/user/:username',
            name: 'user',
            component: UserPage
        },
        {
            path: '/feed',
            name: 'feed',
            component: FeedPage
        }, 
    ]
})