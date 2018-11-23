import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import axios from 'axios'
import Vuex from 'vuex'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import '../static/css/common.styl'

import VueClipboards from 'vue-clipboard2'
// import VConsole from 'vconsole'
// let vConsole = new VConsole();//初始化
//
// Vue.use(vConsole);//设为全局
VueClipboards.config.autoSetContainer = true
Vue.use(VueClipboards);
Vue.use( Vuex );
Vue.use(MintUI)
Vue.config.productionTip = false;

let url = 'http://test.bcrealm.com/api/';

var $ajax = axios.create({
    baseURL: url,
    timeout: 10000,
});

// 添加响应拦截器
$ajax.interceptors.response.use(function(response) {
    if(response.data.code === 1001){
        localStorage.setItem('path',router.currentRoute.fullPath)
        router.push({path:'/login'})
    }
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

