import Vue from 'vue';
import Vuex from 'vuex';
// vuex 数据持久化
//#ifndef APP-PLUS  
 import createPersistedState from 'vuex-persistedstate'
//#endif 
Vue.use(Vuex);

const files = require.context('./modules', false, /\.js$/);

let modules = {
	state: {},
	getters: {},
	mutations: {},
	actions: {},
	plugins: [
		//#ifndef APP-PLUS 
		createPersistedState()
		//#endif 
	]
};
files.keys().forEach((key) => {
	Object.assign(modules.state, files(key)["state"]);
	Object.assign(modules.getters, files(key)["getters"]);
	Object.assign(modules.mutations, files(key)["mutations"]);
	Object.assign(modules.actions, files(key)["actions"]);
});
const store = new Vuex.Store(modules);
export default store;
