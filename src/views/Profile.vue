<template>
	<div class="profile full-height">
		<HomeHeader page="master" />

		<AccountTemplate
			:sideLinks="[
				{label:'Заявки', href: this.$store.state.routesLinks.master},
				{label:'Профиль', href: this.$store.state.routesLinks.masterProfile, active: true}
			]"
		>
			<template v-slot:account-menu>
				<div class="row flex-center mt-4">
					<div class="verify-status">Статус: Верифицирован</div>
				</div>
			</template>

			<template v-slot:account-content>
				<section class="bids-list mb-5">
					<div class="container">
						<div class="bid">
							<div class="title">Ваш профиль</div>
							<div class="row">
								<div class="col-3">
									<div class="avatar">
										<div class="label">Аватар профиля:</div>
										<img
											src="https://www.google.ru/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
										/>
									</div>
								</div>
								<div class="col d-flex justify-content-center flex-column">
									<div class="label">Ваше имя</div>
									<el-input placeholder="Введите имя" maxlength="30" v-model="username" />
								</div>
							</div>
							<div class="mt-4">
								<div class="label">Ваши виды деятельности:</div>
								<el-select
									filterable
									placeholder="Выберите из списка"
									v-model="master"
									change="change"
									class="w-100"
								>
									<el-option value="1" label="Визажист" />
									<el-option value="2" label="Косметолог" />
									<el-option value="3" label="Массажист" />
									<el-option value="4" label="Мастер по маникюру" />
									<el-option value="5" label="Мастер по наращиванию ресниц" />
									<el-option value="6" label="Мастер эпиляции" />
									<el-option value="7" label="Парикмахер" />
								</el-select>
							</div>

							<div class="row mt-4">
								<div class="col-md-6">
									<div class="label">Ваши виды деятельности:</div>
									<el-select filterable placeholder="Город" v-model="city" class="w-100">
										<el-option value="1" label="Воронеж" />
									</el-select>
								</div>

								<div class="col-md-6">
									<div class="label">Контактный телефон:</div>
									<el-input placeholder="+79999999999" v-model="phone"></el-input>
								</div>
							</div>

							<div class="mt-4">
								<div class="label">Галерея работ:</div>

								<hooper :itemsToShow="4" style="height: auto;">
									<slide style="width: 197.07px;">
										<img
											src="http://api-lunacy.icons8.com/api/assets/453c59fc-d05f-41d3-93f1-464f741fb3a5/Фото-5.png"
											alt
											srcset
										/>
									</slide>
									<slide style="width: 197.07px;">
										<img
											src="http://api-lunacy.icons8.com/api/assets/453c59fc-d05f-41d3-93f1-464f741fb3a5/Фото-5.png"
											alt
											srcset
										/>
									</slide>
									<slide style="width: 197.07px;">
										<img
											src="http://api-lunacy.icons8.com/api/assets/453c59fc-d05f-41d3-93f1-464f741fb3a5/Фото-5.png"
											alt
											srcset
										/>
									</slide>
									<slide style="width: 197.07px;">
										<img
											src="http://api-lunacy.icons8.com/api/assets/453c59fc-d05f-41d3-93f1-464f741fb3a5/Фото-5.png"
											alt
											srcset
										/>
									</slide>
									<slide style="width: 197.07px;">
										<img
											src="http://api-lunacy.icons8.com/api/assets/453c59fc-d05f-41d3-93f1-464f741fb3a5/Фото-5.png"
											alt
											srcset
										/>
									</slide>
									<slide style="width: 197.07px;">
										<img
											src="http://api-lunacy.icons8.com/api/assets/453c59fc-d05f-41d3-93f1-464f741fb3a5/Фото-5.png"
											alt
											srcset
										/>
									</slide>
									<slide style="width: 197.07px;">
										<img
											src="http://api-lunacy.icons8.com/api/assets/453c59fc-d05f-41d3-93f1-464f741fb3a5/Фото-5.png"
											alt
											srcset
										/>
									</slide>
									<hooper-navigation slot="hooper-addons"></hooper-navigation>
								</hooper>
							</div>

							<div class="mt-4">
								<div class="label">Расскажите о себе:</div>

								<el-input
									type="textarea"
									placeholder="Я мастер"
									:autosize="{ minRows: 4, maxRows: 4}"
									maxlength="1000"
									v-model="description"
								/>
							</div>
						</div>
					</div>
				</section>
			</template>
		</AccountTemplate>

		<HomeFooter style="border-top: 1px solid #B2B2B2;" />
	</div>
</template>

<script>
import HomeHeader from "../components/HomeHeader";
import HomeFooter from "../components/HomeFooter";
import AccountTemplate from "../components/AccountTemplate";

import "../assets/css/yp-el.less";

import { Hooper, Slide, Navigation as HooperNavigation } from "hooper";
import "hooper/dist/hooper.css";

export default {
	components: {
		HomeHeader,
		AccountTemplate,
		HomeFooter,
		Hooper,
		Slide,
		HooperNavigation
	},
	data: function() {
		return {
			username: "",
			master: undefined,
			speciality: [],
			city: "1",
			phone: "",
			description: ""
		};
	},
	methods: {
		change() {}
	}
};
</script>

<style lang="less" scoped>
.verify-status {
	border-radius: 20px;
	padding: 10px 20px;
	background: #ffffff;
	box-shadow: 0px 2px4px rgba(100, 100, 100, 0.5);
	font-size: 14px;
}

.bids-list {
	.container {
		padding: 0 150px;
	}

	.bid {
		box-shadow: 0px 2px4px rgba(100, 100, 100, 0.5);

		width: 100%;
		padding: 7px 25px;
		border-radius: 18px;
		background: #fff;

		.title {
			color: #4f4f4e;
			font-size: 22px;
			text-align: center;
		}

		.label {
			font-size: 12px;
			color: #4f4f4e;
			margin-bottom: 3px;
		}

		.field {
			border: solid 1px #e9378d;
			box-shadow: 0px 1px 4px -1px rgba(100, 100, 100, 0.5);
			padding: 10px 15px;
			border-radius: 6px;
		}

		.field-text {
			.field();
			height: 100px;
		}

		.field-time {
			padding: 7px 0px;
			text-align: center;
		}

		.avatar {
			img {
				width: 100%;
				border: 1px solid #e9378d;
				border-radius: 5px;
			}
		}

		.image {
			.field();
			width: 100%;
			height: 100%;
			object-fit: contain;
		}
	}
}
</style>