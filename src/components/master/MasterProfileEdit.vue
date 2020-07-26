<template>
	<div class="bid" v-if="masterData">
		<el-dialog :visible.sync="uploadPhotoVisible" class="text-center">
			<el-upload
				class="avatar-uploader"
				ref="upload"
				multiple
				action="#"
				accept="image/*"
				:auto-upload="false"
				list-type="picture-card"
				:on-change="avatarUploadChange"
			>
				<i class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>

			<div class="text-center mt-3">
				<input type="submit" class="btn yp-btn yp-btn-fill" value="Сохранить" @click="savePhotos()" />
			</div>
		</el-dialog>

		<div class="title">Ваш профиль</div>
		<div class="row">
			<div class="col-3">
				<div class="avatar">
					<div class="label">Аватар профиля:</div>
					<img
						:src="$store.state.general.server + masterData.userAvatar"
						@click.prevent="uploadPhoto($store.state.masterData.userData.data.albumIdAvatar, 'Avatar')"
					/>
				</div>
			</div>
			<div class="col d-flex justify-content-center flex-column">
				<div class="label">Ваше имя</div>
				<el-input placeholder="Введите имя" maxlength="30" v-model="masterData.username" />
			</div>
		</div>
		<div class="mt-4">
			<div class="label">Ваши виды деятельности:</div>
			<el-select
				filterable
				placeholder="Выберите из списка"
				v-model="selectedMaster"
				@change="typesChange"
				class="w-100"
			>
				<el-option v-for="(type, key) in getUnselectTypes" :key="key" :value="type.value" :label="type.label" />
			</el-select>
		</div>

		<div class="mt-2">
			<div class="row">
				<div class="col-auto" v-for="spec in masterData.selectedSpecialities" :key="spec.value">
					<div class="badge mt-2">
						<div class>{{ spec.label }}</div>
						<div class="delete" @click="removeSpeciatity(spec.value)">
							<i class="el-icon-close"></i>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- <div class="row">
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
        </div> -->

		<div class="mt-4">
			<div class="label">Галерея работ:</div>

			<ImagesCarousel :images="masterData.photosGallery" />
		</div>

		<div class="mt-4 text-center">
			<a
				href="#"
				class="btn yp-btn yp-btn-fill"
				@click.prevent="uploadPhoto($store.state.masterData.userData.data.albumIdGallery, 'Gallery')"
				>Загрузить фото</a
			>
		</div>

		<div class="mt-4 position-relative">
			<div class="label">Фото рабочего места:</div>

			<ImagesCarousel :images="masterData.photosWorkplace" />
		</div>

		<div class="mt-4 text-center">
			<a
				href="#"
				class="btn yp-btn yp-btn-fill"
				@click.prevent="uploadPhoto($store.state.masterData.userData.data.albumIdWorkplace, 'Workplace')"
				>Загрузить фото</a
			>
		</div>

		<div class="mt-4">
			<div class="label">Расскажите о себе:</div>

			<el-input
				type="textarea"
				placeholder="Я мастер"
				:autosize="{ minRows: 4, maxRows: 4 }"
				maxlength="1000"
				v-model="masterData.description"
			/>
		</div>

		<div class="">
			<div class="row">
				<div class="col-md-6 text-left-md mt-4">
					<input
						type="submit"
						class="btn yp-btn yp-btn-fill"
						value="Сохранить изменения"
						@click="saveProfile"
					/>
				</div>
				<div class="col-md-6 text-right-md mt-4">
					<input type="submit" class="btn yp-btn yp-btn-fill" value="Верифицировать" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ImagesCarousel from "../../components/ImagesCarousel";

export default {
	props: {
		master: {
			default: {},
			type: Object,
		},
	},
	components: {
		ImagesCarousel,
	},
	data: function () {
		return {
			uploadPhotoVisible: false,
			uploadPhotoGalleryId: undefined,
			uploadPhotoGalleryType: undefined,
			masterData: {},
			selectedMaster: undefined,
			uploadPhotos: [],
		};
	},
	methods: {
		typesChange(e) {
			let newSpec = this.masterData.allSpeciality.find(s => s.value == e)
			this.masterData.selectedSpecialities.push(newSpec);
			this.selectedMaster = undefined;
		},
		savePhotos() {
			let filesObj = {};
			this.uploadPhotos.map((v, i) => {
				filesObj["file" + i] = v.raw;
			});

			this.$store.dispatch("master/uploadPhotos", {
				albumId: this.uploadPhotoGalleryId,
				photos: filesObj,
				type: this.uploadPhotoGalleryType,
			});

			this.uploadPhotoVisible = false;
			this.uploadPhotos = [];
		},
		removeSpeciatity(value) {
			this.masterData.selectedSpecialities.splice(this.masterData.selectedSpecialities.findIndex(s => s.value == value), 1);
		},
		uploadPhoto(galleryId, type) {
			this.uploadPhotoVisible = true;
			this.uploadPhotoGalleryId = galleryId;
			this.uploadPhotoGalleryType = type;
		},
		avatarUploadChange(file, fileList) {
			this.uploadPhotos = fileList;
		},
		saveProfile() {
			this.$store.dispatch("master/updateMasterProfile", {
				id: this.masterData.id,
				speciality: JSON.stringify(
					this.masterData.selectedSpecialities.map((c) => {
						return c.value;
					})
				),
				username: this.masterData.username,
				description: this.masterData.description,
			});
		},
	},
	computed: {
		getUnselectTypes() {
			if (this.masterData.allSpeciality) {
				let allSpeciality = this.masterData.allSpeciality;
				let selectedSpecialities = this.masterData.selectedSpecialities;

				return allSpeciality.filter(n => !selectedSpecialities.includes(n))

				
				// let specs = this.masterData.allSpeciality;
				// specs = specs.filter((spec) => {
				// 	!this.masterData.speciality.includes(spec.value)
				// });

				// return specs;
			} else {
				return [];
			}
		},
	},
	created() {
		// console.log("this.$props", JSON.stringify(this.$props, null, 2));
		// console.log("this.masterData", JSON.stringify(this.masterData, null, 2));
	},
	watch: {
		// `master(value) => this.masterData = value` could work too
		master() {
			this.masterData = this.$props.master;
		},
	},
};
</script>

<style></style>
