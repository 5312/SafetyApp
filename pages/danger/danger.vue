<template>
	<view class="content">
		<view class="u-wrap">
			<view class="home-top-bg">
				<view class="title">安全数据概况</view>
				<view class="top-card-box">
					<view class="numbox">
						<view>{{yhall}}</view>
						<view>隐患数量</view>
					</view>
					<view class="numbox">
						<view>{{fxall}}</view>
						<view>风险数量</view>
					</view>
					<view class="numbox">
						<view>{{fkall}}</view>
						<view>罚款数量</view>
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
					<view>通知公告</view>
					<view  @click="meslist">
						<text>查看更多</text>
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
				<view class="mesbody" slot="body">
					<u-cell-group :border="false">
						<u-cell-item
						  v-for="x,y in message"
						  :key="y"
						  :title="x.xx_title" 
						  :label="x.createdate" 
						  :arrow="false"
						  @click="meslist">
						  <u-icon slot="right-icon" size="32" name="more-dot-fill"></u-icon>
						  </u-cell-item>
					</u-cell-group>
				</view>
			</u-card>
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
				yhall: 0,
				fkall: 0,
				fxall: 0,
				title: '',
				message:[],
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
			...mapState(['user', 'mesNum','userid']),
		},
		onLoad() {
			this.getYhCount();
			// 消息
			this.getMessage()
			uni.setTabBarBadge({
				index: 1,
				text: String(this.mesNum),
			})
		},
		methods: {
			...mapMutations(['setMessageNum']),
			async index() {
				this.$http.get('/index/Hjob.ashx?type=sel', {
					T: '专项风险类型sql',
					function_perms: this.user.function_perms
				}).then(res =>{
					if(res.data.data){
						this.perDataBase = res.data.data
						console.log(this.perDataBase)
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
				const users = this.$store.state.user

				const result = await this.$http.get('/index/Hjob.ashx?type=sel', {
					tabid: 'YH_liebiao79ea742c-4e27-4267-960d-0d1296ee608a',
					mid: '9c6a100d-8543-438e-9311-ce6a38e75cae',
					job: 'demo_node_1',
					tbname: 'YH',
					department_id: this.user.department_id,
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
			async getMessage(){
				// 消息
				const mes = await this.$http.get('/index/Hjob.ashx?type=sel', {
					type: 'sel',
					userid:this.userid,
					tabid: 'xx_newc6a24ebc-c69f-4799-9cc5-2ea1db9da957',
					mid: 'f53bc1eb-762e-43bc-9a87-1a676ad577ea',
					job: 'demo_node_1',
					tbname: 'xx_news',
					T: '新消息sql',
					page: 1,
					limit:3
				})
				this.message = mes.data.data
				this.setMessageNum(mes.data.count)
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
		},

	}
</script>

<style lang="scss" scoped>
	/* 请根据需求修改图表容器尺寸，如果父容器没有高度图表则会显示异常 */
	.charts-box {
		width: 100%;
		height: 300rpx;
	}

	.content {
		.u-wrap {

			// padding:20rpx;
			.home-top-bg {
				margin-top: 80rpx;
				height: 300rpx;
				// background: url('../../static/bg/index_TopBg.png') 50% 100% /104% 100% no-repeat;
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
				height: 250rpx;
				flex-direction: row;
				align-items: center;
				flex-wrap: nowrap;
				align-content: center;
				justify-content: space-between;

				.itembox {
					height: 100%;
					width: 25%;
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
							color: $uni-text-color-disable;
						}
					}
				}
			}
			.header{
				height:40rpx;
			}
			.mesbody{
				// height:200rpx;
			}
		}
	}
</style>
