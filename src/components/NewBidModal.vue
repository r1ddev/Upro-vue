<template>
	<div class="root">
		<!-- <a-modal
			top="20vh"
			centered
			title="Создать заявку"
			:visible="visible"
			@cancel="$emit('cancel');"
			:footer="null"
		> -->
		<el-dialog
			custom-class="dialog"
			centered
			title="Создать заявку"
			:visible="visible"
			:before-close="handleClose"
		>
			<el-form @submit.native.prevent="submit" label-position="top">
				<el-form-item label="Город">
					<el-select filterable placeholder="Город" v-model="city">
						<el-option value="1" label="Воронеж" />
					</el-select>
				</el-form-item>

				<el-form-item label="Выберите мастера">
					<el-select filterable placeholder="Выберите мастера" v-model="master">
						<el-option value="1" label="Визажист" />
						<el-option value="2" label="Косметолог" />
						<el-option value="3" label="Массажист" />
						<el-option value="4" label="Мастер по маникюру" />
						<el-option value="5" label="Мастер по наращиванию ресниц" />
						<el-option value="6" label="Мастер эпиляции" />
						<el-option value="7" label="Парикмахер" />
					</el-select>
				</el-form-item>

				<el-form-item label="Дата визита">
					<!-- <input
						type="date"
						placeholder="Дата визита"
						class="el-input__inner flex-center"
						v-if="isMobile"
						@change="dateChange"
						:min="dateMin"
						:max="dateMax"
					/> -->

					<!-- v-else -->
					<el-date-picker
						v-model="date"
						type="date"
						placeholder="Дата визита"
						format="dd.MM.yyyy"
						:picker-options="pickerOptions"
					/>
				</el-form-item>

				<el-form-item label="Удобное время">
					<div class="row">
						<div class="col-6">
							<!-- <input
								type="time"
								placeholder="С"
								class="el-input__inner flex-center"
								v-if="isMobile"
								step="900"
								v-model="timeFrom"
							/> -->
							
							<!-- v-else -->

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
						<div class="col-6">
							<!-- <input
								type="time"
								v-model="timeTo"
								placeholder="По"
								class="el-input__inner flex-center"
								v-if="isMobile"
								step="900"
							/> -->
							
							<!-- v-else -->
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

				<el-form-item label="Опишите задачу мастера">
					<el-input
						type="textarea"
						placeholder="Опишите задачу мастера"
						:autosize="{ minRows: 2, maxRows: 4}"
						maxlength="1000"
						v-model="description"
					/>
				</el-form-item>

				<el-form-item label="Прикрепите фото">
					<el-upload
						ref="upload"
						multiple
						drag
						:on-exceed="handleExceed"
						:class="hideUploadClass"
						action="#"
						accept="image/*"
						list-type="picture-card"
						:on-preview="handlePictureCardPreview"
						:auto-upload="false"
						:on-change="handleChange"
						:before-remove="handleRemove"
						:limit="5"
					>
						<i slot="default" class="el-icon-plus" />
					</el-upload>

					<a-modal
						:closable="false"
						:visible="dialogVisible"
						:footer="null"
						@cancel="() => dialogVisible = false"
					>
						<img alt="Предпросмотр" style="width: 100%" :src="dialogImageUrl" />
					</a-modal>
				</el-form-item>

				<el-form-item>
					<div v-if="!isFormCorrect.status">{{isFormCorrect.error}}</div>
					<a-button
						html-type="submit"
						type="primary"
						size="large"
						:disabled="!isFormCorrect.status"
						class="yp-btn yp-btn-fill"
						:loading="isLoading"
					>Создать заявку</a-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>


<script>
import VueSingleSelect from "vue-single-select";
import moment from "moment";
import {
	readAsDataURL,
	readAsText,
	readAsArrayBuffer
} from "promise-file-reader";
// import ru_RU from "ant-design-vue/lib/locale-provider/ru_RU";
import api from "../classes/api";
import Axios from "axios";
import { isMobile } from "mobile-device-detect";

import "../assets/css/yp-el.less";

export default {
	components: {
		VueSingleSelect
	},
	props: ["visible"],
	data: function() {
		return {
			city: "1",
			master: undefined,
			date: undefined,
			timeFrom: undefined,
			timeTo: undefined,
			description: "",
			isMobile: isMobile,

			fileList: [],

			dialogImageUrl: String,
			dialogVisible: false,
			pickerOptions: {
				disabledDate(time) {
					return time.getTime() < Date.now() || time.getTime() > (Date.now() + 86400000*180);
				}
			},
			isLoading: false
		};
	},
	methods: {
		handleClose() {
			this.$emit('cancel')
		},
		submit() {
			console.log("this.date.toLocaleString()", this.date.toLocaleString());
			
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
			console.log("this.date.toLocaleString()", this.date.toLocaleString());
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
					1594149708,
					1594149908,
					// mDateFrom.format("X"),
					// mDateTo.format("X"),
					this.description,
					filesObj
				)
				.then(res => {
					this.$emit("orderComlete", res);
					this.resetFields();
				})
				.catch(e => {
					this.resetFields();
				});
		},
		resetFields() {
			this.city = "1";
			this.master = undefined;
			this.date = undefined;
			this.timeFrom = undefined;
			this.timeTo = undefined;
			this.description = "";

			this.fileList = [];
			this.$refs.upload.clearFiles()

			(this.dialogImageUrl = ""), (this.dialogVisible = false);
			this.isLoading = false;
		},
		handleRemove(file, fileList) {
			this.fileList = fileList;
		},
		handleChange(file, fileList) {
			//this.fileList = [...this.fileList, file]
			console.log("select file", JSON.stringify(file, true, 2));
			this.fileList = fileList;
		},
		handlePictureCardPreview(file) {
			this.dialogImageUrl = file.url;
			this.dialogVisible = true;
		},
		dateChange(e) {
			console.log(e.target.value);
			this.date = new Date(e.target.value + " 00:00")
		},
		handleExceed(files, fileList) {
			this.$message.warning(`The limit is 5, you selected ${files.length} files this time, add up to ${files.length + fileList.length} totally`);
		},
	},
	computed: {
		hideUploadClass: function() {
			return this.fileList.length >= 5 ? "hideUpload" : "";
		},
		isFormCorrect() {
			let error = "";
			let status = true;
			if (this.timeFrom >= this.timeTo) {
				error = "Время начала не может быть позже времени завершения";
				status = false;
			}
			if (this.city === undefined) {
				error = "Выберите город";
				status = false;
			}
			if (this.master === undefined) {
				error = "Выберите мастера";
				status = false;
			}
			if (this.date === undefined || this.date === null) {
				error = "Выберите дату визита";
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
		},
		dateMin() {
			return moment().format("YYYY-MM-DD");
		},
		dateMax() {
			return moment()
				.add(180, "day")
				.format("YYYY-MM-DD");
		},
	}
};
</script>


<style lang="less" scoped>
::v-deep .el-form-item__label {
	line-height: unset;
	padding-bottom: 0;
}

::v-deep .el-date-editor,
::v-deep .el-select,
::v-deep .ant-calendar-picker {
	width: 100%;
}

::v-deep .hideUpload {
	.el-upload {
		display: none;
	}
}

::v-deep .ant-modal-header {
	border-bottom: 2px solid #e7cad8;
}

::v-deep .el-upload--picture-card {
	border: 0px dashed #c0ccda;
}

::v-deep .el-upload-dragger {
	background-color: unset;
	border: 2px dashed #c0ccda;
	width: auto;
	height: auto;
}

::v-deep .el-upload-dragger.is-dragover {
	background-color: rgba(32, 159, 255, 0.06);
	border: 2px dashed #409eff;
}

::v-deep .el-upload-list__item-thumbnail {
	object-fit: contain;
}
</style>

<!--style lang="scss" scoped>
::v-deep .el-date-editor {
	input {
		box-shadow: 0px 1px 4px -1px rgba(100, 100, 100, 0.5);
		border: 1px solid #e9378d;
		border-radius: 6px;
	}
}
</style-->