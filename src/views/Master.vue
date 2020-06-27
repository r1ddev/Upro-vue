<template>
	<div class="master">
		<HomeHeader
			page="master"
			:links="[
				{ label: 'Заявки', href: '/master', active: true },
				{ label: 'Профиль', href: '/master/profile' },
			]"
		/>

		<NewResponseModal
			:orderId="newResponseData.orderId"
			:orderDateTime="newResponseData.orderDateTime"
			:visible="newResponseData.modal"
			@cancel="newResponseData.modal = false"
			@success="onNewResponseSuccess()"
		/>

		<a-modal
			:closable="true"
			:visible="dialogBidImage.visible"
			:footer="null"
			@cancel="() => dialogBidImage.visible = false"
		>
			<div v-touch:swipe="swipeHandler">
				<el-carousel ref="carousel" trigger="click" indicator-position="outside" :autoplay="false">
					<el-carousel-item v-for="(image, index) in getOrderImages" :key="index">
						<img :src="$store.state.general.server + image.image" class="carousel-photo" alt />
					</el-carousel-item>
				</el-carousel>
			</div>
		</a-modal>

		<AccountTemplate
			:sideLinks="[
				{ label: 'Заявки', href: '/master', active: true },
				{ label: 'Профиль', href: '/master/profile' },
			]"
		>
			<template v-slot:account-menu>
				<div class="row flex-center">
					<div class="col-auto px-0">
						<router-link
							to="/master"
							:class="
								'btn yp-btn yp-btn-menu mt-3' +
								($route.params.type == undefined
									? ' active'
									: '')
							"
							>Новые</router-link
						>
					</div>
					<div class="col-auto px-0">
						<router-link
							to="/master/process"
							:class="
								'btn yp-btn yp-btn-menu ml-2 mt-3' +
								($route.params.type == 'process'
									? ' active'
									: '')
							"
							>Обработанные</router-link
						>
					</div>
					<div class="col-auto px-0">
						<router-link
							to="/master/ms"
							:class="
								'btn yp-btn yp-btn-menu ml-2 mt-3' +
								($route.params.type == 'ms' ? ' active' : '')
							"
							>Вас выбрали</router-link
						>
					</div>
					<div class="col-auto px-0">
						<router-link
							to="/master/cs"
							:class="
								'btn yp-btn yp-btn-menu ml-2 mt-3' +
								($route.params.type == 'cs' ? ' active' : '')
							"
							>Завершенные</router-link
						>
					</div>
					<div class="col-auto px-0">
						<router-link
							to="/master/cm"
							:class="
								'btn yp-btn yp-btn-menu ml-2 mt-3' +
								($route.params.type == 'cm' ? ' active' : '')
							"
							>Упущенные</router-link
						>
					</div>
					<div class="col-auto px-0">
						<router-link
							to="/master/cc"
							:class="
								'btn yp-btn yp-btn-menu ml-2 mt-3' +
								($route.params.type == 'cc' ? ' active' : '')
							"
							>Отмененные</router-link
						>
					</div>
				</div>
			</template>

			<template v-slot:account-content>
				<section class="bids-list">
					<div class="container" v-loading="isLoading">
						<div
							class="bid my-3"
							v-for="order in getPageOrders"
							:key="order.id"
						>
							<div class="row py-3">
								<div class="col d-flex align-items-center">
									<span>
										<u>Заявка №{{ order.id }}</u>
										— {{ order.status }}
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
											<div class="field">
												{{ order.city }}
											</div>
										</div>
										<div class="col-lg-5 py-2">
											<div class="field text-center">
												{{
													toDate(
														order.request_date_from
													)
												}}
											</div>
										</div>
									</div>
									<div class="row">
										<div class="col-lg-7 py-2">
											<div class="field">
												{{ order.master_type }}
											</div>
										</div>
										<div class="col-lg-5 py-2">
											<div class="field field-time">
												{{
													toTime(
														order.request_date_from
													)
												}}
												-
												{{
													toTime(
														order.request_date_to
													)
												}}
											</div>
										</div>
									</div>
									<div class="row py-2">
										<div class="col-12">
											<div class="field-text">
												{{ order.description }}
											</div>
										</div>
									</div>
								</div>

								<div class="col-md-5 py-2">
									<div class="row h-100">
										<div class="col-6" v-for="(image, index) in order.albumImages" :key="index">
											<!-- {{image.image_thumb}} -->
											<!-- <img :src="image.image_thumb" alt class="image" @click="openImageViewer(order.id, index)"/> -->
											<img
												@click="openImageViewer(order.id, index)"
												:src="$store.state.general.server + image.image_thumb"
												class="image"
											/>
										</div>
									</div>
								</div>
							</div>
							<div class v-if="order.status == 'Подбор мастеров'">
								<div class="row justify-content-center">
									<div class="col-md flex-center">
										<a
											href="#"
											class="btn yp-btn yp-btn-fill mt-4"
											@click.prevent="
												newResponse(order.id)
											"
											>Откликнуться</a
										>
									</div>
								</div>
							</div>

							<div v-if="order.status == 'Выбран мастер'">
								<div class="divider py-3">Ваш отклик:</div>
								<div class="flex-center response">
									<div class="content">
										<div class="row">
											<div class="col-md-3">
												<div
													class="d-flex flex-column h-100"
												>
													<div class="flex-grow-1">
														<div
															class="field field-time"
														>
															1000р
														</div>
													</div>
													<div
														class="flex-grow-1 time-wrap"
													>
														<div
															class="field field-time"
														>
															17:10 - 19:30
														</div>
													</div>
												</div>
											</div>
											<div class="col-md-9">
												<div class="field-text">
													Отклик - Комментарий Мастера
												</div>
											</div>
										</div>
										<div class="row justify-content-center">
											<div class="col-md flex-center">
												<a
													href="#"
													class="btn yp-btn yp-btn-fill mt-4"
													@click.prevent="finishBid(order.id)"
													>Завершить</a
												>
											</div>
											<div class="col-md flex-center">
												<a
													href="#"
													@click.prevent="cancelBid(order.id)"
													class="btn yp-btn yp-btn-fill mt-4"
													>Отказаться</a
												>
											</div>
											<div class="col-md flex-center">
												<a
													href="#"
													class="btn yp-btn yp-btn-fill mt-4"
													@click.prevent="noClientBid(order.id)"
													>Клиент не приехал</a
												>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div class v-if="order.status == 'Отменена клиентом'"></div>
						</div>
						<div
							v-if="!isLoading && !getPageOrders.length"
							class="text-center"
						>
							Нет данных для отображения
						</div>
					</div>
				</section>
			</template>
		</AccountTemplate>

		<HomeFooter style="border-top: 1px solid #b2b2b2;" />
	</div>
</template>

<script>
import api from "../classes/api";
import HomeFooter from "../components/HomeFooter";
import AccountTemplate from "../components/AccountTemplate";
import HomeHeader from "../components/HomeHeader";
import NewResponseModal from "../components/NewResponseModal";
import NewReplyPopup from "../components/master/NewReplyPopup";

import moment from "moment";

export default {
	components: {
		NewResponseModal,
		HomeHeader,
		AccountTemplate,
		NewReplyPopup,
		HomeFooter,
	},
	data: function () {
		return {
			newResponseData: {
				modal: false,
				orderId: undefined,
				orderDateTime: "",
			},
			isLoading: false,
			orders: [],
			pagination: {
				currentPage: 1,
				itemsOnPage: 10,
			},
			ordersType: "",
			dialogBidImage: {
				visible: false,
				orderId: 0,
				imageIndex: 0
			}
		};
	},
	methods: {
		finishBid (orderId) {
			api.account.master.changeBidStatus(orderId, "cs").then(res => {
				this.$notify({
					title: "Успешно",
					message: "Заявка успешно завершена",
					type: "success",
				});
				this.getOrders()
			})
		},
		cancelBid (orderId) {
			api.account.master.changeBidStatus(orderId, "cc").then(res => {
				this.$notify({
					title: "Успешно",
					message: "Заявка успешно отменена",
					type: "success",
				});
				this.getOrders()
			})
		},
		noClientBid (orderId) {
			api.account.master.changeBidStatus(orderId, "na").then(res => {
				this.$notify({
					title: "Успешно",
					message: "Статус заявки успешно изменен",
					type: "success",
				});
				this.getOrders()
			})
		},
		swipeHandler(direction) {
			if (direction == "left") {
				this.$refs.carousel.next();
			}

			if (direction == "right") {
				this.$refs.carousel.prev();
			}
		},
		openImageViewer(orderId, imageIndex) {
			// this.dialogBidImage.imageIndex = imageIndex;
			this.dialogBidImage.orderId = orderId;
			this.dialogBidImage.visible = true;

			setTimeout(() => {
				this.$refs.carousel.setActiveItem(imageIndex);
			}, 200);
		},
		newResponse(orderId) {
			this.newResponseData.modal = true;
			this.newResponseData.orderId = orderId;
			this.newResponseData.orderDateTime = this.orders.find(
				(v) => v.id == orderId
			).request_date_from;
		},
		parseRoute() {
			switch (this.$route.params.type) {
				case "sm":
					this.ordersType = "sm"
					break;
				case "process":
					this.ordersType = "process"
					break;
				case "ms":
					this.ordersType = "ms"
					break;
				case "cs":
					this.ordersType = "cs"
					break;
				case "cm":
					this.ordersType = "cm"
					break;
				case "cc":
					this.ordersType = "cc"
					break;
				default:
					this.ordersType = "new"
					break;
			}

			this.getOrders();
		},
		toDate(date) {
			return moment.utc(date).format("DD.MM.YYYY");
		},
		toTime(date) {
			return moment.utc(date).format("HH:mm");
		},
		async getOrders() {
			let status = this.ordersType
			var res = {};
			switch (status) {
				case "new":
					res = await api.account.getMasterOrders(
						"?order_status=sm&exist_master_reply=false"
					);
					break;
				case "process":
					res = await api.account.getMasterOrders(
						"?order_status=sm&exist_master_reply=true"
					);
					break;
				case "ms":
					res = await api.account.getMasterOrders(
						"?order_status=ms"
					);
					break;
				case "cs":
					res = await api.account.getMasterOrders(
						"?order_status=cs"
					);
					break;
				case "cm":
					res = await api.account.getMasterOrders(
						"?order_status=ms,cc,cm,na,cs&master_by_token=false"
					);
					break;
				case "cc":
					res = await api.account.getMasterOrders(
						"?order_status=na,cc,cm"
					);
					break;

				default:
					break;
			}

			console.log("orders", res);
			

			for (let index = 0; index < res.orders.length; index++) {
				const order = res.orders[index];
				let album = await api.account.getAlbumPhotos(
					order.album_id
				);
				res.orders[index].albumImages = album.photos;
			}

			this.orders = res.orders;
			this.isLoading = false;
		},
		onNewResponseSuccess() {
			this.newResponseData.modal = false;
			this.getOrders();
		},
	},
	computed: {
		getOrderImages() {
			return (
				(
					this.orders.find(
						v => v.id == this.dialogBidImage.orderId
					) || []
				).albumImages || []
			);
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
		},
	},
	async created() {
		api.account
			.getLoginStatus()
			.then((response) => {
				switch (response.user.type_code) {
					case "c":
						this.$router.push("/bids");
						break;

					case "m":
						this.parseRoute();
						break;

					default:
						break;
				}
				console.log(response.user.type_code);
			})
			.catch((e) => {
				api.errorHandler(e, this, {
					401: () => {
						this.$store.dispatch("general/removeToken");
						this.$router.push("/");
					},
				});
			});
	},
	watch: {
		"$route.params.type": function () {
			this.isLoading = true;
			this.parseRoute();
		},
	},
};
</script>

<style lang="less" scoped>
.carousel-photo {
	width: 100%;
	height: 100%;
	object-fit: contain;
}
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
		border: 2px solid #ff94c8;
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
	height: calc(var(--vh, 1vh) * 100);
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
			padding: 0;
			cursor: pointer;
			width: 100%;
			height: 100%;
			object-fit: cover;
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
