<template>
	<el-dialog class="el-dialog-responsive" :visible.sync="visible" title="" :show-close="false">
		<div slot="title" class="title">
			<div class="row">
				<div class="col-auto">
					<img
						:src="userAvatar()"
						class="avatar"
						alt=""
					/>
				</div>
				<div class="col-md master-data">
					<div class="name">{{ this.currentReview.master.name }}</div>
					<div class="row">
						<div class="col type">{{ this.currentReview.order.master_type_id }}</div>
						<div class="col-md-auto date">{{ toDate(this.currentReview.order.date_finished) }}</div>
					</div>
				</div>
			</div>
		</div>

		<div class="flex-center mb-4">
			<el-rate v-model="rate"></el-rate>
		</div>

		<el-form @submit.native.prevent="submit" label-position="top">
			<el-form-item>
				<el-input placeholder="Анонимная лисичка" maxlength="1000" v-model="name" />
			</el-form-item>

			<el-form-item>
				<el-input
					required
					type="textarea"
					placeholder="Комментарий"
					:autosize="{ minRows: 2, maxRows: 4 }"
					maxlength="1000"
					v-model="comment"
				/>
			</el-form-item>

			<el-form-item>
				<div class="row">
					<div class="col-md-8">
						<a-button html-type="submit" type="primary" size="large" class="yp-btn yp-btn-fill" :disabled="rate == 0 || !comment"
							>Оценить</a-button
						>
					</div>
					<div class="col-md-4 d-flex justify-content-center">
						<a-button html-type="submit" type="secondary" size="large" class="yp-btn">Позже</a-button>
					</div>
				</div>
			</el-form-item>

			<div class="notice">Ваш отзыв поможет другим пользователям!</div>
		</el-form>
	</el-dialog>
</template>

<script>
import api from "../classes/api";
import moment from 'moment';
import { createNamespacedHelpers } from "vuex";
const { mapState: mapStateMaster, mapActions: mapActionsMaster } = createNamespacedHelpers("master");


export default {
	props: {
		reviews: {
			default: () => [],
			type: Array,
		},
	},
	data: function () {
		return {
			visible: true,
			rate: 0,
			name: "",
			comment: "",
			currentReviewIndex: 0,
		};
	},
	methods: {
		submit() {
			let name = this.name.length > 0 ? this.name : "Анонимная лисичка"
			// if (this.rate > 0) {
			api.account.client.submitReview(name, this.currentReview.master.id, this.rate, this.comment);
			
			this.$notify({
				title: "Успешно",
				message: "Отзыв отправлен",
				type: "success",
			});

			this.nextMaster()
		},
		nextMaster() {
			if (this.reviews.length - 1 > this.currentReviewIndex) {
				this.currentReviewIndex++;

				this.$store.dispath("master/getPhotosAvatar", this.currentReview.master.avatar_album_id)

				this.rate = 0;
				this.comment = "";
			}
		},
		toDate (date) {
			return moment(date).locale('ru').format("D MMMM")
		},
		userAvatar() {
			return this.photosAvatar.length > 0
				? this.photosAvatar[0].image_thumb
				: require(`@/assets/img/no-avatar.png`);
		},
	},
	computed: {
		currentReview () {
			return this.reviews[this.currentReviewIndex]
		},
		...mapStateMaster ({
			photosAvatar: (state) => state.photosAvatar.data,
		})
	},
	created() {
		this.$store.dispath("master/getPhotosAvatar", this.currentReview.master.avatar_album_id)
		// api.account.client.getNeedReviews()
		// console.log(this.reviews);
	},
};
</script>

<style lang="less" scoped>
::v-deep .el-dialog__header {
	padding: 0;
}
::v-deep .el-rate__icon {
	font-size: 38px;

	@media screen and (max-width: 550px) {
		font-size: 30px;
	}
}
.title {
	background: #f3a9cd;
	padding: 5px 20px;

	.avatar {
		width: 60px;
		height: 60px;
		object-fit: cover;
		border-radius: 6px;
	}

	.master-data {
		display: flex;
		flex-direction: column;
		justify-content: center;

		.name {
			color: #000000;
			font-size: 18px;
		}

		.type {
			color: #818181;
			font-size: 18px;
		}

		.date {
			color: #000000;
			font-size: 18px;
			font-weight: bold;
		}
	}
}

.yp-btn-fill {
	width: 100%;
}

.notice {
	font-weight: 100;
	font-size: 14px;
	text-align: center;
}
</style>
