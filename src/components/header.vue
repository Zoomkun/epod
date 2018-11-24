<template>
    <div class="publicHeaderBox">
        <span class="backBtn" @click="() => {this.$router.go(-1)}">{{headerParams.title}}</span>
        <div v-if="headerParams.search" class="publicHeader-search"></div>
        <router-link to="/work/createVote" v-if="headerParams.create" class="publicHeader-createVote"></router-link>
        <div class="publicHeader-tool" v-if="toolBox" @click="showTool($event)">
            <div class="publicHeader-mask" v-if="toolShow" @click="()=>{this.toolShow=false}"></div>
            <p class="publicHeader-toolBox" v-if="toolShow">
                <span v-if="headerParams.tool.edit" class="publicHeader-edit" @click="editVote">编辑投票</span>
                <span v-if="headerParams.tool.shutDown" class="publicHeader-shutDown" @click="shutDownVote">结束投票</span>
                <span v-if="headerParams.tool.delete" class="publicHeader-delete" @click="deleteVote">删除投票</span>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'PublicHeader',
        props: ['headerParams'],
        mounted() {
            this.voteId = this.$route.query.voteId
        },

        data() {
            return {
                toolShow: false,
                voteId: null,
                toolBox: false,
            }
        },
        watch: {
            headerParams: {
                handler() {
                    if (Object.keys(this.headerParams.tool).length === 0) {
                        this.toolBox = false
                    } else {
                        this.toolBox = true
                    }
                },
                deep: true,
            }
        },
        methods: {
            showTool(e) { //头部工具展示
                if (e.target.parentElement.className.indexOf('publicHeader-toolBox') > -1 || e.target.className.indexOf('publicHeader-tool') > -1) {
                    this.toolShow = !this.toolShow
                } else {
                    this.toolShow = false
                }
            },
            editVote() {// 编辑投票
                let self = this
                self.$ajax.delete('evote/vote/' + self.voteId)
                    .then(function (data) {

                        if (data.code === 1) {
                            self.$router.push({path: '/work/createVote', query: {voteId: self.voteId,edit:true}})
                        }
                    })
            },
            shutDownVote() {// 关闭投票
                let self = this
                self.$ajax.delete('evote/vote/end/' + self.voteId)
                    .then(function (data) {
                        if (data.code === 1) {
                            self.$router.push('/work/voteList')
                        }
                    })
            },
            deleteVote() {// 删除投票
                let self = this
                self.$ajax.delete('evote/vote/' + self.voteId)
                    .then(function (data) {
                        if (data.code === 1) {
                            self.$router.push('/work/voteList')
                        }
                    })
            },
        },
    }
</script>

<style lang="stylus">
    .publicHeaderBox
        height .3rem
        box-sizing border-box
        float left
        width 100%
        margin .15rem 0 .2rem
        padding 0 .15rem

    .backBtn
        float left
        padding-left .22rem
        height .3rem
        line-height .3rem
        color #fff
        font-size .18rem
        background url("../,,/../assets/images/backBtn.png") no-repeat left .06rem

    .publicHeader-search, .publicHeader-createVote
        float right
        background #ffffff
        width .14rem
        height .14rem
        margin .05rem 0 0 .15rem

    .publicHeader-search
        background url("../assets/images/search.png") no-repeat center
        background-size contain

    .publicHeader-createVote
        background url("../assets/images/createIcon.png") no-repeat center
        background-size contain

    .publicHeader-tool
        width .24rem
        height .24rem
        float right
        margin-top .03rem
        background url("../assets/images/tools.png") no-repeat center
        background-size contain
        position relative

    .publicHeader-toolBox:before
        display inline-block
        width 0
        height 0
        content ""
        position absolute
        top -.09rem
        right .07rem
        border-style solid
        border-color transparent transparent rgb(255, 255, 255)
        border-image initial
        border-width .05rem

    .publicHeader-toolBox
        width 1.35rem
        background #ffffff
        border-radius .03rem
        font-size .15rem
        color #444D6A
        padding 0 .12rem
        position absolute
        right 0
        top .34rem
        z-index 2
        box-shadow 0 2px 5px #999999

    .publicHeader-edit
        background url("../assets/images/delete.png") no-repeat

    .publicHeader-shutDown
        background url("../assets/images/shutDown.png") no-repeat

    .publicHeader-delete
        background url("../assets/images/delete.png") no-repeat

    .publicHeader-edit, .publicHeader-shutDown, .publicHeader-delete
        height .38rem
        display block
        line-height .38rem
        padding-left .52rem
        text-align left
        border-top 1px solid #DAE2ED
        background-size .15rem .15rem
        background-position .23rem .11rem

    .publicHeader-mask
        width 100rem
        height 100rem
        opacity 0
        position relative
        left -45rem
        z-index 2
</style>


