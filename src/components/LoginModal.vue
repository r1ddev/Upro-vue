<template>
	<a-modal title="Регистрация" :visible="visible" @cancel="$emit('cancel');" :footer="null">
		<!-- v-if="registerStep === 1" -->
		<a-form @submit.prevent="sendPhone" key="enterPhone" class="enterPhone">
			<a-form-item label="Введите номер телефона для получения доступа в личный кабинет">
				<a-input
					@keydown="isNumber($event)"
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
					<!-- <otp-input
						:change="otpchange"
						v-model="confirmCode"
						:length="6"
						class
						fieldClass="otp-input"
						size="24"
					></otp-input> -->

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

					<!-- <input
						type="text"
						@keydown="isNumber($event)"
						@input="otpchange"
						class="otp"
						maxlength="6"
						v-model="confirmCode" />-->
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
	</a-modal>
</template>

<script>
import api from "../classes/api";
import OTPInput8 from "@8bu/vue-otp-input";
import OtpInput from "@bachdgvn/vue-otp-input";

export default {
	props: ["visible"],
	components: {
		"otp-input": OTPInput8,
		"v-otp-input": OtpInput
	},
	data() {
		return {
			registerPhonePrefix: "+7",
			registerPhone: "",
			confirmCode: "",
			isLoading: false,
			registerStep: 1,
			confirmStep: {
				isLoading: false
			}
		};
	},
	methods: {
		otpchange(v) {
			// evt = evt ? evt : window.event;
			// var charCode = evt.which ? evt.which : evt.keyCode;
			// if (
			// 	charCode > 31 &&
			// 	(charCode < 48 || charCode > 57) &&
			// 	charCode !== 46
			// ) {
			// 	evt.preventDefault();
			// } else {
			// 	return true;
			// }
		},

		handleOnComplete(value) {
			this.confirmCode = value
		},
		handleOnChange(value) {
			this.confirmCode = value
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
				.sendPhone(this.registerPhone)
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

					console.log("this.$emit registerComplete");
					this.$emit("registerComplete");
					
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

<style lang="less">
.otp-input input {
	width: 100%;
	height: 100%;
	border: 1px solid #ced4da;
	padding: 0.375rem 0.75rem;
	border-radius: 0.25rem;
	width: 3rem;
	text-align: center;
	margin-left: 10px;
}

.otp-input-3 {
	width: 100%;
	height: 100%;
	border: 1px solid #ced4da;
	padding: 0.375rem 0.75rem;
	border-radius: 0.25rem;
	max-width: 3rem;
	text-align: center;
	margin-left: 10px;
	font-size: 27px;

	&::-webkit-inner-spin-button,
	&::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
}

.otp-input-8 {
	display: flex;
	list-style: none;
	margin: 0;
	padding: 0;
}

.otp {
	// background: url('https://i.ibb.co/VVtv9gs/Screenshot-1.png');
	background-image: url("https://i.ibb.co/VVtv9gs/Screenshot-1.png"),
		url("https://i.ibb.co/VVtv9gs/Screenshot-1.png"),
		url("https://i.ibb.co/VVtv9gs/Screenshot-1.png"),
		url("https://i.ibb.co/VVtv9gs/Screenshot-1.png"),
		url("https://i.ibb.co/VVtv9gs/Screenshot-1.png"),
		url("https://i.ibb.co/VVtv9gs/Screenshot-1.png");
	background-repeat: no-repeat, no-repeat, no-repeat;
	background-position: 0 top, 50px top, 100px top, 150px top, 200px top,
		250px top;

	height: 45px;
	border: none;
	padding: 0;
	margin: 0;
	font-size: 25px;
	letter-spacing: 36px;
	padding-left: 17px;
	width: 350px;
	display: block;
	margin-left: 8px;
}
</style>