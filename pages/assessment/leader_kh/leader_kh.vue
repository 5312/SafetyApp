<template>
	<view class="u-wrap ">
		<u-navbar title="" :is-back="false">
			<view class="slot-wrap ">
				<u-search v-model="keyword" placeholder="考核查询" @search="search" @custom="search"></u-search>
			</view>
		</u-navbar>
		<u-card v-if="acticeList.length == 0 && !loading" :show-head="false">
			<view class="u-skeleton" slot="body">
				<u-empty class="u-skeleton-fillet" text="暂无数据" mode="list"></u-empty>
			</view>
		</u-card>

		<view class="main" v-if="loading">
			<u-card class="u-skeleton">
				<view class="" slot="body">
					<view class="u-skeleton-fillet u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
						<view class="u-body-item-title u-line-2"> </view>
					</view>
					<view class="u-skeleton-fillet u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
						<view class="u-body-item-title u-line-2"> </view>
					</view>
					<view class="u-skeleton-fillet u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
						<view class="u-body-item-title u-line-2"> </view>
					</view>
					<view class="u-skeleton-fillet u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
						<view class="u-body-item-title u-line-2"></view>
					</view>
					<view class="u-skeleton-fillet u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
						<view class="u-body-item-title u-line-2"></view>
					</view>
					<view class=" u-skeleton-fillet u-body-item u-flex u-row-between u-p-b-0">
						<view class="u-body-item-title u-line-2"></view>
					</view>
				</view>
			</u-card>
		</view>
		<view>
			<u-card v-for="(item,index) in acticeList" :key="index" :title="item.l_date" @click="nd_detail(item)">
				<view class="" slot="body">
					<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
						<view class="u-body-item-title u-line-2">单位：{{item.l_depart}}</view>
					</view>
					<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
						<view class="u-body-item-title u-line-2">职务：{{item.l_postjob}}</view>
					</view>
					<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
						<view class="u-body-item-title u-line-2">姓名：{{item.l_name}}</view>
					</view>
					<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
						<view class="u-body-item-title u-line-2">月份：{{item.l_month}}</view>
					</view>
					<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
						<view class="u-body-item-title u-line-2">详情: {{item.l_detail}}</view>
					</view>
					<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
						<view class="u-body-item-title u-line-2">地点: {{item.l_address}}</view>
					</view>
					<view class="u-body-item u-flex u-row-between u-p-b-0">
						<view class="u-body-item-title u-line-2">计分：{{item.l_all_score}}</view>
					</view>
				</view>
			</u-card>
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
					this.loadStatus = 'nomore'
					return
				}
				const result = await this.$http.get('/index/Hjob.ashx', {
					type: 'sel',
					tabid: 'KH_leader5352aa7b-6fa3-440d-802a-e77ee46701d8',
					mid: '430772ac-2418-42a3-929d-83a7989f06a4',
					job: 'demo_node_1',
					tbname: 'kh_leader',
					T: '领导考核_list_sql',
					page: this.page,
					limit: 2,
				}, {
					load: false
				})
				this.loading = false;
				// console.log(result.data.data)
				if (!result.data.data) {
					this.nomore = true;
					this.loadStatus = "nomore"
					return;
				}
				if (ispush) {
					this.acticeList.push(...result.data.data)
				} else {
					this.acticeList = result.data.data;
				}
				this.loadStatus = "loadmore";
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
		margin: 0 30rpx;
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
