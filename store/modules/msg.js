export const state = {
	message: '未读消息',
	mesNum: 0,
	title:'',
	content:''
};
export const mutations = {
	setMessageNum(state, data) {
		state.mesNum = data
		// 更新tarbar 数字
		state.list[1].count = state.mesNum;
		uni.setTabBarBadge({
			index:1,
			text:String(data),
		})
	},
	setMessage(state, data){
		state.message = data
	}
};
export const getters = {

}; 
export const actions = {

};
