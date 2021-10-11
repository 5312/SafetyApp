<template>
	<view>
		<view class="u-m-t-20">
			<u-cell-group>
				<!-- <u-cell-item  title="个人设置"></u-cell-item> -->
				<u-cell-item  title="关于" :value="version" @click="onAPPUpdate"></u-cell-item>
			</u-cell-group>
			<view class="u-m-t-20">
				<u-cell-group>
					<view class="ctitle" hover-class='cell-hover-class' @click="back">退出登录</view>
				</u-cell-group>
			</view>
		</view>
		<u-modal v-model="show" :content="content" :show-title='false' :show-cancel-button='true' @confirm='siginup'>
		</u-modal>
	</view>
</template>

<script>
	// #ifdef APP-PLUS
	import APPUpdate, {
		getCurrentNo
	} from '@/uni_modules/zhouWei-APPUpdate/js_sdk/appUpdate';
	// #endif
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				version: "", // 版本号
				show: false,
				content: '确认退出？'
			}
		},
		computed: {
			...mapState(['mesNum', 'message', 'user']),
		},
		onLoad() {
			let _this = this;
			// #ifdef APP-PLUS
			getCurrentNo(res => {
				// 进页面获取当前APP版本号（用于页面显示）
				 _this.version = res.versionName;
			});
			// #endif
		},
		methods: {
			...mapMutations(['setUser', 'setUserId', 'setMessageNum', 'setMessage']),
			// 检查APP是否有新版本
			onAPPUpdate() {
				// true 没有新版本的时候有提示，默认：false
				// #ifdef APP-PLUS
				APPUpdate(true);
				// #endif
			},
			personalDetail() {
				this.$http.get('?', {

				})
			},
			back() {
				this.show = true
			},
			siginup() {
				// 清空
				this.setUser('')
				this.setUserId('')
				this.setMessageNum('')
				this.setMessage('暂无消息')
				try {
					uni.setStorageSync('login_user','');
				} catch (e) {}
				this.$u.route({
					url: '../../login/login',
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #ededed;
	}

	.ctitle {
		text-align: center;
		margin: auto;
		padding: 20rpx;
		font-size: 30rpx;
		width: 100%
	}

	.camera {
		width: 54px;
		height: 44px;

		&:active {
			background-color: #ededed;
		}
	}

	.user-box {
		background-color: #fff;
	}
</style>
