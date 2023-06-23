<script>
import axios from 'axios';
import dayjs from 'dayjs';

export default {
    data() {
        return {
            isReady: false,
            notes: []
        }
    },
    mounted() {
        this.loadNotes();
    },
    methods: {
        async loadNotes() {
            this.isReady = false;
            let response = await axios.get('/notes/all');
            this.notes = response.data;
            this.isReady = true;
        },

        formatDate(date) {
            let d = dayjs(date);
            return d.format('dddd, DD MMMM HH:mm')
        }
    }
}
</script>

<template>
    <div class="calendar-page">
        <div v-for="(item, index) in notes" class="card my-3">
            <div class="card-body">
                <img :src="'/src/assets/' + item.category.value + '.svg'">

                <div>
                    <div class="note-title">
                        {{ item.category.title }}
                    </div>
                    <div class="note-date">
                        {{ formatDate(item.date) }}
                    </div>
                    <p class="note-text">
                        {{ item.text }}
                    </p>
                </div>
            </div>

        </div>
    </div>
</template>


<style>
.calendar-page .card-body {
    display: flex;
    gap: 40px;
    align-items: flex-start;
}

.calendar-page img {
    width: 100px;
}

.calendar-page .note-title {
    font-weight: bold;
    text-transform: uppercase;
    font-size: 24px;
    ;
}

.calendar-page .note-date {
    text-transform: lowercase;
    color: #6c757d;
}

.calendar-page .note-text {
    margin-top: 10px;
}
</style>