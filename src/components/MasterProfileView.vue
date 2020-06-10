<template>
	<div class="bid">
		<div class="title">Ваш профиль</div>
		<div class="row">
			<div class="col-3">
				<div class="avatar">
					<div class="label">Аватар профиля:</div>
					<img src="https://www.google.ru/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" />
				</div>
			</div>
			<div class="col d-flex justify-content-center flex-column">
				<div class>{{master.username}}</div>
			</div>
		</div>
		<div class="mt-4">
			<div class="label">Ваши виды деятельности:</div>
			<div class="row">
				<div class="col-auto" v-for="(spec, key) in master.speciality" :key="key">
					<div class="badge mt-2">{{spec}}</div>
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col-md-6 mt-4">
				<div class="label">Город, где вы находитесь:</div>
				<div class>Воронеж</div>
			</div>

			<div class="col-md-6 mt-4">
				<div class="label">Контактный телефон:</div>
				<div class>phone</div>
			</div>
		</div>

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

			<div class>{{master.description}}</div>
		</div>
	</div>
</template>

<script>
import ImagesCarousel from "../components/ImagesCarousel";

export default {
	components: {
		ImagesCarousel
	},
	props: {
		master: {
			default: {},
			type: Object
		}
	}
};
</script>

<style lang="less" scoped>
.badge {
	background: #ccc;
	border-radius: 15px;
	padding: 10px;
	color: #fff;
}
</style>