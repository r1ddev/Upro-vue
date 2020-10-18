<template>
	<div class="profile full-height">
		<!-- <HomeHeader v-if="isEditable" page="master" :links="[
			{ label: 'Заявки', href: '/master' },
			{ label: 'Профиль', href: '/master/profile', active: true },
			{ label: 'Отзывы', href: '/master/reviews' }
		]"/>

		<HomeHeader v-else page="master" :links="[
			{ label: 'Заявки', href: '/master' },
			{ label: 'Профиль', href: '/master/profile', active: true },
		]"/> -->

		<section class="account-menu pb-3">
			<div class="container">
				<div class="row flex-center mt-4">
					<div class="verify-status">Статус: Верифицирован</div>
				</div>
			</div>
		</section>

		<section class="bids-list mb-5">
			<div class="container">

				<MasterProfileEdit
					v-if="isEditable"
					:master="{
						id,
						username,
						description,
						allSpeciality,
						selectedSpecialities,
						photosGallery,
						photosWorkplace,
						userAvatar,
					}"
				/>

				<MasterProfileView
					v-else
					:master="{
						id,
						username,
						description,
						speciality: selectedSpecialities,
						photosGallery,
						photosWorkplace,
						userAvatar,
					}"
				/>
			</div>
		</section>
	</div>
</template>

<script>
import HomeHeader from "../components/HomeHeader";
import HomeFooter from "../components/HomeFooter";
import AccountTemplate from "../components/AccountTemplate";
import MasterProfileView from "../components/MasterProfileView";
import MasterProfileEdit from "../components/master/MasterProfileEdit";

import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("master");
const { mapState: mapStateGeneral, mapActions: mapActionsGeneral } = createNamespacedHelpers("general");

import "../assets/css/yp-el.less";

import { Loading } from "element-ui";

export default {
	name: 'masterProfile',
	components: {
		HomeHeader,
		AccountTemplate,
		HomeFooter,
		MasterProfileView,
		MasterProfileEdit,
	},
	data: function () {
		return {
			isEditable: false,
			id: undefined,
		};
	},
	methods: {
		async fetchMasterData() {
			await this.$store.dispatch("master/getUserData", this.id);

			this.$store.dispatch("master/getPhotosGallery", this.$store.state.master.userData.data.albumIdGallery);
			this.$store.dispatch("master/getPhotosWorkplace", this.$store.state.master.userData.data.albumIdWorkplace);
			this.$store.dispatch("master/getPhotosAvatar", this.$store.state.master.userData.data.albumIdAvatar);
		},
	},
	computed: {
		...mapState({
			photosGallery: (state) => state.photosGallery.data,
			photosWorkplace: (state) => state.photosWorkplace.data,
			photosAvatar: (state) => state.photosAvatar.data,
		}),
		...mapStateGeneral({
			loginData: (state) => state.loginData.data,
		}),
		username: {
			get() {
				return this.$store.state.master.userData.data.username;
			},
			set(value) {
				this.$store.commit("master/userDataSetData", {
					...this.$store.state.master.userData.data,
					username: value,
				});
			},
		},
		description: {
			get() {
				return this.$store.state.master.userData.data.description;
			},
			set(value) {
				this.$store.commit("master/userDataSetData", {
					...this.$store.state.master.userData.data,
					description: value,
				});
			},
		},
		allSpeciality () {
			return this.$store.state.general.masterTypes
		},
		speciality: {
			get() {
				return this.$store.state.master.userData.data.speciality;
			},
			set(value) {
				this.$store.commit("master/userDataSetData", {
					...this.$store.state.master.userData.data,
					speciality: value,
				});
			},
		},
		selectedSpecialities() {
			let qw = this.$store.state.general.masterTypes.filter((v) => this.speciality.includes(v.value));
			return qw;
		},
		userAvatar() {
			return this.photosAvatar.length > 0
				? this.photosAvatar[0].image_thumb
				: require(`@/assets/img/no-avatar.png`);
		},
	},
	async created() {
		// await this.$store.dispatch("general/getLoginStatus");

		if (this.$route.params.id) {
			this.id = parseInt(this.$route.params.id);

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
	},
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
		// box-shadow: 0px 2px4px rgba(100, 100, 100, 0.5);

		width: 100%;
		padding: 7px 45px;
		border-radius: 18px;
		// background: #fff;

		.general {
			max-width: 500px;

			.username {
				font-size: 21px;
				font-weight: bold;
			}
		}

		.badge {
			display: flex;
			align-items: center;
			background: #f3a9cd;
			box-shadow: 0px 2px 4px rgba(100, 100, 100, 0.5);
			border-radius: 15px;
			padding: 5px 15px;
			color: #fff;

			.delete {
				margin-left: 10px;
				font-size: 20px;
				cursor: pointer;
				transition: 0.2s;

				&:hover {
					color: rgb(133, 133, 133);
				}
			}
		}

		.title {
			color: #4f4f4e;
			font-size: 22px;
			text-align: center;
		}

		.label {
			font-size: 14px;
			color: #4F4F4E;
			margin-bottom: 5px;
			font-weight: bold;
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
				// border: 1px solid #e9378d;
				border-radius: 9px;
				cursor: pointer;
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
