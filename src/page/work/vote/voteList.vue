<template>
    <div class="voteList-main">
        <PublicHeader :header-title="header"></PublicHeader>
        <div class="voteList-content">
            <div class="voteList-create">
                <span class="voteList-voteEmpty">还没有任何投票</span>
                <div class="voteList-createVote">
                    <router-link class="voteList-createVoteBtn" to="/work/createVote"><i class="voteList-createVoteBtnIcon"></i>创建新投票</router-link>
                </div>
            </div>
            <div class="voteList-box"></div>
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
                header:'我的投票'
            }
        },
        methods: {},
        components:{
            PublicHeader
        }
    }
</script>

<style lang="stylus">
    .voteList-main
        width 100%
        height 100%
        background url("../../../assets/images/topBg.png") no-repeat top left  #DAE2ED

    .voteList-content
        width 100%
        height 100%

    .voteList-create
        position absolute
        top .65rem
        bottom .55rem
        background url("../../../assets/images/voteEmpty.png") no-repeat center 1.5rem #fff
        left .15rem
        right .15rem
        border-radius .05rem;

    .voteList-voteEmpty
        margin-top 3rem
        float left
        width 100%
        color #AEBECE
        font-size .16rem
        text-align center

    .voteList-createVote
        text-align center
        width 100%
        height .6rem
        line-height .2rem
        float left

    .voteList-createVoteBtn
        display inline-block
        height .38rem
        width 1.5rem
        border-radius .19rem
        color #fff
        font-size .15rem
        text-align center
        line-height .38rem
        background linear-gradient(126deg,rgba(102,92,249,1),rgba(93,127,251,1));
        box-shadow:0 3px 8px 0 rgba(102,92,249,0.68);

    .voteList-createVoteBtnIcon
        background url("../../../assets/images/addVote.png") no-repeat center
        width .14rem
        height .14rem
        margin-right .05rem
        background-size contain
        display inline-block

</style>


