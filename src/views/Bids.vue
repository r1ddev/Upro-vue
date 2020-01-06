<template>
	<div class="root">
		<section class="header-menu">
			<div class="container">
				<div class="row justify-content-between">
					<div class="col-auto">
						<div class="row d-flex align-items-center h-100">
							<div class="col-auto">
								<a href="/" class="header-menu-logo"></a>
							</div>
							<div class="col-auto">
								<a href="#" class="header-menu-link">Москва</a>
							</div>
							<div class="col-auto">
								<a href="#" class="header-menu-link">8-999-999-99-99</a>
							</div>
						</div>
					</div>
					<div class="col-auto">
						<div class="row d-flex align-items-center h-100">
							<div class="col-auto">
								<a href="#" class="header-menu-link">Создать заявку</a>
							</div>
							<div class="col-auto">
								<a href="#" class="header-menu-link" @click.prevent="logout()">Выход</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section class="account-menu py-3">
			<div class="container flex-center">
				<a-button>Все заявки</a-button>
				<a-button class="ml-2">Подбор мастеров</a-button>
				<a-button class="ml-2">Мастер выбран</a-button>
				<a-button class="ml-2">Завершенные</a-button>
				<a-button class="ml-2">Отмененные</a-button>
			</div>
		</section>

		<section class="bids-list py-3">
			<div class="container flex-center">
				<div class="bid">
					<div class="row py-2">
						<div class="col d-flex align-items-center">
							Заявка №1 — подбор мастеров
						</div>
						<div class="col text-right">
							<div class="id">123</div>
						</div>
					</div>
					<div class="row">
						<div class="col-6">
							<div class="row py-2">
								<div class="col-8">
									<div class="field">Воронеж</div>
								</div>
								<div class="col-4">
									<div class="field">21.11.2019</div>
								</div>
							</div>
							<div class="row py-2">
								<div class="col-8">
									<div class="field">Мастер по ногтям</div>
								</div>
								<div class="col-4">
									<div class="row">
										<div class="col-6">
											<div class="field">17:10</div>
										</div>
										<div class="col-6">
											<div class="field">19:30</div>
										</div>
									</div>
								</div>
							</div>
							<div class="row py-2">
								<div class="col-12">
									<div class="field-text">Описание задачи мастера</div>
								</div>
							</div>
						</div>

						<div class="col-6 py-2">
							<div class="row h-100">
								<div class="col-6">
									<img src="https://www.google.ru/logos/doodles/2020/holidays-2020-eastern-europe-day-2-6753651837108255-law.gif" alt="" class="image">
								</div>

								<div class="col-6">
									<img src="https://www.google.ru/logos/doodles/2020/holidays-2020-eastern-europe-day-2-6753651837108255-law.gif" alt="" class="image">
								</div>
							</div>
						</div>
					</div>
					<div class="row py-2">
						<div class="col-6">
							<a href="#" class="btn btn-warning">Посмотреть отклики</a>
						</div>
						<div class="col-6 text-right">
							<a href="#" class="btn btn-warning">Отменить заявку</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import Axios from 'axios'
export default {
	methods: {
		async logout () {

			let fd = new FormData()

			try {
				let response = await Axios.post(this.$store.state.server + "/logout", fd, { headers: {
					Authorization: 'Token ' + this.$store.state.userToken
				}})

				if (response.data.status) {
					this.$store.dispatch("removeToken")
					this.$router.push(this.$store.state.routesLinks.home)
				} else {
					this.$message.error('Произошла ошибка сервера. Мы уже знаем о ней и делаем все, чтобы её исправить!')
				}
			} catch (e) {
				switch (e.response.status) {
					case 401:
						this.$store.dispatch("removeToken")
						this.$router.push(this.$store.state.routesLinks.home)
						break;
				
					default:
						this.$message.error('Произошла ошибка сервера. Мы уже знаем о ней и делаем все, чтобы её исправить!')
						break;
				}

			}
			
			
			//this.$store.dispatch("removeToken")

			//this.$router.push(this.$store.state.routesLinks.home)
		}
	},
	async created() {

		try {
			let response = await Axios.get(this.$store.state.server + "/logout", { headers: {
				Authorization: 'Token ' + this.$store.state.userToken
			}})

			switch (e.response.status) {
				case 401:
					this.$store.dispatch("removeToken")
					this.$router.push(this.$store.state.routesLinks.home)
					break;
			
				default:
					this.$message.error('Произошла ошибка сервера. Мы уже знаем о ней и делаем все, чтобы её исправить!')
					break;
			}
		} catch (e) {
			switch (e.response.status) {
				case 401:
					this.$store.dispatch("removeToken")
					this.$router.push(this.$store.state.routesLinks.home)
					break;
			
				default:
					this.$message.error('Произошла ошибка сервера. Мы уже знаем о ней и делаем все, чтобы её исправить!')
					break;
			}

		}
	}
}
</script>

<style lang="less" scoped>
	.account-menu {
		border-top: 1px solid #f93d9f;
		border-bottom: 1px solid #f93d9f;
	}
	.bid {
		width: 100%;
		padding: 7px 15px;
		border: 1px solid #ddd;
		border-radius: 6px;

		.id {
			display: inline-block;
			border: 1px solid #ccc;
			padding: 7px;
			border-radius: 4px;
		}

		.field {
			padding: 7px 15px;
			border: 1px solid #ddd;
			border-radius: 6px;
		}

		.field-text {
			.field();
			height: 100px;
		}

		.image {
			width: 100%;
			border: 1px solid #ddd;
			border-radius: 6px;
			height: 100%;
			object-fit: contain;
		}
	}
	
</style>