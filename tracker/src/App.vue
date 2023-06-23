<script>

// Компоненты
import AppHeader from './components/AppHeader.vue';
import { RouterView } from 'vue-router'

// Главная страница
export default {
	components: {
		AppHeader,
		RouterView
	}
};


</script>

<template>
	<div class="app">
		<div class="row justify-content-center">
			<div class="col-sm-12 col-md-10 col-lg-6 ">
				<!-- Шапка -->
				<app-header></app-header>

				<!-- Меняющаяся часть -->
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<style></style>
