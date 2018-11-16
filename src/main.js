import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import axios from 'axios'
import Vuex from 'vuex'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
// import VConsole from 'vconsole'
// let vConsole = new VConsole();//初始化
//
// Vue.use(vConsole);//设为全局

Vue.use( Vuex );
Vue.use(MintUI)
Vue.config.productionTip = false;

let url = 'http://test.bcrealm.com/api/evote/';

var $ajax = axios.create({
    baseURL: url,
    timeout: 10000,
});

// 添加响应拦截器
$ajax.interceptors.response.use(function(response) {
    console.log(this)
    console.log(response)
    // 对响应数据做点什么
    if (response.status === 200) {
        console.log(response.data)
        return response.data
    }
}, function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

$ajax.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
Vue.prototype.$ajax = $ajax;
Vue.prototype.$axios = axios;
/* eslint-disable no-new */

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})
// router.beforeEach((to, from,next) => {
//     if(to.path.indexOf('/vote/')>-1){
//         console.log(store)
//         store.commit('setAction',1)
//     }else if(to.path.indexOf('/market/')>-1){
//         console.log(store)
//         // store.commit('setAction',2)
//     }else if(to.path.indexOf('/mine/')>-1){
//         console.log(store)
//         // store.commit('setAction',3)
//     }
//     next();
// })

