export const state = {
	list: [{
			"pagePath": "/pages/home/home",
			"iconPath": "/static/uview/example/home-fill.png",
			"selectedIconPath": "/static/uview/example/home-select.png",
			"text": "首页"
		}, {
			"pagePath": "/pages/danger/danger",
			"iconPath": "/static/uview/example/yinhuan1.png",
			"selectedIconPath": "/static/uview/example/yinhuan1_select.png",
			"text": "隐患",
			"count": 0
		},
		{
			"pagePath": "/pages/add/add",
			"iconPath": "/static/uview/example/min_button.png",
			"selectedIconPath": "/static/uview/example/min_button_select.png",
			"text": "录入",
			"midButton": true,
			"customIcon": false
		},
		{
			"pagePath": "/pages/risk/risk",
			"iconPath": "/static/uview/example/fengxian.png",
			"selectedIconPath": "/static/uview/example/fengxian_select.png",
			"text": "风险"
		},
		{
			"pagePath": "/pages/index/index",
			"iconPath": "/static/uview/example/wodedangxuan.png",
			"selectedIconPath": "/static/uview/example/wodedangxuan_select.png",
			"text": "个人",
		}
	]
};
export const mutations = {
	setTarListNum(state) {
		state.list[1].count = state.mesNum
	}
};
export const getters = {

};
export const actions = {

};
