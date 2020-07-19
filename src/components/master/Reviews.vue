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

		<div class="flex-center mt-4">
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

export default {
	data: () => {
		return {
			pagination: {
				currentPage: 1,
				itemsOnPage: 10,
			},
			reviews: [
				{
					date: "11.07.20",
					name: "Антон",
					text: "Не мастер, а золотце",
					rating: 3,
				},
				{
					date: "11.07.20",
					name: "Андрюха",
					text: "Парни обзавидовались!",
					rating: 1,
				},
				{
					date: "11.07.20",
					name: "Ксюша",
					text:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisl enim blandit praesent pellentesque fames amet. Ac in auctor ultrices egestas faucibus nibh. Massa facilisis iaculis porta sed sit amet. Felis ante leo, pretium tristique congue a aliquam, ultrices nulla.",
					rating: 5,
				},
				{
					date: "11.07.20",
					name: "Андрюха",
					text: "Парни обзавидовались!",
					rating: 1,
				},
				{
					date: "11.07.20",
					name: "Андрюха",
					text: "Парни обзавидовались!",
					rating: 1,
				},
				{
					date: "11.07.20",
					name: "Андрюха",
					text: "Парни обзавидовались!",
					rating: 1,
				},
				{
					date: "11.07.20",
					name: "Андрюха",
					text: "Парни обзавидовались!",
					rating: 1,
				},
				{
					date: "11.07.20",
					name: "Андрюха",
					text: "Парни обзавидовались!",
					rating: 1,
				},
				{
					date: "11.07.20",
					name: "Андрюха",
					text: "Парни обзавидовались!",
					rating: 1,
				},
				{
					date: "11.07.20",
					name: "Андрюха",
					text: "Парни обзавидовались!",
					rating: 1,
				},
				{
					date: "11.07.20",
					name: "Андрюха",
					text: "Парни обзавидовались!",
					rating: 2,
				},
			],
		};
	},
	methods: {
		changePage(e) {
			this.pagination.currentPage = e;
			VueScrollTo.scrollTo("#reviews");
		},
	},
	computed: {
		getCurrentPageReviews() {
			return this.reviews.slice(
				this.pagination.itemsOnPage * (this.pagination.currentPage - 1),
				this.pagination.itemsOnPage * this.pagination.currentPage
			);
		},
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
		padding-top: .5rem;
	}

	.rating {
		padding-top: 1rem;
	}
}
</style>
