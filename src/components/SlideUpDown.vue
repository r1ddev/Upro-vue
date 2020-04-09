<template>
	<div class="px-5">
		<div class="title py-4">
			<h3 class="">{{ this.title }}</h3>
			<button :class="isShow ? 'toggle show' : 'toggle'" @click="isShow = !isShow"></button>
		</div>

		<transition name="slide">
			<slide-up-down :active="isShow" :duration="400" class="content mx-5">
				<slot></slot>
			</slide-up-down>
		</transition>
	</div>
</template>

<script>
import SlideUpDown from "vue-slide-up-down";
import Vue from "vue";

Vue.component("slide-up-down", SlideUpDown);

export default {
	props: ["title", "description"],
	data: function() {
		return {
			isShow: false
		};
	}
};
</script>

<style lang="less" scoped>

.content {
	border: solid 1px #e9378d;
	background: #ffffff;
	box-shadow: 0px 1px4px-1px rgba(100,100,100,0.5);
	border-radius: 5px;
}

.title {
	display: flex;

	h3 {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: 0;
		padding: 0;
	}

	.toggle {
		outline: none;
		width: 46px;
		height: 46px;
		border: solid 1px #f3a9cd;
		background: #f3a9cd;
		background-image: url(../assets/img/Line-4.png);
		background-position: center center;
		background-repeat: no-repeat;
		box-shadow: 0px 1px4px-1px rgba(100, 100, 100, 0.5);
		border-radius: 5px;
	}

	.show {
		background-image: url(../assets/img/Line-3.png);
	}
}

ul {
	cursor: pointer;
}

.slide-enter-active {
	transition-duration: 0.3s;
	transition-timing-function: ease-in;
}

.slide-leave-active {
	transition-duration: 0.3s;
	transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to,
.slide-leave {
	max-height: 1000px;
	overflow: hidden;
}

.slide-enter,
.slide-leave-to {
	overflow: hidden;
	max-height: 0;
}
</style>