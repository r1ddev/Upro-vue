<template>
	<div>
		<LoginModal
			:visible="loginModal"
			@registerComplete="registerComplete()"
			@cancel="loginModal = false"
		/>

		<NewBidModal
			:visible="newBidModalVisible"
			@cancel="newBidModalVisible = false"
			@orderComlete="orderComlete($event)"
		/>

		<el-dialog
			title
			:visible.sync="mobileMenuOpened"
			:fullscreen="true"
			:modal="false"
			custom-class="menuFullscreen"
			:show-close="false"
			:close-on-click-modal="false"
			:lock-scroll="true"
			class="loginModal"
		>
			<div>
				<a href="tel:8 (910) 282-53-40" class="header-menu-link"
					>8 (910) 282-53-40</a
				>
			</div>

			<div v-if="page == 'home'" class="mt-5">
				<div v-if="!this.$store.getters['general/isLogin']">
					<router-link
						to="/masterRegistration"
						class="header-menu-link"
						>Вы мастер?</router-link
					>
				</div>
				<div>
					<router-link to="/about" class="header-menu-link"
						>Часто задаваемые вопросы</router-link
					>
				</div>
				<div v-if="!this.$store.getters['general/isLogin']">
					<a
						href="#"
						class="header-menu-link"
						@click.prevent="openLoginModal"
						>Вход/Регистрация</a
					>
				</div>
				<div v-else>
					<router-link :to="orderLink" class="header-menu-link"
						>Личный кабинет</router-link
					>
				</div>
			</div>

			<div v-if="page == 'client'" class="mt-5">
				<div v-for="(link, index) in links" :key="index">
					<router-link
						@click.native="mobileMenuOpened = false"
						:to="link.href"
						:class="
							'header-menu-link' + (link.active ? ' active' : '')
						">
						{{ link.label }}
					</router-link>
				</div>

				<div>
					<a
						href="#"
						class="header-menu-link"
						@click.prevent="
							newBidModalVisible = true; mobileMenuOpened = false
						"
						>Создать заявку</a
					>
				</div>
				<div>
					<a
						href="#"
						class="header-menu-link"
						@click.prevent="logout()"
						>Выход</a
					>
				</div>
			</div>

			<div v-if="page == 'master'" class="mt-5">
				<div v-for="(link, index) in links" :key="index">
					<router-link
						@click.native="mobileMenuOpened = false"
						:to="link.href"
						:class="
							'header-menu-link' + (link.active ? ' active' : '')
						">
						{{ link.label }}
					</router-link>
				</div>
				<div>
					<a
						href="#"
						class="header-menu-link"
						@click.prevent="logout()">
						Выход
					</a>
				</div>
			</div>
		</el-dialog>

		<section
			:class="'header-menu' + (mobileMenuOpened ? ' fixed-menu' : '')"
		>
			<div class="px-4">
				<div class="desktopMenu row justify-content-between">
					<div class="col-md-auto">
						<div class="row d-flex align-items-center h-100">
							<div class="col-auto">
								<router-link to="/" class="header-menu-logo" />
							</div>
							<div class="col-auto">
								<el-select
									value="0"
									placeholder="Город"
									class="header-menu-link"
								>
									<el-option value="0" label="Воронеж" />
								</el-select>
							</div>
							<div class="col-auto">
								<a
									href="tel:8 (910) 282-53-40"
									class="header-menu-link"
									>8 (910) 282-53-40</a
								>
							</div>
						</div>
					</div>
					<div class="col-md-auto">
						<div
							class="row d-flex align-items-center h-100"
							v-if="page == 'home'"
						>
							<div
								class="col-auto"
								v-if="!this.$store.getters['general/isLogin']"
							>
								<router-link
									to="/masterRegistration"
									class="header-menu-link"
									>Вы мастер?</router-link
								>
							</div>
							<div class="col-auto">
								<router-link
									to="/about"
									class="header-menu-link"
									>Часто задаваемые вопросы</router-link
								>
							</div>
							<div
								class="col-auto"
								v-if="!this.$store.getters['general/isLogin']"
							>
								<a
									href="#"
									class="header-menu-link"
									@click.prevent="openLoginModal"
									>Вход/Регистрация</a
								>
							</div>
							<div
								class="col-auto"
								v-if="this.$store.getters['general/isLogin']"
							>
								<router-link :to="orderLink" class="header-menu-link"
									>Личный кабинет</router-link
								>
							</div>
							<div
								class="col-auto"
								v-if="this.$store.getters['general/isLogin']"
							>
								<a
									href="#"
									class="header-menu-link"
									@click.prevent="logout()"
									>Выход</a
								>
							</div>
						</div>

						<div
							class="row d-flex align-items-center h-100"
							v-if="page == 'client'"
						>
							<div class="col-auto">
								<a
									href="#"
									class="header-menu-link"
									@click.prevent="
										newBidModalVisible = true
									"
									>Создать заявку</a
								>
							</div>
							<div class="col-auto">
								<a
									href="#"
									class="header-menu-link"
									@click.prevent="logout()"
									>Выход</a
								>
							</div>
						</div>

						<div
							class="row d-flex align-items-center h-100"
							v-if="page == 'master'"
						>
							<div class="col-auto">
								<a
									href="#"
									class="header-menu-link"
									@click.prevent="logout()"
									>Выход</a
								>
							</div>
						</div>
					</div>
				</div>

				<div :class="'mobileMenu row justify-content-between'">
					<div class="col-auto p-0">
						<router-link to="/" class="header-menu-logo" />
					</div>
					<div class="col-auto flex-center p-0">
						<el-select
							value="0"
							placeholder="Город"
							class="header-menu-link"
						>
							<el-option value="0" label="Воронеж" />
						</el-select>
					</div>
					<div class="col-auto flex-center p-0">
						<button
							class="navbar-toggler"
							type="button"
							@click.prevent="
								mobileMenuOpened = !mobileMenuOpened
							"
						>
							<span class="navbar-toggler-icon">
								<transition
									name="translate-slide"
									mode="out-in"
								>
									<a-icon
										type="close"
										v-if="mobileMenuOpened"
										key="asd"
									/>
									<a-icon type="menu" v-else key="asd1" />
								</transition>
							</span>
						</button>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import LoginModal from "./LoginModal";
import api from "../classes/api";
import NewBidModal from '../components/NewBidModal'


import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers("general");

export default {
	props: {
		page: {
			default: "home",
			type: String,
		},
		links: Array,
	},
	components: {
		LoginModal,
		NewBidModal
	},
	data() {
		return {
			loginModal: false,
			mobileMenuOpened: false,
			dialogVisible: false,
			newBidModalVisible: false
		};
	},
	methods: {
		openLoginModal() {
			this.mobileMenuOpened = false;
			this.loginModal = true;
		},
		registerComplete() {
			this.$parent.registerComplete();
		},
		orderComlete () {
			//this.getOrders();
			alert("Горячая главиша для обновления списка заявок -- F5")
			
			this.newBidModalVisible = false;
		},
		logout() {
			api.account
				.logout()
				.then((res) => {
					this.$message.success("Вы успешно вышли из аккаунта");

					this.$store.dispatch("general/removeToken");
					this.$router.push("/");
				})
				.catch((e) => {
					api.errorHandler(e, this, {
						401: () => {
							this.$message.error("Ошибка авторизации");
							this.$store.dispatch("general/removeToken");
							this.$router.push("/");
						},
					});
				});
		},
	},
	computed: {
		...mapState({
			loginData: (state) => state.loginData.data,
		}),
		orderLink() {
			if (this.loginData.user) {
				return this.loginData.user.type_code == "c" ? "/bids" : "/master"
			}
			
			// console.log("this.$store.state.general.loginData.data.user", this.$store.state.general.loginData.data.user.type_code);
			// return 
		}
	},
	created () {
		console.log(!!this.loginData);
		console.log(JSON.stringify(this.loginData));
	}
	// beforeDestroy() {
	// 	console.log("HomeHeader beforeDestroy");
	// 	console.log("HomeHeader beforeDestroy", document.body.style.overflow);
	// 	document.body.style.overflow = ''
	// 	console.log("HomeHeader beforeDestroy", document.body.style.overflow);
	// }
};
</script>

<style lang="less" scoped>
.header-menu {
	color: #6b3752;
	box-shadow: 0px 3px 3px 0px rgba(100, 100, 100, 0.5);
	position: relative;
	z-index: 1;
}

::v-deep .loginModal {
	&.el-dialog__wrapper {
		margin-top: 56px;
	}
}
.header-menu-logo {
	background: url(../assets/img/logo-mini.png) center center no-repeat;
	width: 110px;
	height: 56px;
	display: block;
	background-size: contain;

	@media screen and (max-width: 400px) {
		width: 80px;
	}
}

.header-menu-link {
	color: #6b3752;
	font-size: 17px;
	text-decoration: none;

	::v-deep .el-input__inner {
		border: none;
	}

	::v-deep .el-input {
		width: 160px;
		color: #6b3752;
		font-size: 17px;

		@media screen and (max-width: 400px) {
			width: 140px;
		}
	}
}

::v-deep .menuFullscreen {
	box-shadow: inset 0 7px 7px -10px black;

	.header-menu-link {
		color: #6b3752;
		display: block;
		padding: 8px 1.5rem !important;
		transition: 0.2s;
		border-radius: 40px;
		word-break: break-word;

		&:hover {
			background: #ddd;
			color: #2b0f20;
		}
	}
}

::v-deep .menuFullscreen,
.mobileMenu {
	display: none;
}

@media screen and (max-width: 1100px) {
	.header-menu-link {
		font-size: 22px !important;
	}

	.desktopMenu {
		display: none;
	}
	.mobileMenu {
		display: flex;
	}

	.fixed-menu {
		top: 0;
		position: fixed;
		left: 0;
		width: 100%;
		background: #fff;
	}

	::v-deep .menuFullscreen {
		display: block;
		position: fixed;
		// top: 56px;
		left: 0;
		width: 100%;
		background: #fff;
		z-index: 2;

		height: calc(100% - 56px);
		pointer-events: all;

		.el-dialog__header {
			display: none;
		}

		.el-dialog__body {
			display: flex;
			// justify-content: space-between;
			flex-direction: column;
			height: 100%;
		}
	}
	.navbar-toggler {
		outline: none;

		&:focus {
			box-shadow: 0px 0 3px 0px #ffdede;
		}
	}
}
</style>
