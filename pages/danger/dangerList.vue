<template>
	<view>
		<!-- 隐患 -->
		<u-navbar :is-back="true" title="" height="44">
			<view class="slot-wrap">
				<u-search placeholder="隐患查询"></u-search>
			</view>
		</u-navbar>
		<view class="wrap">
			<view class="u-tabs-box">
				<u-tabs-swiper activeColor="#f29100" ref="tabs" :list="list" :current="current" @change="change"
					:is-scroll="false" swiperWidth="750"></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition"
				@animationfinish="animationfinish">
				<swiper-item class="swiper-item">
					<scroll-view v-if="orderList[0].length!= 0" scroll-y style="height: 100%;width: 100%;"
						@scrolltolower="reachBottom">
						<view class="page-box">
							<view class="order" v-for="(res, index) in orderList[0]" :key="res.id">
								<view class="top">
									<view class="left">
										<u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
										<view class="store">{{ res.responsibledepartme }}</view>
										<!-- <u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon> -->
									</view>
									<view class="right">{{ state(res.yh_state) }}</view>
								</view>
								<!-- <view class="item" v-for="(item, index) in res.goodsList" :key="index"> -->
								<view class="item">
									<view class="left">
										<image
											src='http://59.110.63.135:9010/index/layuiadmin/modules/fileChoose/img/doc.png'
											mode="aspectFill"></image>
									</view>
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
										<!-- <view class="number">x{{ 5 }}</view> -->
									</view>
								</view>
								<view class="total">
									单位罚款：{{ res.fine }}￥&nbsp; 个人罚款
									<text class="total-price">
										￥{{ res.personalfine }}
										<!-- <text class="decimal">{{ priceDecimal(totalPrice(res.goodsList)) }}</text> -->
									</text>
								</view>
								<view class="bottom">
									<view class="more">
										<u-icon name="more-dot-fill" color="rgb(203,203,203)"></u-icon>
									</view>
									<view class="logistics btn">查看详情</view>
									<!-- <view class="exchange btn">卖了换钱</view> -->
									<!-- <view class="evaluate btn">评价</view> -->
								</view>
							</view>
							<u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore>
						</view>
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
											<!-- 可以去看看有那些想买的 -->
										</view>
									</view>
									<view class="btn">查看其他</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view v-if="orderList[1].length!=0" scroll-y style="height: 100%;width: 100%;"
						@scrolltolower="reachBottom">
						<view class="page-box">
							<view class="order" v-for="(res, index) in orderList[1]" :key="res.id">
								<view class="top">
									<view class="left">
										<u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
										<view class="store">{{ res.responsibledepartme }}</view>
										<!-- <u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon> -->
									</view>
									<view class="right">{{ state(res.yh_state) }}</view>
								</view>
								<!-- <view class="item" v-for="(item, index) in res.goodsList" :key="index"> -->
								<view class="item">
									<view class="left">
										<image
											src='http://59.110.63.135:9010/index/layuiadmin/modules/fileChoose/img/doc.png'
											mode="aspectFill"></image>
									</view>
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
										<!-- <view class="number">x{{ 5 }}</view> -->
									</view>
								</view>
								<view class="total">
									单位罚款：{{ res.fine }}￥&nbsp; 个人罚款
									<text class="total-price">
										￥{{ res.personalfine }}
										<!-- <text class="decimal">{{ priceDecimal(totalPrice(res.goodsList)) }}</text> -->
									</text>
								</view>
								<view class="bottom">
									<view class="more">
										<u-icon name="more-dot-fill" color="rgb(203,203,203)"></u-icon>
									</view>
									<view class="logistics btn">查看详情</view>
									<!-- <view class="exchange btn">卖了换钱</view> -->
									<!-- <view class="evaluate btn">评价</view> -->
								</view>
							</view>
							<u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore>
						</view>
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
											<!-- 可以去看看有那些想买的 -->
										</view>
									</view>
									<view class="btn">查看其他</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view v-if="orderList[2].length!=0" scroll-y style="height: 100%;width: 100%;"
						@scrolltolower="reachBottom">
						<view class="page-box">
							<view class="order" v-for="(res, index) in orderList[2]" :key="res.id">
								<view class="top">
									<view class="left">
										<u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
										<view class="store">{{ res.responsibledepartme }}</view>
										<!-- <u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon> -->
									</view>
									<view class="right">{{ state(res.yh_state) }}</view>
								</view>
								<!-- <view class="item" v-for="(item, index) in res.goodsList" :key="index"> -->
								<view class="item">
									<view class="left">
										<image
											src='http://59.110.63.135:9010/index/layuiadmin/modules/fileChoose/img/doc.png'
											mode="aspectFill"></image>
									</view>
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
										<!-- <view class="number">x{{ 5 }}</view> -->
									</view>
								</view>
								<view class="total">
									单位罚款：{{ res.fine }}￥&nbsp; 个人罚款
									<text class="total-price">
										￥{{ res.personalfine }}
										<!-- <text class="decimal">{{ priceDecimal(totalPrice(res.goodsList)) }}</text> -->
									</text>
								</view>
								<view class="bottom">
									<view class="more">
										<u-icon name="more-dot-fill" color="rgb(203,203,203)"></u-icon>
									</view>
									<view class="logistics btn">查看详情</view>
									<!-- <view class="exchange btn">卖了换钱</view> -->
									<!-- <view class="evaluate btn">评价</view> -->
								</view>
							</view>
							<u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore>
						</view>
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
											<!-- 可以去看看有那些想买的 -->
										</view>
									</view>
									<view class="btn">查看其他</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view v-if="orderList[3].length!=0" scroll-y style="height: 100%;width: 100%;"
						@scrolltolower="reachBottom">
						<view class="page-box">
							<view class="order" v-for="(res, index) in orderList[3]" :key="res.id">
								<view class="top">
									<view class="left">
										<u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
										<view class="store">{{ res.responsibledepartme }}</view>
										<!-- <u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon> -->
									</view>
									<view class="right">{{ state(res.yh_state) }}</view>
								</view>
								<!-- <view class="item" v-for="(item, index) in res.goodsList" :key="index"> -->
								<view class="item">
									<view class="left">
										<image
											src='http://59.110.63.135:9010/index/layuiadmin/modules/fileChoose/img/doc.png'
											mode="aspectFill"></image>
									</view>
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
										<!-- <view class="number">x{{ 5 }}</view> -->
									</view>
								</view>
								<view class="total">
									单位罚款：{{ res.fine }}￥&nbsp; 个人罚款
									<text class="total-price">
										￥{{ res.personalfine }}
										<!-- <text class="decimal">{{ priceDecimal(totalPrice(res.goodsList)) }}</text> -->
									</text>
								</view>
								<view class="bottom">
									<view class="more">
										<u-icon name="more-dot-fill" color="rgb(203,203,203)"></u-icon>
									</view>
									<view class="logistics btn">查看详情</view>
									<!-- <view class="exchange btn">卖了换钱</view> -->
									<!-- <view class="evaluate btn">评价</view> -->
								</view>
							</view>
							<u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore>
						</view>
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
											<!-- 可以去看看有那些想买的 -->
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
				orderList: [
					[],
					[],
					[],
					[]
				],
				dataList: [],
				list: [{
						name: '新排查'
					}, {
						name: '已下达'
					},
					{
						name: '已整改'
					},
					{
						name: '已销号',
						// count: 12
					}
				],
				current: 0,
				swiperCurrent: 0,
				tabsHeight: 0,
				dx: 0,
				loadStatus: ['loadmore', 'loadmore', 'loadmore', 'loadmore'],
			};
		},
		onLoad() {
			this.getOrderList(0);
			this.getOrderList(1);
			this.getOrderList(2);
			this.getOrderList(3);
		},
		computed: {
			state() {
				const stateText = {
					0: '新排查',
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
			// 价格小数
			priceDecimal() {
				return val => {
					// if (val !== parseInt(val)) return val.slice(-2);
					// else return '00';
				};
			},
			// 价格整数
			priceInt() {
				return val => {
					// if (val !== parseInt(val)) return val.split('.')[0];
					// else return val;
				};
			}
		},
		methods: {
			reachBottom() {// 下拉懒加载
				// 此tab为空数据
				// if (this.current != 2) {
				// 	this.loadStatus.splice(this.current, 1, "loading")
				// 	setTimeout(() => {
				// 		this.getOrderList(this.current);
				// 	}, 1200);
				// }
			},
			// 页面数据
			async getOrderList(idx) {
				const result_yh = await this.$http.get('?type=sel', {
					tabid: "YH_liebiao5d9ca720-e8d5-42b1-a4c7-2505c224f7ca",
					mid: " 9c6a100d-8543-438e-9311-ce6a38e75cae",
					job: "demo_node_1",
					tbname: "YH",
					bind: "761c99d3-06ed-42df-81c6-79dbe41683ef",
					level: "A",
					T: "隐患列表sql",
					page: 1,
					limit: 10
				})
				for (let i = 0; i < result_yh.data.data.length; i++) {
					const data1 = result_yh.data.data[i]
					this.orderList[idx].push(data1);
				}
				this.loadStatus.splice(this.current, 1, "loadmore")
			},

			// tab栏切换
			change(index) {
				this.swiperCurrent = index;
				// this.getOrderList(index);
			},
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
				color: $u-type-warning-dark;
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
					color: #e5d001;
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
		height: calc(100vh - var(--window-top));
		width: 100%;
	}

	.swiper-box {
		flex: 1;
	}

	.swiper-item {
		height: 100%;
	}
</style>
