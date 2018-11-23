<template>
    <section class="rename-box">
        <div class="rename-tool clear">
            <span class="rename-esc" @click="() => {this.$router.go(-1)}">取消</span>
            <span class="rename-done" @click="submit">完成</span>
        </div>
        <div class="rename-inputTool">
            <input type="text" v-model="userInfo.nickName" class="rename-input">
            <em class="rename-delete" @click="delName">X</em>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'rename',
        mounted() {
            let data = JSON.parse(localStorage.getItem('user'))
            this.userInfo = data
        },
        data() {
            return {
                userInfo: {}
            }
        },
        methods: {
            submit() {
                let self = this
                self.$ajax.put('euser/user/update?nickName='+ self.userInfo.nickName,)
                    .then(function (data) {
                        localStorage.setItem('user',JSON.stringify(data.data))
                        if (data.code === 1) {
                            self.$router.go(-1)
                        } else {
                            alert('请稍后再试')
                        }
                    })
            },
            delName() {
                this.userInfo.nickName = ''
            }
        }
    }
</script>

<style lang="stylus">
    .rename-tool
        font-size .2rem
        padding .2rem .2rem 0

    .rename-esc
        float left

    .rename-done
        float right

    .rename-inputTool
        margin-top .3rem
        padding 0 .2rem
        position relative
        height .3rem

    .rename-input
        width 100%
        height .3rem
        float left
        position relative
        z-index 1

    .rename-delete
        font-size .2rem
        background #666666
        display block
        width .2rem
        height .2rem
        position absolute
        right .3rem
        top .05rem
        text-align center
        color #ffffff
        z-index 1000

</style>


