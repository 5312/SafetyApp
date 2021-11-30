<template>
	<view>
		<!-- 隐患 -->
		<u-navbar :is-back="true" title="" height="44">
			<view class="slot-wrap">
				<u-search v-model="keyword" placeholder="罚款查询" @search="search" @custom="search"></u-search>
			</view>
		</u-navbar>
		<view class="wrap">
			<view v-for="x,y in f_list" :key="y">
				<u-card margin="20rpx" :title="'责任人:'+x.responsible">
					<view class="" slot="body">
						<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
							罚款原因：{{x.fine_desc}}
						</view>
						<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
							罚款金额：{{x.fine_sum}}
						</view>
						<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
							罚款人：{{x.fine_penalty}}
						</view>
						<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
							罚款时间：{{x.fine_time}}
						</view>
						<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
							责任人部门：{{x.responsible_person_name}}
						</view>
					</view>
					<view class="" slot="foot">
						<u-icon name="chat-fill" size="34" color="" :label="x.fine_basis"></u-icon>
					</view>
				</u-card>
			</view>
			<!-- <scroll-view v-else scroll-y style="height: 100%;width: 100%;">
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
			</scroll-view> -->
		</view>
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
				tabar: [0],
				reqData: [], // 每次请求后的数据
				dataList: [],
				keyword: '', // 搜索
				detail: false, //详情弹框
				detailData: [],
				// 罚款数据
				f_list: [],
				fpage: 1,
			};
		},
		computed: {
			...mapState(['user', 'mesNum', 'userid']),
		},
		onPullDownRefresh() {
			this.fpage += 1
			this.fine_list().then(res => {
				uni.stopPullDownRefresh()
			})
		},
		onReachBottom() {
			this.fpage += 1;
			this.fine_list(true)
		},
		onLoad() {
			// 罚款数据
			this.fine_list();
		},
		methods: {
			async fine_list(ispush = false) {
				const data = await this.$http.get('/index/Hjob.ashx?type=sel', {
					T: 'app_fine_list_sql',
					function_perms: this.user.function_perms,
					page: this.fpage,
					limit: 10,
					keyword:this.keyword
				})

				let array = []
				if (data.statusCode == '200') {
					let data1 = data.data.data;
					if (!data1) {
						return;
					}
					if (ispush) {
						array.push(data1)
					} else {
						array = data1
					}
				}
				this.f_list = array
			},
			search() {
				this.nomore = false;
				this.fpage = 1;
				this.fine_list()
			},
			// 页面数据
			async getOrderList(idx, ispush = true, ser = false) {
				const users = this.$store.state.user
				let level = 'A'
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
					// bind: bind, // 本部门 查看条件
					level: level,
					// T: "隐患列表_无cookie_sql",
					T: "app_yh_search_sql",
					department_id: users.department_id,
					function_perms: users.function_perms,
					job: users.jobnumber,
					// state: state[idx], // 条件
					// state: "", // 条件
					page: this.page,
					limit: 10,
					keyword: this.keyword,
				})
				if (ser) {
					if (result_yh.data.data) {
						this.reqData = result_yh.data.data
						console.log(this.reqData)
					} else {
						this.reqData = []
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
	* {
		list-style: none;
	}

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

	.detail {
		position: fixed;
		width: 70%;
		height: 40%;
		left: 15%;
		top: 30%;
		background-color: #fff;
		border: 1px solid #aaa;
		border-radius: 20upx;
		padding-top: 20upx;

		ul {
			padding: 0 50upx;

			li {
				margin-top: 10upx;
				font-weight: bold;

				span {
					color: #999;
					font-size: 20upx;
					font-weight: none;
				}
			}
		}
	}

	.yh {
		margin-left: 35%;
		font-weight: bold;
		font-size: 30upx;
	}

	.close {
		float: right;
		font-size: 4upx;
		margin-right: 20upx;
		margin-bottom: 20upx;
	}
</style>
