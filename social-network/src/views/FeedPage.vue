<script>
import axios from 'axios';
import dayjs from 'dayjs';

export default {
    data() {
        return {
            feed: []
        }
    },
    mounted() {
        this.loadFeed();
    },
    methods: {
        async loadFeed() {
            let response = await axios('/feed');
            this.feed = response.data;
        },
        getRelativeDate(date) {
            let day = dayjs(date);
            return day.fromNow();
        }
    }
}
</script>


<template>
    <div class="feed-page">
        <h3>Новости</h3>
        <article v-for="(item, index) in feed" class="card mt-3">
            <div class="card-body">
                <header class="post-header">
                    <div class="post-author">
                        <img :src="'src/avatars/' + item.author.avatar">
                        <div class="username">
                            {{ item.author.firstName }} {{ item.author.lastName }}
                        </div>
                    </div>
                    <div class="user-post-time">
                        {{ getRelativeDate(item.createdAt) }}
                    </div>
                </header>
                <p class="card-text">
                    {{ item.content }}
                </p>
            </div>
        </article>
    </div>
</template>


<style>
.feed-page img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    object-position: center;
}

.post-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.post-author {
    display: flex;
    align-items: center;
    gap: 10px;
}

</style>