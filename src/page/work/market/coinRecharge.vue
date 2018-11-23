<template>
    <div class="coinRecharge-main big-bg">
        <div class="coinRecharge-top">
            <PublicHeader :header-params="header"></PublicHeader>
        </div>
        <div class="coinRecharge-bottom">
            <div class="coinRecharge-coinIcon"></div>
            <p class="coinRecharge-assetsOne">
                {{marketData.assetName}}
            </p>
            <p class="coinRecharge-Bit">比特网络</p>
            <!--<p class="coinRecharge-QRCode" id="qrcode"></p>-->
            <vue-qr
                class="coinRecharge-QRCode"
                :margin="10"
                :colorLight="qrcode.colorLight"
                :colorDark="qrcode.colorDark"
                :text="marketData.assetDepositAddress"
            ></vue-qr>
            <p class="coinRecharge-address">充币地址</p>
            <p class="coinRecharge-addressInfo">{{marketData.assetDepositAddress}}</p>
            <p
                v-clipboard:copy="marketData.assetDepositAddress"
                v-clipboard:success="copyCode"
                class="coinRecharge-copy" >复制</p>
        </div>
    </div>
</template>

<script>
    import VueQr from 'vue-qr'
    import PublicHeader from '@/components/header.vue'
    import {Toast} from 'mint-ui';
    export default {
        name: 'coinRecharge',
        mounted() {
            this.assetCode = this.$route.query.code
            this.getData()
        },
        data() {
            return {
                header: {
                    title: '充值BCR'
                },
                assetCode:'',
                marketData:{
                    assetDepositAddress:''
                },
                qrcode: {
                    colorLight: '#DAE2ED',
                    colorDark: '#9AADBF',
                },
            }
        },
        methods: {
            getData() {
                let self = this
                self.$ajax.get('easset/address/deposit?assetCode='+self.assetCode)
                    .then(function (data) {
                        if (data.code === 1) {
                            self.marketData = data.data


                        }
                    })
            },
            copyCode () {
                Toast('复制成功')
            }
        },
        components: {
            PublicHeader,
            VueQr,
        }
    }
</script>

<style lang="stylus">
    .coinRecharge-main
        width 100%
        height 100%
        box-sizing border-box
        display -webkit-box
        display -ms-flexbox
        display flex
        -webkit-box-orient vertica
        -ms-flex-direction column
        flex-direction column

    .coinRecharge-top
        height .65rem
        width 100%

    .coinRecharge-bottom
        flex 1
        margin 0 .15rem .15rem
        padding .15rem
        overflow auto
        background #444D6A
        border-radius .12rem

    .coinRecharge-coinIcon
        width .66rem
        height .66rem
        margin 0 auto
        background red
        border-radius .33rem

    .coinRecharge-assetsOne
        color #ffffff
        height .32rem
        line-height .32rem
        font-size .21rem
        text-align center

    .coinRecharge-Bit, .coinRecharge-address
        height .18rem
        font-size .18rem
        text-align center
        margin .5rem 0 .12rem 0
        color #9AADBF

    .coinRecharge-address
        margin .45rem 0 .12rem

    .coinRecharge-QRCode
        width 1.04rem
        height 1.04rem
        margin 0 auto

        img
            width 100%
            float left
            border-radius .04rem
            height 100%

    .coinRecharge-addressInfo
        color #738197
        background #363D54
        text-align center
        width 2rem
        font-size .18rem
        line-height .48rem
        border-radius .24rem
        height .48rem
        margin 0 auto
        white-space nowrap
        text-overflow ellipsis
        overflow hidden

    .coinRecharge-copy
        width 1.03rem
        height .34rem
        line-height .34rem
        background #5871FF
        border-radius .1rem
        text-align center
        font-size .16rem
        color #fff
        margin .15rem auto 0
</style>


