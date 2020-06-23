<template>
	<div :class="$options._componentTag">
		<!-- <el-dialog title="Создать отклик" :visible.sync="visible" :before-close="handleClose"> -->
		<a-modal
			centered
			title="Создать отклик"
			:visible="visible"
			@cancel="$emit('cancel');"
			:footer="null"
		>
			<el-form @submit.native.prevent="submit" label-position="top">
				<el-form-item label="Предложите время визита:">
					<div class="row">
						<div class="col-auto">
							<el-time-select
								v-model="timeFrom"
								:picker-options="{
									start: '00:00',
									step: '00:15',
									end: '23:45'
								}"
								placeholder="С"
								class="select"
							/>
						</div>
						<div class="col-auto">
							<el-time-select
								v-model="timeTo"
								:picker-options="{
									start: '00:00',
									step: '00:15',
									end: '23:45'
								}"
								placeholder="По"
								class="select"
							/>
						</div>
					</div>
				</el-form-item>

				<el-form-item label="Назначьте цену:">
					<el-input placeholder="Введите цену" v-model="price">
						<template slot="append">р.</template>
					</el-input>
				</el-form-item>

				<el-form-item label="Вам комментарий к отклику:">
					<el-input
						type="textarea"
						:autosize="{ minRows: 3, maxRows: 5}"
						placeholder="Например, предложите скидку на доп. услугу или расскажите о проходящей акции"
						v-model="description"
					></el-input>
				</el-form-item>

				<el-form-item>
					<a-button
						html-type="submit"
						type="primary"
						size="large"
						:disabled="!isFormCorrect.status"
						class="yp-btn yp-btn-fill"
						:loading="isLoading"
					>Откликнуться</a-button>
				</el-form-item>
			</el-form>
		</a-modal>
	</div>
</template>

<script>
import "../assets/css/yp-el.less";
import moment from 'moment'

export default {
	data: function() {
		return {
			timeFrom: undefined,
			timeTo: undefined,
			price: 0,
			description: "",
			isLoading: false
		};
	},
	props: {
		visible: {
			type: Boolean,
			default: false
		},
		orderId: {
			type: Number,
			default: 0
		},
		orderDateTime: {
			type: String,
			default: "",
		}
	},
	methods: {
		handleClose(e) {
			console.log(e);
		},

		async submit () {
			let orderDate = moment(this.orderDateTime).utcOffset(0)
			orderDate.set({hour:0,minute:0,second:0,millisecond:0})

			let timeFrom = this.timeFrom.split(":")
			let timeTo = this.timeTo.split(":")

			let responseFrom = orderDate.clone()
			let responseTo = orderDate.clone()

			responseFrom.set({hour:timeFrom[0],minute:timeFrom[1]})
			responseTo.set({hour:timeTo[0],minute:timeTo[1]})

			await this.$store.dispatch("master/createResponse", {
				orderId: this.orderId,
				dateFrom: responseFrom.unix(),
				dateTo: responseTo.unix(),
				description: this.description,
				cost: this.price
			});

			this.$emit("success")
		}
	},
	computed: {
		isFormCorrect() {
			let error = "";
			let status = true;

			if (parseInt(this.price) <= 0) {
				error = "Введите цену";
				status = false;
			}
			if (this.description === "") {
				error = "Введите комментарий";
				status = false;
			}
			if (this.timeFrom === undefined || this.timeFrom === null) {
				error = "Выберите время визита";
				status = false;
			}
			if (this.timeTo === undefined || this.timeTo === null) {
				error = "Выберите время визита";
				status = false;
			}
			return { status: status, error: error };
		}
	},
	created() {
		console.log(this);
	}
};
</script>

<style lang="less" scoped>
::v-deep .el-form-item__label {
	line-height: unset;
	padding-bottom: 0;
}
</style>