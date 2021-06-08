export const state = {
	list: [{
			"pagePath": "/pages/danger/danger",
			"iconPath": "/static/uview/example/yinhuan1.png",
			"selectedIconPath": "/static/uview/example/yinhuan1_select.png",
			"text": "隐患"
		},
		{
			"pagePath": "/pages/risk/risk",
			"iconPath": "/static/uview/example/fengxian.png",
			"selectedIconPath": "/static/uview/example/fengxian_select.png",
			"text": "风险"
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
			"pagePath": "/pages/analysis/analysis",
			"iconPath": "/static/uview/example/fenx.png", 
			"selectedIconPath": "/static/uview/example/fenx_select.png",
			"text": "分析"
		}, {
			"pagePath": "/pages/index/index",
			"iconPath": "/static/uview/example/wodedangxuan.png",
			"selectedIconPath": "/static/uview/example/wodedangxuan_select.png",
			"text": "个人",
			"count": 0
			
		}
	]
};
export const mutations = {
	msg(state){
		state.list[4].count = state.mesNum
	}
};
export const getters = {
	
};
export const actions = {

};
