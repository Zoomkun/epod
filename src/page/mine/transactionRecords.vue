<template>
    <section class="transactionRecords-box" @scroll="timerFixed">
        <div class="transactionRecords-wrapper">
            <header class="transactionRecords-header">
                <span class="transactionRecords-back" @click="() => {this.$router.go(-1)}"><<</span>
                BCR交易记录
            </header>
            <h6 class="transactionRecords-title">查询时间</h6>
            <div class="transactionRecords-timerBox">
                <div :class="{'transactionRecords-timerContent':client.fixed}">
                    <div class="transactionRecords-timer">
                    <span class="transactionRecords-timerBtn" v-for="(item,index) in time.timerTool"
                          @click="setTime(index,item)">{{item}}</span>
                        <span class="transactionRecords-timerBtn">自定义</span>
                    </div>
                    <p class="transactionRecords-timerBoard">
                        {{time.showTime}}
                    </p>
                </div>
            </div>
            <div>
                <div class="transactionRecords-list" v-for="(item,index ) in records" @click="goToInfo">
                    <p class=";">{{item.type === 1 ? '买入': '卖出',item.no}} <span class="transactionRecords-num">{{item.type === 1 ?  '+': '-'}}{{item.changeDelta}}{{item.no}}</span>
                    </p>
                    <span class="transactionRecords-time">{{item.createTimestamp}}</span>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import BScroll from 'better-scroll'

    export default {
        name: 'transactionRecords',
        mounted() {
            let self = this
            let data = self.records[0]

            for (let i = 0; i < 10; i++) {
                self.records.push(data)
            }

            let timerBox = document.getElementsByClassName('transactionRecords-timerBox')[0]
            let client = timerBox.getBoundingClientRect()
            self.client.clientTop = client.y - 20;

            document.getElementsByClassName('main')[0].addEventListener('scroll', self.timerFixed)

            let wrapper = document.querySelector('.transactionRecords-box')
            self.scroll = new BScroll(wrapper, {
                click: true, probeType: 2,})
            self.scroll.on('scroll', (pos) => {
                console.log(pos)
            })
        }
        ,
        destroyed() {
            document.getElementsByClassName('main')[0].removeEventListener('scroll', self.timerFixed)
        }
        ,
        data() {
            return {
                scroll: null,
                time: {
                    postTime: "",
                    showTime: "默认",
                    timerTool: ['默认', '一周内', '一月内', '一年内',]
                },
                records: [
                    {
                        "no": "BCR",
                        "type": 1, // 类型: {1:增加; 2:减少;}
                        "changeDelta": 0.05, //变动数量
                        "createTimestamp": '2018-10-11 12:00:00' //变动时间 毫秒数
                    }
                ],
                client: {
                    clientTop: 0,
                    fixed: false,
                }
            }
        }
        ,
        methods: {
            onScroll(e) {
                console.log(e)
            }
            ,
            timerFixed(event) {
                let self = this
                let target = event.target
                if (target.scrollTop > self.client.clientTop) {
                    self.client.fixed = true
                } else {
                    self.client.fixed = false
                }
            }
            ,
            goToInfo() {
                this.$router.push('/mine/transactionDetail')
            }
            ,
            setTime(index, item) {
                let self = this
                self.time.showTime = item;
                switch (index) {
                    case 0:
                        self.time.postTime = '';
                        break;
                    case 1:
                        self.time.postTime = self.weekAgo();
                        break;
                    case 2:
                        ;
                        self.time.postTime = self.monthAgo();
                        break;
                    case 3:
                        self.time.postTime = self.yearAgo();
                        break;
                }
            }
            ,
            // 一周内
            weekAgo() {
                var nowDate = new Date();
                var oneWeekDate = new Date(nowDate - 7 * 24 * 3600 * 1000);
                var y = oneWeekDate.getFullYear();
                var M = oneWeekDate.getMonth() + 1;
                var d = oneWeekDate.getDate();

                return y + '-' + M + '-' + d
            }
            ,
            // 一月内
            monthAgo() {
                let date = new Date()
                var daysInMonth = new Array([0], [31], [28], [31], [30], [31], [30], [31], [31], [30], [31], [30], [31]);
                var strYear = date.getFullYear();
                var strDay = date.getDate();
                var strMonth = date.getMonth() + 1;
                if (strYear % 4 == 0 && strYear % 100 != 0) {
                    daysInMonth[2] = 29;
                }
                if (strMonth - 1 == 0) {
                    strYear -= 1;
                    strMonth = 12;
                } else {
                    strMonth -= 1;
                }
                strDay = daysInMonth[strMonth] >= strDay ? strDay : daysInMonth[strMonth];
                if (strMonth < 10) {
                    strMonth = "0" + strMonth;
                }
                if (strDay < 10) {
                    strDay = "0" + strDay;
                }

                return strYear + "-" + strMonth + "-" + strDay
            }
            ,
            yearAgo() {
                var date = new Date();
                var strYear = date.getFullYear() - 1;
                var strDay = date.getDate();
                var strMonth = date.getMonth() + 1;
                if (strMonth < 10) {
                    strMonth = "0" + strMonth;
                }
                if (strDay < 10) {
                    strDay = "0" + strDay;
                }

                return strYear + "-" + strMonth + "-" + strDay;
            }
        }
        ,
        components: {}
        ,
    }
</script>

<style lang="stylus">
    .transactionRecords-box
        height 100%

        .transactionRecords-header
            height .4rem
            line-height .4rem
            text-align left
            font-size .2rem
            padding .1rem .2rem

        .transactionRecords-title
            font-size .2rem
            padding 0 .2rem

        .transactionRecords-timerContent
            position fixed
            width 100%
            height 1rem
            background #fff
            top 0

        .transactionRecords-timerBox
            height 1rem

        .transactionRecords-timer
            width 100%
            text-align center
            height .6rem
            line-height .4rem
            font-size .15rem
            margin-top .2rem
            padding 0 .25rem
            box-sizing border-box

        .transactionRecords-timerBtn
            float left
            height .4rem
            width 16%
            margin-left 4%
            border 1px solid #ccc

        .transactionRecords-timerBtn:nth-child(1)
            margin 0

        .transactionRecords-timerBoard
            text-align center
            font-size .15rem
            margin .2rem 0
            background #ffffff

        .transactionRecords-list
            font-size .2rem
            border 1px solid #cccccc
            margin .1rem .2rem
            padding .05rem
            height .6rem

        .transactionRecords-time
            font-size .14rem
            margin-top .1rem
            display block

        .transactionRecords-name
            font-weight 800

        .transactionRecords-num
            float right
</style>


