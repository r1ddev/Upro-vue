<template>
	<div class="root">
		<HomeHeader
			ref="homeHeader"
			@registerComplete="registerComplete"
			:links="[
				{label:'Вы мастер?', href: '/masterRegistration', active: true},
				{label:'Часто задаваемые вопросы', href: '/about'}
			]"
		/>

		<section class="header">
			<div class>
				<div class="flex-center text-center header-image">
					<a href="#" class="btn yp-btn yp-btn-large" @click.prevent="scrollToForm()">Начать поиск</a>
					<div class="header-title mt-5">Более 1000 мастеров и салонов будут конкурировать за Вас</div>
					<div class="header-description">ВЫБЕРИТЕ СВОЕГО МАСТЕРА КРАСОТЫ</div>
				</div>
			</div>
		</section>

		<section class="form">
			<div class="container py-5">
				<HomeForm ref="homeform" />
			</div>
		</section>

		<section class="about">
			<div class="container px-5 pt-5">
				<div class="about-title mb-4">Как работает YOUR PRO?</div>

				<div class="row">
					<div class="col-md-6">
						<div class="about-item about-item-first mt-4">
							<div class="about-item-title">Создаёте заявку</div>
							<div
								class="about-item-description"
							>С кратким описанием работ и желаемой датой и временем. Потратите менее трех минут</div>
						</div>

						<div class="about-item about-item-second mt-4">
							<div class="about-item-title">Получаете предложения</div>
							<div
								class="about-item-description"
							>От салонов и частных профессионалов по SMS и в личном кабинете</div>
						</div>
					</div>
					<div class="col-md-6">
						<div class="about-item about-item-third mt-4">
							<div class="about-item-title">Сравниваете ответы</div>
							<div
								class="about-item-description"
							>Чтобы выбрать лучший вариант на основе отзывов, стоимости и других параметров</div>
						</div>

						<div class="about-item about-item-fourth mt-4">
							<div class="about-item-title">Подтверждаете запись</div>
							<div class="about-item-description">И выбираете время визита. И все! Мастер Вас ждет!</div>
						</div>
					</div>
				</div>

				<div class="about-button p-6 mt-5">
					<div class="row flex-center">
						<div class="col-lg-auto flex-center">
							<div class="about-button-star"></div>
						</div>
						<div class="col-lg-auto flex-center">
							<a
								href="#"
								class="btn yp-btn yp-btn-large outline"
								@click.prevent="scrollToForm()"
							>Записаться к мастеру</a>
						</div>
						<div class="col-lg-auto flex-center">
							<div class="about-button-star"></div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section class="features">
			<div class="container p-5">
				<div class="features-title mb-3 mb-md-5">Почему именно мы?</div>
				<div class="row">
					<div class="col-md-4 mt-5 mt-md-3">
						<div class="features-item features-item-first">
							<div class="features-item-title">100+</div>
							<div class="features-item-description">Мастеров и салонов</div>
						</div>
					</div>

					<div class="col-md-4 mt-5 mt-md-3">
						<div class="features-item features-item-second">
							<div class="features-item-title">11 тыс.</div>
							<div class="features-item-description">Клиентов</div>
						</div>
					</div>

					<div class="col-md-4 mt-5 mt-md-3">
						<div class="features-item features-item-third">
							<div class="features-item-title">более 1000</div>
							<div class="features-item-description">Реальных отзывов и оценок</div>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col-md-4 mt-5 mt-md-3">
						<div class="features-item features-item-fourth">
							<div class="features-item-title">10 минут</div>
							<div class="features-item-description">Среднее время ответа мастера на заявку</div>
						</div>
					</div>

					<div class="col-md-4 mt-5 mt-md-3">
						<div class="features-item features-item-fifth">
							<div class="features-item-title">до 100%</div>
							<div class="features-item-description">Скидки и бонусы для клиентов</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<HomeFooter />
	</div>
</template>


<script>
import HomeForm from "../components/HomeForm.vue";
import HomeHeader from "../components/HomeHeader";
import HomeFooter from "../components/HomeFooter";
import VueScrollTo from "vue-scrollto";

export default {
	name: "home",
	components: {
		HomeForm,
		HomeHeader,
		HomeFooter
	},
	data: function() {
		return {
			requestBidAfterRegister: false
		};
	},
	methods: {
		registerComplete() {
			if (this.requestBidAfterRegister) {
				this.$refs.homeform.submit();
			}

			this.$router.push(this.$refs.homeHeader.orderLink);
		},
		openLoginModal() {
			this.$refs.homeHeader.loginModal = true;
		},
		scrollToForm() {
			VueScrollTo.scrollTo(".form");
		}
	},
	created () {
		this.$store.dispatch("general/getLoginStatus")
	}
};
</script>


<style lang="less" scoped>
.header-image {
	flex-direction: column;
	background: url(../assets/img/home_header_image.png) center center no-repeat;
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
	padding-left: 80px;
	background-position: left center;
	background-repeat: no-repeat;
	background-size: auto 70px;
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

@media screen and (max-width: 991px) {
	.about-button-star {
		margin: 20px;
	}
	.about-button {
		padding: 3rem !important;
	}

	.header-image {
		background: url(../assets/img/home_header_image_mobile.png) center
			center no-repeat;
		background-size: cover;
		background-position: center;
	}
}

@media screen and (max-width: 500px) {
	.header-image {
		padding: 60px 0 60px;
		background-position: center;
	}
}
</style>