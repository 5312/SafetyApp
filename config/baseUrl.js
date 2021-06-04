let baseUrl = "";
let socketUrl = "";
if (process.env.NODE_ENV === 'development') {
	// 开发环境
	// baseUrl = "http://localhost:7001/";
	// socketUrl = "ws://localhost:6001/";
	baseUrl = "http://59.110.63.135:9010/index/Hjob.ashx";
	// socketUrl = "ws://8.129.186.35:6001/";
} else if (process.env.NODE_ENV === 'production') {
	// 生产环境
	baseUrl = "http://59.110.63.135:9010/index/Hjob.ashx";
	// socketUrl = "ws://twin-ui.com:6001/";
}
const courtConfig = {
	//微信公众号APPID
	publicAppId: "",
	//请求接口
	baseUrl: baseUrl,
	//webSocket地址
	socketUrl: socketUrl,
	//平台名称
	platformName: "SafetyApp",
	//项目logo
	logoUrl: "https://qn.kemean.cn/upload/201906/19/3f3b4751f3ed4a97be804450c3ec4c79",

};
//手机号验证正则表达式
const phoneRegular = /^1\d{10}$/;
//邮箱验证正则表达式
const mailRegular = /^\w+@\w+(\.[a-zA-Z]{2,3}){1,2}$/;
//密码验证正则表达式
const passwordRegular = /^[a-zA-Z0-9]{4,10}$/;
export default Object.assign({
	phoneRegular,
	mailRegular,
	passwordRegular
}, courtConfig);
