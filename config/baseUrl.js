let baseUrl = "";
let socketUrl = "";
if (process.env.NODE_ENV === 'development') {
	// 开发环境
	socketUrl = "ws://210.76.0.70:15449/handlers/websocket-connect.ashx";
	baseUrl = "http://210.76.0.70:15449";
} else if (process.env.NODE_ENV === 'production') {
	// 生产环境
	baseUrl = "http://210.76.0.70:15459";
	socketUrl = "ws://210.76.0.70:15459/handlers/websocket-connect.ashx";
}
const courtConfig = {
	//微信公众号APPID
	publicAppId: "",
	//请求接口
	baseUrl: baseUrl,
	//webSocket地址
	socketUrl: socketUrl,
	// 文件上传
	//平台名称
	platformName: "SafetyApp",
	//项目logo
	logoUrl: "http://210.76.0.70:15459/favicon.png",

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
