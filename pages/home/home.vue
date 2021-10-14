<template>
	<view class="content">
		<view class="u-wrap">
			<view class="home-top-bg">
				<view class="title">安全数据概况</view>
				<view class="top-card-box">
					<view class="numbox">
						<u-count-to class="uicon-bag" color="#fff" :start-val="0" separator="," :end-val="yhall">
						</u-count-to>
						<view class="gray">隐患数量</view>
					</view>
					<view class="numbox">
						<u-count-to class="uicon-bag" color="#fff" :start-val="0" separator="," :end-val="fxall">
						</u-count-to>
						<view class="gray">风险数量</view>
					</view>
					<view class="numbox">
						<u-count-to class="uicon-bag" color="#fff" :start-val="0" separator="," :end-val="fkall">
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
			<u-card margin="20rpx" title="风险分析">
				<view class="charts-box" slot="body">
					<qiun-data-charts :errorShow="true" :errorReload="false" :opts="opts" :loadingType="2" type="column"
						:chartData="chartData" />
				</view>
				<view class="charts-box" slot="body">
					<qiun-data-charts :errorShow="true" :errorReload="false" :opts="opts2" :loadingType="1" type="ring"
						:chartData="perdata" />
				</view>
			</u-card>
			<u-card margin="20rpx" title="考核分析">
				<view class="charts-box" slot="body">
					<qiun-data-charts :errorShow="true" :errorReload="false" :opts="opts3" :loadingType="1"
						type="column" :localdata="khDataBase" />
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
						<u-cell-item @click="meslist" v-for="x,y in message" :key="y" :title="x.xx_title"
							:label="x.createdate" :arrow="false" :border-bottom="false" :border-top="false">
							<u-icon slot="right-icon" size="32" name="more-dot-fill"></u-icon>
						</u-cell-item>
					</u-cell-group>
				</view>
			</u-card>
			<u-gap height="40" bg-color=""></u-gap>
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
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				yhall: 0,
				fkall: 0,
				fxall: 0,
				title: '',
				lineDataBase: [],
				perDataBase: [],
				khDataBase: [],
				opts: {
					"padding": [
						0,
						0,
						0,
						0
					],
					"xAxis": {
						"disabled": true,
						"disableGrid": true
					},
					"yAxis": {
						"gridType": "dash",
						"splitNumber": 4
					},
					"legend": {
						"show": true,
						"position": "bottom",
						"lineHeight": 20,
					},
				},
				opts2: {
					"padding": [
						0,
						0,
						0,
						0
					],
					"title": {
						"name": "",
						"fontSize": 15,
						"color": "#666666"
					},
					"subtitle": {
						"name": "",
						"fontSize": 25,
						"color": "#7cb5ec"
					},
					"legend": {
						"show": true,
						"position": "bottom",
						"lineHeight": 20,
					},
					"extra": {
						"ring": {
							"border": false,

						},
					},
				},
				opts3: {

					"xAxis": {
						"disableGrid": true
					},
					"yAxis": {
						"gridType": "dash",
						"splitNumber": 3
					},
					"legend": {
						"show": false,
						"position": "bottom",
						"lineHeight": 20,
					},
					"tooltip": {

					}
				},
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
				],

			}
		},
		computed: {
			...mapState(['user', 'mesNum', 'userid']),
			chartData() {
				return {
					"categories": [
						"1",
						"2",
						"3",
						"4",
						"5",
						"6",
						"7",
						"8",
						"9",
						"10",
						"11",
						"12",
					],
					"series": [{
						"name": "风险",
						"data": this.lineDataBase
					}]
				}
			},
			perdata() {
				return {
					"series": [{
						"data": this.perDataBase
					}]
				}
			},
			 
		},
		onLoad() {
			this.index();
			this.getYhCount();
			// 消息
			this.getMessage()
			uni.setTabBarBadge({
				index: 1,
				text: String(this.mesNum),
			})
		
		},
		onUnload(){
			
		},
		onShow(){
			// #ifdef APP-PLUS
			plus.navigator.setFullscreen(true);
			// #endif
		},
		onHide() {
			// #ifdef APP-PLUS
			plus.navigator.setFullscreen(false);
			// #endif
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
					T: '每月数据',
					function_perms: this.user.function_perms
				})
				if (index.data.data) {
					this.lineDataBase = index.data.data[0].replace.split(',')

				}

				const kh_statistics = await this.$http.get('/index/Hjob.ashx?type=sel', {
					T: 'app_kh_statistics',
					function_perms: this.user.function_perms
				})
				if (kh_statistics.data.data) {
					this.khDataBase = kh_statistics.data.data
					// console.log(kh_statistics.data.data)

				}
			},
			async getYhCount() {
				// 数量
				const users = this.$store.state.user

				const result = await this.$http.get('/index/Hjob.ashx?type=sel', {
					tabid: 'YH_liebiao79ea742c-4e27-4267-960d-0d1296ee608a',
					mid: '9c6a100d-8543-438e-9311-ce6a38e75cae',
					job: 'demo_node_1',
					tbname: 'YH',
					department_id: this.user.department_id,
					function_perms:this.user.function_perms,
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
				this.setMessageNum(mes.data.count)
			},
			routes(event) {
				this.$u.route({
					type: "to",
					url: event
				})
			},
			meslist() {
				this.$u.route({
					type: "to",
					url: '../message/message'
				})
			}
		},

	}
</script>

<style lang="scss" scoped>
	/* 请根据需求修改图表容器尺寸，如果父容器没有高度图表则会显示异常 */
	.charts-box {
		width: 100%;
		height: 400rpx;
	}

	page {
		height: 100%;
		.content {
			padding-bottom: 20rpx;
			height: 100%;
			.u-wrap {
				.scroll-Y {
					margin-top: 20rpx;
					height: 800rpx;
					overflow: hidden;
				}

				.home-top-bg {
					margin-top: 80rpx;
					width: 100%;
					z-index: 2;
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

						.uicon-bag {

							font-size: 50rpx;
						}

						.gray {
							color: #90B6FF;
						}
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
				.mesbody{
					// margin-bottom: 80rpx;
				}

			}
		}
	}
</style>
