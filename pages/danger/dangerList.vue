<template>
	<view>
		<!-- 隐患 -->
		<u-navbar :is-back="true" title="" height="44">
			<view class="slot-wrap">
				<u-search v-model="keyword" placeholder="隐患查询" @search="search" @custom="search"></u-search>
			</view>
		</u-navbar>
		<view class="wrap">
			<view class="u-tabs-box">
				<u-tabs-swiper activeColor="#1e76ef" inactive-color="#1e76ef" ref="tabs" :list="list" :current="current"
					@change="change" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
			</view>
			<view class="u-tabs-box-shadow"></view>	
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition"
				@animationfinish="animationfinish">
				<swiper-item class="swiper-item" v-for="(x,y) in tabar" :key='y'>
					<scroll-view v-if="orderList[x].length!= 0" scroll-y style="height: 100%;width: 100%;"
						@scrolltolower="reachBottom">
						<!-- <view class="page-box"> -->
							<view class="order" v-for="(res, index) in orderList[x]" :key="res.id">
								<view class="top">
									<view class="left">
										<u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
										<view class="store">{{ res.responsibledepartme }}</view>
									</view>
									<view class="right" :style="{color:stateColor(res.yh_state)}">
										{{ state(res.yh_state) }}
									</view>
								</view>
								<view class="item">
									<view class="content">
										<view class="title u-line-2">{{ res.yh_content }}</view>
										<view class="type">{{ res.oldofclass }}</view>
										<view class="type" :style="{color:res.yh_level.split('~')[2]}">
											{{ res.yh_level.split('~')[0] }}
										</view>
										<view class="delivery-time">检查时间： {{ res.inspectiondate }}</view>
									</view>
									<view class="right">
										<view class="price" style="white-space: nowrap;">
											<u-icon name="account-fill"></u-icon>{{ res.inspeople.split('~')[0] }}
											<text class="decimal">{{ }}</text>
										</view>
									</view>
								</view>
								<view class="total">
									资金:
									<text class="total-price">
										￥{{ res.yh_fine==''?0:res.yh_fine }}
									</text>
								</view>
								<view class="bottom">
									<view class="more">
										<u-icon name="more-dot-fill" color="rgb(203,203,203)"></u-icon>
									</view>
									<view class="logistics btn" @click="showDetail">查看详情</view>
								</view>
							</view>
							<u-loadmore :status="loadStatus[x]" :load-text="loadText" bgColor="#f2f2f2"></u-loadmore>
						<!-- </view> -->
					</scroll-view>
					<scroll-view v-else scroll-y style="height: 100%;width: 100%;">
						<view class="page-box">
							<view>
								<view class="centre">
									<image src="https://cdn.uviewui.com/uview/template/taobao-order.png" mode="">
									</image>
									<view class="explain">
										暂无数据
										<view class="tips">
										</view>
									</view>
									<view class="btn">查看其他</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>


			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabar: [0, 1, 2],
				reqData: [], // 每次请求后的数据
				dataList: [],
				keyword: '', // 搜索
				list: [

					{
						name: '待下达'
					},
					{
						name: '待整改'
					},
					{
						name: '待销号',
						// count: 12
					}
				],

				nomore: null,
				current: 0,
				swiperCurrent: 0,
				tabsHeight: 0,
				dx: 0,
				page: 1,

				loadStatus: ['loadmore', 'loadmore', 'loadmore'],
				loadText: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '实在没有了'
				}
			};
		},
		onLoad() {
			this.getOrderList(0);

		},
		computed: {
			orderList() {
				let twoArray = [
					[],
					[],
					[],
				]
				twoArray.splice(this.swiperCurrent, 1, this.reqData)
				return twoArray
			},
			state() {
				const stateText = {
					0: '已录入',
					1: '已下达',
					2: "复查不通过",
					3: '分发',
					4: '整改',
					5: '待验收',
					6: '签字',
					7: '已整改',
					8: '已销号',
					9: '合格',
				}
				return val => {
					return stateText[val]
				}
			},
			stateColor() {
				const stateColor = {
					0: '#007aff',
					1: '',
					7: '#f0ad4e',
					3: '',
				}
				return val => {
					return stateColor[val]
				}
			}
		},
		methods: {
			reachBottom() { // 下拉懒加载
				this.loadStatus.splice(this.current, 1, "loading")
				this.page += 1;
				this.getOrderList(this.current, true);
			},
			// 查看详情
			showDetail() {},
			search() {
				this.nomore = false;
				this.getOrderList(this.current, false,true)
			},
			// 页面数据
			async getOrderList(idx, ispush = true,ser=false) {
				const users = this.$store.state.user
				let level = 'A';
				let bind = '';
				if (users) {
					level = users.level
					bind = users.department_id;
				}
				let state = {
					0: 0,
					1: 1,
					2: 7
				}
				if (this.nomore) {
					this.loadStatus.splice(this.current, 1, "nomore")
					return
				}
				const result_yh = await this.$http.post('/index/Hjob.ashx?type=sel', {
					tabid: 'YH_liebiao79ea742c-4e27-4267-960d-0d1296ee608a',
					mid: '9c6a100d-8543-438e-9311-ce6a38e75cae',
					job: 'demo_node_1',
					tbname: 'YH',
					bind: bind, // 本部门 查看条件
					level: level,
					T: "隐患列表_无cookie_sql",
					department_id: users.department_id,
					state: state[idx], // 条件
					page: this.page,
					limit: 10,
					keyword: this.keyword,
				})
				if(ser){
					if(result_yh.data.data){
						this.reqData =result_yh.data.data
					}else{
						this.reqData =[]
					}
				}
				// console.log(result_yh.data.data)
				if (!result_yh.data.data) {
					// 没有下一页时
					this.nomore = true;
					this.loadStatus.splice(this.current, 1, "nomore")
					return
				};
				let array = this.reqData;
				for (let i = 0; i < result_yh.data.data.length; i++) {
					const data1 = result_yh.data.data[i]
					if (ispush) {
						array.push(data1)
					} else {
						array = result_yh.data.data
					}
				}
				this.reqData = array
				this.loadStatus.splice(this.current, 1, "loadmore")
			},

			// tab栏切换
			change(index) {
				this.page = 1; // 页数重置
				this.nomore = false; // 下一页
				this.getOrderList(index, false);
				// 清空req
				this.reqData = [];
				// 请求后，跳转
				this.swiperCurrent = index;
			},
			// // swiper-item左右移动，通知tabs的滑块跟随移动
			// transition(e) {
			// 	let dx = e.detail.dx;
			// 	this.$refs.uTabs.setDx(dx);
			// },
			// // 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// // swiper滑动结束，分别设置tabs和swiper的状态
			// animationfinish(e) {
			// 	let current = e.detail.current;
			// 	this.$refs.uTabs.setFinishCurrent(current);
			// 	this.swiperCurrent = current;
			// 	this.current = current;
			// },
			transition({
				detail: {
					dx
				}
			}) {
				this.$refs.tabs.setDx(dx);
			},
			animationfinish({
				detail: {
					current
				}
			}) {
				this.$refs.tabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			}
		}
	};
</script>

<style>
	/* #ifndef H5 */
	page {
		height: 100%;
		background-color: #f2f2f2;
	}

	/* #endif */
</style>

<style lang="scss" scoped>
	.u-tabs-box {
		position: fixed;
		width: 100%;
		z-index: 99;
	}

	.u-tabs-box-shadow {
		height: 80rpx;
	}

	.slot-wrap {
		display: flex;
		align-items: center;
		/* 如果您想让slot内容占满整个导航栏的宽度 */
		flex: 1;
		/* 如果您想让slot内容与导航栏左右有空隙 */
		padding: 0rpx 30rpx;
	}

	.order {
		width: 710rpx;
		background-color: #ffffff;
		margin: 20rpx auto;
		border-radius: 20rpx;
		box-sizing: border-box;
		padding: 20rpx;
		font-size: 28rpx;

		.top {
			display: flex;
			justify-content: space-between;

			.left {
				display: flex;
				align-items: center;

				.store {
					margin: 0 10rpx;
					font-size: 32rpx;
					font-weight: bold;
				}
			}

			.right {
				// color:$uni-color-primary; 
			}
		}

		.item {
			display: flex;
			margin: 20rpx 0 0;

			.left {
				margin-right: 20rpx;

				image {
					width: 200rpx;
					height: 200rpx;
					border-radius: 10rpx;
				}
			}

			.content {
				.title {
					font-size: 28rpx;
					line-height: 50rpx;
				}

				.type {
					margin: 10rpx 0;
					font-size: 24rpx;
					color: $u-tips-color;
				}

				.delivery-time {
					color: $uni-text-color-grey; //#e5d001;
					font-size: 24rpx;
				}
			}

			.right {
				margin-left: 10rpx;
				padding-top: 20rpx;
				text-align: right;

				.decimal {
					font-size: 24rpx;
					margin-top: 4rpx;
				}

				.number {
					color: $u-tips-color;
					font-size: 24rpx;
				}
			}
		}

		.total {
			margin-top: 20rpx;
			text-align: right;
			font-size: 24rpx;

			.total-price {
				font-size: 32rpx;
			}
		}

		.bottom {
			display: flex;
			margin-top: 40rpx;
			padding: 0 10rpx;
			justify-content: space-between;
			align-items: center;

			.btn {
				line-height: 52rpx;
				width: 160rpx;
				border-radius: 26rpx;
				border: 2rpx solid $u-border-color;
				font-size: 26rpx;
				text-align: center;
				color: $u-type-info-dark;
			}

			.evaluate {
				color: $u-type-warning-dark;
				border-color: $u-type-warning-dark;
			}
		}
	}

	.centre {
		text-align: center;
		margin: 200rpx auto;
		font-size: 32rpx;

		image {
			width: 164rpx;
			height: 164rpx;
			border-radius: 50%;
			margin-bottom: 20rpx;
		}

		.tips {
			font-size: 24rpx;
			color: #999999;
			margin-top: 20rpx;
		}

		.btn {
			margin: 80rpx auto;
			width: 200rpx;
			border-radius: 32rpx;
			line-height: 64rpx;
			color: #ffffff;
			font-size: 26rpx;
			background: linear-gradient(270deg, rgba(249, 116, 90, 1) 0%, rgba(255, 158, 1, 1) 100%);
		}
	}

	.wrap {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top) - 44px);
		width: 100%;
	}


	.swiper-box {
		flex: 1;
		padding-bottom: 20rpx;
	}

	.swiper-item {
		padding-bottom: 20rpx;
	}
</style>
