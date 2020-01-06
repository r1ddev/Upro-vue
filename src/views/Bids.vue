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


	</div>
</template>

<script>
import Axios from 'axios'
export default {
	methods: {
		async logout () {

			let fd = new FormData()
			let response = await Axios.post(this.$store.state.server + "/logout", { headers: {
				Token: 'Token ' + this.$store.state.userToken
			}})

			console.log(response);
			
			//this.$store.dispatch("removeToken")

			//this.$router.push(this.$store.state.routesLinks.home)
		}
	}
}
</script>

<style lang="less" scoped>
	.account-menu {
		border-top: 1px solid #f93d9f;
		border-bottom: 1px solid #f93d9f;
	}
</style>