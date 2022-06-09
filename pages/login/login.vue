<template>
	<view class="login wrap">
		<view class="content">
			<!-- 头部logo -->
			<view class="topbg">
				<image width="100%" height="400rpx" :src="logoImage" mode="widthFix"></image>
			</view>
			<!-- 主体表单 -->
			<view class="main">

				<u-field v-model="tel" label-width="0" placeholder="请输入账号">
					<view slot="icon">
						<u-icon name="phone"></u-icon>
					</view>
				</u-field>
				<!-- <wInput v-model="tel" type="text" leftIcon="phone" placeholder="用户名/电话" :focus="isFocus"></wInput> -->
				<u-field v-model="password" type="password" label-width="0" placeholder="请输入密码">
					<view slot="icon">
						<u-icon name="lock-open"></u-icon>
					</view>
				</u-field>
				<!-- <wInput v-model="password" type="password" placeholder="密码"></wInput> -->
			</view>
			<wButton class="wbutton" text="登 录" :rotate="isRotate" @click="startLogin"></wButton>

			<!-- 其他登录 -->
			<view class="other_login cuIcon">
				<!-- <view class="login_icon">
					<view class="cuIcon-weixin" @tap="login_weixin"></view>
				</view> -->
			</view>

			<!-- 底部信息 -->
			<!-- <view class="footer">
				<navigator url="forget" open-type="navigate">找回密码</navigator>
				<text>|</text>
				<navigator url="register" open-type="navigate">注册账号</navigator>
			</view> -->
			<!-- <view class="buttom">
				<view class="hint">
					登录代表同意
					<text class="link">用户协议、隐私政策，</text>
					并授权使用您的账号信息（如昵称、头像、收获地址）以便您统一管理
				</view>
			</view> -->

		</view>
	</view>

</template>

<script>
	let _this;
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import wInput from '../../components/watch-login/watch-input.vue' //input
	import wButton from '../../components/watch-login/watch-button.vue' //button
	// import cookies from 'weapp-cookie'
	export default {
		data() {
			return {
				// #ifdef APP-PLUS
				tel: '',
				password: '',
				// #endif
				// #ifndef APP-PLUS
				tel: 'test_admin',
				password: '123456',
				// #endif
				isRotate: false, //是否加载旋转
				isFocus: true, // 是否聚焦
				//logo图片 base64

				logoImage: '../../static/bg/login_bg.png'
			}
		},
		components: {
			wInput,
			wButton,
		},
		computed: {
			...mapState(['user']),
			inputStyle() {
				let style = {};
				if (this.tel) {
					style.color = "#fff";
					style.backgroundColor = this.$u.color['warning'];
				}
				return style;
			}
		},
		onLoad() {
			// this.isLogin();
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
							this.setUserId(cookie.userid)
							this.setMessageNum(cookie.unread_msg_count) //存入消息数量
						}
					} catch (e) {
						// error
					}
					if (value) {
						//有登录信息
						this.$u.route({
							type: 'tab',
							url: '../home/home',
						})
					}
				} catch (e) {
					// error
					console.log(e)
				}
			},
			startLogin(e) {
				//登录 
				if (this.isRotate) {
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if (this.tel == '') {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '用户名不能为空'
					});
					return;
				}
				if (this.password.length < 5) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '密码不正确'
					});
					return;
				}
				// 请求
				this.submit();
			},
			submit() {
				this.isRotate = true
				this.$http.post('/api/userlogin', {
					name: this.tel,
					pwd: this.password,
				}, {
					load: false
				}).then(res => {
					setTimeout(() => {
						if (res.data.code == '0') {
							try {
								uni.setStorageSync('login_user', res.data.data);
							} catch (e) {}

							let loginData = res.data.data;
							this.setUser(loginData.us) //存入user
							this.setUserId(loginData.usid) //存入userid
							this.setMessageNum(loginData.unread_msg_count) //存入消息数量
							if (loginData.unread_msg_count > 0) {
								this.setMessage('未读消息')
							} else {
								this.setMessage('暂无消息')
							}
							this.isRotate = false
							this.$u.route({
								type: 'tab',
								url: '../home/home',
							})
						} else {
							this.password = ""
							uni.showToast({
								icon: 'none',
								position: 'bottom',
								title: '账号或密码错误'
							});
							this.isRotate = false
						}
					}, 500)
				}).catch(e => {
					this.isRotate = false
				})
			},
			login_weixin() {
				//微信登录
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '正在开发中。。。'
				});
			},
		}
	};
</script>

<style lang="scss" scoped>
	@import url("../../components/watch-login/css/icon.css");
	@import url("./css/main.css");

	page {
		background-color: #fff;
	}

	.wrap {
		font-size: 28rpx;
		padding-bottom: 20rpx;

		.content {
			width: 100%;
			margin: auto;

			.topbg {
				image {
					width: 100%;
				}
			}

			.title {
				text-align: left;
				font-size: 60rpx;
				font-weight: 500;
				margin-bottom: 100rpx;
			}

			input {
				text-align: left;
				margin-bottom: 10rpx;
				padding-bottom: 6rpx;
			}

			.tips {
				color: $u-type-info;
				margin-bottom: 60rpx;
				margin-top: 8rpx;
			}

			.getCaptcha {
				background-color: rgb(253, 243, 208);
				color: $u-tips-color;
				border: none;
				font-size: 30rpx;
				padding: 12rpx 0;

				&::after {
					border: none;
				}
			}

			.alternative {
				color: $u-tips-color;
				display: flex;
				justify-content: space-between;
				margin-top: 30rpx;
			}
		}

		.buttom {
			.loginType {
				display: flex;
				padding: 350rpx 150rpx 150rpx 150rpx;
				justify-content: space-between;

				.item {
					display: flex;
					flex-direction: column;
					align-items: center;
					color: $u-content-color;
					font-size: 28rpx;
				}
			}

			.hint {
				padding: 20rpx 40rpx;
				font-size: 20rpx;
				color: $u-tips-color;

				.link {
					color: $u-type-warning;
				}
			}
		}
	}
</style>
