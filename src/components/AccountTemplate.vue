<template>
	<section class="account row m-0">
		<section class="menu col-auto p-0">
			<router-link v-for="(sideLink, index) in sideLinks" :key="index" :to="sideLink.href" :class="sideLink.active ? 'active' : ''">{{sideLink.label}}</router-link>

		</section>
		<div class="col p-0">
			<section class="account-menu pb-3">
				<div class="container">
					<slot name="account-menu" />
				</div>
			</section>

			<slot name="account-content" />
		</div>
	</section>
</template>

<script>
export default {
	props: {
		sideLinks: Array
	}
};
</script>

<style lang="less" scoped>
.account {
	background: #f8f8f8;
	position: relative;
	display: flex;
	flex-grow: 1;

	.menu {
		background: #fff;

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
}

@media screen and (max-width: 991px) {
	.account {
		.container {
			padding: 0 15px;
		}

		.menu {
			display: none;
		}
	}
}

@media (min-width: 1350px) {
	.container {
		max-width: 1300px;
	}
}
</style>