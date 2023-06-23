<script>
import axios from 'axios';

export default {
    data() {
        return {
            isReady: false,
            question: {},
            player: {},
            gamePoints: 0,
            questionCounter: 0,
            run: true
        }
    },

    mounted() {
        this.nextQuestion();
        this.loadPlayer();
    },

    methods: {
        async nextQuestion() {
            this.isReady = false;
            this.questionCounter++;
            let response = await axios.get('/next-question', {
                params: {
                    user: this.user
                }
            });
            this.question = response.data;
            this.isReady = true;
        },

        async loadPlayer() {
            this.isReady = false;
            let response = await axios.get('/player');
            this.player = response.data;
            this.isReady = true;
        },

        async check(playerAnswer) {
            this.isReady = false;
            if (playerAnswer == this.question.correctAnswer) {
                this.result = 'Правильный ответ!'
                this.gamePoints += 10;
                await axios.post('/add-solved', {
                    id: this.question._id
                });
                
                if (this.questionCounter == 10) {
                    this.gamePoints += 20;
                    await axios.post('/add-points', {
                        points: this.gamePoints
                    });
                    this.run = false;
                } else {
                    this.nextQuestion();
                }
            } else {
                this.result = 'Неправильно.';
                this.gamePoints -= 20;
                if (this.gamePoints < 0) {
                    this.gamePoints = 0;
                }
                await axios.post('/add-points', {
                        points: this.gamePoints
                    });
                this.run = false;
            }
            this.isReady = true;
        },

        async restartGame() {
            this.run = true;
            this.gamePoints = 0;
            this.questionCounter = 0;
            this.nextQuestion();
        }
    }
}
</script>

<template>
    <div v-if="isReady && player && run" class="game-container text-center">
        <header>
            очки за игру: {{ gamePoints }}
            <h1 class="mb-4">{{ question.title }}</h1>
        </header>
        <div class="answers">
            <button @click="check(0)">{{ question.answers[0] }}</button>
            <button @click="check(1)">{{ question.answers[1] }}</button>
        </div>
        <div class="answers">
            <button @click="check(2)">{{ question.answers[2] }}</button>
            <button @click="check(3)">{{ question.answers[3] }}</button>
        </div>
    </div>
    <div v-if="!player">
        <h1 class="text-center mb-4">Зарегистрируйся, чтобы играть!</h1>
        <div class="text-center"><a class="btn btn-primary" href="/profile">Зарегистрироваться</a></div>
    </div>
    <div v-if="!run">
        <div v-if="!run && questionCounter < 10">
            Вы проиграли. Заработано очков: {{ gamePoints }}
        </div>
        <div v-if="!run && questionCounter == 10">
            Вы выиграли. Заработано очков: {{ gamePoints }}
        </div>
        <button @click="restartGame" class="btn btn-primary">Начать заново</button>
    </div>
</template>

<style scoped>
.game-container {
    font-family: 'Cutive Mono', monospace;
}

.answers button {
    width: 400px;
    margin: 15px 70px;
    background: #d7fffd;
    border: 2px solid #8ce8e3;
    padding: 15px;
    font-size: 20px;
    font-family: 'Cutive Mono', monospace;
    cursor: pointer;
    transition: all .3s ease;
}

.answers button:hover {
    background: #8ce8e3;
    border: 2px solid #25c0b9;
}
</style>