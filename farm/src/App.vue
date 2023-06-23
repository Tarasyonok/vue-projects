<script>

import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3005';

import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.locale('ru');
dayjs.extend(relativeTime)

// Код компонента
export default {
	data() {
		return {
			shop: [],
			gold: 0,
			plantIndex: 0,
			count: 1,
			plants: [],
		}
	},

	mounted() {
		this.loadShop();
		this.loadUser();
		this.loadGarden();
		setInterval(() => {
			this.loadShop();
			this.loadGarden();
		}, 2000)
	},

	methods: {
		getPrice() {
			let plant = this.shop[this.plantIndex];

			if (plant) {
				return plant.buyPrice * this.count;
			}
			return 0;
		},

		async loadShop() {
			let response = await axios.get('/shop');
			this.shop = response.data;
		},

		async loadUser() {
			let response = await axios.get('/user');
			let user = response.data;

			this.gold = user.gold;
		},

		async buy(evt) {
			evt.preventDefault();
			await axios.post('/shop/buy', {
				count: this.count,
				title: this.shop[this.plantIndex].title,
			});
			this.loadGarden();
			this.loadUser();
		},

		async loadGarden() {
			let response = await axios.get('/garden');
			this.plants = response.data;
		},

		getTimeToHarvest(plant) {
			let harvestTime = dayjs(plant.timeToHarvest);
			if (dayjs() >= harvestTime) {
				return 'Готово!'
			}
			return dayjs().to(harvestTime);
		},

		async harvest(id) {
			await axios.post('/garden/harvest', {
				id: id
			});
			this.loadGarden();
			this.loadUser();
		},

		async harvestAll() {
			for (let i = 0; i < this.plants.length; i++) {
				let plant = this.plants[i]
				axios.post('/garden/harvest', {
					id: plant._id
				});
			}
			this.loadGarden();
			this.loadUser();


		},
	}
};
</script>

<template>
	<div class="app">
		<div class="container my-3">

			<!-- Форма покупки растения -->
			<form @submit="buy" class="shop">
				<div class="row top-row">
					<div class="col">
						<!-- Магазин -->
						<div class="shop-plants">
							<!-- Растение -->
							<label class="shop-item" v-for="(item, index) in shop">
								<img :src="'src/assets/' + item.image + '.png'">
								<p>{{ item.title }}</p>
								<p>$ {{ item.buyPrice }} / {{ item.harvestPrice }}</p>
								<input v-model="plantIndex" :value="index" type="radio">
							</label>
						</div>
					</div>
					<div class="col">
						<div class="shop-form">
							<!-- Количество -->
							<div class="shop-info-row">
								<div class="shop-info-left">
									<label for="count" class="form-label">Количество:</label>
								</div>
								<div class="shop-info-right">
									<input min="1" v-model="count" type="number" id="count"
										class="form-control count-input">
								</div>
							</div>
							<div class="shop-info-row">
								<div class="shop-info-left">
									Итого:
								</div>
								<div class="shop-info-right">
									$ {{ getPrice() }}
								</div>
							</div>

							<div class="shop-info-row">
								<div class="shop-info-left">
									Ваш баланс:
								</div>
								<div class="shop-info-right">
									$ {{ gold }}
								</div>
							</div>

							<div class="shop-info-row">
								<div class="shop-info-left">
								</div>
								<div class="shop-info-right">
									<button type="submit" class="btn btn-primary mb-3">
										Посадить
									</button>

								</div>
								<!-- <button @click="harvestAll" type="submit" class="btn btn-primary">
									Собрать всё
								</button> -->
							</div>
						</div>
					</div>
				</div>
			</form>


			<!-- Огород с растениями -->
			<div class="garden">
				<!-- Растение в огороде -->
				<div @click="harvestAll()" v-for="(item, index) in plants" class="garden-plant">
					<img :src="'src/assets/' + item.image + '.png'">
					<p>{{ getTimeToHarvest(item) }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
.shop {
	border: 4px solid black;
	padding: 10px;
}

.top-row {
	padding: 20px;
}

.shop-info-row {
	display: flex;
	align-items: center;
	font-size: 20px;
	gap: 20px;
	height: 40px;
	margin: 20px;
}

.shop-info-left {
	width: 120px;
	text-align: right;
}

.shop-info-right {
	width: 100px;
}

.total {
	font-size: 20px;
	height: 40px;
	display: flex;
	align-items: center;
}

.count-input {
	font-size: 20px;
}

.btn-primary {
	font-size: 20px;
}

.user-info {
	font-size: 30px;
	padding-left: 40px;
	padding-right: 10px;
	text-align: right;
}

.shop-plants {
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
}

.shop-item {
	width: 150px;
	padding: 20px;
	text-align: center;
}

.shop-item img {
	width: 100%;
}


.garden {
	border: 4px solid black;
	padding: 20px;
	display: flex;
	flex-wrap: wrap;
	background-image: url('src/assets/background.jpg');
	background-size: cover;
	min-height: 300px;
}

.garden-plant {
	width: 150px;
	padding: 20px;
	text-align: center;
	color: white;
}

.garden-plant img {
	width: 100%;
}
</style>
