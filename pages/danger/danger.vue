<template>
	<view>
		<u-navbar :is-back="false" title="" height="44">
			<view class="slot-wrap">
				<view class="u-tabs-box">
					<u-tabs-swiper activeColor="#1e76ef" inactive-color="#1e76ef" ref="tabs" :list="list"
						:current="current" @change="change" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
				</view>
			</view>
		</u-navbar>
		<view class="u-wrap">
			<view class="u-tabs-box-shadow"></view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition"
				@animationfinish="animationfinish">
				<swiper-item class="swiper-item">
					<scroll-view class="scroll-view" scroll-y style="height:100%;width: 100%;">
						<view class="s-wrap ">
							<view class="home-top-bg">
								<view class="title">安全数据概况</view>
								<view class="top-card-box">
									<view class="numbox">
										<u-count-to class="uicon-bag" color="#fff" :start-val="0" separator=","
											:end-val="yhall">
										</u-count-to>
										<view class="gray">隐患数量</view>
									</view>
									<view class="numbox">
										<u-count-to class="uicon-bag" color="#fff" :start-val="0" separator=","
											:end-val="fxall">
										</u-count-to>
										<view class="gray">风险数量</view>
									</view>
									<view class="numbox">
										<u-count-to class="uicon-bag" color="#fff" :start-val="0" separator=","
											:end-val="fkall">
										</u-count-to>
										<view class="gray">罚款数量</view>
									</view>
								</view>
							</view>
							<u-card margin="20rpx" title="隐患概览">
								<view class="u-flex" slot="body">
									<view v-for="x,y in yh_glist" :key="y" class="itembox" @click="routes(x.event)">
										<u-image width="100%" height="100%" :src="x.url" mode=""></u-image>
										<view class="textn">
											<view>{{x.text}}</view>
											<view class="gury">
												<text>{{x.num}}</text>
												<text>条</text>
											</view>
										</view>
									</view>
								</view>
							</u-card>

							<u-card margin="20rpx">
								<view class="u-flex header" slot="head">
									<view>消息通知</view>
									<view @click="meslist">
										<text>查看更多</text>
										<u-icon name="arrow-right"></u-icon>
									</view>
								</view>
								<view class="mesbody" slot="body">
									<u-cell-group :border="false">
										<u-cell-item v-for="x,y in message" :key="y" :title="x.xx_title"
											:label="x.createdate" :arrow="false" @click="meslist">
											<u-icon slot="right-icon" size="32" name="more-dot-fill"></u-icon>
										</u-cell-item>
									</u-cell-group>
								</view>
							</u-card>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<u-subsection :list="lists" :current="currents" @change="changefx"></u-subsection>
					<view v-for="(x,y) in tabar" :key='y'>
						<view v-if="orderList[x].length!= 0">
							<view class="order" v-for="(res, index) in orderList[x]" :key="res.id"
								@click="judgment_detail(res)">
								<view class="top">
									<view class="left">
										<u-icon class="licon" name="home" :size="30" color="rgb(94,94,94)"></u-icon>
										<view class="store">{{ res.zx_time  || res.yp_month}}</view>
									</view>

								</view>
								<view class="item">
									<view class="content">
										<view class="title u-line-2">{{ res.zx_address_list||res.yp_address }}</view>
										<view class="type">{{ res.zx_resp_bumenid || res.yp_dept_name}}</view>

										<view class="delivery-time">检查时间： {{ res.zx_time || res.yp_month }}</view>
									</view>

								</view>
								<view class="bottom" v-if="res.zx_level">
									<view class="more">
										<u-icon name="more-dot-fill" color="rgb(203,203,203)"></u-icon>
									</view>
									<view class="logistics btn">{{res.zx_level }}</view>
								</view>
							</view>
							<u-loadmore :status="loadStatus[x]" :load-text="loadText" bgColor="#f2f2f2"></u-loadmore>
							<!--  -->
						</view>
						<!--  -->
					</view>
				</swiper-item>
			</swiper>

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
				current: 0,
				swiperCurrent: 0,
				list: [{
						name: '隐患'
					},
					{
						name: '风险'
					}
				],
				// 风险
				currents: 0,
				tabar: [0, 1],
				reqData: [],
				dataList: [],
				lists: [{
						name: '专项风险'
					},
					{
						name: '风险研判'
					},
				],
				nomore: null,
				dx: 0,
				page: 1,
				loadStatus: ['loadmore', 'loadmore'],
				loadText: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '实在没有了'
				},
				// 隐患
				yhall: 0,
				fkall: 0,
				fxall: 0,
				title: '',
				message: [],
				yh_glist: [{
						url: '../../static/bg/index_YhBg1.png',
						text: '隐患下达',
						num: 0,
						event: '../getDOWN/getDOWN' //
					},
					{
						url: '/static/bg/index_YhBg2.png',
						text: '隐患整改',
						num: 0,
						event: '../zhengGai/zhengGai'
					},
					{
						url: '/static/bg/index_YhBg3.png',
						text: '隐患销号',
						num: 0,
						event: '../xiaohao/xiaohao'
					},
				]
			}
		},
		computed: {
			...mapState(['user', 'mesNum', 'userid']),
			orderList() {
				let twoArray = [
					[],
					[],
				]
				twoArray.splice(this.currents, 1, this.reqData)
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
		onLoad() {
			this.getYhCount();
			// 消息
			this.getMessage()
			this.getOrderList(0);

			uni.setTabBarBadge({
				index: 1,
				text: String(this.mesNum),
			})
		},
		onPullDownRefresh() {
			this.getYhCount().then(res => {
				this.getOrderList(this.currents, false).then(res => {
					uni.stopPullDownRefresh()
				}).catch(() => {
					uni.stopPullDownRefresh()
				})
			}).catch(() => {
				uni.stopPullDownRefresh()
			})

		},
		onReachBottom() {
			this.loadStatus.splice(this.currents, 1, "loading")
			this.page += 1;
			this.getOrderList(this.currents, true);
		},
		methods: {
			...mapMutations(['setMessageNum']),
			async index() {
				this.$http.get('/index/Hjob.ashx?type=sel', {
					T: '专项风险类型sql',
					function_perms: this.user.function_perms
				}).then(res => {
					if (res.data.data) {
						this.perDataBase = res.data.data
					}
				})
				const index = await this.$http.get('/index/Hjob.ashx?type=sel', {
					T: 'app_home_chart',
					function_perms: this.user.function_perms
				})
				if (index.data.data) {
					this.lineDataBase = index.data.data[0].databases.split(',')
				}
			},
			async getYhCount() {
				// 数量
				const result = await this.$http.get('/index/Hjob.ashx?type=sel', {
					tabid: 'YH_liebiao79ea742c-4e27-4267-960d-0d1296ee608a',
					mid: '9c6a100d-8543-438e-9311-ce6a38e75cae',
					job: 'demo_node_1',
					tbname: 'YH',
					department_id: this.user.department_id,
					function_perms: this.user.function_perms,
					T: 'app_danger_list_num',
				})
				let alldata = result.data.data
				this.yhall = result.data.count
				this.fxall = alldata[0].fx
				this.fkall = alldata[0].fk;
				this.yh_glist[0].num = alldata[0].xd
				this.yh_glist[1].num = alldata[0].zg
				this.yh_glist[2].num = alldata[0].xh
			},
			async getMessage() {
				// 消息
				const mes = await this.$http.get('/index/Hjob.ashx?type=sel', {
					type: 'sel',
					userid: this.userid,
					tabid: 'xx_newc6a24ebc-c69f-4799-9cc5-2ea1db9da957',
					mid: 'f53bc1eb-762e-43bc-9a87-1a676ad577ea',
					job: 'demo_node_1',
					tbname: 'xx_news',
					T: '新消息sql',
					page: 1,
					limit: 3
				})
				this.message = mes.data.data
				this.setMessageNum(mes.data.count);
				uni.setTabBarBadge({
					index: 1,
					text: String(this.mesNum),
				})
			},
			meslist() {
				this.$u.route({
					type: "to",
					url: '../message/message'
				})
			},
			routes(event) {
				this.$u.route({
					type: "to",
					url: event
				})
			},
			// 页面数据
			async getOrderList(idx, ispush = true) {
				let a = {
					0: 'app_zx_risk_list',
					1: 'app_yp_sql'
				}
				if (this.nomore) {
					this.loadStatus.splice(this.currents, 1, "nomore")
					return
				}
				const zxrisk = await this.$http.post('/index/Hjob.ashx?type=sel', {
					T: a[idx],
					page: this.page,
					limit: 10,
					department_id: this.user.department_id
				})
				if (!zxrisk.data.data) {
					// 没有下一页时
					this.nomore = true;
					this.loadStatus.splice(this.currents, 1, "nomore")
					return
				};
				let array = this.reqData;
				for (let i = 0; i < zxrisk.data.data.length; i++) {
					const data1 = zxrisk.data.data[i]
					if (ispush) {
						array.push(data1)
					} else {
						array = zxrisk.data.data
					}
				}
				this.reqData = array
				this.loadStatus.splice(this.currents, 1, "loadmore")
			},
			judgment_detail(item) {
				if (item.zx_address_list) {
					this.$u.route({
						url: '../risk/nd_detail/nd_detail',
						params: {
							ndid: item.ids,
						}
					})
				} else {
					this.$u.route({
						url: '../risk/risk_judgment/risk_judgment_detail/risk_judgment_detail',
						params: {
							hd_id: item.ids
						}
					})


				}

			},
			// tab栏切换
			change(index) {
				// 请求后，跳转
				this.swiperCurrent = index;
			},
			changefx(index) {
				this.page = 1; // 页数重置
				this.nomore = false; // 下一页
				this.getOrderList(index, false);
				// // 清空req
				this.reqData = [];
				this.currents = index;
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
		},

	}
</script>

<style scoped lang="scss">
	.slot-wrap {
		display: flex;
		align-items: center;
		/* 如果您想让slot内容占满整个导航栏的宽度 */
		flex: 1;
		/* 如果您想让slot内容与导航栏左右有空隙 */
		padding: 0 30rpx;

		.u-tabs-box {
			margin: auto;
		}
	}

	.swiper-box {
		height: 1300rpx;
		overflow: hidden;
	}

	.swiper-item {
		touch-action: none;

		.s-wrap {

			.home-top-bg {
				margin-top: 20rpx;
				height: 300rpx;
				background: url('../../static/bg/index_TopBg.png') 100% 100% /100% 100% no-repeat;
			}

			.title {
				text-align: center;
				font-size: 36rpx;
				line-height: 70rpx;
				padding: 10rpx;
				height: 90rpx;
			}

			.top-card-box {
				display: flex;
				justify-content: space-around;
				align-items: center;
				padding: 20rpx;
				text-align: center;
				flex-direction: row;
				flex-wrap: nowrap;
				height: calc(100% - 90rpx);

				.numbox {
					color: #fff;
				}
			}

			.u-flex {
				height: 290rpx;
				flex-direction: row;
				align-items: center;
				flex-wrap: nowrap;
				align-content: center;
				justify-content: space-between;

				.itembox {
					height: 100%;
					width: 29%;
					background-size: 100% 100%;
					background-position: 100% 100%;
					position: relative;

					.textn {
						position: absolute;
						bottom: 30rpx;
						color: #fff;
						text-align: center;
						width: 100%;
						margin: auto;

						.gury {
							color: #90B6FF;
						}
					}
				}
			}

			.header {
				height: 40rpx;
			}

			.mesbody {
				// height:200rpx;
			}
		}

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

				.licon {
					display: inline-block;
				}

				.store {
					display: inline-block;
					margin: 0 10rpx;
					font-size: 32rpx;
					font-weight: bold;
					width: 80%;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
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
