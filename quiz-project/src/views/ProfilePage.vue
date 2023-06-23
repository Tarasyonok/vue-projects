<script>
import axios from 'axios';
import dayjs from 'dayjs'

export default {
    data() {
        return {
            user: {},
            isReady: false,
            name: '',
            avatar: '',
            result: '',
            loaded: false,
            time: dayjs()
        }
    },
    mounted() {
        this.loadPlayer();
        setInterval(() => {
            this.daysInGame();
        });
    },
    methods: {
        async loadPlayer() {
            this.isReady = false;
            let response = await axios.get('/player');
            if (!response.data) {
                this.user = {
                    name: '',
                    avatar: 'https://cdn-icons-png.flaticon.com/256/5269/5269096.png',
                    commonPoints: 0,
                    age: 1,
                    rank: 'Bronze',
                    solved: []
                }


            } else {
                this.user = response.data;
                this.loaded = true;
            }

            this.name = this.user.name;
            this.avatar = this.user.avatar;
            this.isReady = true;
        },
        async updatePlayer(evt) {
            evt.preventDefault();
            await axios.post('/update-player', {
                name: this.name,
                avatar: this.avatar
            });
            this.result = 'Данные сохранены'
            this.loadPlayer();
        },

        daysInGame() {
            let createdDate = dayjs(this.user.createdAt);
            this.time = createdDate.fromNow();
        }
    }
}

</script>

<template>
    <form @submit="updatePlayer" v-if="isReady" class="profile-container">
        <h1 class="text-center mb-4">Профиль</h1>
        <div class="row">
            <div class="col-3">Имя:</div>
            <input v-model="name" class="col-4" type="text" required>
        </div>
        <div class="row">
            <div class="col-3">Аватар (ссылка на изображение):</div>
            <input v-model="avatar" class="col-4" type="text">
        </div>
        <div v-if="loaded">
            <div class="row">
                <div class="col-3">Набрано очков:</div>
                <span class="col-4">{{ user.commonPoints }}</span>
            </div>
            <div class="row">
                <div class="col-3">Решено задач:</div>
                <span class="col-4">{{ user.solved.length }}</span>
            </div>
            <div class="row">
                <div class="col-3">Аккаунт зарегистрирован:</div>
                <span class="col-4">{{ time }}</span>
            </div>
        </div>
        <p class="text-center mt-4"><button type="submit">Сохранить</button></p>
        <p class="text-center" v-if="result">{{ result }}</p>
    </form>
</template>

<style scoped>
.profile-container {
    margin-left: -100px;
    font-family: 'Cutive Mono', monospace;
}

.row div {
    font-size: 20px;
    text-align: end;
}

input {
    margin-left: -150px;
    border: 2px solid #8ce8e3;
    padding: 15px;
    font-size: 20px;
    text-align: center;
    font-family: 'Cutive Mono', monospace;
}

input:focus {
    outline: none;
    border: 2px solid #25c0b9;
}

button {
    margin-bottom: 15px;
    background: #d7fffd;
    border: 2px solid #8ce8e3;
    padding: 15px;
    font-size: 20px;
    font-family: 'Cutive Mono', monospace;
    cursor: pointer;
    transition: all .3s ease;
}

button:hover {
    background: #8ce8e3;
    border: 2px solid #25c0b9;
}

.row {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
}

.row span {
    text-align: center;
    margin-left: -150px;
    border: 2px solid #8ce8e3;
    padding: 15px;
    font-size: 20px;
}
</style>