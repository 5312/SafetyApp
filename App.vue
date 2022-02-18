<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import base from './config/baseUrl.js';
	import socket from '@/config/socket';
	// #ifdef APP-PLUS
	import APPUpdate from '@/uni_modules/zhouWei-APPUpdate/js_sdk/appUpdate';
	// #endif
	export default {
		components: {},
		data() {
			return {
				dangertypeAllData: '',
				dangerData: '',
				checkingType: ''
			}
		},
		computed: {
			...mapState(['mesNum', 'user'])
		},
		methods: {
			...mapMutations(['setUser', 'setUserId', 'setMessageNum', 'setMessage']),
			isLogin() {
				//判断缓存中是否登录过，直接登录
				let value = this.user;
				// 第一次登录后，后面不在登录
				try {
					const cookie = uni.getStorageSync('login_user');
					if (cookie) {
						value = cookie.us;
						this.setUser(cookie.us)
						this.setUserId(cookie.usid)
						this.setMessageNum(cookie.unread_msg_count) //存入消息数量
					}
				} catch (e) {
					// error
				}
				if (!value) {
					//无登录信息
					this.$u.route({
						type: 'reLaunch',
						url: './pages/login/login',
					})
				}
			},
			async indexAddCatch(update = false) {
				if (!this.$cache.get('_dangerData') || update) {
					// 隐患等级
					this.$http.get('/index/Hjob.ashx?type=sel', {
						tabid: 'YH_liebiao08d2367f-618b-429c-bb8f-5c7634ad508b',
						mid: '9c6a100d-8543-438e-9311-ce6a38e75cae',
						job: 'demo_node_1',
						tbname: 'YH',
						T: 'add_yhsql',
						level: 'A'
					}, {
						load: false
					}).then(res => {
						this.$cache.set('_dangerData', res.data.data, 0)
					})
				}
				if (!this.$cache.get('_dangertypeAllData') || update) {
					// 隐患种类
					this.$http.get('/index/Hjob.ashx?type=sel', {
						tabid: 'YH_liebiao08d2367f-618b-429c-bb8f-5c7634ad508b',
						mid: '9c6a100d-8543-438e-9311-ce6a38e75cae',
						job: 'demo_node_1',
						tbname: 'YH',
						T: 'app_yh_type_sql',
						level: this.user.level
					}, {
						load: false
					}).then(res => {
						this.$cache.set('_dangertypeAllData', res.data.data, 0)
					})
				}
				if (!this.$cache.get('_checkingType') || update) {
					// 检查类别
					this.$http.get('/index/Hjob.ashx?type=sel', {
						tabid: 'YH_liebiao08d2367f-618b-429c-bb8f-5c7634ad508b',
						mid: '9c6a100d-8543-438e-9311-ce6a38e75cae',
						job: 'demo_node_1',
						tbname: 'YH',
						T: 'app_checking',
						department_id: this.user.department_id
					}, {
						load: false
					}).then(res => {
						this.$cache.set('_checkingType', res.data.data, 0)
					})
				}
				if (update) {
					let function_perms = ''
					if (this.user.function_perms) {
						function_perms = this.user.function_perms.split(",")
					}
					let perms = {
						permsid: function_perms.join("','")
					}
					let params = Object.assign({
						tabid: 'YH_liebiao178698a5-ccf0-439a-8cf1-f4d8dc8121d8',
						mid: '9c6a100d-8543-438e-9311-ce6a38e75cae',
						job: 'demo_node_1',
						tbname: 'YH',
						T: '部门管理sql',
						zr: 1,
					}, perms)
					this.$http.get('/index/Hjob.ashx?type=sel', params).then(res => {
						let array = res.data.data;
						// console.log(array)
					})
				}

			},
		},
		onLaunch: function() {
			console.log('onlauch')
			this.isLogin()
			// 升级
			// #ifdef APP-PLUS
			APPUpdate()
			// #endif
			socket.init()

			uni.onTabBarMidButtonTap(() => {
				this.$u.route({
					url: '/pages/add/add'
				})
			});
			// 离线缓存数据
			this.indexAddCatch()
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		},

	}
</script>

<style lang="scss">
	// 
	@import "colorui/main.css";
	@import "colorui/icon.css";
	/* 此处为style标签内容的最前面 */
	@import "./static/font-icon/iconfont.css";
	@import "uview-ui/index.scss";

	body {
		background-color: #e5dee6;
	}

	.slot-wrap {
		display: flex;
		align-items: center;
		/* 如果您想让slot内容占满整个导航栏的宽度 */
		flex: 1;
		/* 如果您想让slot内容与导航栏左右有空隙 */
		padding: 0rpx 30rpx;
	}

	page {
		height: 100%;
		background-color: #f5f5f5;
	}


	/* #ifdef H5 */
	//修复H5底部导航挡住内容bug
	uni-app {
		height: auto;
	}

	//修复H5输入框上下不居中bug
	.uni-input-form {
		height: 100%;
	}

	//去除地图上高德地图标识符
	.amap-copyright {
		display: none !important;
	}

	.amap-logo {
		display: none !important;
	}

	.amap-ui-control-zoom {
		width: 60upx !important;
	}

	.amap-ui-control-zoom>* {
		width: 60upx !important;
		height: 60upx !important;
		line-height: 60upx !important;
	}

	.amap-ui-control-theme-dark {
		display: none !important;
	}

	/* #endif */
</style>
