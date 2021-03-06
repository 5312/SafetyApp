import request from "@/uni_modules/zhouWei-request/js_sdk/request";
// 数据中心
import store from '@/store';
// 全局配置
import base from '@/config/baseUrl';

// app  版本号
let version_code = '';

// #ifdef APP-PLUS
import {
	getCurrentNo
} from '@/uni_modules/zhouWei-APPUpdate/js_sdk/appUpdate';

setTimeout(() => {
	getCurrentNo(function(res) {
		version_code = res.versionCode;
	});
}, 200);
// #endif

//可以new多个request来支持多个域名请求
let $http = new request({
	timeout: 6000,
	//接口请求地址
	baseUrl: base.baseUrl,
	//服务器本地上传文件地址
	fileUrl: base.baseUrl + "",
	// 服务器上传图片默认url
	defaultUploadUrl: "/root/HandlerUpload.ashx?type=3",
	// 服务器上传文件名称
	// defaultFileName: "file",
	withCredentials: true,
	//设置请求头（如果使用报错跨域问题，可能是content-type请求类型和后台那边设置的不一致）
	header: {
		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
	}
});
//当前接口请求数
let requestNum = 0;
//请求开始拦截器
$http.requestStart = function(options) {
	if (options.load) {
		//打开加载动画
		if (requestNum <= 0) {
			//打开加载动画
			uni.showLoading({
				title: '加载中',
				mask: true
			});
		}
		requestNum += 1;
	}
	// 图片、视频上传大小限制
	if (options.method == "FILE") {
		// 文件最大字节: options.maxSize 可以在调用方法的时候加入参数
		let maxSize = options.maxSize || '';
		for (let item of options.files) {
			if (item.fileType == 'image') {
				if (maxSize && item.size > maxSize) {
					setTimeout(() => {
						uni.showToast({
							title: "图片过大，请重新上传",
							icon: "none"
						});
					}, 500);
					return false;
				}
			}
		}
	}
	// #ifdef APP-PLUS
	// 添加当前版本号
	if (version_code) {
		options.header['version_code'] = version_code;
	}
	// #endif
	//请求前加入token
	return options;
}

//请求结束
$http.requestEnd = function(options) {
	//判断当前接口是否需要加载动画
	if (options.load) {
		// 关闭加载动画
		requestNum = requestNum - 1;
		if (requestNum <= 0) {
			uni.hideLoading();
		}
	}
}
//所有接口数据处理（此方法需要开发者根据各自的接口返回类型修改，以下只是模板）
// $http.dataFactory = async function(res) {
// 	return  Promise.resolve(res);
// }
// 错误回调
$http.requestError = function(e) {
	// e.statusCode === 0 是参数效验错误抛出的
	if (e.statusCode === 0) {
		uni.showToast({
			title: "网络错误，请检查一下网络",
			icon: "none"
		});
		throw e;
	} else {
		console.log(e);
		uni.showToast({
			title: "网络错误，请检查一下网络",
			icon: "none"
		});
	}
}


export default $http;
