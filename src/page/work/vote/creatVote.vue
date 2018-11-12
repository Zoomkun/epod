<template>
    <div class="createVote-main">
        <PublicHeader :header-title="header"></PublicHeader>
        <div class="createVote-content">
            <mt-navbar v-model="selected" class="createVote-navBar">
                <mt-tab-item id="1">选项一</mt-tab-item>
                <mt-tab-item id="2">选项二</mt-tab-item>
            </mt-navbar>
            <mt-tab-container v-model="selected" class="createVote-containerItem">
                <mt-tab-container-item id="1">
                    <input type="text" class="createVote-title inputStyle" placeholder="投票标题（必填）">

                    <input type="text" class="createVote-desc inputStyle" placeholder="补充描述（选填）">
                    <p class="createVote-optionBox">
                        <span class="createVote-optionUp"></span>
                        <input class="createVote-optionDesc inputStyle" type="text" placeholder="选项">
                        <span class="createVote-optionDel"></span>
                    </p>
                    <p class="createVote-optionBox">
                        <span class="createVote-optionDown"></span>
                        <input class="createVote-optionDesc inputStyle" type="text" placeholder="选项">
                        <span class="createVote-optionDel"></span>
                    </p>
                    <div class="createVote-addOption">
                        <span class="createVote-addOptionIcon">

                        </span>
                        添加选项
                    </div>
                    <div class="createVote-radio">
                        <span class="createVote-radioTitle">投票选项</span>
                        <mt-radio
                            class="createVote-radioList"
                            v-model="value"
                            :options="['多选', '单选']">
                        </mt-radio>
                    </div>
                    <div class="createVote-deadLine">
                        <span class="createVote-radioTitle">截止日期</span>
                        <mt-radio
                            class="createVote-deadLineList"
                            v-model="value"
                            :options="['一天内', '一周后','自定义']">
                        </mt-radio>
                    </div>
                    <div class="createVote-saveBtn">
                        <mt-button type="default" class="createVote-draft">保存至草稿箱</mt-button>
                        <mt-button type="default" class="createVote-preview">预览</mt-button>
                        <mt-button type="default" class="createVote-release">发布</mt-button>
                    </div>
                </mt-tab-container-item>

                <mt-tab-container-item id="2">
                    <mt-cell v-for="n in 4" :key="n" :title="'测试 ' + n"/>
                </mt-tab-container-item>

            </mt-tab-container>
        </div>

    </div>
</template>

<script>
    import PublicHeader from '@/components/header.vue'

    export default {
        name: 'createVote',
        mounted() {

        },
        data() {
            return {
                selected: '1',
                header: "创建投票"
            }
        },
        methods: {},
        components: {
            PublicHeader
        }
    }
</script>

<style lang="stylus">
    .createVote-main
        width 100%
        height 100%
        box-sizing border-box
        background url("../../../assets/images/topBg.png") no-repeat top left #DAE2ED

    .createVote-containerItem
        background #fff
        padding 0 .15rem .1rem



    .createVote-navBar
        width 100%
        height .52rem
        overflow hidden
        border-radius: 0.05rem 0.05rem 0 0;

        .mint-tab-item
            color #444D6A

            .mint-tab-item-label
                font-size .17rem
                color #444D6A

        .is-selected
            background #D2DDEF
            color #9AADBF

    .createVote-content
        padding 0 .15rem

    .inputStyle
        border none
        border-bottom 1px solid #DAE2ED
        outline none
        font-size .16rem
        color #9AADBF

    .createVote-title
        height .6rem
        width 100%
        font-size .21rem
        float left

    input::-webkit-input-placeholder
        color:#D2DDEF

    .createVote-desc
        height .41rem
        line-height .41rem
        margin-top .15rem
        width 100%
        float left

    .createVote-optionBox
        margin-top .16rem
        width 100%
        height .4rem
        line-height .4rem
        float left
        display flex

    .createVote-optionDown,.createVote-optionUp
        display inline-block
        width .19rem
        height .17rem
        margin .12rem .1rem 0 0

    .createVote-optionDown
        background url("../../../assets/images/optionDown.png") no-repeat center
        background-size contain

    .createVote-optionUp
        background url("../../../assets/images/optionUp.png") no-repeat center
        background-size contain

    .createVote-optionDesc
        flex 1

    .createVote-optionDel
        display inline-block
        width .18rem
        height .18rem
        margin .12rem 0 0 .05rem
        background url("../../../assets/images/optionDel.png") no-repeat center
        background-size contain

    .createVote-addOption
        height .18rem
        width 100%
        float left
        line-height .18rem
        color #5871FF
        font-size .16rem
        margin-top .25rem

    .createVote-addOptionIcon
        width .18rem
        vertical-align bottom
        height .18rem
        margin-right .08rem
        display inline-block
        background url("../../../assets/images/addOptionIcon.png") no-repeat center
        background-size contain

    .createVote-radio,.createVote-deadLine
        float left
        font-size .16rem
        font-weight bold
        display flex
        height .21rem
        vertical-align bottom
        margin-top .3rem

    .createVote-deadLine
        margin-top .35rem
        height .6rem

    .createVote-radioTitle
        color #444D6A
        float left
        margin-right .24rem

    .createVote-radioList,.createVote-deadLineList
        float left
        flex 1

        .mint-radiolist-title
            display none

        .mint-cell
            color #444D6A
            height .21rem
            width 50%
            min-height .21rem
            float left


            .mint-cell-wrapper
                background-image none

            .mint-radiolist-label
                padding 0

            .mint-radio-input:checked + .mint-radio-core
                background-color #5871FF
                border-color #5871FF

        .mint-cell:last-child
            background-image none

        .mint-cell:nth-child(4)
            margin-top .16rem

    .createVote-draft,.createVote-preview,.createVote-release
        float left
        color #ffffff
        font-size .16rem

    .createVote-draft
        flex 6

    .createVote-draft,.createVote-preview
        background #9AADBF
        margin-right .15rem

    .createVote-preview,.createVote-release
        flex 3


    .createVote-release
        background #5871FF

    .createVote-saveBtn
        margin-top .5rem
        width 100%
        float left
        display flex
        height  .4rem


</style>
