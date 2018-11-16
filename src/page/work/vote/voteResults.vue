<template>
    <div class="voteResults-main">
        <PublicHeader :header-title="header"></PublicHeader>
        <div class="voteResults-content">
            <div class="voteResults-info clear">
                <div class="voteResults-topIcon" :class="{'active': info.isVote}"></div>
                <div class="voteResults-staticIn" :class="{'active': info.isVote}">{{info.isVote ? '投票成功':'未投票'}}</div>
                <div class="voteResults-title">[标题] {{info.voteTitle}}</div>
                <div class="voteResults-desc">{{info.voteDesc}}</div>
                <div class="voteResults-endTime">截止日期：{{info.endTime}}</div>
                <div class="voteResults-done">投票状态：<span class="voteResults-voteState" :class="{active:info.state == 1}">{{state[info.state-1]}}</span></div>
                <div class="voteResults-link"><span>投票链接：</span><span class="voteResults-linkInfo">http://wwwwwwwwwwwwwww.qqq.co... </span><span class="voteResults-copy">复制</span></div>
            </div>
            <div class="voteResults-options">
                <div class="voteResults-optionsTitle">投票统计</div>
                <div class="voteResults-optionsRadio">投票选项：  <span class="voteResults-optionsFontColor">{{info.optionType === 1 ? '多选' : '单选'}}</span></div>
                <div class="voteResults-optionsJoiner">参与人数： <span class="voteResults-optionsFontColor">{{info.participants}}</span> </div>

                <div v-for="item in info.optionDTOList ">
                    <p class="voteResults-optionsDesc">{{item.content}}&nbsp;&nbsp;{{item.amount}}<span class="voteResults-percentage">{{item.amount}}%</span></p>
                    <mt-progress :value="20" :bar-height="10"></mt-progress>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import PublicHeader from '@/components/header.vue'

    export default {
        name: 'voteResults',
        mounted() {
            this.voteId = this.$route.query.voteId
            this.getData()
        },
        data() {
            return {
                header: "查看结果",
                voteId:'',
                state:['进行中','已结束','编辑中'],
                info:{}
            }
        },
        methods: {
            getData(){
                let self = this
                self.$ajax.post('vote/result/'+ self.voteId)
                    .then(function (data) {
                        if (data.code === 1) {
                            self.info = data.data
                        }
                    })
            }
        },
        components: {
            PublicHeader
        }
    }
</script>

<style lang="stylus">
    .voteResults-main
        font-size .16rem
        width 100%
        height 100%
        box-sizing border-box
        background url("../../../assets/images/vote_topbg.png") no-repeat top left #DAE2ED
        background-size 100%

    .voteResults-content
        width 100%
        box-sizing border-box
        padding .15rem
        float left

    .voteResults-info,.voteResults-options
        width 100%
        position relative
        box-sizing border-box
        padding 0 .15rem .15rem
        margin-top .55rem
        background #ffffff
        border-radius .08rem
        width 100%

    .voteResults-options
        margin-top .1rem
        padding .15rem

    .voteResults-staticIn
        height .24rem
        line-height .24rem
        text-align center
        color #51D696
        font-size .24rem
        font-weight bold
        width 100%
        float left
        margin-top .5rem

        &.active
            color #AEBECE

    .voteResults-topIcon
        height 1.32rem
        width 100%
        position absolute
        background url("../../../assets/images/voteSuccess.png") no-repeat center
        background-size 1.25rem 1.32rem
        left 0
        top -0.85rem

        &.active
            background url("../../../assets/images/voteNo.png") no-repeat center
            background-size 1.25rem 1.32rem

    .voteResults-title
        float left
        width 100%
        font-size .21rem
        font-weight bold
        color #444D6A
        margin-top .33rem

    .voteResults-desc,.voteResults-endTime,.voteResults-done,.voteResults-link
        height .16rem
        line-height .16rem
        width 100%
        float left
        margin-top .15rem
        text-align left

    .voteResults-voteState
        color #9AADBF

        &.active
            color #51D696

    .voteResults-link
        display flex
        height .3rem
        line-height  .3rem
        margin-top .1rem

    .voteResults-copy
        float right
        color #ffffff
        background #9AADBF
        width .86rem
        height .3rem
        text-align center
        line-height .3rem
        border-radius .08rem

    .voteResults-linkInfo
        flex 1
        overflow hidden
        text-overflow ellipsis
        white-space nowrap

    .voteResults-optionsDesc
        color #444D6A
        height .16rem
        line-height .16rem

    .voteResults-percentage
        float right

    .voteResults-optionsFontColor
        color #444D6A

    .voteResults-optionsRadio
        color #9AADBF
        height .16rem
        margin-top .15rem
        line-height .16rem

    .voteResults-optionsJoiner
        color #9AADBF

        margin-bottom  .15rem
        height .46rem
        line-height .46rem
        border-bottom 1px solid #DAE2ED

    .mt-progress-progress
        background-color #5871FF
</style>


