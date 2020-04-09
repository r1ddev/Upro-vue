<template>
	<div class="form-wrapper py-4">
		<transition :name="translate" mode="out-in">
			<div class="position-relative" v-if="bidStep === 1" key="bid1">
				<div class="step-wrapper">
					<div class="step">
						<span class="text">ШАГ 1</span>
					</div>
				</div>
				<div class="form-title mb-1">Оставьте заявку - мы подберём мастеров</div>
				<div class="row py-4">
					<div class="col-lg-4 text-center">
						<el-select filterable placeholder="Город" v-model="city">
							<el-option value="1" label="Воронеж" />
						</el-select>
						<!-- <a-select
							showSearch
							placeholder="Город"
							optionFilterProp="children"
							v-model="city"
							class="w-50 select"
						>
							<a-select-option value="0">Воронеж</a-select-option>
						</a-select>-->
					</div>
					<div class="col-lg-5 text-center">
						<el-select filterable placeholder="Вид мастера" v-model="master">
							<el-option value="1" label="Визажист" />
							<el-option value="2" label="Косметолог" />
							<el-option value="3" label="Массажист" />
							<el-option value="4" label="Мастер по маникюру" />
							<el-option value="5" label="Мастер по наращиванию ресниц" />
							<el-option value="6" label="Мастер эпиляции" />
							<el-option value="7" label="Парикмахер" />
						</el-select>

						<!-- <a-select
							showSearch
							placeholder="Вид мастера"
							optionFilterProp="children"
							v-model="master"
							class="w-75 select"
						>
							<a-select-option
								v-for="(master, index) in masters"
								v-bind:key="index"
								:value="index"
							>{{master}}</a-select-option>
						</a-select>-->
					</div>
					<div class="col-lg-3 text-center">
						<input
							type="button"
							value="Далее"
							class="btn yp-btn outline"
							:disabled="!(city && master != undefined)"
							@click="secondSlide()"
						/>
					</div>
				</div>
			</div>

			<div class="position-relative" v-if="bidStep === 2" key="bid2">
				<div class="step">
					<a-icon
						type="left"
						class="mr-3 back"
						@click="translate = 'translate-slide-reverse';bidStep = 1"
					/>
					<span class="text">ШАГ 2</span>
				</div>
				<div class="form-title mb-1">Выберите удобное время (промежуток) и дату визита</div>
				<div class="row py-4 px-2">
					<div class="col-lg-4 text-center">
						<input
							type="date"
							placeholder="Дата визита"
							class="el-input__inner flex-center"
							v-if="isMobile"
							@change="dateChange"
							:min="dateMin"
						/>
						<el-date-picker
							v-else
							v-model="date"
							type="date"
							placeholder="Дата визита"
							format="dd.MM.yyyy"
							:picker-options="pickerOptions"
						/>

						<!-- <a-locale-provider :locale="locale" class="select">
							<a-date-picker
								class
								v-model="date"
								format="DD.MM.YYYY"
								placeholder="Дата визита"
								:disabledDate="disabledDate"
							/>
						</a-locale-provider>-->
					</div>
					<div class="col-lg-3 text-center">
						<!-- <a-time-picker
							inputReadOnly
							:minuteStep="15"
							class
							v-model="timeFrom"
							format="HH:mm"
							placeholder="С"
						/>-->

						<el-time-select
							v-model="timeFrom"
							:picker-options="{
								start: '00:00',
								step: '00:15',
								end: '23:45'
							}"
							placeholder="С"
							class="select"
						></el-time-select>
					</div>
					<div class="col-lg-3 text-center">
						<!-- <a-time-picker
							inputReadOnly
							:minuteStep="15"
							class
							v-model="timeTo"
							format="HH:mm"
							placeholder="По"
						/>-->

						<el-time-select
							v-model="timeTo"
							:picker-options="{
								start: '00:00',
								step: '00:15',
								end: '23:45'
							}"
							placeholder="По"
							class="select"
						></el-time-select>
					</div>
					<div class="col-lg-2 text-center">
						<input
							type="button"
							value="Далее"
							class="btn yp-btn outline select"
							@click="thirdSlide()"
							:disabled="!(timeFrom && timeTo && date)"
						/>
					</div>
				</div>
			</div>

			<div class="position-relative" v-if="bidStep === 3" key="bid3">
				<div class="step">
					<a-icon
						type="left"
						class="mr-3 back"
						@click="translate = 'translate-slide-reverse';bidStep = 2"
					/>
					<span class="text">ШАГ 3</span>
				</div>
				<div class="form-title mb-1">Опишите задачу/желаемый результат</div>
				<div class="py-4">
					<div class="text-center">
						<textarea
							placeholder
							v-model="text"
							class="d-inline-block w-75 form-control yp-inp"
							maxlength="1000"
						></textarea>
					</div>
				</div>

				<div class="w-75 mx-auto">
					<div class="row flex-center">
						<div class="col-md-6 text-center">
							<label
								for="file"
								class="imageLabel"
							>Прикрепите фото. Например, текущий и желаемый дизайн ногтей (необязательно)</label>
						</div>
						<!-- <div class="col-md-3 text-center">
							<label for="file" class="btn yp-btn outline">Загрузить фото</label>
							<input type="file" class="btn yp-btn" id="file" style="display:none;" />
						</div>-->

						<div class="col-md-3 text-center">
							<el-upload
								action="#"
								accept="image/*"
								class="upload-demo"
								:on-preview="handlePreview"
								:on-change="handleChange"
								:before-remove="handleRemove"
								:auto-upload="false"
							>
								<el-button size="small" type="primary" class="btn yp-btn outline">Загрузить</el-button>
							</el-upload>
						</div>

						<div class="col-md-3 text-right applyButton">
							<!-- <input
								type="button"
								value="Готово"
								class="btn yp-btn outline"
								@click="applyBid()"
								:disabled="!(text)"
							/>-->
							<el-button
								class="btn yp-btn outline"
								type="primary"
								@click="applyBid()"
								:disabled="!(text)"
								:loading="isLoading"
							>Готово</el-button>
						</div>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import VueSingleSelect from "vue-single-select";
import moment from "moment";
import ru_RU from "ant-design-vue/lib/locale-provider/ru_RU";
import "moment/locale/ru";
import { isMobile } from "mobile-device-detect";

import api from "../classes/api";

export default {
	components: { VueSingleSelect },
	data() {
		return {
			locale: ru_RU,
			bidStep: 1,
			masters: [
				"Визажист",
				"Косметолог",
				"Массажист",
				"Мастер по маникюру",
				"Мастер по наращиванию ресниц",
				"Мастер эпиляции",
				"Парикмахер"
			],
			city: "1",
			master: undefined,
			timeFrom: null,
			timeTo: null,
			date: null,
			text: null,
			show: true,
			fileList: [],
			isMobile: isMobile,
			isLoading: false,

			translate: "translate-slide",
			pickerOptions: {
				disabledDate(time) {
					return time.getTime() < Date.now();
				}
			}
		};
	},
	methods: {
		submit() {
			let mDateFrom = moment.utc(
				this.date.toLocaleString(),
				"DD.MM.YYYY, HH:mm:ss"
			);
			console.log("mDateFrom", mDateFrom);

			let mDateTo = moment.utc(
				this.date.toLocaleString(),
				"DD.MM.YYYY, HH:mm:ss"
			);

			console.log("mDateTo", mDateTo);

			let timeFrom = this.timeFrom.split(":");
			let timeTo = this.timeTo.split(":");

			console.log("timeFrom", timeFrom);
			console.log("timeTo", timeTo);

			mDateFrom.add(timeFrom[0], "hour").add(timeFrom[1], "minute");
			mDateTo.add(timeTo[0], "hour").add(timeTo[1], "minute");

			console.log("mDateFrom2", mDateFrom);
			console.log("mDateTo2", mDateTo);

			let filesObj = {};
			this.fileList.map((v, i) => {
				filesObj["file" + i] = v.raw;
			});

			this.isLoading = true;

			api.account
				.createOrder(
					this.city,
					this.master,
					mDateFrom.format("X"),
					mDateTo.format("X"),
					this.text,
					filesObj
				)
				.then(res => {
					this.$emit("orderComlete", res);
					// this.resetFields();
					this.$message.success("Заявка создана");
					this.$router.push(this.$store.state.routesLinks.bids);
				})
				.catch(e => {
					// this.resetFields();
					this.isLoading = false
				});
		},
		handleRemove(file, fileList) {
			this.fileList = fileList;
		},
		handlePreview(file) {
			this.dialogImageUrl = file.url;
			this.dialogVisible = true;
		},
		handleChange(file, fileList) {
			//this.fileList = [...this.fileList, file]
			this.fileList = fileList;
		},
		disabledDate(d) {
			return (
				d.isBefore(moment().subtract(1, "days")) ||
				d.isAfter(moment().add(180, "days"))
			);
		},
		secondSlide() {
			this.translate = "translate-slide";
			this.bidStep = 2;
		},
		thirdSlide() {
			this.translate = "translate-slide";
			this.bidStep = 3;
		},
		applyBid() {
			this.isLoading = true
			if (!this.$store.getters.isLogin) {
				this.$message.warning(
					"Для продолжения необходимо зарегистрироваться"
				);

				this.$parent.openLoginModal();
				this.$parent.requestBidAfterRegister = true;
			} else {
				this.submit();
			}
		},
		dateChange(e) {
			this.date = new Date(e.target.value + " 00:00");
		}
	},
	computed: {},
	watch: {}
};
</script>


<style lang="less" scoped>
.imageLabel {
	font-size: 20px;
	text-align: left;
}

.yp-select {
	padding: 0 !important;
}

.form-wrapper {
	background-color: #ffffff;

	.form-title {
		text-align: center;
		font-size: 27px;
		color: #382835;
	}

	.step {
		position: absolute;
		left: 35px;
		top: -3px;
		font-weight: bold;
		font-size: 30px;

		.back {
			cursor: pointer;
			vertical-align: 0em;
		}

		.text {
			color: #ada4a8;
		}
	}

	@media screen and (max-width: 1199px) {
		.step-wrapper {
			display: flex;
			justify-content: center;
		}
		.step {
			position: static;
			width: 75%;
		}
	}

	@media screen and (max-width: 991px) {
		.select,
		.btn,
		.ant-time-picker,
		.ant-calendar-picker {
			width: 75% !important;
			margin-top: 20px;
		}

		.applyButton {
			text-align: center !important;
		}
	}
}
</style>

<style lang="less" scoped>
::v-deep .ant-select-selection--single {
	height: auto;
}
::v-deep .ant-select-selection__rendered {
	line-height: 44px;
}
::v-deep .ant-select-selection {
	border: 2px solid #e9378d;
	border-radius: 6px;
}

::v-deep .single-select-wrapper {
	margin-bottom: 0 !important;

	::v-deep .search-input {
		padding: 10px 25px !important;
		border: none !important;
		outline: none !important;
	}
}

::v-deep .el-date-editor--time-select {
	width: 128px;
}

::v-deep .el-input__inner,
::v-deep .el-date-editor--time-select > input,
::v-deep .ant-time-picker-input,
::v-deep .ant-calendar-picker-input {
	padding: 10px 30px !important;
	font-size: 1rem !important;
	height: auto !important;
	border: 2px solid #e9378d !important;
	border-radius: 6px !important;
	line-height: unset;
	box-shadow: none;
}

::v-deep .slick-track {
	display: flex;
	align-items: center;
}
</style>