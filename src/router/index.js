import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/login.vue'
import Layout from '@/page/layout.vue'

// 投票
import VoteList from '@/page/work/vote/voteList.vue'
import CreateVote from '@/page/work/vote/creatVote.vue'
import Vote from '@/page/work/vote/vote.vue'

// 行情
import MyMarket from '@/page/work/market/myMarket.vue'
import WorkIndex from '@/page/work/index.vue'

// 项目
import ProjectList from '@/page/project/projectList.vue'

// 我
import Personal from '@/page/mine/personal.vue'
import Basic from '@/page/mine/basic.vue'
import Rename from '@/page/mine/rename.vue'
import Assets from '@/page/mine/assets.vue'
import TransactionRecords from '@/page/mine/transactionRecords.vue'
import TransactionDetail from '@/page/mine/transactionDetail.vue'
import Test from '@/page/mine/test.vue'

Vue.use(Router)
export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/project',
            component: Layout,
            children: [

                {
                    name: 'projectList',
                    component: ProjectList,
                    path: 'projectList',
                    tableShow:true
                },
            ]
        },
        {
            path: '/work',
            component: Layout,
            children: [
                {
                    name: 'workIndex',
                    component: WorkIndex,
                    path: 'workIndex',
                    tableShow:true
                },
                {
                    name: 'myMarket',
                    component: MyMarket,
                    path: 'myMarket'
                },
                {
                    name: 'createVote',
                    component: CreateVote,
                    path: 'createVote'
                },
                {
                    name: 'voteList',
                    component: VoteList,
                    path: 'voteList'
                },
                {
                    name: 'vote',
                    component: Vote,
                    path: 'vote'
                }
            ]
        },
        {
            path: '/mine',
            component: Layout,
            children: [
                {
                    name: 'personal',
                    component: Personal,
                    path: 'personal',
                    tableShow:true
                },
                {
                    name: 'basic',
                    component: Basic,
                    path: 'basic'
                },
                {
                    name: 'rename',
                    component: Rename,
                    path: 'rename'
                },
                {
                    name: 'assets',
                    component: Assets,
                    path: 'assets'
                },
                {
                    name: 'transactionRecords',
                    component: TransactionRecords,
                    path: 'transactionRecords'
                },
                {
                    name: 'transactionDetail',
                    component: TransactionDetail,
                    path: 'transactionDetail'
                },
                {
                    name: 'test',
                    component: Test,
                    path: 'test'
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
    ],
})

