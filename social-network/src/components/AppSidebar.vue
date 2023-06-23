<script>

export default {
    mounted() {

    },
    methods: {
        goProfile(){
            this.$router.push({
                name: 'profile'
            })
        },
        goFriends(){
            this.$router.push({
                name: 'friends'
            })
        },
        goFeed(){
            this.$router.push({
                name: 'feed'
            })
        },
    }
}
</script>

<template>
    <div class="app-sidebar">
        <ul>
            <li>
                <button class="btn btn-outline-secondary btn-logo">
                    <img src="../assets/logo.png" alt="">
                    В ШП
                </button>
            </li>
            <li>
                <button @click="goProfile" class="btn btn-outline-secondary">
                    Моя страница
                </button>
            </li>
            <li>
                <button @click="goFriends" class="btn btn-outline-secondary">
                    Друзья
                </button>
            </li>
            <li>
                <button @click="goFeed" class="btn btn-outline-secondary">
                    Новости
                </button>
            </li>
        </ul>
    </div>
</template>

<style>
.app-sidebar ul {
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;

}

.app-sidebar li {
    list-style-type: none;
    width: 100%;
}

.app-sidebar button {
    width: 100%;
}

.app-sidebar .btn-logo {
    font-size: 50px;
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
}

.app-sidebar .btn-logo img {
    width: 50px;
}

</style>