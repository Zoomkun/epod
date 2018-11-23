<template>
    <div class="vote-main">
        <div class="vote-bg"></div>
        <PublicHeader :header-params="header" style="z-index: 2;position: relative"></PublicHeader>
        <div class="vote-content" style="z-index: 1;position: relative">
            <div class="vote-tips" v-if="isPreview"><span class="vote-tipsIcon"></span>预览模式下不能投票</div>
            <div class="vote-title">[标题] {{vote.voteTitle}}</div>
            <div class="vote-desc" v-if="vote.voteDesc">{{vote.voteDesc}}</div>
            <div class="vote-endTime">截止日期: {{vote.endTime}}</div>
            <div class="vote-box">
                <div class="vote-type">投票选项（多选）</div>
                <mt-radio
                    v-if="~~vote.optionType === 2"
                    class="vote-radioList"
                    v-model="select.radio"
                    :options="vote.optionDTOList | options">
                </mt-radio>
                <mt-checklist
                    v-if="~~vote.optionType === 1"
                    class="vote-checkBoxList"
                    v-model="select.check"
                    :options="vote.optionDTOList | options">
                </mt-checklist>
                <div class="vote-submit" @click="!isPreview && submit()">投票</div>
            </div>
        </div>
        <div v-if="isPreview" class="vote-releaseBtn">发布</div>
    </div>
</template>

<script>
    import PublicHeader from '@/components/header.vue'

    export default {
        name: 'vote',
        mounted() {
            let data = this.$route.query.params
            if (data) {
                this.isPreview = true
                this.vote = JSON.parse(data)
            } else {
                this.voteId = this.$route.query.voteId
                this.getVoteData()
            }
        },
        data() {
            return {
                header: {
                    title: '预览投票',
                    tool:{
                    }
                },
                isPreview: false,
                select: {
                    check: [],
                    radio: ''
                },
                voteId: null,
                vote: {}
            }
        },
        filters: {
            options(data) {
                // let data = this.vote.optionDTOList
                for (let i in data) {
                    data[i].label = data[i].content
                    data[i].value = new String(data[i].optionId)
                }
                console.log(data)
                return data
            },
        },
        methods: {
            submit() {
                let self = this
                let params = []
                if (~~self.vote.optionType === 2) {
                    params.push(self.select.radio)
                } else {
                    params = self.select.check
                }

                self.$ajax.post('evote/vote', {optionIds: params, voteId: self.vote.voteId})
                    .then(function (data) {
                        if (data.code === 1) {
                            self.$router.push('/work/voteList')

                        }
                    })
            },
            getVoteData() {
                let self = this
                self.$ajax.get('evote/vote/detail/' + self.voteId)
                    .then(function (data) {
                        if (data.code === 1) {
                            self.vote = data.data

                            if(data.data.isCreateBy){

                                self.header.tool.delete = true

                                if(data.data.state !== 2 && data.data.participants === 0){
                                    self.header.tool.edit = true
                                }
                                if(data.data.state !== 2){
                                    self.header.tool.shutDown = true
                                }
                            }
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
    .vote-main
        position relative
        width 100%
        height 100%
        box-sizing border-box
        background: linear-gradient(126deg, rgba(87, 72, 234, 1), rgba(93, 127, 251, 1));

    .vote-content
        padding 0 .15rem

    .vote-bg
        width 100%
        height 100%
        position absolute
        left 0
        top 0

    .vote-tips
        margin 0 5%
        float left
        width 90%
        color #FF5858
        text-align center
        height .27rem
        font-size .16rem
        line-height .27rem
        background #ffffff
        border-radius .135rem

    .vote-tipsIcon
        display inline-block
        width .15rem
        height .15rem
        margin-right .1rem
        vertical-align middle
        background url("../../../assets/images/voteTipsIcon.png") no-repeat center
        background-size contain

    .vote-title
        color #FFFFFF
        font-size .21rem
        text-align left
        width 100%
        margin .3rem 0 .16rem
        float left

    .vote-endTime, .vote-desc
        width 100%
        float left
        color #BBBFFF
        text-align left
        font-size .16rem
        height .16rem
        line-height .16rem
        margin-top .08rem

    .vote-box
        width 100%
        box-sizing border-box
        padding .2rem .15rem
        background #ffffff
        color #444D6A
        font-size .16rem
        float left
        margin-top .26rem
        border-radius .05rem

        .vote-radioList, .vote-checkBoxList

            .mint-cell
                color #444D6A
                min-height .5rem

                .mint-cell-wrapper
                    padding 0

                    .mint-radiolist-label, .mint-checklist-label
                        padding 0

                        .mint-radio-input:checked + .mint-radio-core, .mint-checkbox-input:checked + .mint-checkbox-core
                            background-color: #5871FF;
                            border-color: #5871FF;

    .vote-releaseBtn
        color #ffffff
        height .6rem
        line-height .6rem
        font-size .21rem
        background #444D6A
        width 100%
        position absolute
        bottom 0
        text-align center

    .vote-submit
        width 100%
        height .42rem
        background #5871FF
        font-size .18rem
        color #ffffff
        text-align center
        line-height .42rem
        float left
        margin-top .4rem
        border-radius .21rem
</style>


