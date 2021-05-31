import Vue from 'vue'
import App from './App'

//数据管理中心
import store from '@/store'
Vue.prototype.$store = store;
// request 请求
import $http from '@/uni_modules/zhouWei-request/js_sdk/requestConfig';
Vue.prototype.$http = $http;

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
