<script>
export default {
    methods: {
        goRating() {
            this.$router.push({
                name: 'rating'
            });
        },
        goGame() {
            this.$router.push({
                name: 'game'
            });
        },
        goProfile() {
            this.$router.push({
                name: 'profile'
            });
        },

        goRules() {
            this.$router.push({
                name: 'rules'
            });
        }
    }
}
</script>
<template>
    <div class="menu-container">

        <div class="box">
            <h2>QUIZ</h2>
            <div class="box-buttons" action="">
                <button @click="goGame" type="button">Игра</button>
                <button @click="goRating" type="button">Рейтинг</button>
                <button @click="goProfile" type="button">Профиль</button>
                <button @click="goRules" type="button">Правила</button>
            </div>
        </div>
    </div>
</template>

<style scoped>

.menu-container {
    margin-top: 30px;
    margin-left: 30px;
    margin-right: auto;
    text-align: center;
    font-family: 'Cutive Mono', monospace;
}

.box {
    width: 400px;
    background: #fff;
    padding: 30px;
    margin: 0;
}

.box-buttons {
    display: flex;
    flex-direction: column;
}

.box-buttons input {
    margin-bottom: 15px;
    border: 2px solid #8ce8e3;
    padding: 15px;
    font-size: 20px;
    font-family: 'Cutive Mono', monospace;
}

.box-buttons input:focus {
    outline: none;
    border: 2px solid #25c0b9;
}

.box-buttons button {
    margin-bottom: 15px;
    background: #d7fffd;
    border: 2px solid #8ce8e3;
    padding: 15px;
    font-size: 20px;
    font-family: 'Cutive Mono', monospace;
    cursor: pointer;
    transition: all .3s ease;
}

.box-buttons button:hover {
    background: #8ce8e3;
    border: 2px solid #25c0b9;
}

.box-buttons a {
    color: #25c0b9;
    text-decoration: none;
    transition: all .3s ease;
}

.box-buttons a:hover {
    color: #25c0b9;
}

h2 {
    font-size: 40px;
}</style>