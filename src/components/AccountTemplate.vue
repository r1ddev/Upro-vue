<template>
	<div id="account-template">
		<HomeHeader page="master" :links="sideLinks" />
		<section class="account row m-0" v-if="loginData.user">
			<section class="menu col-auto p-0">
				<router-link
					v-for="(sideLink, index) in sideLinks"
					:key="index"
					:to="sideLink.href"
					:class="sideLink.active ? 'active' : ''"
					>{{ sideLink.label }}</router-link
				>
			</section>
			<div class="col p-0">
				<router-view></router-view>
			</div>
		</section>
	</div>
</template>

<script>
import Vue from 'vue';

import HomeHeader from "../components/HomeHeader";

import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("general");

export default {
	components: {
		HomeHeader,
	},
	data: () => {
		return {
			sideLinks: []
		};
	},
	async created() {
		await this.$store.dispatch("general/getLoginStatus");

		switch (this.loginData.user.type_code) {
			case "m":
				this.sideLinks = [
					{ label: "Заявки", href: "/master", active: this.activeMenu == "/master" },
					{ label: "Профиль", href: "/master/profile", active: this.activeMenu == "/master/profile" },
					{ label: "Отзывы", href: "/master/reviews", active: this.activeMenu == "/master/reviews" },
				]
				break;

			case "c":
				this.sideLinks = [];
				break;
		}
	},
	methods: {
		compareLink (link) {
			console.log("location.pathname", location.pathname);
			console.log("link", link);
			return location.pathname === link
		}
	},
	computed: {
		...mapState({
			loginData: (state) => state.loginData.data,
		}),
		activeMenu () {
			console.log("call activeMenu");
			return location.pathname
		}
	},
	watch: {
		"$route.params": function() {
			this.sideLinks.map(link => {
				link.active = link.href === location.pathname
				return link
			})
			console.log(this.$route.params);
			//Vue.forceUpdate();
		}
	}
};
</script>

<style lang="less" scoped>
#account-template {
	min-height: 100vh;
	display: flex;
	flex-direction: column;

	
	::v-deep .shadow {
		box-shadow: 0px 2px 4px rgba(100, 100, 100, 0.5);
		width: 100%;
		padding: 7px 45px;
		border-radius: 18px;
		background: #fff;
	}

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
}
</style>
