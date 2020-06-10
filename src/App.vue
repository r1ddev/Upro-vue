<template>
	<div id="app" v-loading="$store.getters.isLoading">
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
		// console.log("$store.getters.master/isLoading", this.$store.getters['master/isLoading']);
		// console.log("$store.getters.isLoading", this.$store.getters['isLoading']);
		console.log("$store.getters.isLoading", this.$store.getters.isLoading);
		
		let userToken = localStorage.token || null

		if (userToken != null) {
			this.$store.dispatch('general/setToken', userToken)
			console.log("this.$store", this.$store);
			
			if (this.$store.getters['general/isLogin']) {
				console.log("login");
			}
		}
	}
}
</script>

<style lang="less">
</style>
