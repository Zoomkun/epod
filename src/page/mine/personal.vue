<template>
    <div class="personal-main">
        <div class="personal-info clear">
            <img  src="http://img1.imgtn.bdimg.com/it/u=3384778320,3674632337&fm=26&gp=0.jpg" alt="" class="personal-head"/>
            <h6 class="personal-name">昵称：EPOD</h6>
            <span class="personal-number">1856465487</span>
            <router-link class="personal-edit" to="/mine/basic">编辑</router-link>
        </div>
        <p class="personal-money">
            <img src="http://img1.imgtn.bdimg.com/it/u=3384778320,3674632337&fm=26&gp=0.jpg" alt="" class="personal-moneyHead">我的资产
            <router-link class="personal-moneyBtn" to="/mine/assets">>></router-link>
        </p>

        <h6 class="personal-version">版本号：V0.01</h6>
    </div>
</template>

<script>
    export default {
        name: 'personal',
        mounted() {

        },
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style lang="stylus">
    .personal-main
        width 100%
        height 100%
        position relative

    .personal-info
        width 100%
        border-bottom 1px solid #cccccc
        text-align center
        padding-bottom .2rem
        margin-bottom .6rem

    .personal-head
        width .6rem
        height .6rem
        border-radius .3rem

    .personal-name
        font-size .2rem

    .personal-number
        float left
        width 100%
        margin-top .2rem
        font-size .2rem
        color #cccccc

    .personal-edit
        width .6rem
        height .3rem
        line-height .3rem
        background #666666
        font-size .14rem
        text-align  center
        color #000
        position absolute
        right .2rem
        top .4rem

    .personal-money
        width 100%
        height .3rem
        line-height .3rem
        font-size .2rem

    .personal-moneyHead
        width .3rem
        height .3rem
        text-align left
        display inline-block
        vertical-align bottom
        margin 0 .1rem 0 .2rem

    .personal-moneyBtn
        float right
        margin-right .2rem
        color #666666


    .personal-version
        font-size .15rem
        width 100%
        text-align center
        position absolute
        bottom .12rem
        color #666666

</style>


