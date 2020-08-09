<template>
	<div id="settings">
		<div class="container">
			<h3 class="mt-3">Настройки</h3>
			<section>
				<h4>Контактная информация</h4>
				<div class="label">электронная почта</div>
				<div class="form-item">
					<input type="email" class="inp" />
				</div>
				<div class="form-item flex-center mt-3">
					<input type="submit" class="btn" value="Сохранить" />
				</div>
			</section>

			<section class="mt-5">
				<h4>Уведомления</h4>

				<div class="row">
					<div class="col-8"></div>
					<div class="col-4">
						<div class="not-icons">
							<div class="email" v-if="notificationsList.email"></div>
							<div class="sms" v-if="notificationsList.sms"></div>
						</div>
					</div>
				</div>

				<div class="row mt-3" v-for="(notification, index) in notificationsList.list" :key="index">
					<div class="col-8">
						<div class="not-desc">
							<div class="title">{{ notification.title }}</div>
							<div class="desc">{{ notification.desc }}</div>
						</div>
					</div>

					<div class="col-4">
						<div class="cbs">
							<div class="custom-control custom-checkbox" v-if="notificationsList.email">
								<input type="checkbox" class="custom-control-input" :id="'cb' + index + 'email'" />
								<label class="custom-control-label" :for="'cb' + index + 'email'"></label>
							</div>
							<div class="custom-control custom-checkbox" v-if="notificationsList.sms">
								<input type="checkbox" class="custom-control-input" :id="'cb' + index + 'sms'" />
								<label class="custom-control-label" :for="'cb' + index + 'sms'"></label>
							</div>
						</div>
					</div>
				</div>

				<div class="form-item flex-center mt-3">
					<input type="submit" class="btn" value="Сохранить" />
				</div>
			</section>
		</div>
	</div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState: mapStateGeneral, mapActions: mapActionsGeneral } = createNamespacedHelpers("general");

export default {
	created() {
		console.log("loginData", this.loginData);
	},
	computed: {
		...mapStateGeneral({
			loginData: (state) => state.loginData.data,
		}),

		notificationsList() {
			return {
				list:
					this.loginData.user.type_code === "c"
						? [
								{
									title: "Новая заявка",
									desc: "Если Вы не увидели заявку, то мы Вам о ней расскажем!",
								},
								{
									title: "Вас выбрали",
									desc: "Если клиент выберет Ваш отклики, то мы Вас оповестим",
								},
								{
									title: "Отмена заявки",
									desc: "Если клиент отменит заявку, мы Вас сразу оповестим",
								},
						  ]
						: [
								{
									title: "Предстоящая услуга",
									desc: "Мы сообщим Вам о предстоящей услуге за 4 часа",
								},
								{
									title: "Новые отклики",
									desc: "Через 40 минут после создания заявки, мы сообщим Вам о откликах",
								},
								{
									title: "Отмена заявки",
									desc: "Если мастер отменит заявку, мы Вас сразу оповестим",
								},
						  ],
				email: true,
				sms: this.loginData.user.type_code === "c",
			};
		},
	},
};
</script>

<style lang="less" scoped>
.container {
	max-width: 621px;

	h3 {
		font-family: Roboto;
		font-style: normal;
		font-weight: bold;
		font-size: 28px;
		color: #6b3752;
		text-align: center;
	}

	h4 {
		font-family: Roboto;
		font-style: normal;
		font-weight: 500;
		font-size: 25px;
		color: #6b3752;
	}

	.label {
		font-family: Roboto;
		font-style: normal;
		font-weight: normal;
		font-size: 21px;

		color: #000000;

		opacity: 0.65;
	}

	.form-item {
		.inp {
			border: 2px solid #000000;
			border-radius: 5px;
			outline: none;
			width: 100%;
			padding: 10px 15px;
			transition: border-color 0.2s;

			&:focus {
				border-color: #666;
			}
		}

		.btn {
			background: #6b3752;
			border-radius: 10px;
			padding: 10px 30px;
			color: #fff;
			text-transform: uppercase;
			font-weight: bold;
			transition: background 0.2s;

			&:hover {
				background: #6b3752d3;
			}
		}
	}

	.not-icons {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		border-bottom: 2px solid #595959;
		padding-bottom: 5px;

		.email {
			width: 40px;
			height: 40px;
			background: url(../assets/img/email.png) center center no-repeat;
			background-size: contain;
		}

		.sms {
			width: 40px;
			height: 40px;
			background: url(../assets/img/sms.png) center center no-repeat;
			background-size: contain;
		}
	}

	.cbs {
		display: flex;
		flex-direction: row;
		justify-content: space-around;

		.custom-checkbox {
			transform: scale(1.3);

			.custom-control-label::after {
				cursor: pointer;
			}
		}
	}

	.not-desc {
		.title {
			font-family: Roboto;
			color: #000000;
			font-size: 22px;
		}

		.desc {
			font-family: Roboto;
			font-weight: 300;
			color: rgba(0, 0, 0, 0.65);
			font-size: 18px;
		}
	}
}
</style>
