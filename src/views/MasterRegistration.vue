<template>
	<div class="masterRegistration">
		<HomeHeader ref="homeHeader" />

		<div class="page p-4">
			<div class="container container-rs py-5">
				<div class="form p-4 px-5">
					<div class="title">Вход для мастера</div>

					<a-form class="enterPhone" @submit.prevent="sendPhone">
						<label for>Введите номер телефона для получения кода доступа в личный кабинет</label>
						<a-form-item>
							<a-input
								@keypress="isNumber($event)"
								v-model="registerPhone"
								maxlength="10"
								v-decorator="[
									'phone',
									{
										rules: [
											{
												required: true,
												message: 'Введите ваш номер'
											}
										]
									}
								]"
								style="width: 100%"
								placeholder="9991234567"
							>
								<a-select
									v-model="registerPhonePrefix"
									slot="addonBefore"
									v-decorator="['prefix']"
									style="width: 70px"
								>
									<a-select-option value="7">+7</a-select-option>
								</a-select>
							</a-input>
						</a-form-item>

						<transition name="translate-slide" mode="out-in">
							<a-form
								@submit.prevent="sendConfirmCode"
								v-if="registerStep === 2"
								key="comfirmPhone"
								class="comfirmPhone"
							>
								<a-form-item label="Введите код из смс">
									<otp-input v-model="confirmCode" :length="6" class fieldClass="otp-input" size="24"></otp-input>
								</a-form-item>
								<a-form-item>
									<a-button
										html-type="submit"
										type="primary"
										size="large"
										:disabled="!((confirmCode || '').length == 6)"
										:loading="confirmStep.isLoading"
									>Зарегистрироваться</a-button>
								</a-form-item>
							</a-form>
						</transition>

						<a-form-item class="sendBtnWrapper">
							<a-button
								html-type="submit"
								type="primary"
								size="large"
								:disabled="!(registerPhone && registerPhone.length == 10 && registerPhone.charAt(0) == '9')"
								:loading="isLoading"
							>{{ sendCodeText }}</a-button>
						</a-form-item>
					</a-form>
				</div>
			</div>
		</div>

		<HomeFooter />
	</div>
</template>

<script>
import HomeHeader from "../components/HomeHeader";
import HomeFooter from "../components/HomeFooter";
import api from "../classes/api";
import OTPInput8 from "@8bu/vue-otp-input";

export default {
	components: {
		HomeHeader,
		HomeFooter,
		"otp-input": OTPInput8
	},
	data() {
		return {
			registerPhonePrefix: "+7",
			registerPhone: undefined,
			isLoading: false,
			registerStep: 1,
			confirmCode: "",
			confirmStep: {
				isLoading: false
			}
		};
	},
	methods: {
		isNumber: function(evt) {
			evt = evt ? evt : window.event;
			var charCode = evt.which ? evt.which : evt.keyCode;
			if (
				charCode > 31 &&
				(charCode < 48 || charCode > 57) &&
				charCode !== 46
			) {
				evt.preventDefault();
			} else {
				return true;
			}
		},
		async sendPhone() {
			this.isLoading = true;

			api.login
				.sendPhone(this.registerPhone, "m")
				.then(response => {
					this.registerStep = 2;
					this.isLoading = false;
				})
				.catch(e => {
					this.$message.error(
						"Произошла ошибка сервера. Мы уже знаем о ней и делаем все, чтобы её исправить!"
					);

					this.isLoading = false;
				});
		},
		async sendConfirmCode() {
			this.confirmStep.isLoading = true;

			api.login
				.sendConfirmCode(this.registerPhone, this.confirmCode)
				.then(response => {
					this.$message.success("Регистрация успешна!");
					this.$store.dispatch("saveToken", response.token);

					this.$router.push(this.$store.state.routesLinks.master)
				})
				.catch(e => {
					this.confirmStep.isLoading = false;

					api.errorHandler(e, this, {
						404: () => this.$message.error("Введен неверный код")
					})
				});
		}
	},
	computed: {
		sendCodeText() {
			return this.registerStep == 1
				? "Отправить код"
				: "Отправить код повторно";
		}
	}
};
</script>

<style lang="less" scoped>
.masterRegistration {
	display:flex;
	flex-direction: column;
	min-height: 100vh;

	.page {
		flex-grow: 1;
	}
}

::v-deep .ant-input-group {
	border: solid 1px #e9378d;
	box-shadow: 0px 1px4px-1px rgba(100,100,100,0.5);
	border-radius: 4px;

	.ant-input-group-addon, .ant-input {
		border: none;
		background: #fff;
	}

	.ant-input-group-addon {
		border-right: solid 1px #e9378d;
	}

}
::v-deep .ant-btn {
	border: solid 1px #f3a9cd;
	background: #f3a9cd;
	box-shadow: 0px 1px4px-1px rgba(100,100,100,0.5);

	&:disabled {
		border: solid 1px #f3a9cd;
		background: #f5f5f5;
		box-shadow: none;
	}
}

.container {
	background: #fff;
}

.sendBtnWrapper {
	text-align: center;
	justify-content: center;
	display: flex;
	flex-direction: column;
}

.page {
	background: #f8f8f8;

	.form {
		background: #fff;
		border-radius: 10px;
		display: flex;
		flex-direction: column;
		align-items: center;

		.title {
			font-size: 22px;
			text-align: center;
		}

		.comfirmPhone {
			.sendBtnWrapper()
		}

		.enterPhone {
			width: 50%;
		}
	}
}

.otp-input-8 {
	justify-content: center;
}

@media screen and (max-width: 991px) {
	.page {
		.form {
			.enterPhone {
				width: 75%;
			}
		}
	}
}

@media screen and (max-width: 575px) {
	.page {
		.form {
			.enterPhone {
				width: 100%;
			}
		}
	}
}
</style>