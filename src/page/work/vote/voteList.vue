<template>
    <div class="voteList-main">
        <div class="voteList-top clear">
            <PublicHeader :header-params="header"></PublicHeader>
            <div class="voteList-navBar" v-if="showVoteList=== true">
                <span class="voteList-barOnGoing" :class="voteList.selected === 0 ? 'active': ''"
                      @click="modelChange(0)"><em>进行中</em></span>
                <span class="voteList-barCompleted" :class="voteList.selected === 1 ? 'active': ''"
                      @click="modelChange(1)"><em>已结束</em></span>
                <span class="voteList-barDraft" :class="voteList.selected === 2 ? 'active': ''" @click="modelChange(2)"><em>草稿箱</em></span>
            </div>
        </div>
        <div class="voteList-content">
            <div class="voteList-create" v-if="showAddVote === true">
                <span class="voteList-voteEmpty">还没有任何投票</span>
                <div class="voteList-createVote">
                    <router-link class="voteList-createVoteBtn" to="/work/createVote"><i
                        class="voteList-createVoteBtnIcon"></i>创建新投票
                    </router-link>
                </div>
            </div>
            <div class="voteList-contentMask" v-if="voteList.draftBtnIndex!==null"
                 @click="()=>{this.voteList.draftBtnIndex=null}"></div>

            <div class="voteList-list" v-if="showVoteList === true">
                <p class="voteList-listTitle">
                    {{voteList.listTitle[voteList.selected]}}（{{voteList.totalElements}}）<span
                    class="voteList-listDraftEmpty" v-if="voteList.selected === 2" @click="emptyDraft">一键清空</span>
                </p>
                <ul
                    v-if="voteList.selected === 0"
                    class="voteList-scrollBox"
                    v-infinite-scroll="loadMore"
                    infinite-scroll-disabled="loading"
                    infinite-scroll-distance="10">
                    <li v-for="item in voteList.onGoingData.content" class="voteList-scrollLi">
                        <div class="voteList-scrollIcon"></div>
                        <div class="voteList-scrollCenter">
                            <p class="voteList-scrollTitle">{{item.voteTitle}}</p>
                            <p class="voteList-scrollInfo">发起人: {{item.createBy}} 参与人数：{{item.participants}}</p>
                            <p class="voteList-scrollDone" v-if="~~item.isVote === 1">已投票</p>
                        </div>
                        <div class="voteList-scrollLink" @click="toResults(item.isVote,item.voteId)">{{item.isVote ?
                            '查看结果' : '去投票'}}
                        </div>
                    </li>
                </ul>
                <ul
                    v-if="voteList.selected === 1"
                    class="voteList-scrollBox"
                    v-infinite-scroll="loadMore"
                    infinite-scroll-disabled="loading"
                    infinite-scroll-distance="10">
                    <li v-for="item  in voteList.onGoingData.content" class="voteList-scrollLi">
                        <div class="voteList-scrollIconOut"></div>
                        <div class="voteList-scrollCenter">
                            <p class="voteList-scrollTitle">{{item.voteTitle}}</p>
                            <p class="voteList-scrollInfo">发起人: {{item.createBy}} 参与人数：{{item.participants}}</p>
                            <p class="voteList-scrollDo voteList-scrollDoBg" v-if="item.isVote === false">未投票</p>
                            <p class="voteList-scrollDo" v-if="item.isVote === true">已投票</p>
                        </div>
                        <div class="voteList-scrollLink" @click="toResults(1,item.voteId)">查看结果</div>
                    </li>
                </ul>
                <ul
                    v-if="voteList.selected === 2"
                    class="voteList-scrollBox"
                    v-infinite-scroll="loadMore"
                    infinite-scroll-disabled="loading"
                    infinite-scroll-distance="100">
                    <li v-for="(item,index) in voteList.draftData" class="voteList-scrollLi">
                        <div class="voteList-scrollIcon voteList-scrollIconDraft"></div>
                        <div class="voteList-scrollCenter">
                            <p class="voteList-scrollTitle voteList-scrollTitleDraft">{{item.voteTitle}}</p>
                        </div>
                        <div class="voteList-draftBtnBox" @click="showDraftBtn(index,$event)"
                             :class="voteList.draftBtnIndex === index  ? 'active' : 'out'">
                            <div class="voteList-draftBtnMain">
                                <div class="voteList-draftBtn">
                                    <span class="voteList-draftDel" @click="delDraft(index)">删除</span>
                                    <span class="voteList-draftEdit" @click="editDraft(index)">编辑</span>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="voteList-loadMore" v-if="voteList.loading">
                    <mt-spinner :type="3"></mt-spinner>
                    <span>加载更多</span>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import PublicHeader from '@/components/header.vue'

    export default {
        name: 'createVote',
        beforeMount() {

        },
        mounted() {
            this.getData(this.state, this.voteList.currentPage)
        },
        data() {
            return {
                header: {
                    title: '我的投票',
                    search:true,
                    create:true,
                },
                showVoteList: true, // 是否展示列表
                showAddVote: false, // 是否添加
                voteList: {//列表数据
                    selected: 0,// 当前投票列表选中的模块 1：进行中2：已结束3：草稿箱
                    draftBtn: false,// 显示遮罩层
                    loading: false,// 显示loading动画
                    onGoingData: {}, // 进行中数据
                    listTitle: ['投票列表', '投票列表', '草稿箱'],
                    totalElements: '',
                    draftData: [],
                    draftBtnIndex: null,
                    currentPage: 1, // 当前页数
                    state: 1,
                }
            }
        },
        methods: {
            getData(key, page, loadMore) {
                let self = this
                let pages = page

                if (loadMore) { // 页码处理
                    pages = pages + 1
                    self.voteList.currentPage = pages
                }
                // 投票列表数据初始化
                self.$ajax.post('evote/vote/page?size=20&page=' + pages, {'state': key})
                    .then(function (data) {
                        if (data.code === 1 && data.data.totalElements > 0) {
                            self.showVoteList = true
                            self.showAddVote = false
                            if (loadMore) {
                                self.voteList.onGoingData.content = self.voteList.onGoingData.content.concat(data.data.content)
                                // self.voteList.currentPage ++
                                self.voteList.loading = false;
                            } else {
                                self.voteList.onGoingData = data.data
                            }
                            self.voteList.totalElements = data.data.totalElements
                        } else {
                            self.showAddVote = true
                            self.showVoteList = false
                        }
                    })
            },
            // 当前投票列表模块切换
            modelChange(key) {
                let self = this
                self.voteList.selected = key
                if (key !== 2) {
                    key++
                    self.voteList.currentPage = 1
                    this.state = key
                    self.getData(key, self.voteList.currentPage)
                } else {
                    let data = localStorage.getItem('voteList')
                    if (!data) {
                        return false
                    }
                    self.voteList.draftData = JSON.parse(localStorage.getItem('voteList'))
                    self.voteList.totalElements = self.voteList.draftData.length
                }
            },
            // 上拉加载
            loadMore() {
                if (this.voteList.currentPage == this.voteList.onGoingData.totalPages) {
                    return false
                }

                this.voteList.loading = true;
                this.getData(this.state, this.voteList.currentPage, 1)
            },
            // 点击空白处隐藏草稿箱模块按钮
            showDraftBtn(index, e) {
                let self = this
                if (e.target.className.indexOf('voteList-draftDel') > -1) {
                    self.voteList.draftBtnIndex = null
                } else {
                    self.voteList.draftBtnIndex = index
                }

            },
            // 删除草稿
            delDraft(index) {
                let self = this
                self.voteList.draftData.splice(index, 1)
                localStorage.setItem('voteList', JSON.stringify(self.voteList.draftData))
                self.voteList.totalElements = self.voteList.draftData.length
            },

            // 编辑草稿
            editDraft(index) {
                this.$router.push({path: '/work/createVote', query: {params: index}})
            },

            // 点击跳转结果页 || 投票页
            toResults(key, id) {
                if (key) {
                    this.$router.push({path: '/work/voteResults', query: {voteId: id}})
                } else {
                    this.$router.push({path: '/work/vote', query: {voteId: id}})
                }
            },
            emptyDraft() {
                localStorage.setItem('voteList', null)
                self.voteList.draftData = []
            },
        },
        components: {
            PublicHeader
        }
    }
</script>

<style lang="stylus">
    .voteList-main
        position relative
        width 100%
        height 100%
        display -webkit-box
        display -webkit-flex
        display -ms-flexbox
        display flex
        -webkit-box-orient vertical
        -webkit-flex-direction column
        flex-direction column
        background url("../../../assets/images/topBg.png") no-repeat top left #DAE2ED

    .voteList-top
        height .7rem

    .voteList-content
        width 100%
        box-sizing border-box
        webkit-box-flex 1
        -ms-flex 1
        flex 1
        overflow auto
        padding .15rem
        float left

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
        background linear-gradient(126deg, rgba(102, 92, 249, 1), rgba(93, 127, 251, 1));
        box-shadow: 0 3px 8px 0 rgba(102, 92, 249, 0.68);

    .voteList-createVoteBtnIcon
        background url("../../../assets/images/addVote.png") no-repeat center
        width .14rem
        height .14rem
        margin-right .05rem
        background-size contain
        display inline-block

    .voteList-navBar
        width 100%
        text-align center
        font-size .15rem
        height .3rem
        line-height .3rem
        float left
        display flex
        position relative
        top -.2rem
        color #BBBFFF

    .voteList-barOnGoing, .voteList-barCompleted, .voteList-barDraft
        flex 1

    &.active
        color #ffffff
        font-size .16rem
        font-weight bold

        em
            display inline-block
            line-height .3rem
            border-bottom 2px solid #fff

    .voteList-list
        background #ffffff
        -webkit-overflow-scrolling: touch
        border-radius .05rem
        padding .1rem .15rem .15rem
        overflow auto
        height 100%
        box-sizing border-box

    .voteList-scrollBox
        width 100%
        /*overflow auto*/
        position relative
        top 0
        bottom 0
        left 0
        right 0

    .voteList-scrollLi
        display flex
        margin-top .24rem
        width 100%

    .voteList-scrollCenter
        flex 1

    .voteList-scrollIcon, .voteList-scrollIconOut
        background url("../../../assets/images/voteOnGoing.png") no-repeat center
        background-size contain
        margin-right .08rem
        vertical-align middle
        width .32rem
        height .32rem

    .voteList-scrollIconOut
        background url("../../../assets/images/scrollOut.png") no-repeat center
        background-size contain

    .voteList-scrollIconDraft
        background url("../../../assets/images/darftIcon.png") no-repeat center
        background-size contain

    .voteList-scrollTitle
        color #444D6A
        font-size .15rem
        height .15rem

    .voteList-scrollTitleDraft
        height .32rem
        line-height .32rem

    .voteList-scrollInfo
        color #9AADBF
        font-size .12rem
        height .12rem
        margin-top .06rem

    .voteList-scrollDone, .voteList-scrollDo
        margin-top .05rem
        width .32rem
        height .14rem
        color #FEFEFE
        text-align center
        line-height .16rem
        font-size .11rem
        background: linear-gradient(126deg, rgba(102, 92, 249, 1), rgba(93, 127, 251, 1));
        border-radius: 3px 3px 3px 3px;

    .voteList-scrollDo
        width .36rem

    .voteList-scrollDoBg
        background: linear-gradient(126deg, #afc2e0, #c1d2ed);

    .voteList-scrollLink
        color #5871FF
        font-size .15rem
        line-height .32rem
        text-align right

    .voteList-draftBtnBox
        position relative
        z-index 2
        width .23rem
        height .37rem

        &.active
            background url("../../../assets/images/draftBtnIng.png") no-repeat center
            background-size contain

            .voteList-draftBtnMain
                display block
                animation draftBtnIn 0.5s ease 0s 1 normal
                animation-fill-mode forwards

        &.out
            background url("../../../assets/images/draftBtn.png") no-repeat center
            background-size contain

            .voteList-draftBtnMain
                animation draftBtnOut 0.5s ease 0s 1 normal
                animation-fill-mode forwards

    .voteList-draftDel
        height .37rem
        width .93rem
        font-size .14rem
        color #ffffff
        text-align left
        line-height .37rem
        padding-left .4rem
        box-sizing border-box
        background url("../../../assets/images/drafeDel.png") .2rem center no-repeat #FF5858
        background-size .15rem .15rem
        float left

    .voteList-draftBtn
        width 1.86rem
        height .37rem

    .voteList-draftBtnMain
        position absolute
        z-index 2
        width 0
        display none
        overflow hidden
        right .22rem
        top 0

    .voteList-draftEdit
        width .93rem
        font-size .14rem
        color #ffffff
        text-align left
        line-height .37rem
        padding-left .4rem
        box-sizing border-box
        height .37rem
        background url("../../../assets/images/draftEdit.png") .2rem center no-repeat #5D7FFB
        background-size .15rem .15rem
        float left

    .voteList-loadMore
        height .3rem
        width 100%
        line-height .3rem
        text-align center
        font-size .12rem

        span
            width .6rem
            height .3rem
            display inline-block
            vertical-align middle
            color #333

            &:nth-child(1)
                width .3rem

    .voteList-listTitle
        color #444D6A
        font-size .19rem
        font-weight bold
        height .22rem
        line-height .22rem
        text-align left
        margin-top .1rem

    .voteList-listDraftEmpty
        float right
        width .71rem
        height .22rem
        border-radius .11rem
        background #FF5858
        text-align center
        line-height .22rem
        color #ffffff
        font-size .13rem
        font-weight normal

    .voteList-contentMask
        background #ffffff
        width 100%
        height 100%
        position absolute
        top 0
        left 0
        z-index 1
        opacity 0

    @keyframes draftBtnIn
        from {
            width 0
        }
        to {
            width 1.86rem
        }

    @keyframes draftBtnOut
        from {
            width 1.86rem
        }
        to {
            width 0
        }

</style>


