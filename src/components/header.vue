<template>
    <div class="publicHeaderBox">
        <span class="backBtn" @click="() => {this.$router.go(-1)}">{{headerTitle}}</span>

    </div>
</template>

<script>
    export default {
        name: 'PublicHeader',
        props:['headerTitle'],
        mounted() {

        },
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style lang="stylus">
    .publicHeaderBox
        height .3rem
        box-sizing border-box
        float left
        width 100%
        margin .15rem 0 .2rem
        padding 0 .15rem

    .backBtn
        float left
        padding-left .22rem
        height .3rem
        line-height .3rem
        color #fff
        font-size .18rem
        background url("../,,/../assets/images/backBtn.png") no-repeat left .06rem
</style>


