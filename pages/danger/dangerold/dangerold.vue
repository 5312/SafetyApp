<template>
	<view class="content">
		<!-- 隐患 -->
		<u-navbar :is-back="false" title="" height="44">
			<view class="slot-wrap">
				<u-search placeholder="隐患查询" :disabled='true' @click='goList'></u-search>
			</view>
		</u-navbar>
		<view class="u-wrap-padding">
			<view class="u-wrap" @click="goList">
				<view class="wrap-top">
					<view>隐患管理</view>
					<u-icon name='more-dot-fill'></u-icon>
				</view>
				<!-- 统计数据 -->
				<view class="wrap-content">
					<view>{{topNum}}</view>
				</view>
			</view>
		</view>
		<view class="card">
			<u-row gutter="30">
				<u-col span="6" v-for="(item,i) in cardList" :key="i">
					<view class="item" @click="routes(item.event)">
						<view class="item-top-row">
							<u-icon :name="item.icon" :color="item.color" custom-prefix="safety-icon"></u-icon>
							<u-icon name="more-dot-fill"></u-icon>
						</view>
						<view class="item-content-row">
							<view class="h-text">{{item.number}}</view>
							<view class="detail">{{item.de}}</view>
						</view>
					</view>
				</u-col>

			</u-row>
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
				title: '',
				tabbar: "",
				topNum: 0,
				data: [],
				get: 0,
				zg: 0,
				xh: 0,
				cc: 0,
				ph: 0
			}
		},
		computed: {
			...mapState(['mesNum', 'message', 'userid','user', 'list']),
			cardList() {
				return [{
						icon: 'xiada--release_circle',
						text: '下达',
						number: this.get,
						color: '#1296db',
						de: '下达',
						bg: 'xiada--release_circle.png',
						event: '../getDOWN/getDOWN' //
					},
					{
						icon: 'zhenggai',
						text: '整改',
						color: '#f4ea2a',
						number: this.zg,
						de: '整改',
						event: '../zhengGai/zhengGai'
					}, {
						icon: 'xiaohaoshenqing_xiaohaoshenqing',
						text: '复查销号',
						color: 'red',
						number: this.xh,
						de: '销号',
						event: '../xiaohao/xiaohao'
					},
					{
						icon: 'xiaoxi3',
						text: '消息',
						number: this.mesNum,
						color: '#8a8a8a',
						de: this.message,
						event: '../messageList/messageList'
					}
				]
			}
		},
		onLoad() {
			

		},
		onShow(){
			this.getYhCount()
			this.getMessage();
		},
		methods: {
			...mapMutations(['setMessageNum']),
			routes(event) {
				this.$u.route({
					type: "to",
					url: event
				})
			},
			goList() {
				this.$u.route({
					url: './dangerList',
				})
			},
			async getMessage(){
				const mes = await this.$http.get('/index/Hjob.ashx?type=sel', {
					type: 'sel',
					userid:this.userid,
					tabid: 'xx_newc6a24ebc-c69f-4799-9cc5-2ea1db9da957',
					mid: 'f53bc1eb-762e-43bc-9a87-1a676ad577ea',
					job: 'demo_node_1',
					tbname: 'xx_news',
					T: '新消息sql',
					page: 1,
					limit: 10
				})
				this.setMessageNum(mes.data.count)
			},
			async getYhCount() {
				const users = this.$store.state.user

				const result = await this.$http.get('/index/Hjob.ashx?type=sel', {
					tabid: 'YH_liebiao79ea742c-4e27-4267-960d-0d1296ee608a',
					mid: '9c6a100d-8543-438e-9311-ce6a38e75cae',
					job: 'demo_node_1',
					tbname: 'YH',
					department_id: this.user.department_id,
					T: 'app_danger_list_num',
				})
				this.topNum = result.data.count;
				let alldata = result.data.data
				let get = alldata[0].xd; // 已下达
				let n = alldata[0].zg;
				let x = alldata[0].xh;
				this.get = get;
				this.zg = n;
				this.xh = x;
				// this.cc = n;
			}
		},

	}
</script>
<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 10rpx;

		.u-wrap-padding {
			width: 100%;
			padding: 14rpx;

			.u-wrap {
				width: 100%;
				height: 250rpx;
				border-radius: 30rpx;
				background-color: $uni-bg-color-card;
				padding: 0 20rpx;

				.wrap-top {
					color: #fff;
					display: flex;
					align-items: center;
					padding: 20rpx 0;
					justify-content: space-between;
				}

				.wrap-content {
					color: #fff;
					font-size: 80rpx;
				}
			}
		}


		.card {
			width: 100%;

			.item {
				background: #fff;
				height: 400rpx;
				border-radius: 60rpx;
				margin: 10rpx 0;
				box-shadow: -1px 4px 12px 0px #f8f8f8;
				padding: 10rpx 30rpx;
				display: flex;
				flex-wrap: nowrap;
				align-content: space-between;
				justify-content: space-between;
				align-items: stretch;
				flex-direction: column;

				&-top-row {
					padding: 20rpx 0;
					display: flex;
					align-items: center;
					justify-content: space-between;
				}

				&-content-row {
					// margin-top: 100px;
					display: flex;
					align-items: flex-start;
					justify-content: space-evenly;
					flex-direction: column;

					.h-text {
						font-size: 50rpx;
					}

					.detail {
						padding: 20rpx 0;
						color: $uni-text-color-grey;
					}
				}
			}
		}
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
