<template>
	<div class="root">

		<a-modal
			title="Регистрация"
			:visible="loginModal"
			@cancel="loginModal = false"
			:footer="null">

			<transition name="translate-fade" mode="out-in">
				<a-form @submit.prevent="sendPhone" v-if="registerStep === 1" key="enterPhone" class="enterPhone">
					<a-form-item label="Для регистрации, введите Ваш номер телефона">
						<a-input
							@keypress="isNumber($event)"
							v-model="registerPhone"
							v-decorator="[
								'phone', {
									rules: [{ required: true, message: 'Введите ваш номер' }],
								},
							]"
							style="width: 100%"
						>

							<a-select
								v-model="registerPhonePrefix"
								slot="addonBefore"
								v-decorator="['prefix']"
								style="width: 70px"
							>
								<a-select-option value="7">
									+7
								</a-select-option>
							</a-select>
						</a-input>
					</a-form-item>
					<a-form-item>
						<a-button html-type="submit" type="primary" size="large" :disabled="!registerPhone" :loading="isLoading">Далее<a-icon type="right" /></a-button>
					</a-form-item>
				</a-form>

			

				<a-form @submit.prevent="sendConfirmCode" v-if="registerStep === 2" key="comfirmPhone" class="comfirmPhone">
					<a-form-item label="Введите код из смс">
						<a-input
							v-model="confirmCode"
							v-decorator="[
								'phone',
								{
									rules: [{ required: true, message: 'Введите код из смс' }],
								},
							]"
							style="width: 100%"
						>

						</a-input>
					</a-form-item>
					<a-form-item>
						<a-button html-type="submit" type="primary" size="large" :disabled="!confirmCode" :loading="confirmStep.isLoading">Зарегистрироваться</a-button>
					</a-form-item>
				</a-form>

			</transition>
		</a-modal>

		<section class="header-menu">
			<div class="container">
				<div class="row justify-content-between">
					<div class="col-md-auto">
						<div class="row d-flex align-items-center h-100">
							<div class="col-auto">
								<a href="/" class="header-menu-logo"></a>
							</div>
							<div class="col-auto">
								<a href="#" class="header-menu-link">Москва</a>
							</div>
							<div class="col-auto">
								<a href="#" class="header-menu-link">8-999-999-99-99</a>
							</div>
						</div>
					</div>
					<div class="col-md-auto">
						<div class="row d-flex align-items-center h-100">
							<div class="col-auto">
								<router-link :to="this.$store.state.routesLinks.about" class="header-menu-link">Часто задаваемы вопросы</router-link>
							</div>
							<div class="col-auto" v-if="!this.$store.getters.isLogin">
								<a href="#" class="header-menu-link" @click.prevent="loginModal = true">Вход/Регистрация</a>
							</div>
							<div class="col-auto" v-else>
								<router-link :to="this.$store.state.routesLinks.bids" class="header-menu-link">Личный кабинет</router-link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section class="header">
			<div class="">
				<div class="flex-center text-center header-image">
					<a href="#" class="btn yp-btn yp-btn-fill yp-btn-large">Начать поиск</a>
					<div class="header-title mt-5">Более 1000 мастеров и салонов будут конкурировать за Вас</div>
					<div class="header-description">ВЫБЕРИТЕ СВОЕГО МАСТЕРА КРАСОТЫ</div>
				</div>
			</div>
		</section>
		
		<section class="form">
			<div class="container py-5">
				<HomeForm ref="homeform"/>
			</div>
		</section>

		<section class="about">
			<div class="container px-5 pt-5">
				<div class="about-title mb-5">Как работает YOUR PRO?</div>
				<div class="row">
					<div class="col-6">
						<div class="about-item about-item-first">
							<div class="about-item-title">Создаёте заявку</div>
							<div class="about-item-description">с кратким описанием работ и желаемой датой ремонта. Потратите не более 3 минут</div>
						</div>
					</div>
					<div class="col-6">
						<div class="about-item about-item-third">
							<div class="about-item-title">Сравниваете ответы</div>
							<div class="about-item-description">наиболее подходящие по стоимости, отзывам и другим параметрам</div>
						</div>
					</div>
				</div>
				<div class="row mt-4">
					<div class="col-6">
						<div class="about-item about-item-second">
							<div class="about-item-title">Получаете предложения</div>
							<div class="about-item-description">от специализированных автосервисов по SMS или в личном кабинете</div>
						</div>
					</div>
					<div class="col-6">
						<div class="about-item about-item-fourth">
							<div class="about-item-title">Подтверждаете запись</div>
							<div class="about-item-description">а также все условия ремонта и можно смело ехать в автосервис</div>
						</div>
					</div>
				</div>
				<div class="about-button flex-center p-6 mt-5">
					<div class="row">
						<div class="col-auto">
							<div class="about-button-star"></div>
						</div>
						<div class="col-auto">
							<a href="#" class="btn yp-btn yp-btn-large">Записаться к мастеру</a>
						</div>
						<div class="col-auto">
							<div class="about-button-star"></div>
						</div>
					</div>
					
				</div>
			</div>
		</section>

		<section class="features">
			<div class="container p-5">
				<div class="features-title mb-5">Почему именно мы?</div>
				<div class="row">
					<div class="col-4">
						<div class="features-item features-item-first">
							<div class="features-item-title">100+</div>
							<div class="features-item-description">Мастеров и салонов</div>
						</div>
					</div>

					<div class="col-4">
						<div class="features-item features-item-second">
							<div class="features-item-title">11тыс.</div>
							<div class="features-item-description">Клиентов</div>
						</div>
					</div>

					<div class="col-4">
						<div class="features-item features-item-third">
							<div class="features-item-title">более 1000</div>
							<div class="features-item-description">Реальных отзывов и оценок</div>
						</div>
					</div>
				</div>

				<div class="row mt-5">
					<div class="col-4">
						<div class="features-item features-item-fourth">
							<div class="features-item-title">10 минут</div>
							<div class="features-item-description">Среднее время ответа мастера на заявку</div>
						</div>
					</div>

					<div class="col-4">
						<div class="features-item features-item-fifth">
							<div class="features-item-title">до 100%</div>
							<div class="features-item-description">Скидки и бонусы для клиентов</div>
						</div>
					</div>

				</div>
			</div>
		</section>

		<section class="footer">
			<div class="container p-5">
				<div class="row d-flex justify-content-between align-items-center">
					<div class="col-auto">
						<a href="#" class="footer-link">Часто задаваемы вопросы</a>
					</div>
					<div class="col-auto">
						<div class="row justify-content-end">
							<a href="#" class="footer-link">yourpro@mail.ru</a>
						</div>
						<div class="row mt-3">
							<a href="#" class="footer-link">Пользовательское соглашение</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<style lang="less">
body {
	font-family: Century Gothic,CenturyGothic,AppleGothic,sans-serif!important;
}
.header-menu {
	color: #6b3752;
}
.header-menu-logo {
	background: url(../assets/img/logo-mini.png) center center no-repeat;
    width: 110px;
    height: 56px;
    display: block;
    background-size: contain;
}
.header-menu-link {
	font-size: 17px;
	color: #6b3752;
}
</style>

<style lang="less" scoped>


.header-image {
	flex-direction: column;
    background: url(../assets/img/ФОТО\ ДЕВУШКИ.png) center center no-repeat;
	background-size: cover;
	padding: 140px 0 60px;
}
.header-title {
	color: #ffffff;
	font-size: 20.5px;
}
.header-description {
	color: #ffffff;
	font-size: 39px;
	font-weight: bold;
}

.form {
	background-color: #f4e6ee;
}


.about-title {
	color: #825b76;
	text-align: center;
	font-size: 40px;
}
.about-item-title {
	color: #f93d9f;
	font-weight: bold;
	font-size: 30px;
}
.about-item-description {
	color: #5c4754;
	font-size: 20px;
}
.about-item {
	padding-left: 100px;
	background-position: left center;
	background-repeat: no-repeat;
	background-size: auto 100px;
}
.about-item-first {
	background-image: url(../assets/img/1.png);
}
.about-item-second {
	background-image: url(../assets/img/2.png);
}
.about-item-third {
	background-image: url(../assets/img/3.png);
}
.about-item-fourth {
	background-image: url(../assets/img/4.png);
}
.about-button {
	border-top: 3px solid #f93d9f;
}
.about-button-star {
	height: 75px;
	width: 75px;
	background-image: url(../assets/img/867875.png);
	background-position: center center;
	background-repeat: no-repeat;
	background-size: contain;
}

.features {
	background: #f4e6ee;
}
.features-title {
	color: #382835;
	text-align: center;
	font-size: 40px;
}
.features-item {
	padding-left: 70px;
    background-position: left top;
    background-repeat: no-repeat;
    background-size: auto 60px;
}
.features-item-title {
	color: #f93d9f;
	font-size: 35px;
	font-weight: bold;
}
.features-item-description {
	color: #2b0f20;
	font-size: 20px;
}
.features-item-first {
	background-image: url(../assets/img/149285.png);
}
.features-item-second {
	background-image: url(../assets/img/149452.png);
}
.features-item-third {
	background-image: url(../assets/img/149217.png);
}
.features-item-fourth {
	background-image: url(../assets/img/149316.png);
}
.features-item-fifth {
	background-image: url(../assets/img/149206.png);
}

.footer-link {
	color: #624053;
	font-size: 24px;
}

</style>

<script>
import HomeForm from '../components/HomeForm.vue'
import Vuex from 'vuex'
import axios from 'axios'
// @ is an alias to /src

export default {
	name: 'home',
	components: {
		HomeForm
	},
	data: function () {
		return {
			registerPhonePrefix: "+7",
			registerPhone: null,
			confirmCode: null,
			loginModal: false,
			registrationLoading: false,
			isLoading: false,
			registerStep: 1,
			confirmStep: {
				isLoading: false
			},
			requestBidAfterRegister: false
		}
	},
	methods: {
		isNumber: function(evt) {
			evt = (evt) ? evt : window.event;
			var charCode = (evt.which) ? evt.which : evt.keyCode;
			if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
				evt.preventDefault()
			} else {
				return true;
			}
		},
		async sendPhone() {
			//this.registrationLoading = true,
			//this.loginModal = false
			this.isLoading = true


			let fd = new FormData()
			fd.append("phone", parseInt(this.registerPhonePrefix) + this.registerPhone)
			let response = await axios.post(this.$store.state.server + "/reg", fd)

			if (response.data.status) {
				this.registerStep = 2
			} else {
				this.$message.error('Произошла ошибка сервера. Мы уже знаем о ней и делаем все, чтобы её исправить!')
			}

		},
		async sendConfirmCode() {
			//this.registrationLoading = true,
			//this.loginModal = false
			this.confirmStep.isLoading = true


			let fd = new FormData()
			fd.append("phone", parseInt(this.registerPhonePrefix) + this.registerPhone)
			fd.append("code", this.confirmCode)

			let response = await axios.post(this.$store.state.server + "/confirm", fd)

			if (response.data.status) {
				this.$message.success('Регистрация успешна!')
				this.$store.dispatch('saveToken', response.data.token)

				if (this.requestBidAfterRegister) {
					//this.$refs.homeform
				}

				this.$router.push(this.$store.state.routesLinks.bids)
			} else {
				switch (response.data.message) {
					case 'Incorrect code':
						this.$message.error('Введен неверный код')
						this.confirmStep.isLoading = false
						break;
				
					default:
						this.$message.error('Произошла ошибка сервера. Мы уже знаем о ней и делаем все, чтобы её исправить!')
						this.confirmStep.isLoading = false
						break;
				}
				
			}

		},
	},
}
</script>
