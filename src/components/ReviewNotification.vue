<template>
	<el-dialog class="el-dialog-responsive" :visible.sync="visible" title="" :show-close="false">
		<div slot="title" class="title">
			<div class="row">
				<div class="col-auto">
					<img
						src="https://www.google.ru/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
						class="avatar"
						alt=""
					/>
				</div>
				<div class="col-md master-data">
					<div class="name">Мария Александровна</div>
					<div class="row">
						<div class="col type">Массаж</div>
						<div class="col-md-auto date">11 июля</div>
					</div>
				</div>
			</div>
		</div>

		<div class="flex-center mb-4">
			<el-rate v-model="rate"></el-rate>
		</div>

		<el-form @submit.native.prevent="submit" label-position="top">
			<el-form-item>
				<el-input placeholder="Анонимная лисичка?" maxlength="1000" v-model="name" />
			</el-form-item>

			<el-form-item>
				<el-input
					type="textarea"
					placeholder="Комментарий"
					:autosize="{ minRows: 2, maxRows: 4 }"
					maxlength="1000"
					v-model="comment"
				/>
			</el-form-item>

			<el-form-item>
				<div class="row">
					<div class="col-md-8">
						<a-button html-type="submit" type="primary" size="large" class="yp-btn yp-btn-fill"
							>Оценить</a-button
						>
					</div>
					<div class="col-md-4">
						<a-button html-type="submit" type="secondary" size="large" class="yp-btn">Позже</a-button>
					</div>
				</div>
			</el-form-item>

            <div class="notice">Ваш отзыв поможет другим пользователям!</div>
		</el-form>
	</el-dialog>
</template>

<script>
export default {
	data: function () {
		return {
			visible: true,
			rate: null,
			name: "",
			comment: "",
		};
	},
	methods: {
		submit() {},
	},
};
</script>

<style lang="less" scoped>
::v-deep .el-dialog__header {
	padding: 0;
}
::v-deep .el-rate__icon {
    font-size: 38px;
    
    @media screen and (max-width: 550px) {
        font-size: 30px;
    }
}
.title {
    background: #f3a9cd;
    padding: 5px 20px;

	.avatar {
		width: 60px;
		height: 60px;
		object-fit: cover;
		border-radius: 6px;
	}

	.master-data {
		display: flex;
		flex-direction: column;
        justify-content: center;
        
        .name {
            color: #000000;
            font-size: 18px;
        }

        .type {
            color: #818181;
            font-size: 18px;
        }

        .date {
            color: #000000;
            font-size: 18px;
            font-weight: bold;
        }
	}
}

.yp-btn-fill {
	width: 100%;
}

.notice {
    font-weight: 100;
    font-size: 14px;
    text-align: center;
}
</style>
