<template>
	<div class>
		<el-dialog :visible.sync="dialogVisible">
			<div v-touch:swipe="swipeHandler">
				<el-carousel ref="carousel" trigger="click" indicator-position="outside" :autoplay="false">
					<el-carousel-item v-for="(image, key) in images" :key="key">
						<img :src="image" class="carousel-photo" alt />
					</el-carousel-item>
				</el-carousel>
			</div>
		</el-dialog>
		<div class="position-relative" v-if="images.length">
			<swiper ref="swiper" :options="swiperOptions">
				<swiper-slide v-for="(image, key) in images" :key="key">
					<img :src="image" alt @click="photoPreview(image, key)" class="carousel-photo-thumb"/>
				</swiper-slide>
			</swiper>
			<div :class="'swiper-button-prev swiper-p' + _uid" slot="button-prev"></div>
			<div :class="'swiper-button-next swiper-n' + _uid" slot="button-next"></div>
		</div>

		<div class="" v-else>
			<div class="text-center text-black-50">Нет изображений</div>
		</div>
	</div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import store from '../store';

export default {
	components: {
		Swiper,
		SwiperSlide
	},
	directives: {
		swiper: directive
	},
	props: {
		images: {
			type: Array,
			default: []
		}
	},
	data: function() {
		return {
			dialogVisible: false,
			dialogImageUrl: '',
			imageHost: store.state.server
		};
	},
	methods: {
		photoPreview (file, key) {
			this.dialogImageUrl = file;
			this.dialogVisible = true;

			setTimeout(() => {
				this.$refs.carousel.setActiveItem(key);
			}, 200);
		},
		swipeHandler(direction) {
			if (direction == "left") {
				this.$refs.carousel.next();
			}

			if (direction == "right") {
				this.$refs.carousel.prev();
			}
		},
	},
	computed: {
		swiperOptions() {
			return {
				slidesPerView: "auto",
				spaceBetween: 30,
				navigation: {
					nextEl: ".swiper-button-next.swiper-n" + this._uid,
					prevEl: ".swiper-button-prev.swiper-p" + this._uid
				}
			};
		}
	},
	created() {
		// console.log(this.swiperOptions);
	}
};
</script>

<style lang="less" scoped>
.swiper-button-prev,
.swiper-work-button-prev {
	top: 57%;
	left: -35px;
}
.swiper-button-next,
.swiper-work-button-next {
	top: 57%;
	right: -35px;
}

.carousel-photo-thumb {
	cursor: pointer;
}

.swiper-slide {
	width: auto;
}
</style>