
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/login/login","pages/home/home","pages/danger/danger","pages/danger/dangerList","pages/index/index","pages/js/index","pages/risk/risk","pages/analysis/analysis","pages/add/add","pages/getDOWN/getDOWN","pages/zhengGai/zhengGai","pages/xiaohao/xiaohao","pages/choucha/choucha","pages/paicha/paicha","pages/add/select_address/select_address","pages/add/select_yhcenter/select_yhcenter","pages/messageList/messageList","pages/index/setting/setting","pages/risk/nd_risk/nd_risk","pages/risk/zx_risk/zx_risk","pages/risk/risk_judgment/risk_judgment","pages/risk/nd_detail/nd_detail","pages/risk/risk_judgment/risk_judgment_detail/risk_judgment_detail"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"Safety","navigationBarBackgroundColor":"#fff","backgroundColor":"#fff"},"tabBar":{"color":"#909399","selectedColor":"#303133","backgroundColor":"#FFFFFF","borderStyle":"black","list":[{"pagePath":"pages/home/home","iconPath":"/static/uview/example/home-fill.png","selectedIconPath":"/static/uview/example/home-select.png","text":"首页"},{"pagePath":"pages/danger/danger","iconPath":"/static/uview/example/yinhuan1.png","selectedIconPath":"/static/uview/example/yinhuan1_select.png","text":"隐患"},{"pagePath":"pages/add/add","iconPath":"/static/uview/example/min_button.png","selectedIconPath":"/static/uview/example/min_button_select.png","text":"录入","midButton":true,"customIcon":false},{"pagePath":"pages/risk/risk","iconPath":"/static/uview/example/fengxian.png","selectedIconPath":"/static/uview/example/fengxian_select.png","text":"风险"},{"pagePath":"pages/index/index","iconPath":"/static/uview/example/wodedangxuan.png","selectedIconPath":"/static/uview/example/wodedangxuan_select.png","text":"个人"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"weex","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"SafetyApp","compilerVersion":"3.2.9","entryPagePath":"pages/login/login","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/login/login","meta":{"isQuit":true},"window":{"navigationBarTitleText":"","navigationStyle":"custom","enablePullDownRefresh":false}},{"path":"/pages/home/home","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"首页","enablePullDownRefresh":false}},{"path":"/pages/danger/danger","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"隐患","enablePullDownRefresh":false,"navigationStyle":"custom","navigationBarTextStyle":"white"}},{"path":"/pages/danger/dangerList","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom","navigationBarTextStyle":"white"}},{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom","navigationBarTitleText":""}},{"path":"/pages/js/index","meta":{},"window":{"navigationBarTitleText":"工具"}},{"path":"/pages/risk/risk","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"风险","enablePullDownRefresh":false,"navigationStyle":"custom","navigationBarTextStyle":"white"}},{"path":"/pages/analysis/analysis","meta":{},"window":{"navigationBarTitleText":"风险分析","enablePullDownRefresh":false}},{"path":"/pages/add/add","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"隐患录入","enablePullDownRefresh":false,"navigationBarTextStyle":"black"}},{"path":"/pages/getDOWN/getDOWN","meta":{},"window":{"navigationBarTitleText":"下达","enablePullDownRefresh":false}},{"path":"/pages/zhengGai/zhengGai","meta":{},"window":{"navigationBarTitleText":"整改","enablePullDownRefresh":false}},{"path":"/pages/xiaohao/xiaohao","meta":{},"window":{"navigationBarTitleText":"销号","enablePullDownRefresh":false}},{"path":"/pages/choucha/choucha","meta":{},"window":{"navigationBarTitleText":"抽查","enablePullDownRefresh":false}},{"path":"/pages/paicha/paicha","meta":{},"window":{"navigationBarTitleText":"排查","enablePullDownRefresh":false}},{"path":"/pages/add/select_address/select_address","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/add/select_yhcenter/select_yhcenter","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/messageList/messageList","meta":{},"window":{"navigationBarTitleText":"消息","enablePullDownRefresh":false}},{"path":"/pages/index/setting/setting","meta":{},"window":{"navigationBarTitleText":"设置","enablePullDownRefresh":false}},{"path":"/pages/risk/nd_risk/nd_risk","meta":{},"window":{"navigationBarTitleText":"年度风险辨识","enablePullDownRefresh":false}},{"path":"/pages/risk/zx_risk/zx_risk","meta":{},"window":{"navigationBarTitleText":"专项风险辨识","enablePullDownRefresh":false}},{"path":"/pages/risk/risk_judgment/risk_judgment","meta":{},"window":{"navigationBarTitleText":"风险研判","enablePullDownRefresh":false}},{"path":"/pages/risk/nd_detail/nd_detail","meta":{},"window":{"navigationBarTitleText":"评估详表","enablePullDownRefresh":false}},{"path":"/pages/risk/risk_judgment/risk_judgment_detail/risk_judgment_detail","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
