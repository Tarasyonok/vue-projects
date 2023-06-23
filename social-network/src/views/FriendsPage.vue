<script>
import axios from 'axios';

export default {
    data() {
        return {
            friends: []
        }
    },
    mounted() {
        this.loadFriends();
    },
    methods: {
        async loadFriends() {
            let response = await axios('/users');
            this.friends = response.data;
        },
        goUser(user) {
            this.$router.push({
                name: 'user',
                params: {
                    username: user.username
                }
            })
        }
    }
}
</script>


<template>
    <div class="friends-page">
        <h3>Друзья</h3>

        <ul class="list-group my-3">
            <li @click="goUser(item)" v-for="(item, index) in friends" class="list-group-item friend">
                <img :src="'src/avatars/' + item.avatar">
                <div class="username">
                    {{ item.firstName }} {{ item.lastName }}
                </div>

            </li>
        </ul>
    </div>
</template>


<style>
.friends-page img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    object-position: center;
    border-radius: 100%;
    border: 1px solid #6c757d;
}

.friends-page .friend {
    cursor: pointer;
    height: 100px;

    display: flex;
    gap: 20px;
    align-items: center;
}

.friends-page .username {
    font-weight: bold;
}
</style> 