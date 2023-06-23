<script>
export default {
    methods: {
        goCalendar() {
            this.$router.push({
                name: 'notes'
            });
        },
        goCreate() {
            this.$router.push({
                name: 'create'
            });
        },
        goStats() {
            this.$router.push({
                name: 'stats'
            });
        },
    }
}
</script>
<template>
    <div class="app-header mb-3">
        <button @click="goCalendar" class="btn btn-outline-secondary">
            Записи
        </button>

        <button @click="goCreate" class="btn btn-outline-secondary">
            +
        </button>

        <button @click="goStats" class="btn btn-outline-secondary">
            Статистика
        </button>

    </div>
</template>

<style>
.app-header {
    display: flex;
    gap: 10px;
    justify-content: center;
    padding: 30px 0;

    position: sticky;
    top: 0;
    z-index: 1;
    background-color: white;
    border-bottom: 1px dashed black;
}

.app-header button {
    flex: 1;
}
</style>