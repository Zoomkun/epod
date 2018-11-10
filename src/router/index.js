import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/login.vue'
import Layout from '@/page/layout.vue'

// 投票
import VoteList from '@/page/work/vote/voteList.vue'
import Vote from '@/page/work/vote/creatVote.vue'

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
                    path: 'projectList'
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
                    path: 'workIndex'
                },
                {
                    name: 'myMarket',
                    component: MyMarket,
                    path: 'myMarket'
                },
                {
                    name: 'vote',
                    component: Vote,
                    path: 'vote'
                },
                {
                    name: 'voteList',
                    component: VoteList,
                    path: 'voteList'
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
                    path: 'personal'
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

