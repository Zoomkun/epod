<template>
    <div class="content">
        <div class="main">
            <router-view/>
        </div>
        <div class="table">
            <router-link to="/project/projectList" class="tableCell" :class="active == 1 ? 'layout-active' : ''"
                         @click.native="changeActive(1)">项目
            </router-link>
            <router-link to="/work/workIndex" class="tableCell" :class="active == 2 ? 'layout-active' : ''"
                         @click.native="changeActive(2)">工作
            </router-link>
            <router-link to="/mine/personal" class="tableCell" :class="active == 3 ? 'layout-active' : ''"
                         @click.native="changeActive(3)">我的
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'createVote',
        mounted() {
            let data = localStorage.getItem('user')

            if(!data){
                this.$router.push('/login')
                return false;
            }

            this.$ajax.defaults.headers.common['token'] = JSON.parse(data).token;
        },
        data() {
            return {
                active: 1
            }
        },
        methods: {
            changeActive(key) {
                this.active = key
            }
        },
        watch:{
            $route(to,from){
                if (to.path.indexOf('/project/') > -1) {
                    this.active  = 1
                } else if (to.path.indexOf('/work/') > -1) {
                    this.active = 2
                } else if (to.path.indexOf('/mine/') > -1) {
                    this.active = 3
                }
                console.log(to)
            }
        },
        beforeRouteEnter(to, form, next) {
            let active = 1
            if (to.path.indexOf('/project/') > -1) {
                active = 1
            } else if (to.path.indexOf('/work/') > -1) {
                active = 2
            } else if (to.path.indexOf('/mine/') > -1) {
                active = 3
            }

            next(vm => {
                vm.active = active
            })
        }
    }
</script>

<style lang="stylus">
    .content
        width 100%
        height 100%
        display -webkit-box
        display -webkit-flex
        display -ms-flexbox
        display flex
        -webkit-box-orient vertical
        -webkit-flex-direction column
        flex-direction column

    .main
        box-sizing border-box
        padding 0 .15rem
        flex 1
        overflow auto
        background url("../assets/images/topBg.png") no-repeat top left  #DAE2ED

    .table
        height .4rem
        display flex

    .tableCell
        flex 1
        font-size .15rem
        text-align center
        color #333333
        line-height .4rem
        background #f4f3f1
        border 1px solid #e1e1e1

    .layout-active
        background #666666
        border-color #666
</style>


