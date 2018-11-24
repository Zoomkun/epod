<template>
    <section class="transactionDetail-box">
        <header class="transactionDetail-header">
            <span class="transactionDetail-back" @click="() => {this.$router.go(-1)}"><<</span>
            记录详情
        </header>
        <h4 class="transactionDetail-title">{{transactionDetail.type === 1 ? '买入':'卖出'}}{{transactionDetail.assetName}}<span class="transactionDetail-status">{{transactionDetail.type === 1 ? '+':'-'}}0.05BCR</span></h4>
        <div class="transactionDetail-list">付款方：数据暂无</div>
        <div class="transactionDetail-list">收款方：数据暂无</div>
        <div class="transactionDetail-list">交易号：数据暂无</div>
        <div class="transactionDetail-list">交易时间：{{transactionDetail.createTimestamp}}</div>
    </section>
</template>

<script>
    export default {
        name: 'transactionDetail',
        mounted() {
            this.transactionDetail = this.$route.query
            console.log(this.transactionDetail)
        },
        data() {
            return {
                transactionDetail:{}
            }
        },
        methods: {

        }
    }
</script>

<style lang="stylus">
    .transactionDetail-header
        height .4rem
        line-height .4rem
        text-align left
        font-size .2rem
        padding .1rem .2rem

    .transactionDetail-title
        font-size .20rem
        text-align left
        padding  0 .2rem
        margin-bottom .4rem

    .transactionDetail-status
        float right

    .transactionDetail-list
        font-size .15rem
        padding 0 .2rem
        height .4rem
        line-height .4rem
</style>


