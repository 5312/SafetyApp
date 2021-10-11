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
		computed: {
			...mapState(['mesNum'])
		},
		methods: {
			...mapMutations(['setUser', 'setUserId', 'setMessageNum', 'setMessage']),
			isLogin() {
				//判断缓存中是否登录过，直接登录
				try {
					let value = this.user;
					// 第一次登录后，后面不在登录
					try {
						const cookie = uni.getStorageSync('login_user');
						if (cookie) {
							// console.log('1',cookie)
							value = cookie.us;
							this.setUser(cookie.us)
							this.setUserId(cookie.usid)
							this.setMessageNum(cookie.unread_msg_count) //存入消息数量
						}
					} catch (e) {
						// error
					}
					if (value) {
						//有登录信息
						this.$u.route({
							type: 'tab',
							url: './pages/home/home',
						})
					}
				} catch (e) {
					// error
					console.log(e)
				}
			},
		},
		onLaunch: function() {
			// console.log('App Launch')
			this.isLogin()
			// 升级
			// #ifdef APP-PLUS
			APPUpdate()
			// #endif
			socket.init()
			
			uni.onTabBarMidButtonTap(()=>{
				this.$u.route({
					url:'/pages/add/add'
				})
			});
			

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
	/* 此处为style标签内容的最前面 */
	@import "./static/font-icon/iconfont.css";
	@import "uview-ui/index.scss";

	body {
		background-color:#e5dee6;
	}
	.slot-wrap{
		display: flex;
		align-items: center;
		/* 如果您想让slot内容占满整个导航栏的宽度 */
		flex: 1;
		/* 如果您想让slot内容与导航栏左右有空隙 */
		padding: 0rpx 30rpx;
	}
	/* #ifndef APP-NVUE */
	page {
		height: 100%;
		background-color: #f5f5f5;
	}

	/* #endif */

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
