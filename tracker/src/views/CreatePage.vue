

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
            date: dayjs().format('YYYY-MM-DDTHH:mm')
        }
    },
    mounted() {
        this.loadCategories();
    },
    methods: {
        async loadCategories() {
            this.isReady = false;
            let response = await axios.get('/categories/all');
            this.categories = response.data;
            this.isReady = true;
        },
        async save(evt) {
            evt.preventDefault();
            let date = dayjs(this.date).toISOString();
            await axios.post('/notes/create', {
                text: this.text,
                category: this.category,
                date: date
            });
            this.text = '';
            this.category = '';
            this.date = dayjs().format('YYYY-MM-DDThh:mm');
        }
    }
}
</script>


<template>
    <div class="create-page">
        <h3 class="mb-5">Как вы себя чувствуете?</h3>

        <form v-if="isReady" @submit="save">
            <div class="input-group">
                <span class="input-group-text">Время</span>
                <input v-model="date" type="datetime-local" class="form-control">
            </div>

            <div class="categories-container my-5">
                <label v-for="(item, index) in categories" class="category">
                    <input v-model="category" class="category-input" type="radio" :value="item._id">
                    <div class="category-info">
                        <img :src="'src/assets/' + item.value + '.svg'">
                        {{ item.title }}
                    </div>
                </label>
            </div>

            <div class="note-container">
                <div class="form-floating note-input-container">
                    <textarea v-model="text" class="form-control note-input" placeholder="Заметка" id="note"></textarea>
                    <label for="note">Заметка</label>
                </div>

                <button class="btn btn-outline-secondary" type="submit">
                    Сохранить
                </button>
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

/* Выбранная радиокнопка */
.category .category-input:checked~.category-info {
    scale: 1.4;
}

.categories-container {
    display: flex;
}

.note-container {
    display: flex;
    gap: 10px;
    justify-content: space-between;
}

.note-container .note-input-container {
    flex: 1;
}
</style>