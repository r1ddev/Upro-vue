<template>
	<div class="root">
		<HomeHeader />

		<section class="about p-4">
			<div class="container container-rs p-4">
				<h1 class="text-center">Часто задаваемые вопросы</h1>

				<SlideUpDown title="1. Что такое Your Pro?">
					<div class="p-3">
						<div>
							<strong>Это бесплатный сервис</strong>, который поможет Вам найти своего мастера красоты.
							<strong>Благодаря Your Pro вы сможете:</strong>
						</div>

						<ul class="pt-3">
							<li>Выбрать удобное вам время и записаться на сеанс в любое время, из любого места</li>
							<li>Получать своевременные автоматические оповещения о предстоящих сеансах</li>
							<li>Отслеживать историю состоявшихся процедур</li>
							<li>Узнать подробности об услугах и ознакомиться с портфолио ваших мастеров</li>
							<li>Получать специальные предложения со скидками до 90%</li>
						</ul>
					</div>
				</SlideUpDown>

				<SlideUpDown title="2. Почему при регистрации нужно указывать телефон?">
					<div class="p-3">
						<ul>
							<li>Телефонный номер необходим для того, чтобы вы смогли установить связь с вашим мастером и для того, чтобы вы могли получать оповещения о предстоящих сеансах</li>
						</ul>
					</div>
				</SlideUpDown>

				<SlideUpDown title="3. Как происходит оплата?">
					<div class="p-3">
						<ul>
							<li>Вы оплачиваете услуги мастера привычным для вас способом: картой или наличными. Сервис Your Pro бесплатный.</li>
						</ul>
					</div>
				</SlideUpDown>

				<SlideUpDown title="4. Как записаться к мастеру?">
					<div class="p-3">
						<ul>
							<li>Выберите Ваш город и вид мастера</li>
							<li>Выберите желаемую дату и время визита</li>
							<li>Опишите задачу мастера</li>
							<li>В ту же секунду мастера получат уведомление о новой заявке и предложат свои условия</li>
							<li>Вы выбираете оптимальный для Вас вариант, основываясь на отзывах, местоположении, стоимости и других параметрах</li>
							<li>Подтверждаете время визита</li>
							<li>Мастер Вас ждёт!</li>
						</ul>
					</div>
				</SlideUpDown>

				<SlideUpDown title="5. Как работают уведомления?">
					<div class="p-3">
						<p>
							<strong>Вы получаете:</strong>
						</p>

						<ul>
							<li>SMS уведомления о новых откликах мастеров на заявку</li>
							<li>Напоминания о предстоящем визите</li>
						</ul>
					</div>
				</SlideUpDown>

				<!-- <div class="links">
					<a href="#" @click.prevent="scrollToAnswer(1)">1. Что такое Your Pro?</a>
					<a
						href="#"
						@click.prevent="scrollToAnswer(2)"
					>2. Почему при регистрации нужно указывать телефон?</a>
					<a href="#" @click.prevent="scrollToAnswer(3)">3. Как происходит оплата?</a>
					<a href="#" @click.prevent="scrollToAnswer(4)">4. Как записаться к мастеру?</a>
					<a href="#" @click.prevent="scrollToAnswer(5)">5. Как работают уведомления?</a>
				</div> -->

			</div>
		</section>

		<HomeFooter />
	</div>
</template>

<script>
import HomeHeader from "../components/HomeHeader";
import HomeFooter from "../components/HomeFooter";
import VueScrollTo from "vue-scrollto";
import SlideUpDown from "../components/SlideUpDown";

export default {
	components: {
		HomeHeader,
		HomeFooter,
		SlideUpDown
	},
	methods: {
		scrollToAnswer(answerIndex) {
			VueScrollTo.scrollTo("#answer-" + answerIndex);
		}
	}
};
</script>

<style lang="less" scoped>
.about {
	background: #f8f8f8;
	font-size: 16px;

	.links {
		display: flex;
		flex-direction: column;
		margin-bottom: 15px;
	}

	.container {
		background: #fff;

		ol, ul, dl {
			margin: 0!important;
		}
	}
}
</style>