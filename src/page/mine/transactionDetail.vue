<template>
    <section class="transactionDetail-box">
        <header class="transactionDetail-header">
            <span class="transactionDetail-back" @click="() => {this.$router.go(-1)}"><<</span>
            记录详情
        </header>
        <h4 class="transactionDetail-title">买入BCR<span class="transactionDetail-status">+0.05BCR</span></h4>
        <div class="transactionDetail-list">付款方：123131312312312313123</div>
        <div class="transactionDetail-list">收款方：112313123123</div>
        <div class="transactionDetail-list">交易号：12313</div>
        <div class="transactionDetail-list">交易时间：2018-10-11 12:00:00</div>
    </section>
</template>

<script>
    export default {
        name: 'transactionDetail',
        mounted() {

        },
        data() {
            return {

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


