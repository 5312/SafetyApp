export const state = {
	message: '来自集团矿的处分消息',
	mesNum: 12
};
export const mutations = {
	setMessage(state, data) {
		state.mesNum = data
		state.list[4].count = state.mesNum
	}
};
export const getters = {
	mesNumgetters(state, getters){
		return getters.mesNum
	}
}; 
export const actions = {

};
