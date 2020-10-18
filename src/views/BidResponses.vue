<template>
	<div class="container">

		<!-- <NewBidModal
			:visible="newBidModalVisible"
			@cancel="newBidModalVisible = false"
			@orderComlete="false"
		/> -->

		<el-dialog
			title="Выберите время"
			:visible.sync="selectedResponse.modalVisible"
		>
			<el-time-picker
				v-model="selectedResponse.selectedTime"
				:picker-options="{
					selectableRange: suggestedResponseTimeRange,
					format: 'HH:mm',
				}"
				value-format="HH:mm"
				format="HH:mm"
				align="center"
				placeholder="Выберите удобное время"
			>
			</el-time-picker>

			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="confirmResponse()"
					>Подтвердить</el-button
				>
			</span>
		</el-dialog>

		
		<div class="mt-4">
			<div class>
				<div class="title">
					<div class="name">
						<span class="id">Заявка № {{bidData.order.id}}</span>
						<span>- {{bidData.order.status}}</span>
					</div>
					<div class="row mt-2">
						<div class="col-md-4 md-mt-2">
							<div class="prop">{{bidData.order.master_type}}</div>
						</div>
						<div class="col-md-4 md-mt-2">
							<div class="prop">{{toDate(bidData.order.request_date_from)}}</div>
						</div>
						<div class="col-md-4 md-mt-2">
							<div class="prop">{{responses.length}}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
			
		<div
			class="mx-0"
			v-for="(response, index) in responses"
			:key="response.id"
		>
			<div class="responses-list p-4">
				<div class="response">
					<div class="row mt-3">
						<div class="col-3">
							<img
								class="avatar"
								:src="userAvatar(response)"
								alt
							/>
						</div>
						<div class="col">
							<div class="name">
								{{ response.master.name }}
							</div>
							<div class="time-wrap">
								<span class="desc"
									>Готовы вас принять:</span
								>
								<span class="time ml-1">{{
									toTime(
										response.suggested_time_from
									) +
									" - " +
									toTime(response.suggested_time_to)
								}}</span>
							</div>
							<div class="price">
								{{ response.cost }} руб.
							</div>
						</div>
					</div>
					<div class="field-text mt-3">
						{{ response.comment }}
					</div>
					<div class="row mt-3">
						<div class="col text-left md-text-center">
							<a
								href="#"
								class="btn yp-btn yp-btn-fill"
								@click.prevent="sign(index)"
								>Записаться</a
							>
						</div>
						<div
							class="col text-right md-text-center sm-mt-2"
						>
							<router-link
								:to="
									'/master/profile/' +
									response.master.id
								"
								class="btn yp-btn yp-btn-fill"
								>Профиль</router-link
							>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div v-if="responses.length == 0" class="p-4 text-center">
			Нет данных для отображения
		</div>
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
import vue100vh from "vue-100vh";
import VuePerfectScrollbar from "vue-perfect-scrollbar";

import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("client");

export default {
	components: {
		NewBidModal,
		HomeHeader,
		AccountTemplate,
		HomeFooter,
		vue100vh,
		VuePerfectScrollbar,
	},
	data: function () {
		return {
			newBidModalVisible: false,
			responses: [],
			selectedResponse: {
				id: undefined,
				modalVisible: false,
				date: undefined,
				selectedTime: "",
			},
		};
	},
	methods: {
		toDate(date) {
			return moment.utc(date).format("DD.MM.YYYY");
		},
		toTime(date) {
			return moment.utc(date).format("HH:mm");
		},
		async confirmResponse() {
			let timeArray = this.selectedResponse.selectedTime.split(":");

			let responseTimestamp = moment(
				this.selectedResponse.date
			).utcOffset(0);

			responseTimestamp.set({
				hour: timeArray[0],
				minute: timeArray[1],
				second: 0,
				millisecond: 0,
			});
			

			// TODO: to store!!!
			await api.account.createClientSign(
				this.$route.params.id,
				responseTimestamp.unix(),
				this.selectedResponse.id
			);

			this.selectedResponse.modalVisible = false;

			this.$notify({
				title: "Успешно",
				message: "Запись успешно создана",
				type: "success",
			});

			this.$router.push("/bids/ms");
		},
		getOrderResponses(id) {
			api.account
				.getOrderResponses(id)
				.then(async (res) => {
					res.replies = res.replies.filter(
						(reply) => reply.status == "considered"
					);

					for (let index = 0; index < res.replies.length; index++) {
						const reply = res.replies[index];
						let album = await api.account.getAlbumPhotos(
							reply.master.avatar_album_id
						);

						res.replies[index].albumImages = album.photos;
					}

					this.responses = res.replies;
				})
				.catch((e) => {
					// TODO: error handler
				});

			this.$store.dispatch("client/geBidData", id)
		},

		async sign(responseIndex) {
			let resp = this.responses[responseIndex];
			

			this.selectedResponse.id = resp.id;
			this.selectedResponse.index = responseIndex;
			this.selectedResponse.modalVisible = true;
			this.selectedResponse.date = moment(resp.suggested_time_from);
		},
		userAvatar(response) {
			return response.albumImages.length > 0
				? this.$store.state.general.server +
						response.albumImages[0].image_thumb
				: require(`@/assets/img/no-avatar.png`);
		},
	},
	computed: {
		...mapState({
			bidData: state => state.bidData.data,
		}),
		suggestedResponseTimeRange() {
			console.log("this.selectedResponse", JSON.stringify(this.selectedResponse));
			
			if (this.selectedResponse && this.selectedResponse.id) {
				let resp = this.responses[this.selectedResponse.index];
				return (
					this.toTime(resp.suggested_time_from) +
					":00 - " +
					this.toTime(resp.suggested_time_to) +
					":00"
				);
			}
			return "";
		},
	},
	async created() {
		api.account
			.getLoginStatus()
			.then((response) => {
				switch (response.user.type_code) {
					case "m":
						this.$router.push("/master");
						break;
					case "c":
						this.getOrderResponses(this.$route.params.id);
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

		.avatar {
			width: 100%;
			border: 1px solid #e9378d;
			border-radius: 5px;
			cursor: pointer;
		}

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
