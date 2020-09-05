<template>
    <vue100vh class="flex-center flex-column">
        <div class="container">
            <div class="row m-0">
                <div class="col-md-7 flex-center flex-column">
                    <div class="desc">Любая разгаданная загадка кажется потом поразительно легкой, а сейчас</div>
                    <div class="title">ведутся технические работы</div>
                    <div class="subtitle">возвращайтесь к нам позже</div>
                </div>
                <div class="col-md-5 image-wrap">
                    <img :src="require('../assets/img/tech_works.svg')" alt="">
                </div>
            </div>
        </div>
    </vue100vh>
</template>

<script>
import vue100vh from 'vue-100vh'

export default {
    components: {
        vue100vh
    }
}
</script>

<style lang="less" scoped>
.desc {
    text-align: center;
    color: #4F4F4E;
    font-weight: normal;
    font-size: 18px;
}
.subtitle {
    text-align: center;
    margin-top: 1rem;
    color: #4F4F4E;
    font-weight: bold;
    font-size: 27px;
}
.title {
    margin-top: 1rem;
    text-align: center;
    background: #F4E6EE;
    border: 2px solid #4F4F4E;
    box-shadow: 3px 3px #4F4F4E;
    font-size: 32px;
    font-weight: bold;
}
.image-wrap {
    img {
        width: 100%;
    }
}
</style>