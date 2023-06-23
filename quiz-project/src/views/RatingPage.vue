<script>
import axios from 'axios';

export default {
    data() {
        return {
            isReady: false,
            users: [],
            player: {},
        }
    },
    mounted() {
        this.loadUsers();
        this.loadPlayer();
    },
    methods: {
        async loadUsers() {
            this.isReady = false;
            let response = await axios.get('/users/all');
            this.users = response.data;
            this.isReady = true;
        },

        async loadPlayer() {
            this.isReady = false;
            let response = await axios.get('/player');
            this.player = response.data;
            this.isReady = true;
        },
    }
}
</script>
<template>
    <div v-if="isReady" class="rating-container">
        <h2 class="text-center">Рейтинг</h2>


        <div v-for="(item, index) in users" :class="{ 'me': item._id == player._id }" class="card mb-3 d-flex" style="max-width: 740px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img :src="item.avatar" width="150" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">Место: {{ index + 1 }}</h5>
                        <p class="card-text">{{ item.name }}</p>
                        <p class="card-text" style="font-size: 20px;">Очки: {{ item.commonPoints }}</p>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped>
.rating-container {
    ;
    font-family: 'Cutive Mono', monospace;
}

.card {
    margin: auto
}

.me {
    background-color: orange !important;
    border: 2px solid rgb(197, 128, 0);
    transform: scale(1.05);
}
</style>