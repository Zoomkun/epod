<template>
    <section class="assets-box">
        <strong class="assets-all">总资产：$4500</strong>
        <p class="assets-list" v-for="item in assetsData">
            <span class="assets-name"> {{item.name}}</span>
            <span class="assets-num">{{item.value}}个</span>
            <span class="assets-money">${{item.usdValue||0}}</span>
            <router-link class="assets-btn" :to="{path:'/mine/TransactionRecords',query:{code:item.code}}">> </router-link>
        </p>
    </section>
</template>

<script>
    export default {
        name: 'assets',
        mounted() {
            let data = JSON.parse(localStorage.getItem('user'))
            this.userInfo = data
            this.getAssets()
        },
        data() {
            return {
                userInfo:{},
                assetsData:[]
            }
        },
        methods: {
            getAssets(){
                let self = this
                self.$ajax.get('easset/asset/info')
                    .then(function (data) {
                        if (data.code === 1) {
                            self.assetsData = data.data.assets
                        }
                    })
            }
        }
    }
</script>

<style lang="stylus">
    .assets-all
        text-align center
        margin .5rem 0
        font-size .2rem
        width 100%
        display block

    .assets-list
        font-size .2rem
        text-align center
        height .4rem
        margin .5rem 0 .3rem
        line-height .4rem
        padding 0 .2rem
        display flex

    .assets-name
        float left

    .assets-btn
        float right

    .assets-num ,.assets-money
        flex 1


</style>


