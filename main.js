import Vue from 'vue'
import App from './App'
//数据管理中心
import store from '@/store'
Vue.prototype.$store = store;
//挂载全局http请求
import $http from '@/config/requestConfig'
Vue.prototype.$http = $http;
//缓存中心
import MinCache from '@/config/catch'
Vue.use(MinCache)
//  api 拦截器
// #ifdef APP-PLUS
//import Interceptor from '@/config/Interceptor.js'
// #endif

Vue.config.productionTip = false

App.mpType = 'app'

// 引入全局uView
import uView from 'uview-ui';
Vue.use(uView);

const app = new Vue({
	store,
    ...App
})
app.$mount()
