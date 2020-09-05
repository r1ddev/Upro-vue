<template>
    <vue100vh class="flex-center flex-column">
        <div class="title">Oopss... (Упс)</div>
        <div class="desc">Маг не приходит поздно, и рано тоже не приходит, он приходит когда надо</div>
        <div class="image-wrap">
            <img :src="require('../assets/img/404.svg')" alt="">
        </div>
        <div class="subtitle">Но такой странички мы ещё создали</div>
        <div class="btn-wrap">
            <router-link to="/" class="btn">На главную</router-link>
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
.title {
    color: #4F4F4E;
    font-weight: bold;
    font-size: 22px;
}

.subtitle {
    margin-top: 1rem;
    color: #4F4F4E;
    font-weight: bold;
    font-size: 27px;
}

.desc {
    margin-top: 1rem;
    color: #4F4F4E;
    font-weight: normal;
    font-size: 18px;
}

.image-wrap {
    margin-top: 1rem;
    max-height: 50%;
    text-align: center;

    img {
        height: 100%;
    }
}
.btn-wrap {
    margin-top: 1rem;
    
    .btn {
        background: #F4E6EE;
        border: 2px solid #4F4F4E;
        border-radius: 0;
        transition: transform .2s;
        box-shadow: 3px 3px #4F4F4E;
        font-size: 24px;
        padding: 10px 30px;

        &:hover {
            transform: scale(1.05)
        }
    }
}

</style>