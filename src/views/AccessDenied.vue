<template>
	<div class="container pt-5">
		<div class="row">
			<div class="col-sm-6 left">
				<div class="title">У вас недостаточно прав на просмотр данной страницы</div>
				<div class="subtitle">You shall not pass...</div>
			</div>
			<div class="col-sm-6 right">
				<img :src="require('../assets/img/lack_of_rights.svg')" alt="" srcset="">
			</div>
		</div>
	</div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.left {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;

	.title {
		font-size: 20px;
    	font-weight: bold;
		color: #4F4F4E;
		border-top: 3px solid #4F4F4E;
		border-bottom: 3px solid #4F4F4E;
	}

	.subtitle {
		width: 100%;
		margin-top: 2rem;
		text-align: right;
		font-size: 14px;
		font-weight: 600;
	}
}

.right {
	img {
		width: 100%;
	}
}
</style>