<template>
    <div class="myMarket-main big-bg">
        <div class="myMarket-top">
            <PublicHeader :header-params="header"></PublicHeader>
            <div class="myMarket-topBg">

            </div>
        </div>
        <div class="myMarket-bottom">
            <div class="myMarket-bottomMain">
                <div class="myMarket-coinBox"  v-for="(item,index) in marketData" >
                    <div class="myMarket-coinInfo">
                        <p class="myMarket-coinIcon"></p>
                        <p class="myMarket-coinName">{{item.name}}</p>
                        <p class="myMarket-coinRate">1{{item.item}}=${{item.usdValue}}</p>
                    </div>
                    <p @click="exchange" v-if="item.name == 'BCR'" class="myMarket-exchangeBtn"><i class="myMarket-rechargeIcon"></i>兑换</p>

                    <router-link :to="{ path: '/work/coinRecharge', query: { code: item.code }}" v-if="item.name != 'BCR'" class="myMarket-exchangeBtn"><i class="myMarket-buyIcon"></i>充币</router-link>
                </div>
            </div>
            <mt-actionsheet
                :actions="exchangeData"
                v-model="code">
            </mt-actionsheet>
        </div>
    </div>
</template>

<script>
    import PublicHeader from '@/components/header.vue'

    export default {
        name: 'myMarket',
        mounted() {
            this.getData()
        },
        data() {
            return {
                header: {
                    title: '投资'
                },
                marketData:[],
                exchangeData:[],
                code:false
            }
        },
        methods: {
            getData() {
                let self = this
                self.$ajax.get('emarket/market/exchange/list?pageNo=1&pageSize=50')
                    .then(function (data) {
                        if (data.code === 1) {
                            let reresult = data.data.result
                            self.marketData = reresult
                            self.exchangeData = reresult.slice(1,reresult.length)
                            for(let i in self.exchangeData){
                                self.exchangeData[i].method = self.linkTo
                            }

                        }
                    })
            },
            exchange(){
                this.code=true
            },
            linkTo(key){
                this.$router.push({path:"/work/coinExchange",query:key})
            }
        },
        components: {
            PublicHeader
        }
    }
</script>

<style lang="stylus">
    .myMarket-main
        width 100%
        height 100%
        box-sizing border-box
        display -webkit-box
        display -ms-flexbox
        display flex
        -webkit-box-orient vertica
        -ms-flex-direction column
        flex-direction column

    .myMarket-bottom
        flex 1
        box-sizing border-box
        padding .15rem

    .myMarket-coinBox
        padding .15rem
        box-sizing border-box
        font-size .18rem
        border-radius .03rem
        color #ffffff
        width 100%
        height 1.21rem
        margin-top .12rem
        background url("../../../assets/images/bg-repeat.png") #444D6A

        &:nth-child(1)
            margin-top 0

    .myMarket-bottomMain
        background #fff
        height 100%
        box-sizing border-box
        padding .15rem
        border-radius .05rem

    .myMarket-coinInfo
        height .4rem
        width 100%
        float left

    .myMarket-coinIcon
        width .4rem
        height .4rem
        margin 0 .06rem .15rem .15rem
        background #fff
        float left

    .myMarket-exchangeBtn, .myMarket-rechargeBtn
        width 100%
        height .36rem
        margin-top .15rem
        color #ffffff
        text-align center
        line-height .36rem
        background #51D696
        border-radius .08rem
        float left

    .myMarket-coinName
        font-weight bold
        float left
        line-height .4rem
        height .4rem

    .myMarket-coinRate
        height .4rem
        float right
        line-height .4rem
        color #AEBECE
        float right

    .myMarket-top
        position relative
        height 1.65rem

    .myMarket-topBg
        position absolute
        width 100%
        height 1rem
        top .84rem
        background url("../../../assets/images/myMarket.png") no-repeat center center
        background-size contain

    .myMarket-rechargeIcon
        background url("../../../assets/images/myMarket-rechargeIcon.png") no-repeat

    .myMarket-buyIcon
        background url("../../../assets/images/myMarket-buyIcon.png") no-repeat

    .myMarket-rechargeIcon, .myMarket-buyIcon
        display inline-block
        width .18rem
        height .12rem
        background-size contain
</style>


