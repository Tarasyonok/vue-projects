import { createRouter, createWebHistory } from 'vue-router'


// Компоненты страниц
import GamePage from './views/GamePage.vue';
import RatingPage from './views/RatingPage.vue';
import RulesPage from './views/RulesPage.vue';
import ProfilePage from './views/ProfilePage.vue';


export default createRouter({
    // История переходов сохраняется
    history: createWebHistory(),


    // Роуты и компоненты
    routes: [
        {
            path: '/',
            name: 'game',
            component: GamePage,
        },
        {
            path: '/rating',
            name: 'rating',
            component: RatingPage
        },
        {
            path: '/rules',
            name: 'rules',
            component: RulesPage
        },
        {
            path: '/profile',
            name: 'profile',
            component: ProfilePage
        },
    ]
})