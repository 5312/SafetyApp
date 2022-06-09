<template>
	<view>
		<u-navbar title="" :is-back="false">
			<view class="slot-wrap ">
				<u-search v-model="keyword" placeholder="考核查询" @search="search" @custom="search"></u-search>
			</view>
		</u-navbar>
		<view class="main" v-if="loading">
			<u-card class="u-skeleton card">
				<view class="" slot="body">
					<view class="u-skeleton-fillet heig u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
						<view class="u-body-item-title u-line-2"> </view>
					</view>
					<view class="u-skeleton-fillet heig u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
						<view class="u-body-item-title u-line-2"> </view>
					</view>
					<view class="u-skeleton-fillet heig u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
						<view class="u-body-item-title u-line-2"> </view>
					</view>
					<view class="u-skeleton-fillet heig u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
						<view class="u-body-item-title u-line-2"></view>
					</view>
					<view class="u-skeleton-fillet heig u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
						<view class="u-body-item-title u-line-2"></view>
					</view>
					<view class=" u-skeleton-fillet heig u-body-item u-flex u-row-between u-p-b-0">
						<view class="u-body-item-title u-line-2"></view>
					</view>
				</view>
			</u-card>
		</view>
		<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
		<u-popup v-model="show" mode="center" border-radius="14" :mask-close-able="false">
			<view class="select_box">
				<u-button class="mode_box" type="success" @click="lingdao">领导考核</u-button>
				<u-button class="mode_box" type="info" @click="danwei">单位考核</u-button>
			</view>
		</u-popup>

		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				loading: true,
				show: false,
				keyword: '',
				menu_perms: []
			}
		},
		computed: {
			...mapState(['user']),
		},
		onLoad() {
			// this.$u.route("/uview-ui/components/u-full-screen/u-full-screen?id=1");
			// 获取角色菜单列表
			this.$http.post('/index/Hjob.ashx?type=sel&t=get_role_menu', {
				perms: this.user.perms
			}, {
				load: false
			}).then((res) => {
				if (res.data.code == 0) {
					this.menu_perms = res.data.data;
					this.menufunc(res.data.data)
				} else {
					this.show = false;
					this.$refs.uToast.show({
						title: '登录失败',
						type: 'error',
						url: 'pages/login/login'
					})
				}
			})
		},
		methods: {
			search() {

			},
			menufunc(option) {
				let array = option;
				let menus = [];
				// 提取菜单
				for (let i = 0; i < array.length; i++) {
					const elem = array[i];
					let menu = elem.menu;
					if (menu) {
						let parse = JSON.parse(menu);
						menus.push(parse)
					}
				}
				// 二维变一维
				let flat_arr = menus.flat(2)
				// 查找 考核模块
				let kh_alls = flat_arr.filter((ele, index, arr) => {
					// 测试每个元素,是否有 领导考核大模块
					if (ele.id == "KH_all") {
						return ele.children
					}
				});
				let menu_obj = []
				for (var i = 0; i < kh_alls.length; i++) {
					const ele = kh_alls[i];

					menu_obj.push(...ele.children)
				}
				let isLeader = menu_obj.find(value => {
					if (value.title == '领导考核') {
						return true
					}
				})
				if (isLeader) {
					// 有权限
					this.show = true;

				} else {
					uni.setTabBarItem({
						index: 2,
						pagePath: '/pages/assessment/assessment'
					})
					this.$u.route({
						type: 'tab',
						url: "/pages/assessment/assessment"
					});
				}
			},
			lingdao() {
				uni.setTabBarItem({
					index: 2,
					pagePath: '/pages/assessment/leader_kh/leader_kh'
				})
				this.$u.route({
					type: 'tab',
					url: "/pages/assessment/leader_kh/leader_kh"
				});
			},
			danwei() {
				uni.setTabBarItem({
					index: 2,
					pagePath: '/pages/assessment/assessment'
				})
				this.$u.route({
					type: 'tab',
					url: "/pages/assessment/assessment"
				});
			}
		}
	}
</script>

<style lang="scss">
	.select_box {
		padding: 20px;
		display: flex;
		justify-content: space-around;
		align-items: center;

		.mode_box {
			padding: 20px;
			margin: 10px;
		}
	}

	.main {
		height: 1000rpx;
		background-color: #fff;
		margin: 0 30rpx;
	}

	.heig {
		height: 100rpx;
		margin: 10rpx 0;
	}

	.u-body-item {
		font-size: 32rpx;
		color: #333;
		padding: 20rpx 10rpx;
	}

	
</style>
