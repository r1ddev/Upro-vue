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
	props: ["visible"],
	methods: {
		handleClose(e) {
			console.log(e);
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

<style>
</style>