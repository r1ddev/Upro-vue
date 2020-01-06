<template>
	<div class="form-wrapper py-4">

		<transition name="translate-fade" mode="out-in">
			<div class="" v-if="bidStep === 1" key="bid1">
				<div class="form-title mb-1">Оставьте заявку - мы подберём мастеров</div>
				<div class="row py-4">
					<div class="col-md-4 text-center">
						
						<vue-single-select
							v-model="city"
							:options="['Воронеж']"
							:required="true"
							class="d-inline-block w-50 form-control yp-inp yp-select"
							placeholder="Город"
							autocomplete="off"
						></vue-single-select>
						
						<!-- <input type="text" placeholder="Город" class="d-inline-block w-50 form-control yp-inp"> -->
					</div>
					<div class="col-md-4 text-center">

						<vue-single-select
							v-model="master"
							:options="masters"
							:required="true"
							class="d-inline-block w-75 form-control yp-inp yp-select"
							placeholder="Вид мастера"
							autocomplete="off"
						></vue-single-select>

					</div>
					<div class="col-md-4 text-center">
						<input type="button" value="Далее" class="btn yp-btn" :disabled="!(city && master)" @click="secondSlide()">
					</div>
				</div>
			</div>

			<div v-if="bidStep === 2" key="bid2">
				<div class="form-title mb-1">Выберите удобное время (промежуток) и дату визита</div>
				<div class="row py-4">
					<div class="col-md-2 text-center">
						<a-time-picker class="form-control yp-inp" v-model="timeFrom" format="HH:mm" placeholder="С" />
					</div>
					<div class="col-md-2 text-center">
						<a-time-picker class="form-control yp-inp" v-model="timeTo" format="HH:mm" placeholder="По" />
					</div>
					<div class="col-md-4 text-center">
						<!-- {d => !d || d.isAfter(\"2002-12-31\") || d.isSameOrBefore(\"1960-01-01\") } -->
						<a-date-picker class="form-control yp-inp" v-model="date" format="DD.MM.YYYY" placeholder="Дата визита" :disabledDate="disabledDate"/>
						<!-- <input type="text" placeholder="Дата визита" v-model="date" class="d-inline-block w-75 form-control yp-inp"> -->
					</div>
					<div class="col-md-4 text-center">
						<input type="button" value="Далее" class="btn yp-btn" @click="thirdSlide()" :disabled="!(timeFrom && timeTo && date)">
					</div>
				</div>
			</div>

			<div v-if="bidStep === 3" key="bid3" class="">
				<div class="form-title mb-1">Опишите задачу/желаемый результат</div>
				<div class="py-4">
					<div class="text-center">
						<input type="text" placeholder="" v-model="text" class="d-inline-block w-75 form-control yp-inp">
					</div>
				</div>

				<div class="w-75 mx-auto">
					<div class="row flex-center">
						<div class="col-md-6 text-center">
							<label for="file" class="imageLabel">Прикрепите фото. Например, текущий и желаемый дизайн ногтей (необязательно)</label>
						</div>
						<div class="col-md-3 text-center">
							<label for="file" class="btn yp-btn">Загрузить фото</label>
							<input type="file" class="btn yp-btn" id="file" style="display:none;">
						</div>
						<div class="col-md-3 text-right">
							<input type="button" value="Готово" class="btn yp-btn" @click="applyBid()" :disabled="!(text)">
						</div>
					</div>
				</div>
			</div>
		</transition>
	</div>
	
</template>

<script>
	import VueSingleSelect from "vue-single-select";
	import moment from 'moment';

	import { Hooper, Slide } from 'hooper';
	import 'hooper/dist/hooper.css';

	export default {
		components: { VueSingleSelect, Hooper, Slide },
		data () {
			return {
				bidStep: 1,
				masters: [
					"Визажист",
					"Косметолог",
					"Массажист",
					"Мастер по маникюру",
					"Мастер по наращиванию ресниц",
					"Мастер эпиляции",
					"Парикмахер",
				],
				city: null,
				master: null,
				timeFrom: null,
				timeTo: null,
				date: null,
				text: null,
				show: true,
			}
		},
		methods: {
			disabledDate (d) {
				console.log(d);
				return d.isBefore(moment().subtract(1, 'days'))
			},
			secondSlide () {
				this.bidStep = 2
			},
			thirdSlide () {
				this.bidStep = 3
			},
			applyBid () {
				if (!this.$store.getters.isLogin) {
					this.$message.warning('Для продолжения необходимо зарегистрироваться')

					this.$parent.loginModal = true
					this.$parent.requestBidAfterRegister = true
				} else {
					this.$message.success('Заявка успешно создана')
				}
			}
		},
		computed: {

		}
	}
</script>


<style lang="less" scoped>

	.imageLabel {
		font-size: 20px;
    	text-align: left;
	}
	
	.yp-select {
		padding:0!important;
	}

	.form-wrapper {
		background-color: #ffffff;

		.form-title {
			text-align: center;
			font-size: 30px;
			color: #382835;
		}
	}

	
</style>

<style lang="less">
	.single-select-wrapper {
		margin-bottom: 0!important;

		.search-input {
			padding: 10px 25px!important;
			border: none!important;
			outline: none!important;
		}
	}

	.ant-time-picker-input, .ant-calendar-picker-input {
		padding: 10px 25px!important;
		border: none!important;
		font-size: 1rem!important;
		height: auto!important;
	}
	
	.slick-track {
		display: flex;
    	align-items: center;
	}

	
</style>