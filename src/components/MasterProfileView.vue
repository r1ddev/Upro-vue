<template>
	<div class="bid">
		<!-- <div class="title">Профиль мастера</div> -->
		<div class="flex-center">
			<div class="general">
				<div class="row ">
					<div class="col-5">
						<div class="avatar">
							<img :src="$store.state.general.server + master.userAvatar" />
						</div>
					</div>
					<div class="col d-flex justify-content-center flex-column">
						<div class="username">{{master.username}}</div>
						<div class="py-2">{{specialitiesList}}</div>
					</div>
				</div>
				<div class="pt-3">
					<div class>{{master.description}}</div>
				</div>
			</div>
			
		</div>
		
		<!-- <div class="mt-4">
			<div class="label">Виды деятельности:</div>
			<div class="row">
				<div class="col-auto" v-for="(spec, key) in master.speciality" :key="key">
					<div class="badge mt-2">{{spec.label}}</div>
				</div>
			</div>
		</div> -->

		<!-- <div class="row">
			<div class="col-md-6 mt-4">
				<div class="label">Город:</div>
				<div class>Воронеж</div>
			</div>

			<div class="col-md-6 mt-4">
				<div class="label">Контактный телефон:</div>
				<div class>phone</div>
			</div>
		</div> -->

		<div class="mt-4">
			<div class="label">Галерея работ:</div>

			<ImagesCarousel
				:images="master.photosGallery"
			/>
		</div>

		<div class="mt-4 position-relative">
			<div class="label">Фото рабочего места:</div>

			<ImagesCarousel
				:images="master.photosWorkplace"
			/>
		</div>

		<div class="mt-4">
			<div class="label">О себе:</div>

			
		</div>


		<Reviews :masterId="master.id" />
	</div>
</template>

<script>
import ImagesCarousel from "../components/ImagesCarousel";
import Reviews from "../components/master/Reviews";

export default {
	components: {
		ImagesCarousel,
		Reviews,
	},
	props: {
		master: {
			default: {},
			type: Object
		}
	},
	computed: {
		specialitiesList() {
			return this.master.speciality.map(s => s.label).join(", ")
		}
	}
};
</script>

<style lang="less" scoped>
.badge {
	background: #ccc;
	border-radius: 15px;
	// padding: 10px;
	padding: 10px 15px !important;
	color: #fff;
}
</style>