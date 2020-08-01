<template>
	<div id="reviews" class="mt-5">
		<div class="title">Отзывы</div>

		<div class="review" v-for="(review, index) in getCurrentPageReviews" :key="index">
			<div class="row">
				<div class="col">
					<div class="row">
						<div class="col-auto date">{{ review.date }}</div>
						<div class="col name">{{ review.name }}</div>
					</div>
					<div class="text">{{ review.text }}</div>
				</div>
				<div class="col-auto rating">
					<el-rate v-model="review.rating" disabled />
				</div>
			</div>
		</div>

		<div class="text-center p-4" v-if="reviews.length == 0">Отзывов нет :(</div>

		<div class="flex-center mt-4" v-if="reviews.length > pagination.itemsOnPage">
			<el-pagination
				background
				layout="prev, pager, next"
				:total="reviews.length"
				:page-count="pagination.itemsOnPage"
				@current-change="changePage"
			/>
		</div>
	</div>
</template>

<script>
import VueScrollTo from "vue-scrollto";

import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("master");

export default {
	props: {
		masterId: {
			type: Number,
			default: 0
		}
	},
	data: () => {
		return {
			pagination: {
				currentPage: 1,
				itemsOnPage: 10,
			},
		};
	},
	methods: {
		changePage(e) {
			this.pagination.currentPage = e;
			VueScrollTo.scrollTo("#reviews");
		},
	},
	computed: {
		...mapState({
			reviews: (state) => state.reviews.data,
		}),
		getCurrentPageReviews() {
			return this.reviews.slice(
				this.pagination.itemsOnPage * (this.pagination.currentPage - 1),
				this.pagination.itemsOnPage * this.pagination.currentPage
			);
		},
	},
	created() {
		this.$store.dispatch("master/getReviews", { masterId: this.masterId });
		console.log("created");
	},
};
</script>

<style lang="less" scoped>
.title {
	font-size: 16px;
}

.review {
	position: relative;
	padding-top: 0.7rem;
	padding-bottom: 0.7rem;

	&:after {
		content: "";
		border-bottom: 1px solid #f93d9f;
		position: absolute;
		left: 10%;
		bottom: 0;
		width: 80%;
	}

	.date {
		font-size: 16px;
		color: #898989;
	}

	.name {
		font-size: 16px;
		color: #382835;
	}

	.text {
		font-size: 18px;
		color: #382835;
		padding-left: 2rem;
		padding-top: 0.5rem;
	}

	.rating {
		padding-top: 1rem;
	}
}
</style>
