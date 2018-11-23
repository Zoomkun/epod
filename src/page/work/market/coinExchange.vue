<template>
    <div class="coinExchange-main big-bg">
        <div class="coinExchange-top">
            <PublicHeader :header-params="header"></PublicHeader>
        </div>
        <div class="coinExchange-bottom">
            <div class="coinExchange-coinIcon"></div>
            <p class="coinExchange-assetsOne">
                {{assetData.assetAmount}} {{exchangeData.name}}
            </p>
            <p class="coinExchange-assetsTwo">=${{assetData.assetUsdValue }}</p>
            <div class="coinExchange-coin">
                <i class="coinExchange-rechargeIcon"></i>1 {{exchangeData.name}} = {{assetData.exchangeRate}} BCR
            </div>
            <div class="coinExchange-sellTitle">卖出 {{exchangeData.name}}</div>
            <div class="coinExchange-sellPrice">{{rangeValue}}</div>
            <mt-range
                class="coinExchange-range"
                v-model="rangeValue"
                :min="0"
                :max="assetData.assetAmount"
                :step="1"
                :bar-height="5">
                <div slot="start" class="coinExchange-rangeNum">0</div>
                <div slot="end" class="coinExchange-rangeNum">{{assetData.assetAmount}}</div>
            </mt-range>
            <div class="coinExchange-buyPrice">
                买入 BCR
                <span class="coinExchange-buyNum">{{buyBCRNum}}</span>
            </div>
            <div class="coinExchange-btn" @click="exchange">兑换</div>
            <mt-popup
                v-model="exchangeStatic.showTips"
                position="center">
                    <div class="coinExchange-static" :class="{'coinExchange-staticError':exchangeStatic.success}">
                        {{exchangeStatic.success === true ? '兑换成功' : '兑换失败'}}
                    </div>
            </mt-popup>
        </div>
    </div>
</template>

<script>
    import PublicHeader from '@/components/header.vue'
    import {Toast} from 'mint-ui';
    export default {
        name: 'coinExchange',
        mounted() {
            this.exchangeData = this.$route.query
            this.getData()
        },
        data() {
            return {
                header: {
                    title: '兑换BCR'
                },
                exchangeStatic:{
                    showTips:false,
                    success:true
                },
                rangeValue:0,
                exchangeData:{},
                assetData:{},
                buyBCRNum:0,
            }
        },
        watch: {
            rangeValue: {
                handler() {
                    this.buyBCRNum = this.assetData.exchangeRate * this.rangeValue
                },
                deep: true,
            }
        },
        methods: {
            getData(){
                let self = this
                self.$ajax.get('easset/exchange/transaction?assetCode='+self.exchangeData.code)
                    .then(function (data) {
                        if (data.code === 1) {
                            self.assetData = data.data
                        }
                    })
            },
            exchange(){
                    let self = this
                self.$ajax.post('easset/exchange/transaction/submit?assetCode=' + self.exchangeData.code + '&exchangeAmount='+self.rangeValue)
                    .then(function (data) {
                        if (data.code === 1) {
                            self.getData()
                        }else{
                            self.exchangeStatic.success = false
                        }
                        self.exchangeStatic.showTips = true
                    })
            }
        },
        components: {
            PublicHeader
        }
    }
</script>

<style lang="stylus">
    .coinExchange-main
        width 100%
        height 100%
        box-sizing border-box
        display -webkit-box
        display -ms-flexbox
        display flex
        -webkit-box-orient vertica
        -ms-flex-direction column
        flex-direction column

    .coinExchange-top
        height .65rem
        width 100%

    .coinExchange-bottom
        flex 1
        margin 0 .15rem .15rem
        padding .15rem
        overflow auto
        background #444D6A
        border-radius .12rem

    .coinExchange-rangeNum
        font-size .15rem
        color #AEBECE
        position absolute
        top .2rem

        &:nth-child(1)
            left 0

        &:nth-child(3)
            right 0

    .coinExchange-coinIcon
        width .66rem
        height .66rem
        margin 0 auto
        background red
        border-radius .33rem

    .coinExchange-assetsOne
        color #ffffff
        height .32rem
        line-height .32rem
        font-size .21rem
        text-align center

    .coinExchange-assetsTwo
        height .18rem
        font-size .18rem
        text-align center
        color #9AADBF

    .coinExchange-coin
        text-align center
        margin-top .22rem
        height .5rem
        font-size .18rem
        background #6C7E95
        color #fff
        line-height .5rem
        border-radius .12rem

    .coinExchange-rechargeIcon
        background url("../../../assets/images/currencyRecharge-rechargeIcon.png") no-repeat  center
        background-size contain
        display inline-block
        vertical-align middle
        width .36rem
        height .36rem
        margin-right .18rem

    .coinExchange-sellTitle
        color #FFFFFF
        font-size .21rem
        text-align left
        height .81rem
        line-height .81rem

    .coinExchange-sellPrice
        color #51D696
        font-size .34rem
        text-align center
        height .64rem
        line-height .64rem
        border-bottom 1px solid #6C7E95

    .coinExchange-range
        margin .33rem 0 .48rem

    .coinExchange-buyPrice
        font-size .21rem
        color #fff

    .coinExchange-buyNum
        color #738197

    .coinExchange-btn
        background #5871FF
        height .5rem
        border-radius .12rem
        text-align center
        line-height .5rem
        color #FFFFFF
        font-size .18rem
        margin-top .42rem

    .coinExchange-range
        .mt-range-progress
            background #51D696

    .coinExchange-static
        width 1.46rem
        height 1.35rem
        font-size .24rem
        line-height 2rem
        text-align center
        border-radius .1rem
        color #FF5858
        background  url("../../../assets/images/exchange-error.png") no-repeat center .3rem;
        background-size .39rem .39rem

        &.coinExchange-staticError
            color #51D696
            background  url("../../../assets/images/exchange-success.png") no-repeat center .3rem;
            background-size .39rem .39rem
</style>


