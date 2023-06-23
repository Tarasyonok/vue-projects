

<script>
import axios from 'axios';
import dayjs from 'dayjs';

export default {
    data() {
        return {
            isReady: false,
            categories: [],
            category: '',
            text: '',
            date: dayjs().format('YYYY-MM-DDThh:mm')
        }
    },
    mounted() {
        this.loadCategories();
    },
    methods: {
        async loadCategories() {
            this.isReady = false;
            let response = await axios.get('/stats');
            this.categories = response.data;
            this.isReady = true;
        }
    }
}
</script>


<template>
    <div class="create-page">
        <h3 class="mb-5">Сводка</h3>

        <form v-if="isReady" @submit="save">

            <div class="categories-container my-5">
                <label v-for="(item, index) in categories" class="category">
                    <!-- <input v-model="category" class="category-input" type="radio" :value="item._id"> -->
                    <span class="stats">{{ item.stats }}</span>
                    <div class="category-info">
                        <img :src="'src/assets/' + item.value + '.svg'">
                        {{ item.title }}
                    </div>
                    
                </label>
            </div>


        </form>
    </div>
</template>


<style>
.create-page h3 {
    text-align: center;
}

.create-page .category {
    display: flex;
    flex-direction: column;
    width: 20%;
    align-items: center;
    justify-content: center;
}

.category {
    position: relative;
}

.category img {
    width: 60%;
}

.category-input {
    display: none;
}

.category-info {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    justify-content: center;
    padding: 10px;

    transition: scale 300ms;
} 

.stats {
    margin-bottom: 50px;
    font-size: 40px;
}
</style>