<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components:{},
		onLaunch: function() {
			console.log('App Launch')
			let users = uni.getStorageSync('setUser')
			if (users) {
				uni.getStorage({
					key: 'setUser',
					success: (res) => {
						this.setUser(JSON.parse(res.data))
					}
				})
			}

		}, 
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			...mapMutations(['setUser']),
		}
	}
</script>


<style lang="scss">
	/* 此处为style标签内容的最前面 */
	@import "./static/font-icon/iconfont.css";
	@import "uview-ui/index.scss";

	body {
		background-color: #f2f7fd;
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
