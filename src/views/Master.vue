<template>
	<div class="master">
		<HomeHeader page="master" />

		<NewResponseModal :visible="NewResponseModalVisible" @cancel="NewResponseModalVisible = false" />

		<AccountTemplate
			:sideLinks="[
				{label:'Заявки', href: this.$store.state.routesLinks.master, active: true},
				{label:'Профиль', href: this.$store.state.routesLinks.masterProfile}
			]"
		>
			<template v-slot:account-menu>
				<div class="row flex-center">
					<div class="col-auto px-0">
						<button class="btn yp-btn yp-btn-menu mt-3">Новые</button>
					</div>
					<div class="col-auto px-0">
						<button class="btn yp-btn yp-btn-menu ml-2 mt-3">Обработанные</button>
					</div>
					<div class="col-auto px-0">
						<button class="btn yp-btn yp-btn-menu ml-2 mt-3">Вас выбрали</button>
					</div>
					<div class="col-auto px-0">
						<button class="btn yp-btn yp-btn-menu ml-2 mt-3">Завершенные</button>
					</div>
					<div class="col-auto px-0">
						<button class="btn yp-btn yp-btn-menu ml-2 mt-3">Упущенные</button>
					</div>
					<div class="col-auto px-0">
						<button class="btn yp-btn yp-btn-menu ml-2 mt-3">Отмененные</button>
					</div>
				</div>
			</template>

			<template v-slot:account-content>
				<section class="bids-list">
					<div class="container" v-loading="isLoading">
						<div class="bid my-3">
							<div class="row py-3">
								<div class="col d-flex align-items-center">
									<span>
										<u>Заявка №123</u> — Вас выбрали 
									</span>
								</div>
								<div class="col text-right">
									<div class="id d-none">123</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-7">
									<div class="row">
										<div class="col-lg-7 py-2">
											<div class="field">Воронеж</div>
										</div>
										<div class="col-lg-5 py-2">
											<div class="field text-center">21.02.2020</div>
										</div>
									</div>
									<div class="row">
										<div class="col-lg-7 py-2">
											<div class="field">Мастер по ногтям</div>
										</div>
										<div class="col-lg-5 py-2">
											<div class="field field-time">17:00 - 19:30</div>
										</div>
									</div>
									<div class="row py-2">
										<div class="col-12">
											<div class="field-text">Описание задачи мастера</div>
										</div>
									</div>
								</div>

								<div class="col-md-5 py-2">
									<div class="row h-100">
										<div class="col-6" >
											<img
												src="https://www.google.ru/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
												alt
												class="image"
											/>
										</div>
									</div>
								</div>
							</div>
							<div class="divider py-3">
								Ваш отклик:
							</div>
							<div class="flex-center response">
								<div class="content">
									<div class="row">
										<div class="col-md-3">
											<div class="d-flex flex-column h-100">
												<div class="flex-grow-1">
													<div class="field field-time">1000р</div>
												</div>
												<div class="flex-grow-1 time-wrap">
													<div class="field field-time">17:10 - 19:30</div>
												</div>
											</div>
										</div>
										<div class="col-md-9">
											<div class="field-text">Отклик - Комментарий Мастера</div>
										</div>
									</div>
									<div class="row justify-content-center">
										<div class="col-md flex-center">
											<a href="#" class="btn yp-btn yp-btn-fill mt-4">Завершить</a>
										</div>
										<div class="col-md flex-center">
											<a href="#" class="btn yp-btn yp-btn-fill mt-4">Отказаться</a>
										</div>
										<div class="col-md flex-center">
											<a href="#" class="btn yp-btn yp-btn-fill mt-4">Клиент не приехал</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</template>
		</AccountTemplate>

		<!-- <section class="account">
			<section class="menu">
				<router-link :to="this.$store.state.routesLinks.master" class="active">Заявки</router-link>
				<router-link :to="this.$store.state.routesLinks.masterProfile">Профиль</router-link>
			</section>
			<section class="account-menu pb-3">
				<div class="container"></div>
			</section>

			<section class="bids-list py-3">
				<div class="container flex-center"></div>
			</section>
		</section>-->

		<HomeFooter style="border-top: 1px solid #B2B2B2;" />
	</div>
</template>

<script>
import api from "../classes/api";
import HomeFooter from "../components/HomeFooter";
import AccountTemplate from "../components/AccountTemplate";
import HomeHeader from "../components/HomeHeader";
import NewResponseModal from "../components/NewResponseModal";

export default {
	components: {
		NewResponseModal,
		HomeHeader,
		AccountTemplate,
		HomeFooter
	},
	data: function() {
		return {
			NewResponseModalVisible: false,
			isLoading: false
		};
	},
	methods: {
		async logout() {
			try {
				let response = await api.account.logout();
				console.log(response);

				// let fd = new FormData()
				// let response = await Axios.post(this.$store.state.server + "/logout", fd, { headers: {
				// 	Authorization: 'Token ' + this.$store.state.userToken
				// }})

				if (response.status) {
					this.$store.dispatch("removeToken");
					this.$router.push(this.$store.state.routesLinks.home);
				} else {
					this.$message.error(
						"Произошла ошибка сервера. Мы уже знаем о ней и делаем все, чтобы её исправить!"
					);
				}
			} catch (e) {
				switch (e.response.status) {
					case 401:
						this.$store.dispatch("removeToken");
						this.$router.push(this.$store.state.routesLinks.home);
						break;

					default:
						this.$message.error(
							"Произошла ошибка сервера. Мы уже знаем о ней и делаем все, чтобы её исправить!"
						);
						break;
				}
			}

			this.$store.dispatch("removeToken");

			this.$router.push(this.$store.state.routesLinks.home);
		}
	},
	async created() {
		api.account
			.getLoginStatus()
			.then(response => {})
			.catch(e => {
				api.errorHandler(e, this, {
					401: () => {
						this.$store.dispatch("removeToken");
						this.$router.push(this.$store.state.routesLinks.home);
					}
				});
			});
	}
};
</script>

<style lang="less" scoped>
.yp-btn {
	transition: 0.2s;

	&:hover {
		opacity: 0.8;
	}

	&:active {
		filter: brightness(0.8);
	}
}

.yp-btn-menu {
	border: none;
	padding: 10px 20px;
	background: #ffffff;
	box-shadow: 0px 2px4px rgba(100, 100, 100, 0.5);
	border-radius: 6px;
	border: 2px solid #ffffff;

	&.active {
		border: 2px solid #ffffff;
	}
}

.account-menu {
	.container {
		padding: 0 150px;
	}

	// .ant-btn {
	// 	margin-top: 1rem !important;
	// 	border: 2px solid #e9378d;
	// 	padding: 10px 25px;
	// 	border-radius: 6px;
	// }
}

.master {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
}

.bids-list {
	.container {
		padding: 0 150px;
	}

	.bid {
		box-shadow: 0px 2px4px rgba(100, 100, 100, 0.5);

		width: 100%;
		padding: 7px 25px;
		border-radius: 18px;
		background: #fff;

		.id {
			display: inline-block;
			border: 1px solid #ccc;
			padding: 7px;
			border-radius: 4px;
		}

		.client-result {
			color: #e9378d;
			font-size: 14px;
			font-weight: 700;
		}

		.field {
			border: solid 1px #e9378d;
			box-shadow: 0px 1px 4px -1px rgba(100, 100, 100, 0.5);
			padding: 10px 15px;
			border-radius: 6px;
		}

		.field-text {
			.field();
			height: 100px;
		}

		.field-time {
			padding: 7px 0px;
			text-align: center;
		}

		.image {
			.field();
			width: 100%;
			height: 100%;
			object-fit: contain;
		}

		.divider {
			position: relative;
			display: flex;
			align-items: center;
			color: #4f4f4e;
			font-size: 17px;
			text-decoration: underline;

			&::after {
				content: "";
				border-top: 1px solid #e9378d;
				display: flex;
				flex-grow: 1;
				margin-left: 14px;
			}
		}

		.response {
			.content {
				width: 75%;

				.time-wrap {
					display: flex;
					flex-direction: column;
					justify-content: flex-end;
				}
			}
		}
	}
}

@media screen and (max-width: 767px) {
	.field-text {
		margin-top: 1rem;
	}
}

@media screen and (max-width: 991px) {
	.account {
		.container {
			padding: 0 15px;
		}

		.menu {
			display: none;
		}
		.bids-list {
			.bid {
				.yp-btn-fill {
					width: 100%;
				}

				.response {
					.content {
						// width: 100%;

						.time-wrap {
							padding-top: 1rem;
						}

						.field-text {
							// margin-top: 1rem;
						}
					}
				}
			}

			.container {
				padding: 0 15px;
			}
		}
	}
}

@media screen and (max-width: 1199px) {
	.account {
		.bids-list {
			.bid {
				.response {
					.content {
						width: 100%;
					}
				}
			}
		}
	}
}

@media (min-width: 1350px) {
	.container {
		max-width: 1300px;
	}
}
</style>