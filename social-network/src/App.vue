<script>

// Компоненты
import AppSidebar from './components/AppSidebar.vue';
import {RouterView} from 'vue-router';

// Главная страница
export default {
	components: {
		AppSidebar,
		RouterView,
	}
};


</script>

<template>
	<div class="app">
		<!-- Шапка -->
		<!-- <app-header></app-header> -->

		<div class="container py-3">
			<div class="row">
				<div class="col-3">
					<!-- Левая колонка -->
					<app-sidebar></app-sidebar>
				</div>
				<div class="col-9">
					<!-- Правая колонка -->
					<router-view></router-view>
				</div>
			</div>
			
		</div>
	</div>
</template>

<style>
body {
	background-color: #EDEEF0;
}
</style>
