import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login.vue'
import Layout from '@/components/layout.vue'

// 投票

import Vote from '@/components/vote/creatVote'

// 行情
import MyMarket from '@/components/market/myMarket'

// 我
import Personal from '@/components/mine/personal'

Vue.use(Router)
export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/Vote',
            component:Layout,
            children: [
                {
                    name: 'Vote',
                    component: Vote,
                    path:'Vote'
                }
            ]
        },
        {
            path: '/market',
            component:Layout,
            children: [
                {
                    name: 'myMarket',
                    component: MyMarket,
                    path:'myMarket'
                }
            ]
        },
        {
            path: '/mine',
            component:Layout,
            children: [
                {
                    name: 'personal',
                    component: Personal,
                    path:'personal'
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
    ],
})