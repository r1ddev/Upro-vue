<template>
	<div class="profile full-height">
		<el-dialog :visible.sync="uploadPhotoVisible" class="text-center">
			<el-upload
				class="avatar-uploader"
				ref="upload"
				multiple
				action="#"
				accept="image/*"
				:auto-upload="false"
				list-type="picture-card"
				:on-success="handleAvatarSuccess"
				:before-upload="beforeAvatarUpload"
				:on-change="handleChange"
			>
				<i class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
		</el-dialog>

		<HomeHeader page="master" />

		<AccountTemplate
			:sideLinks="[
				{label:'Заявки', href: '/master'},
				{label:'Профиль', href: '/master/profile', active: true}
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
						<div class="bid" v-if="isEditable">
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
									@change="change"
									class="w-100"
								>
									<el-option
										v-for="(type, key) in getUnselectTypes"
										:key="key"
										:value="type.value"
										:label="type.label"
									/>
								</el-select>
							</div>

							<div class="mt-2">
								<div class="row">
									<div class="col-auto" v-for="spec in selectedSpecialities" :key="spec.value">
										<div class="badge mt-2">
											<div class="">{{spec.label}}</div>
											<div class="delete" @click="removeSpeciatity(spec.value)"><i class="el-icon-close"></i></div>
										</div>
									</div>
								</div>
							</div>

							<div class="row">
								<div class="col-md-6 mt-4">
									<div class="label">Город, где вы находитесь:</div>
									<el-select filterable placeholder="Город" v-model="city" class="w-100">
										<el-option value="1" label="Воронеж" />
									</el-select>
								</div>

								<div class="col-md-6 mt-4">
									<div class="label">Контактный телефон:</div>
									<el-input placeholder="+79999999999" v-model="phone"></el-input>
								</div>
							</div>

							<div class="mt-4">
								<div class="label">Галерея работ:</div>

								<ImagesCarousel :images="photosGallery" />
							</div>

							<div class="mt-4 position-relative">
								<div class="label">Фото рабочего места:</div>

								<ImagesCarousel :images="photosWorkplace" />
							</div>

							<div class="mt-4 text-center">
								<a href="#" class="btn yp-btn yp-btn-fill" @click.prevent="uploadPhoto">Загрузить фото</a>
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

							<div class="mt-4">
								<div class="row">
									<div class="col text-left">
										<input
											type="submit"
											class="btn yp-btn yp-btn-fill"
											value="Сохранить изменения"
											@click="save"
										/>
									</div>
									<div class="col text-right">
										<input type="submit" class="btn yp-btn yp-btn-fill" value="Верифицировать" />
									</div>
								</div>
							</div>
						</div>

						<MasterProfileView
							v-else
							:master="{
							username,
							description,
							speciality,
							photosGallery,
							photosWorkplace
						}"
						/>
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
import ImagesCarousel from "../components/ImagesCarousel";
import MasterProfileView from "../components/MasterProfileView";

import "../assets/css/yp-el.less";
import api from "../classes/api";
import store from "../store";

import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("master");
const {
	mapState: mapStateGeneral,
	mapActions: mapActionsGeneral
} = createNamespacedHelpers("general");

import { Loading } from "element-ui";

export default {
	components: {
		HomeHeader,
		AccountTemplate,
		HomeFooter,
		ImagesCarousel,
		MasterProfileView
	},
	data: function() {
		return {
			uploadPhotoVisible: false,
			isEditable: false,
			id: undefined,
			master: undefined,
			city: "1",
			phone: "",
			uploadPhotoUrl: ""
		};
	},
	methods: {
		removeSpeciatity (value) {
			this.speciality.splice(this.speciality.indexOf(value), 1);
		},
		handleChange(file, fileList) {
			this.uploadPhotoUrl = file;
		},
		handleAvatarSuccess() {
			return true;
		},
		beforeAvatarUpload() {
			return true;
		},
		uploadPhoto() {
			this.uploadPhotoVisible = true;
		},
		change(e) {
			this.speciality.push(e);
			this.master = undefined;
		},
		async fetchMasterData() {
			await this.$store.dispatch("master/getUserData", this.id);

			this.$store.dispatch(
				"master/getPhotosGallery",
				this.$store.state.master.userData.data.albumIdGallery
			);
			this.$store.dispatch(
				"master/getPhotosWorkplace",
				this.$store.state.master.userData.data.albumIdWorkplace
			);
		},
		save() {
			this.$store.dispatch("master/updateMasterProfile", {
				id: this.id,
				speciality: JSON.stringify(this.speciality),
				username: this.username,
				description: this.description
			});
		}
	},
	computed: {
		...mapState({
			photosGallery: state => state.photosGallery.data,
			photosWorkplace: state => state.photosWorkplace.data
		}),
		...mapStateGeneral({
			loginData: state => state.loginData.data
		}),
		username: {
			get() {
				return this.$store.state.master.userData.data.username;
			},
			set(value) {
				this.$store.commit("master/userDataSetData", {
					...this.$store.state.master.userData.data,
					username: value
				});
			}
		},
		description: {
			get() {
				return this.$store.state.master.userData.data.description;
			},
			set(value) {
				this.$store.commit("master/userDataSetData", {
					...this.$store.state.master.userData.data,
					description: value
				});
			}
		},
		speciality: {
			get() {
				return this.$store.state.master.userData.data.speciality;
			},
			set(value) {
				this.$store.commit("master/userDataSetData", {
					...this.$store.state.master.userData.data,
					speciality: value
				});
			}
		},
		getUnselectTypes() {
			let types = this.$store.state.general.masterTypes;
			types = types.filter(v => !this.speciality.includes(v.value));

			return types;
		},
		selectedSpecialities() {
			let qw = this.$store.state.general.masterTypes
				.filter(v => this.speciality.includes(v.value))
			return qw;
		},
		
	},
	async created() {
		await this.$store.dispatch("general/getLoginStatus");

		if (this.$route.params.id) {
			this.id = this.$route.params.id;

			this.fetchMasterData();
		} else {
			let user = this.$store.state.general.loginData.data.user;
			if (user.master) {
				this.id = user.master.id;
				this.isEditable = true;

				this.fetchMasterData();
			} else {
				this.$router.push("/bids");
			}
		}
	}
};
</script>

<style lang="less" scoped>
::v-deep .el-upload-list__item-thumbnail {
	object-fit: cover;
}
// ::v-deep .avatar-uploader {

// 	.el-upload {
// 		border: 1px dashed #d9d9d9;
// 		border-radius: 6px;
// 		cursor: pointer;
// 		position: relative;
// 		overflow: hidden;

// 		&:hover {
// 			border-color: #409eff;
// 		}
// 	}

// 	.avatar-uploader-icon {
// 		font-size: 28px;
// 		color: #8c939d;
// 		width: 178px;
// 		height: 178px;
// 		line-height: 178px;
// 		text-align: center;
// 	}
// }

.verify-status {
	border-radius: 20px;
	padding: 10px 20px;
	background: #ffffff;
	box-shadow: 0px 2px4px rgba(100, 100, 100, 0.5);
	font-size: 14px;
}

::v-deep .bids-list {
	.container {
		// padding: 0 150px;
	}

	.bid {
		box-shadow: 0px 2px4px rgba(100, 100, 100, 0.5);

		width: 100%;
		padding: 7px 45px;
		border-radius: 18px;
		background: #fff;

		.badge {
			display: flex;
			align-items: center;
			background: #F3A9CD;
			box-shadow: 0px 2px 4px rgba(100,100,100,0.5);
			border-radius: 15px;
			padding: 5px 15px;
			color: #fff;

			.delete {
				margin-left: 10px;
				font-size: 20px;
				cursor: pointer;
				transition: .2s;

				&:hover {
					color:  rgb(133, 133, 133);
				}
			}
		}

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
