<template>
	<div id="account-template">
		<HomeHeader :page="accountType" :links="sideLinks" />
		<section class="account row m-0" v-if="loginData.user">
			<section class="menu col-auto p-0">
				<div class="menu-content">
					<router-link
						v-for="(sideLink, index) in sideLinks"
						:key="index"
						:to="sideLink.href"
						:class="sideLink.active ? 'active' : ''"
						>{{ sideLink.label }}</router-link
					>
				</div>
				
			</section>
			<div class="col p-0">
				<router-view></router-view>
			</div>
		</section>

		<HomeFooter style="border-top: 1px solid #B2B2B2;" />
	</div>
</template>

<script>
import Vue from "vue";

import HomeHeader from "../components/HomeHeader";
import HomeFooter from "../components/HomeFooter";

import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("general");

export default {
	components: {
		HomeHeader,
		HomeFooter
	},
	data: () => {
		return {
			sideLinks: [],
			accountType: "",
			allowedPages: {
				all: ["home", "about", "terms", "accessDenied"],
				guest: ["masterRegistration"],
				client: ["clientOrders", "clientOrderResponses", "clientMasterReviews", "clientMasterProfile", "settings", "clientMasterProfile"],
				master: ["masterProfile", "masterBalance", "masterOrders", "settings", "clientMasterProfile"],
			}
		};
	},
	async created() {
		await this.$store.dispatch("general/getLoginStatus");

		switch (this.loginData.user.type_code) {
			case "m":
				this.accountType = "master"
				this.sideLinks = [
					{ label: "Заявки", href: "/master", active: this.activeMenu == "/master" },
					{ label: "Профиль", href: "/master/profile", active: this.activeMenu == "/master/profile" },
					{ label: "Отзывы", href: "/master/reviews", active: this.activeMenu == "/master/reviews" },
					{ label: "Баланс", href: "/master/balance", active: this.activeMenu == "/master/balance" },
					{ label: "Настройки", href: "/settings", active: this.activeMenu == "/settings" },
				];

				if (!~this.allowedPages.master.indexOf(this.$route.name) && !~this.allowedPages.all.indexOf(this.$route.name)) {
					console.log("not allowed");
					this.$router.push("/");
				}
				break;

			case "c":
				this.accountType = "client"
				this.sideLinks = [
					{ label: "Заявки", href: "/bids", active: this.activeMenu == "/bids" },
					{ label: "Настройки", href: "/settings", active: this.activeMenu == "/settings" },
				];

				if (!~this.allowedPages.client.indexOf(this.$route.name)) {
					this.$router.push("/");
				}
				break;
		}
	},
	methods: {
		compareLink(link) {
			return location.pathname === link;
		},
	},
	computed: {
		...mapState({
			loginData: (state) => state.loginData.data,
		}),
		activeMenu() {
			return location.pathname;
		},
	},
	watch: {
		"$route.params": function () {
			this.sideLinks.map((link) => {
				link.active = link.href === location.pathname;
				return link;
			});
			//Vue.forceUpdate();
		},
	},
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
			// background: #fff;
			margin-top: 20px;
			margin-left: 15px;

			.menu-content {
				background: #fff;
				border-radius: 15px;
				box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
				overflow: hidden;

				a {
					display: block;
					padding: 15px 30px;
					color: #4f4f4e;
					font-size: 18px;

					&:hover {
						background: #fafafa;
					}

					&.active {
						background: #6B3752;
						color: #fff;
					}
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
