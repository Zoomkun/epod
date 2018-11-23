<template>
    <div class="loginSession">
        <h1 class="loginTitle">区世界管理工具</h1>
        <input class="phoneNumber" v-model="formData.userName" type="text" placeholder="输入手机号">
        <p class="codeBox"><input v-model="formData.code" type="text" class="code" placeholder="短信验证码"><span
                class="getCode" @click="getCode">{{getCodeTips}}</span></p>
        <div class="tipsBox">
            <span class="tips">{{tips}}</span>
        </div>
        <div class="submit" @click="submit()">进入区世界</div>
        <span class="terms">点击进入区世界按钮即表示同意<a class="termsLink" href="https://www.baidu.com">《用户服务协议》</a></span>
    </div>
</template>

<script>
    export default {
        name: 'login',
        mounted() {

        },
        data() {
            return {
                formData: {
                    code: '',
                    userName: ''
                },
                getCodeTips: '获取验证码',
                // getCodeTips:'60s后重发'
                tips: ''
            }
        },
        methods: {
            getCode() {
                let self = this;
                self.$ajax.get('euser/user/sendCode?phone=' + self.formData.userName, function (data) {
                    if (data.code === 1) {
                        self.getCodeTime()
                    }
                })
            },
            getCodeTime() {
                let count = 61
                let self = this
                let timmer = setInterval(function () {
                    count--
                    self.getCodeTips = count + 's后重发'
                    if (count === 0) {
                        clearInterval(timmer)
                        self.getCodeTips = '获取验证码'
                    }
                }, 1000)
            },
            submit() {
                let self = this;

                if (self.formData.userName.length === 0) {
                    self.tips = '请输入电话号码'
                    return false
                } else if (self.formData.code.length === 0) {
                    self.tips = '请输入验证码'
                    return false
                }

                self.tips = ''
                self.$ajax.post('euser/user/user/smsLogin', self.formData)
                    .then(function (data) {
                        if (data.code === 1) {
                            let path = localStorage.getItem('path')
                            if(path && path.indexOf('login') === -1){
                                localStorage.setItem('path',null)
                                self.$router.push(path)
                            }else{
                                self.$router.push('project/projectList')
                            }
                            self.$ajax.defaults.headers.common['token'] = data.data.token;
                            localStorage.setItem('user', JSON.stringify(data.data))
                        }
                    })
            }
        }
    }
</script>

<style lang="stylus">
    .loginSession
        width 3rem
        margin 0 auto
        padding-top .5rem

    .loginTitle
        text-align center
        margin-bottom .4rem
        font-size .2rem

    .phoneNumber, .codeBox
        width 3rem
        height .4rem
        display flex

    .codeBox
        margin-top .3rem

    .tipsBox
        height .4rem
        width 100%
        line-height .4rem

    .tips
        color #666666
        line-height .4rem
        text-align left
        font-size .14rem
        float left

    .code
        flex 2

    .getCode
        flex 1
        font-size .15rem
        background #000000
        color #ffffff
        text-align center
        line-height .4rem

    .submit
        width 3rem
        height .4rem
        background #000000
        color #ffffff
        text-align center
        line-height .4rem
        font-size .2rem

    .terms
        float left
        margin-top .15rem
        width 100%
        text-align center
        font-size .12rem
        color #666

    .termsLink
        color #ff7f00
</style>


