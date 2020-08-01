<template>
    <div id="balance">

        <el-dialog
            :visible.sync="helpVisible"
            title=""
            class="help-dialog el-dialog-responsive">

            <div slot="title" class="title text-right">О балансе</div>

            <div class="help">
                <div class="row">
                    <div class="col-md-8 bg-image-first">
                        клиент оформляет<br>заявку на услугу
                    </div>
                </div>
                <div class="row justify-content-end bg-image-second">
                    <div class="col-md-10">
                        мастер оставляет<br>отклик, устанавливая<br><strong>цену</strong>
                    </div>
                </div>
                <div class="notice">
                    в случае успешного завершения заявки с баланса списывается 10% от цены
                </div>
                <div class="alert">
                    При отрицательном балансе не показываются новые заявки
                </div>
            </div>
        </el-dialog>

        <div class="container">
            <h3>Текущий баланс</h3>
            <div class="row">
                <div class="col-auto">
                    <div class="image-left">
                        <img :src="require('../assets/img/balance_left.svg')">
                    </div>
                </div>
                <div class="col">
                    <div class="number-wrap">
                        <div class="number">
                            1000
                        </div>
                        <a href="#" class="help" @click.prevent="helpVisible = true"></a>
                    </div>
                </div>
                <div class="col-auto image-right-wrap">
                    <div class="image-right">
                        <img :src="require('../assets/img/balance_right.svg')">
                    </div>
                </div>
            </div>
            <div class="btn-wrap">
                <a href="#" class="btn btn-balance">Пополнить</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            helpVisible: false,
        }
    }
}
</script>

<style lang="less" scoped>
.container {
    max-width: 621px;

    h3 {
        color: #6B3752;
        font-size: 32px;
        font-family: "Roboto";
        font-weight: bold;
        text-align: center;
        margin: 1rem 0;
    }

    .image-right-wrap {
        align-items: flex-end;
        display: flex;
    }

    .number-wrap {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        height: 100%;

        .number {
            line-height: 1;
            color: #4F4F4E;
            font-size: 40px;
            font-family: "Roboto";
            font-weight: bold;
        }

        .help {
            width: 35px;
            height: 35px;
            background: url("../assets/img/icons8-help-100 1.svg");
            background-size: cover;
        }
    }

    .btn-wrap {
        margin-top: 20px;

        .btn-balance {
            width: 100%;
            padding: 15px;
            background: #6B3752;
            border-radius: 15px;
            font-family: "Roboto";
            font-size: 30px;
            color: #fff;
            text-transform: uppercase;
        }
    }
}

.help-dialog {
    word-break: break-word; 

    ::v-deep .el-dialog__body {
        padding-bottom: 0;
    }

    .title {
        margin-right: 30px;
        color: #6B3752;
        font-size: 30px;
    }

    .bg-image-first {
        height: 200px;
        background: url(../assets/img/balance-help-left.svg);
        background-position: left center;
        background-size: auto 200px;
        background-repeat: no-repeat;

        text-align: right;
        display: flex;
        align-items: center;
        justify-content: flex-end;

        margin-top: -60px;

        color: #6B3752;
        font-size: 20px;
    }

    .bg-image-second {
        height: 200px;
        background: url(../assets/img/balance-help-right.svg);
        background-position: right center;
        background-size: auto 200px;
        background-repeat: no-repeat;

        text-align: left;
        display: flex;
        align-items: center;
        justify-content: flex-start;

        margin-top: -60px;

        color: #6B3752;
        font-size: 20px;

        @media screen and (max-width: 600px) {
            background-size: auto 130px;
        }
    }

    .notice {
        color: #6B3752;
        text-align: center;
        font-size: 20px;
        margin-top:10px;
        word-break: break-word; 
    }

    .alert {
        background: #6B3752;
        border-radius: 15px;
        padding: 15px;
        color:#fff;
        font-size: 17px;
        text-align: center;
        margin: 0 -20px;
        word-break: break-word; 
    }
}
</style>