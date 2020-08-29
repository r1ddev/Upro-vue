<template>
	<vue100vh class="bids">
		

		<!-- <NewBidModal
			:visible="newBidModalVisible"
			@cancel="newBidModalVisible = false"
			@orderComlete="orderComlete($event)"
		/> -->

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

		<ReviewNotification :reviews="needReviews" v-if="needReviews && needReviews.length > 0" />

		
		<div class="row flex-center m-0">
			<div class="col-auto px-0">
				<router-link
					to="/bids"
					:class="'btn yp-btn yp-btn-menu mt-3' + (($route.params.type == undefined) ? ' active' : '')"
				>Все заявки</router-link>
			</div>
			<div class="col-auto px-0">
				<router-link
					to="/bids/sm"
					:class="'btn yp-btn yp-btn-menu ml-2 mt-3' + (($route.params.type == 'sm') ? ' active' : '')"
				>Подбор мастеров</router-link>
			</div>
			<div class="col-auto px-0">
				<router-link
					to="/bids/ms"
					:class="'btn yp-btn yp-btn-menu ml-2 mt-3' + (($route.params.type == 'ms') ? ' active' : '')"
				>Мастер выбран</router-link>
			</div>
			<div class="col-auto px-0">
				<router-link
					to="/bids/cs"
					:class="'btn yp-btn yp-btn-menu ml-2 mt-3' + (($route.params.type == 'cs') ? ' active' : '')"
				>Завершенные</router-link>
			</div>
			<div class="col-auto px-0">
				<router-link
					to="/bids/cc"
					:class="'btn yp-btn yp-btn-menu ml-2 mt-3' + (($route.params.type == 'cc') ? ' active' : '')"
				>Отмененные</router-link>
			</div>
		</div>
	

	
		<section class="bids-list">
			<div class="container" v-loading="isLoading">
				<div class="bid my-3" v-for="order in getPageOrders" :key="order.id">
					<div class="row py-3">
						<div class="col d-flex align-items-center">
							<span>
								<u>Заявка №{{ order.id }}</u>
								— {{order.status}}
							</span>
						</div>
						<div class="col-auto text-right">
							<div class="id">123</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md">
							<div class="row">
								<div class="col-lg-7 py-2">
									<div class="field">{{ order.city }}</div>
								</div>
								<div class="col-lg-5 py-2">
									<div class="field text-center">{{ toDate(order.request_date_from) }}</div>
								</div>
							</div>
							<div class="row">
								<div class="col-lg-7 py-2">
									<div class="field">{{ order.master_type }}</div>
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
									<VuePerfectScrollbar class="field-text">{{ order.description }}</VuePerfectScrollbar>
								</div>
							</div>
						</div>

						<div class="col-md-5 py-2" v-if="order.albumImages.length > 0">
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
					<div class="row py-2 buttons" v-if="order.status == 'Подбор мастеров'">
						<div class="col-7">
							<router-link
								:to="buildResponsesLink(order.id)"
								class="btn yp-btn yp-btn-fill"
							>Посмотреть отклики</router-link>
						</div>
						<div class="col-5 text-right">
							<a
								href="#"
								class="btn yp-btn yp-btn-fill h-100 flex-center"
								@click.prevent="cancelBid(order.id)"
							>Отменить заявку</a>
						</div>
					</div>

					<div class="row py-2 buttons" v-if="order.status == 'Выбран мастер'">
					</div>
				</div>
				<div v-if="!isLoading && !getPageOrders.length" class="text-center">Нет данных для отображения</div>

				<div class="pagination flex-center" v-if="orders.length > pagination.itemsOnPage">
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

		<HomeFooter style="border-top: 1px solid #B2B2B2;" />
	</vue100vh>
</template>

<script>
import api from "../classes/api";
import NewBidModal from "../components/NewBidModal";
import HomeFooter from "../components/HomeFooter";
import HomeHeader from "../components/HomeHeader";
import ReviewNotification from "../components/ReviewNotification";
import moment from "moment";
import VueScrollTo from "vue-scrollto";
import vue100vh from "vue-100vh";
import VuePerfectScrollbar from "vue-perfect-scrollbar";

import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("general");
const { mapState: mapStateClient, mapActions: mapActionsClient } = createNamespacedHelpers("client");


export default {
	components: {
		NewBidModal,
		HomeHeader,
		HomeFooter,
		vue100vh,
		VuePerfectScrollbar,
		ReviewNotification
	},
	data: function() {
		return {
			newBidModalVisible: false,
			orders: [],
			pagination: {
				currentPage: 1,
				itemsOnPage: 5
			},
			dialogBidImage: {
				visible: false,
				orderId: 0,
				imageIndex: 0
			},
			isLoading: true,
			ordersType: "",
		};
	},
	methods: {
		openImageViewer(orderId, imageIndex) {
			// this.dialogBidImage.imageIndex = imageIndex;
			this.dialogBidImage.orderId = orderId;
			this.dialogBidImage.visible = true;

			setTimeout(() => {
				this.$refs.carousel.setActiveItem(imageIndex);
			}, 200);
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
			//this.orders.push(e.order);
			//console.log(e);

			this.getOrders();

			this.newBidModalVisible = false;
		},
		getOrders() {
			let status = this.ordersType
			api.account.getOrders(status).then(async res => {
				this.isLoading = false;

				for (let index = 0; index < res.orders.length; index++) {
					const order = res.orders[index];
					let album = await api.account.getAlbumPhotos(
						order.album_id
					);
					res.orders[index].albumImages = album.photos;
				}

				this.orders = res.orders;
			});
		},
		swipeHandler(direction) {
			if (direction == "left") {
				this.$refs.carousel.next();
			}

			if (direction == "right") {
				this.$refs.carousel.prev();
			}
		},
		buildResponsesLink(id) {
			return `/bids/${id}/responses`;
		},
		cancelBid(id) {
			

			this.$confirm("Отменить заявку", "Внимание", {
				confirmButtonText: "Отменить",
				cancelButtonText: "Отмена отмены",
				type: "Warning"
			})
				.then(() => {

					api.account
						.newOrderResponse(id, "cc")
						.then(res => {
							this.getOrders();

							this.$message({
								type: "success",
								message: "Заявка отменена"
							});
						})
						.catch(e => console.log(e));

				})
				.catch(() => {
					// this.$message({
					// 	type: "info",
					// 	message: "Delete canceled"
					// });
				});
				
		}
	},
	computed: {
		...mapState({
			loginData: state => state.loginData.data,
		}),
		...mapStateClient({
			needReviews: state => state.needReviews.data,
		}),
		getOrderImages() {
			return (
				(
					this.orders.find(
						v => v.id == this.dialogBidImage.orderId
					) || []
				).albumImages || []
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
		console.log(this.$route.params.type);

		//this.$router.push("/bids/cc");
		// TODO: VUEX!!!

		await this.$store.dispatch('general/getLoginStatus')
		switch (this.loginData.user.type_code) {
			case "m":
				this.$router.push("/master");
				break;

			case "c":
				switch (this.$route.params.type) {
					case "sm":
						this.ordersType = "sm"
						break;

					case "ms":
						this.ordersType = "ms"
						break;
					case "cs":
						this.ordersType = "cs"
						break;
					case "cc":
						this.ordersType = "na,cc,cm"
						break;
					default:
						this.ordersType = ""
						break;
				}
				this.getOrders();

				this.$store.dispatch('client/getNeedReviews')
				break;

			default:
				break;
		}
	},
	watch: {
		"$route.params.type": function() {
			this.isLoading = true;
			switch (this.$route.params.type) {
				case "sm":
					this.ordersType = "sm"
					break;
				case "ms":
					this.ordersType = "ms"
					break;
				case "cs":
					this.ordersType = "cs"
					break;
				case "cc":
					this.ordersType = "na,cc,cm"
					break;

				default:
					this.ordersType = ""
					break;
			}
			this.getOrders();
		}
	}
};
</script>

<style lang="less" scoped>
.carousel-photo {
	width: 100%;
	height: 100%;
	object-fit: contain;
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
	// min-height: 100vh;
	// height: calc(var(--vh, 1vh) * 100);
}

.bids-list {
	.container {
		// padding: 0 100px;
		max-width: 700px;
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
			padding: 0;
			cursor: pointer;
			width: 100%;
			height: 100%;
			object-fit: cover;
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