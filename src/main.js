import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import axios from 'axios'
import Vuex from 'vuex'

Vue.use( Vuex );

Vue.config.productionTip = false;

let url = '';
if (window.location.href.indexOf('test') > -1) {
    url = 'http://api.bcrealm.com/api/'
} else if (window.location.href.indexOf('localhost') > -1) {
    url = 'http://192.168.31.124:8067/'
} else {
url = 'http://test.bcrealm.com/api/'
}

var $ajax = axios.create({
    baseURL: url,
    timeout: 10000,
});

// 添加响应拦截器
$ajax.interceptors.response.use(function(response) {
    // 对响应数据做点什么
    if (response.status === 200) {
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
