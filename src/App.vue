<template>
	<div id="app">
		<vue-page-transition name="fade-in-right">
		<!-- <transition name="fade"> -->
			<router-view/>
		<!-- </transition> -->
		</vue-page-transition>
	</div>
</template>

<script>

import Vue from 'vue'
import VuePageTransition from 'vue-page-transition'

Vue.use(VuePageTransition)

export default {
	name: 'app',
	data: function () {
		return {

		}
	},
	created() {
		let userToken = localStorage.token || null

		if (userToken != null) {
			this.$store.dispatch('setToken', userToken)
			if (this.$store.getters.isLogin) {
				console.log("login");
			}
		}
	}
}
</script>

<style lang="less">
</style>
