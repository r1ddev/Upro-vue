<template>
	<el-dialog title="Создать отклик" :visible.sync="visible">
		<span>This is a message</span>
		<span slot="footer" class="dialog-footer">
			<el-button @click="$emit('cancel')">Cancel</el-button>
			<el-button type="primary" @click="$emit('create')">Confirm</el-button>
		</span>
	</el-dialog>
</template>

<script>
export default {
	props: {
		visible: {
			type: Array,
			default: false,
		}
	}
};
</script>

<style>
</style>