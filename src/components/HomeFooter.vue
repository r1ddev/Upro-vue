<template>
	<div>
		<section class="footer">
			<div class="container px-5 py-3">
				<div class="row d-flex justify-content-between align-items-center m-text-center">
					<div class="col-md-auto">
						<div>
							<router-link
								:to="this.$store.state.routesLinks.masterRegistration"
								class="footer-link">
								Вы мастер?</router-link>
						</div>
						<div>
							<router-link
								:to="this.$store.state.routesLinks.about"
								class="footer-link-under">
								Часто задаваемые вопросы</router-link>
						</div>
						
					</div>
					<div class="col-md-auto">
						<div class="justify-content-end">
							<a href="#" class="footer-link">yourpro@mail.ru</a>
						</div>
						<div class="">
							<a href="#" class="footer-link-under">Пользовательское соглашение</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<style lang="less" scoped>
.footer-link-under {
	margin-top: 15px;
    display: inline-block;
}

@media screen and (max-width: 767px) {
	.footer-link-under {
		margin-top: 0;
		display: inline-block;
	}
}
</style>