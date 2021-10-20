<template>
	<view>
		<u-navbar title="" :is-back="false">
			<view class="slot-wrap" slot="">
				<view class="u-flex left">
					<u-icon name="arrow-leftward" size="36" @click="back"></u-icon>
					<view class="line"></view>
					<view>我的账号</view>
				</view>
			</view>
		</u-navbar>
		<u-gap height="30"></u-gap>
		<u-cell-group>
			<u-cell-item title="头像" @click="chooseAvatar">
				<u-avatar :src="url"></u-avatar>
			</u-cell-item>
			<u-cell-item title="用户名" :value="user.users_name"></u-cell-item>
			<u-cell-item title="账号密码" :value="user.jobnumber"></u-cell-item>
			<u-cell-item title="手机号" :value="user.iphone"></u-cell-item>
			<u-cell-item title="所属部门" :value="user.department_name"></u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import base from '../../../config/baseUrl.js'
	export default {
		data() {
			return {
				loadurl:''
			}
		},
		computed: {
			...mapState(['user', 'userid']),
			url(){
				if(this.jugeUrl(this.user.headportrait)){
					return this.user.headportrait
				}else{
					return base.baseUrl+this.user.headportrait
				}
			}
		},
		onLoad() {
			// this.url = base.baseUrl + this.user.headportrait;
		},
		created() {
			let _this = this
			// 监听从裁剪页发布的事件，获得裁剪结果
			uni.$on('uAvatarCropper', path => {
				this.avatar = path;
				// 可以在此上传到服务端
				uni.uploadFile({
					url: base.baseUrl + '/root/HandlerUpload.ashx?type=3',
					filePath: path,
					name: 'file',
					success: res => {
						_this.loadurl =  JSON.parse(res.data).url;
						_this.update()
					},
					complete: (res) => {}
				});
			})
		},
		methods: {
			back() {
				this.$u.route({
					type: "back"
				})
			},
			jugeUrl(URL) {
				var str = URL;
				//判断URL地址的正则表达式为:http(s)?://([\w-]+\.)+[\w-]+(/[\w- ./?%&=]*)?
				//下面的代码中应用了转义字符"\"输出一个字符"/"
				var Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
				var objExp = new RegExp(Expression);
				if (objExp.test(str) == true) {
					return true;
				} else {
					return false;
				}
			},
			async update() {
				const res = await this.$http.post('/index/Hjob.ashx?type=add', {
					mid: '65d823e3-1b15-4477-975e-7582b669a93b',
					tabid: 'SYS_users6ef12f34-a72c-4815-940e-047e081836fa',
					job: 'demo_node_1',
					tbname: 'xt_users',
					logtype: ' 1002',
					id: this.userid,
					add: 'headportrait',
					headportrait: this.loadurl
				});
				if(res.data.statusCode == '200'){
					this.user.headportrait = this.loadurl;
					try {
						const cookie = uni.getStorageSync('login_user');
						cookie.us = this.user
						uni.setStorageSync('login_user',cookie);
					} catch (e) {
						// error
					}
				}
			},
			chooseAvatar() {
				// 此为uView的跳转方法，详见"文档-JS"部分，也可以用uni的uni.navigateTo
				this.$u.route({
					// 关于此路径，请见下方"注意事项"
					url: '/uview-ui/components/u-avatar-cropper/u-avatar-cropper',
					// 内部已设置以下默认参数值，可不传这些参数
					params: {
						// 输出图片宽度，高等于宽，单位px
						destWidth: 300,
						// 裁剪框宽度，高等于宽，单位px
						rectWidth: 200,
						// 输出的图片类型，如果'png'类型发现裁剪的图片太大，改成"jpg"即可
						fileType: 'jpg',
					}
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.slot-wrap {
		display: flex;
		align-items: center;
		/* 如果您想让slot内容占满整个导航栏的宽度 */
		/* 如果您想让slot内容与导航栏左右有空隙 */
		padding: 0 30rpx;

		.left {
			width: 30%;
			height: 100%;
			justify-content: space-around;
			align-items: center;

			.line {
				border-left: 2rpx solid #cccccc;
				height: 30rpx;
				width: 1rpx;
			}
		}
	}
</style>
