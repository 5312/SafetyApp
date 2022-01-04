<template>
	<view class="u-wrap ">
		<u-navbar title="" :is-back="false">
			<view class="slot-wrap ">
				<u-search v-model="keyword" placeholder="考核查询" @search="search" @custom="search"></u-search>
			</view>
		</u-navbar>
		<view class="main" v-if="skeleton">
			<u-card class="u-skeleton">
				<view class="" slot="body">
					<view class="u-skeleton-fillet u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
						<view class="u-body-item-title u-line-2">开始日期： </view>
					</view>
					<view class="u-skeleton-fillet u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
						<view class="u-body-item-title u-line-2">被考核人： </view>
					</view>
					<view class="u-skeleton-fillet u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
						<view class="u-body-item-title u-line-2">被考核单位： </view>
					</view>
					<view class="u-skeleton-fillet u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
						<view class="u-body-item-title u-line-2">扣分：</view>
					</view>
					<view class="u-skeleton-fillet u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
						<view class="u-body-item-title u-line-2"></view>
					</view>
					<view class=" u-skeleton-fillet u-body-item u-flex u-row-between u-p-b-0">
						<view class="u-body-item-title u-line-2">结束日期：</view>
					</view>
				</view>
			</u-card>
		</view>
		<view>
			<u-card v-for="(item,index) in acticeList" :key="index" :title="item.kh_plan_name" @click="nd_detail(item)">
				<view class="" slot="body">
					<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
						<view class="u-body-item-title u-line-2">开始日期：{{item.kh_plan_star}}</view>
					</view>
					<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
						<view class="u-body-item-title u-line-2">被考核人：{{item.kh_link_people_name}}</view>
					</view>
					<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
						<view class="u-body-item-title u-line-2">被考核单位：{{item.kh_link_bed_name}}</view>
					</view>
					<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
						<view class="u-body-item-title u-line-2">扣分：{{item.kh_link_source}}</view>
					</view>
					<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
						<view class="u-body-item-title u-line-2">{{item.tname}}</view>
					</view>
					<view class="u-body-item u-flex u-row-between u-p-b-0">
						<view class="u-body-item-title u-line-2">结束日期：{{item.kh_plan_end}}</view>
					</view>
				</view>
			</u-card>
		</view>
		<view v-if="acticeList.length<= 0 ">
			<u-empty text="暂无数据" mode="list"></u-empty>
		</view>
		<u-loadmore v-if="acticeList.length > 0" :status="loadStatus" :load-text="loadText" bgColor="#f5f5f5"
			@loadmore="loadmore"></u-loadmore>
		<!--引用组件-->
		<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
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
				acticeList: [],
				keyword: '',
				page: 1,
				nomore: false,
				loadStatus: 'loadmore',
				loadText: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '实在没有了'
				},
				skeleton:true
			}
		},
		onLoad() {
			this.index()
		},
		onShow() {
			// this.index()
		},
		computed: {
			...mapState(['user']),
		},
		onPullDownRefresh() {
			this.keyword = '';
			this.index().then(res => {
				uni.stopPullDownRefresh()
			})
		},
		onReachBottom() {
			this.loadStatus = "loading"
			this.page += 1;
			this.index(true)
		},
		methods: {
			loadmore() {
				this.loadStatus = "loading"
				this.page += 1;
				this.index(true)
			},
			async index(ispush = false) {
				if (this.nomore) {
					this.loadStatus = 'nomore';
					this.skeleton = false;
					return
				}
				const result = await this.$http.get('/index/Hjob.ashx', {
					type: 'sel',
					tabid: 'KH_list369a6a49-7bea-4afe-b19c-1a15d1a83e8a',
					mid: '88f8e7eb-70b3-4486-8a86-f4d8db42568a',
					job: 'demo_node_1',
					tbname: 'kh_list',
					T: '考核清单列表sql',
					kh_plan_state: '1',
					page: this.page,
					limit: 10,
					function_perms: this.user.function_perms,
					keyword: this.keyword
				}, {
					load: false
				})
				this.loading = false;
				// console.log(result.data.data)
				if (!result.data.data) {
					this.nomore = true;
					this.loadStatus = "nomore";
					this.skeleton = false;
					return;
				}
				if (ispush) {
					this.acticeList.push(...result.data.data)
				} else {
					this.acticeList = result.data.data;
				}
				this.loadStatus = "loadmore";
				this.skeleton = false;
			},
			search() {
				this.nomore = false;
				this.index(false)
			},
			// 跳转 考核页面
			nd_detail(item) {
				this.$u.route({
					url: './assessmentlist/assessmentlist',
					params: {
						kh_link_id: item.ids
					}
				})
			},
			addNdRisk() {
				this.$u.route({
					url: './add_assessment/add_assessment'
				})
			}
		}
	}
</script>
<style scoped lang="scss">
	.main {
		height: 1200rpx;
		background-color: #fff;
		margin:0 30rpx;
	}

	.u-card-wrap {
		background-color: $u-bg-color;
		padding: 1px;
	}

	.u-wrap {
		padding-bottom: 30rpx;
	}

	.u-body-item {
		font-size: 32rpx;
		color: #333;
		padding: 20rpx 10rpx;
	}

	.u-body-item image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		border-radius: 8rpx;
		margin-left: 12rpx;
	}

	.navbar-right {
		margin-right: 24rpx;
		display: flex;
	}

	.u-body-item {
		padding: 20rpx;
		margin-bottom: 10rpx;
	}
</style>
