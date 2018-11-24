<template>
    <section class="transactionRecords-box">
        <div class="transactionRecords-wrapper">
            <header class="transactionRecords-header">
                <span class="transactionRecords-back" @click="() => {this.$router.go(-1)}"><<</span>
                BCR交易记录
            </header>
            <h6 class="transactionRecords-title">查询时间</h6>
            <div class="transactionRecords-timerBox">
                <div class="transactionRecords-timer">
                    <span class="transactionRecords-timerBtn" v-for="(item,index) in time.timerTool"
                          @click="setTime(index,item)">{{item}}</span>
                    <span class="transactionRecords-timerBtn">自定义</span>
                </div>
                <p class="transactionRecords-timerBoard">
                    {{time.showTime}}
                </p>
            </div>
            <div>
                <div class="transactionRecords-list" v-for="(item,index ) in records" @click="goToInfo(item)">
                    <p class=";">{{item.type === 1 ? '买入': '卖出',item.no}} <span class="transactionRecords-num">{{item.type === 1 ?  '+': '-'}}${{item.changeDelta}}</span>
                    </p>
                    <span class="transactionRecords-time">{{item.createTimestamp}}</span>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'transactionRecords',
        mounted() {
            this.formData.assetCode = this.$route.query.code
            this.getData(this.formData)
        }
        ,
        data() {
            return {
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
                formData: {
                    assetCode: "",
                    startTime: "",
                    endTime: "",
                    pageNo: 1,
                    pageSize: 20
                }
            }
        }
        ,
        methods: {
            goToInfo(data) {
                this.$router.push({path:'/mine/transactionDetail',query:data})
            }
            ,
            setTime(index, item) {
                //todo:时间优化
                let self = this
                self.time.showTime = item;
                switch (index) {
                    case 0:
                        self.formData.startTime= '';
                        self.formData.endTime= '';
                        break;
                    case 1:
                        self.formData.startTime= self.dayAgo(7);
                        self.formData.endTime= self.dayAgo(0);
                        break;
                    case 2:
                        self.formData.startTime= self.monthAgo();
                        self.formData.endTime= self.dayAgo(0);
                        break;
                    case 3:
                        self.formData.startTime= self.yearAgo();
                        self.formData.endTime= self.dayAgo(0);
                        break;
                }
                this.getData(self.formData)
            },
            // 获取列表数据
            getData(key) {
                let self = this
                self.$ajax.post('easset/asset/transaction/list', key)
                    .then(function (data) {
                        if (data.code === 1) {
                            self.records = data.data.result
                        }
                    })
            }
            ,
            // 一周内
            dayAgo(key) {
                var nowDate = new Date();
                var oneWeekDate = new Date(nowDate - key * 24 * 3600 * 1000);
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


