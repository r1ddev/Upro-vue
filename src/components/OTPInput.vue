<template>
	<div class>
		<otp-input v-model="userToken" class="field-container" size="24"></otp-input>
		{{userToken}}
	</div>
</template>

<script>
import { OTPInput8 } from "@8bu/vue-otp-input";

export default {
	data() {
		userToken: "";
	},
	components: {
		"otp-input": OTPInput8
	}
};
</script>

<style>
</style>
