import sqlite from './sqlite'
//获取网络信息  
uni.getNetworkType({
	success: res => {
		let netWork = res.networkType;
		// #ifdef APP-PLUS
		if (netWork == 'none') {
			Interceptor()
		}
		// #endif

		// #ifdef H5
		Interceptor()
		// #endif
	}
})

function Interceptor() {
	uni.addInterceptor('request', {
		invoke(args) {
			// request 触发前拼接 url 
			bumen(args)
		},
		success(args) {
			// 请求成功后，修改code值为1
			args.data = {
				code:1,
				data:[]
			}
			// #ifdef APP-PLUS
			if (res.statusCode != '200') {
				console.log('interceptor-complete', args)
			}
			// #endif
			
		},
		fail(err) {
			console.log('interceptor-fail', err)
		},
		complete(res) {
			
		}
	})
}
// 部门拦截
function bumen(args) {
	if (args.data.T == '部门管理sql') {
		console.log(args)
	}
}
// 部门离线数据
function requestBumen(){
	
}