<template>
	<vue100vh class="bids">
		<HomeHeader
			page="bids"
			:links="[
				{label:'Заявки', href: '/bids'},
				{label:'Профиль', href: '/bids'}
			]"
		/>

		<NewBidModal
			:visible="newBidModalVisible"
			@cancel="newBidModalVisible = false"
			@orderComlete="orderComlete($event)"
		/>

		<!-- <a-modal
			:closable="true"
			:visible="dialogBidImage.visible"
			:footer="null"
			@cancel="() => dialogBidImage.visible = false"
		>
			<div v-touch:swipe="swipeHandler" v-touch:moving="draggingSideNavClose">
				<el-carousel ref="carousel" trigger="click" indicator-position="outside" :autoplay="false">
					<el-carousel-item v-for="(image, index) in getOrderImages" :key="index">
						<img :src="image.image" alt />
					</el-carousel-item>
				</el-carousel>
			</div>
		</a-modal>-->

		<AccountTemplate
			:sideLinks="[
				{label:'Заявки', href: '/bids'},
				{label:'Профиль', href: '/bids'}
			]"
		>
			<template v-slot:account-menu>
				<div class="mt-4">
					<div class>
						<div class="title">
							<div class="name">
								<span class="id">Заявка № 678</span>
								<span>- Подбор мастеров</span>
							</div>
							<div class="row mt-2">
								<div class="col-md-4 md-mt-2">
									<div class="prop">Мастер по ногтям</div>
								</div>
								<div class="col-md-4 md-mt-2">
									<div class="prop">21.02.2020</div>
								</div>
								<div class="col-md-4 md-mt-2">
									<div class="prop">4</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</template>
			<!-- <template v-slot:account-menu>
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
			</template>-->

			<!-- <template v-slot:account-content>
				<section class="bids-list">
					<div class="container" v-loading="isLoading">
						<div class="bid my-3" v-for="order in getPageOrders" :key="order.id">
							<div class="row py-3">
								<div class="col d-flex align-items-center">
									<span>
										<u>Заявка №{{ order.id }}</u> — подбор мастеров
									</span>
								</div>
								<div class="col-auto text-right">
									<div class="id">123</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-7">
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

								<div class="col-md-5 py-2">
									<div class="row h-100">
										<div class="col-6" v-for="(image, index) in order.albumImages" :key="index">
											<img @click="openImageViewer(order.id, index)" :src="image.image_thumb" class="image" />
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
			</template>-->

			<template v-slot:account-content>
				<div class="mx-0" v-for="response in responses" :key="response.id">
					<div class="responses-list p-4">
						<div class="response">
							<div class="row mt-3">
								<div class="col-auto">
									<img
										src="http://api-lunacy.icons8.com/api/assets/543ecbdc-31a7-408b-b3ed-c32452ad5870/Фото-1.png"
										alt
									/>
								</div>
								<div class="col">
									<div class="name">Tatyana Nail-Studio</div>
									<div class="address">г. Воронеж, ул. Пушкина, д.6/21 к.2</div>
									<div class="time-wrap">
										<span class="desc">Готовы вас принять:</span>
										<span class="time">18:30 - 19:00</span>
									</div>
									<div class="price">{{response.cost}} руб.</div>
								</div>
							</div>
							<div class="field-text mt-3">{{response.comment}}</div>
							<div class="row mt-3">
								<div class="col text-left md-text-center">
									<a href="#" class="btn yp-btn yp-btn-fill" @click="sign(response.id)">Записаться</a>
								</div>
								<div class="col text-right md-text-center sm-mt-2">
									<router-link
										:to="'/master/profile/' + response.master.id"
										class="btn yp-btn yp-btn-fill"
									>Профиль</router-link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</template>
		</AccountTemplate>

		<HomeFooter style="border-top: 1px solid #B2B2B2;" />
	</vue100vh>
</template>

<script>
import api from "../classes/api";
import NewBidModal from "../components/NewBidModal";
import HomeFooter from "../components/HomeFooter";
import HomeHeader from "../components/HomeHeader";
import AccountTemplate from "../components/AccountTemplate";
import moment from "moment";
import VueScrollTo from "vue-scrollto";
import vue100vh from "vue-100vh";
import VuePerfectScrollbar from "vue-perfect-scrollbar";

export default {
	components: {
		NewBidModal,
		HomeHeader,
		AccountTemplate,
		HomeFooter,
		vue100vh,
		VuePerfectScrollbar
	},
	data: function() {
		return {
			newBidModalVisible: false,
			responses: [],
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
			this.orders.push(e.order);
			console.log(e);

			this.newBidModalVisible = false;
		},
		getOrderResponses(id) {
			
			api.account.getOrderResponses(id).then(async res => {
				this.responses = res.replies;
			}).catch(e => {
				// TODO: error handler
			})
		},
		getOrders() {
			api.account.getOrders().then(async res => {
				this.isLoading = false;
				// this.orders = res.orders;

				for (let index = 0; index < res.orders.length; index++) {
					const order = res.orders[index];
					let album = await api.account.getAlbumPhotos(
						order.album_id
					);
					res.orders[index].albumImages = album.photos;
				}

				this.orders = res.orders;

				// this.orders = this.orders.map(async order => {
				// 	let album = await api.account.getAlbumPhotos(order.album_id)
				// 	order.albumImages = album.photos
				// 	return order
				// })
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
		async sign(reply_id) {
			alert("выбран мастер (нет)")
			api.account.createClientSign(this.$route.params.id, 100, reply_id)
		}
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
			.then(response => {
				switch (response.user.type_code) {
					case "m":
						this.$router.push("/master");
						break;

					case "c":
						// this.getOrders();
						// console.log("this.$route.params.id", this.$route.params.id);
						
						this.getOrderResponses(this.$route.params.id);
						break;

					default:
						break;
				}
				console.log(response.user.type_code);
			})
			.catch(e => {
				api.errorHandler(e, this, {
					401: () => {
						this.$store.dispatch("general/removeToken");
						this.$router.push('/');
					}
				});
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

.title {
	background: #ffffff;
	box-shadow: 0px 2px4px rgba(100, 100, 100, 0.5);
	border-radius: 20px;
	padding: 10px 20px;

	.name {
		text-align: center;

		.id {
			text-decoration: underline;
		}
	}

	.prop {
		text-align: center;
		border: 1px solid #e9378d;
		box-shadow: 0px 1px4px-1px rgba(100, 100, 100, 0.5);
		border-radius: 6px;
		padding: 5px 10px;
	}
}

.responses-list {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
	
	.response {
		background: #fff;
		box-shadow: 0px 2px4px rgba(100, 100, 100, 0.5);
		border-radius: 25px;
		padding: 15px 20px;

		.name {
			font-weight: bold;
		}

		.time-wrap {
			.time {
				text-decoration: underline;
			}
		}

		.price {
			font-weight: bold;
			font-size: 16px;
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
	}
}
</style>