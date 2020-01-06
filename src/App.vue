<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
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
