<script>

// Компоненты
import AppSidebar from './components/AppSidebar.vue';
import { RouterView } from 'vue-router'

// Главная страница
export default {
	components: {
		AppSidebar,
		RouterView
	}
};


</script>

<template>
	<div class="app">
		<!-- Шапка -->
		<div class="py-3">
			<div class="row">
				<div class="col-4">
					<!-- Левая колонка -->
					<app-sidebar></app-sidebar>
				</div>
				<div class="col-8">
					<!-- Правая колонка -->
					<router-view></router-view>
				</div>
			</div>
			
		</div>
	</div>
</template>

<style></style>
