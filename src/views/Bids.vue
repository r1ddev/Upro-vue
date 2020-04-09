<template>
	<div class="bids">
		<HomeHeader page="bids" />

		<NewBidModal
			:visible="newBidModalVisible"
			@cancel="newBidModalVisible = false"
			@orderComlete="orderComlete($event)"
		/>

		<a-modal
			:closable="true"
			:visible="dialogBidImage.visible"
			:footer="null"
			@cancel="() => dialogBidImage.visible = false"
		>
			<el-carousel ref="carousel" trigger="click" indicator-position="outside" :autoplay="false">
				<el-carousel-item v-for="(image, index) in getOrderImages" :key="index">
					<img :src="image.image" alt />
				</el-carousel-item>
			</el-carousel>
		</a-modal>

		<AccountTemplate
			:sideLinks="[
				{label:'Заявки', href: this.$store.state.routesLinks.bids, active: true},
				{label:'Профиль', href: this.$store.state.routesLinks.bids}
			]"
		>
			<template v-slot:account-menu>
				<div class="row flex-center">
					<div class="col-auto px-0">
						<button class="btn yp-btn yp-btn-menu active mt-3">Все заявки</button>
					</div>
					<div class="col-auto px-0">
						<button class="btn yp-btn yp-btn-menu ml-2 mt-3">Подбор мастеров</button>
					</div>
					<div class="col-auto px-0">
						<button class="btn yp-btn yp-btn-menu ml-2 mt-3">Мастер выбран</button>
					</div>
					<div class="col-auto px-0">
						<button class="btn yp-btn yp-btn-menu ml-2 mt-3">Завершенные</button>
					</div>
					<div class="col-auto px-0">
						<button class="btn yp-btn yp-btn-menu ml-2 mt-3">Отмененные</button>
					</div>
				</div>
			</template>

			<template v-slot:account-content>
				<section class="bids-list">
					<div class="container" v-loading="isLoading">
						<div class="bid my-3" v-for="order in getPageOrders" :key="order.id">
							<div class="row py-3">
								<div class="col d-flex align-items-center">
									<span>
										<u>Заявка №{{ order.id }}</u> — подбор мастеров
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
											<div class="field">{{ order.city.name }}</div>
										</div>
										<div class="col-lg-5 py-2">
											<div class="field text-center">{{ toDate(order.request_date_from) }}</div>
										</div>
									</div>
									<div class="row">
										<div class="col-lg-7 py-2">
											<div class="field">{{ order.master_type.name }}</div>
										</div>
										<div class="col-lg-5 py-2">
											<div class="row">
												<div class="col-6">
													<div class="field field-time">{{ toTime(order.request_date_from) }}</div>
												</div>
												<div class="col-6">
													<div class="field field-time">{{ toTime(order.request_date_to) }}</div>
												</div>
											</div>
										</div>
									</div>
									<div class="row py-2">
										<div class="col-12">
											<div class="field-text">{{ order.description }}</div>
										</div>
									</div>
								</div>

								<div class="col-md-5 py-2">
									<div class="row h-100">
										<div class="col-6" v-for="(image, index) in order.images" :key="index">
											<!-- <img :src="image.image_thumb" alt class="image" /> -->
											<img
												@click="openImageViewer(order.id, index)"
												src="https://www.google.ru/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
												alt
												class="image"
											/>
										</div>
									</div>
								</div>
							</div>
							<div class="row py-2 buttons">
								<div class="col-7">
									<a href="#" class="btn yp-btn yp-btn-fill">Посмотреть отклики</a>
								</div>
								<div class="col-5 text-right">
									<a href="#" class="btn yp-btn yp-btn-fill h-100 flex-center">Отменить заявку</a>
								</div>
							</div>
						</div>

						<div class="pagination flex-center">
							<el-pagination
								background
								layout="prev, pager, next"
								:total="orders.length"
								:page-count="pagination.itemsOnPage"
								@current-change="currentchange"
							/>
						</div>
					</div>
				</section>
			</template>
		</AccountTemplate>

		<HomeFooter style="border-top: 1px solid #B2B2B2;" />
	</div>
</template>

<script>
import api from "../classes/api";
import NewBidModal from "../components/NewBidModal";
import HomeFooter from "../components/HomeFooter";
import HomeHeader from "../components/HomeHeader";
import AccountTemplate from "../components/AccountTemplate";
import moment from "moment";
import VueScrollTo from "vue-scrollto";

export default {
	components: {
		NewBidModal,
		HomeHeader,
		AccountTemplate,
		HomeFooter
	},
	data: function() {
		return {
			newBidModalVisible: false,
			orders: [],
			pagination: {
				currentPage: 1,
				itemsOnPage: 10
			},
			dialogBidImage: {
				visible: false,
				orderId: 0,
				imageIndex: 0
			},
			isLoading: true
		};
	},
	methods: {
		openImageViewer(orderId, imageIndex) {
			// this.dialogBidImage.imageIndex = imageIndex;
			this.dialogBidImage.orderId = orderId;
			this.dialogBidImage.visible = true;

			this.$refs.carousel.setActiveItem(imageIndex);
		},
		currentchange(e) {
			this.pagination.currentPage = e;
			VueScrollTo.scrollTo("body");
		},
		toDate(date) {
			return moment.utc(date).format("DD.MM.YYYY");
		},
		toTime(date) {
			return moment.utc(date).format("HH:mm");
		},
		orderComlete(e) {
			this.orders.push(e.order);
			console.log(e);

			this.newBidModalVisible = false;
		},
		logout() {
			api.account
				.logout()
				.then(res => {
					this.$message.success("Вы успешно вышли из аккаунта");

					this.$store.dispatch("removeToken");
					this.$router.push(this.$store.state.routesLinks.home);
				})
				.catch(e => {
					api.errorHandler(e, this, {
						401: () => {
							this.$message.error("Ошибка авторизации");
							this.$store.dispatch("removeToken");
							this.$router.push(
								this.$store.state.routesLinks.home
							);
						}
					});
				});
		}
	},
	computed: {
		getOrderImages() {
			return (
				(
					this.orders.find(
						v => v.id == this.dialogBidImage.orderId
					) || []
				).images || []
			);
		},
		getTotalPages() {
			return Math.ceil(this.orders.length / this.pagination.itemsOnPage);
		},
		getPageOrders() {
			return this.orders
				.slice()
				.reverse()
				.slice(
					this.pagination.itemsOnPage *
						(this.pagination.currentPage - 1),
					this.pagination.itemsOnPage * this.pagination.currentPage
				);
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

		api.account.getOrders().then(res => {
			this.isLoading = false;
			this.orders = res.orders;
		});
	}
};
</script>

<style lang="less" scoped>
.yp-btn-menu {
	border: none;
	padding: 10px 20px;
	background: #ffffff;
	box-shadow: 0px 2px4px rgba(100, 100, 100, 0.5);
	border-radius: 6px;
	border: 2px solid #ffffff;

	&.active {
		border: 3px solid #ff94c8;
	}
}

.account {
	background: #f8f8f8;
	position: relative;
	display: flex;
	// flex-direction: column;
	flex-grow: 1;

	.menu {
		// position: absolute;
		// top: 0;
		// left: 0;
		background: #fff;
		// height: 100%;

		a {
			display: block;
			padding: 15px 30px;
			color: #4f4f4e;
			font-size: 18px;

			&:hover {
				background: #fafafa;
			}

			&.active {
				background: #f9d0e4;
			}
		}
	}
}

.account-menu {
	.container {
		padding: 0 150px;
	}

	.ant-btn {
		margin-top: 1rem !important;
		border: 2px solid #e9378d;
		padding: 10px 25px;
		border-radius: 6px;
	}
}

.bids {
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

		.field {
			border: solid 1px #e9378d;
			box-shadow: 0px 1px 4px -1px rgba(100, 100, 100, 0.5);
			padding: 10px 15px;
			border-radius: 6px;
		}

		.field-text {
			.field();
			height: 100px;
			overflow-y: auto;
		}

		.field-time {
			padding: 10px 0px;
			text-align: center;
		}

		.image {
			.field();
			width: 100%;
			height: 100%;
			object-fit: contain;
		}

		.yp-btn-fill {
			// width: 60%;
		}
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
				.buttons {
					div {
						flex: 0 0 50% !important;
						max-width: 50% !important;
					}
				}

				.yp-btn-fill {
					width: 100%;
				}
			}

			.container {
				padding: 0 15px;
			}
		}
	}
}
</style>