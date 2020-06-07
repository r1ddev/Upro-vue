<template>
	<div class="masterRegistration">
		<HomeHeader ref="homeHeader" />

		<div class="page p-4">
			<div class="container container-rs py-5">
				<div class="form p-2">
					<div class="title">Вход для мастера</div>

					<a-form @submit.prevent="sendPhone" key="enterPhone" class="enterPhone">
						<label for>Введите номер телефона для получения кода доступа в личный кабинет</label>
						<a-form-item>
							<el-input placeholder="Введите ваш номер" v-model="registerPhone" type="number" @input="validatePhone">
								<template slot="prepend">+7</template>
							</el-input>
						</a-form-item>
						<a-form-item>
							<div v-if="!(isRegisterPhoneCorrect.status)">{{ isRegisterPhoneCorrect.error }}</div>
							<a-button
								html-type="submit"
								type="primary"
								size="large"
								:disabled="!(isRegisterPhoneCorrect.status)"
								:loading="isLoading"
							>
								{{ sendCodeText.text }}
								<a-icon type="right" v-if="sendCodeText.isIcon" />
							</a-button>
						</a-form-item>
					</a-form>
					<transition name="translate-slide" mode="out-in">
						<a-form
							@submit.prevent="sendConfirmCode"
							v-if="registerStep === 2"
							key="comfirmPhone"
							class="comfirmPhone"
						>
							<a-form-item label="Введите код из смс">

								<v-otp-input
									ref="otpInput"
									input-classes="otp-input-3"
									separator
									:num-inputs="6"
									:should-auto-focus="true"
									:is-input-num="true"
									@on-change="handleOnChange"
									@on-complete="handleOnComplete"
								/>

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













					<!-- <a-form class="enterPhone" @submit.prevent="sendPhone">
						<label for>Введите номер телефона для получения кода доступа в личный кабинет</label>
						<el-input placeholder="Введите ваш номер" v-model="registerPhone" type="number" @input="validatePhone">
							<template slot="prepend">+7</template>
						</el-input>

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
					</a-form> -->
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
import OtpInput from "@bachdgvn/vue-otp-input";

export default {
	components: {
		HomeHeader,
		HomeFooter,
		"v-otp-input": OtpInput
	},
	data() {
		return {
			registerPhonePrefix: "+7",
			registerPhone: "",
			isLoading: false,
			registerStep: 1,
			confirmCode: "",
			confirmStep: {
				isLoading: false
			}
		};
	},
	methods: {
		handleOnComplete(value) {
			this.confirmCode = value;
		},
		handleOnChange(value) {
			this.confirmCode = value;
		},
		validatePhone(e) {
			if (e.length > 10) {
				this.registerPhone = e.substring(0, 10)
			}
		},
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
					this.$store.dispatch("general/saveToken", response.token);

					this.$router.push('/master');
				})
				.catch(e => {
					console.log(e);

					this.confirmStep.isLoading = false;

					api.errorHandler(e, this, {
						400: () => this.$message.error("Введен неверный код")
					});
				});
		}
	},
	computed: {
		sendCodeText() {
			return {
				text:
					this.registerStep == 1
						? "Отправить код"
						: "Отправить код повторно",
				isIcon: this.registerStep == 1
			};
		},
		isRegisterPhoneCorrect() {
			let error = "";
			let status = true;
			if (this.registerPhone.length != 10) {
				error = "Номер телефона должен содержать 10 цифр";
				status = false;
			}
			if (this.registerPhone.charAt(0) != "9") {
				error = "Номер телефона должен начинаться с цифры 9";
				status = false;
			}
			return { status: status, error: error };
		}
	}
};
</script>

<style lang="less" scoped>
.masterRegistration {
	display:flex;
	flex-direction: column;
	min-height: 100vh;
	height: calc(var(--vh, 1vh) * 100);

	.page {
		flex-grow: 1;
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