<template>
	<view class="content">
		<!-- 隐患 -->
		<u-navbar :is-back="false" title="" height="44">
			<view class="slot-wrap">
				<u-search placeholder="隐患查询"></u-search>
			</view>
		</u-navbar>
		<view class="u-wrap" @click="goList">
			<view class="wrap-top">
				<view>隐患排查</view>
				<u-icon name='more-dot-fill'></u-icon>
			</view>
			<!-- 统计数据 -->
			<view class="wrap-content">
				<view>{{topNum}}</view>
			</view>
		</view>
		<view class="card">
			<u-row gutter="30" align="center" justify='center'>
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
		<u-tabbar :before-switch="beforeSwitch" :list="tabbar" :mid-button="true"></u-tabbar>
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
			}
		}, 
		computed:{
			...mapState(['mesNum','message']),
			cardList(){
				return  [{
						icon: 'xiada--release_circle',
						text: '下达',
						number: '0',
						color: '#1296db',
						de: '下达',
						bg: 'xiada--release_circle.png',
						event: '../getDOWN/getDOWN' //
					},
					{
						icon: 'zhenggai',
						text: '整改',
						color: '#f4ea2a',
						number: '0',
						de: '整改',
						event: '../zhengGai/zhengGai'
					}, {
						icon: 'xiaohaoshenqing_xiaohaoshenqing',
						text: '复查销号',
						color: 'red',
						number: '0',
						de: '销号',
						event: '../xiaohao/xiaohao'
					}, {
						icon: 'choucha1',
						text: '抽查',
						number: '0',
						color: '#d4237a',
						de: '抽查',
						event: '../choucha/choucha'
					}, {
						icon: 'paichaxiang',
						text: '排查',
						number: '0',
						color: '#d81e06',
						de: '排查',
						event: '../paicha/paicha'
					},
					{
						icon: 'xiaoxi3',
						text: '消息',
						number: this.mesNum,
						color: '#8a8a8a',
						de: this.message,
						event: ''
					}
				]
			}
		},
 
		methods: {
			routes(event) {
				this.$u.route({
					type: "to",
					url: event
				})
			},
			beforeSwitch() {
				return true
			},
			goList() {
				this.$u.route({
					url: './dangerList',
				})
			},
			async getYhCount() {
				const users = this.$store.state.user
				let level = 'A';
				let bind ='';
				if (users) {
					level = users.level
					bind = users.department_id;
				}
				const paicah = await this.$http.get('?type=sel', {
					type: 'sel',
					tabid: 'checkd2d28edd-d60d-4466-8263-aa37a5771b19',
					mid: '93a04587-debd-43f3-8901-a70eb4faf0a5',
					job: 'demo_node_2',
					tbname: 'yh_check',
					T: 'yh_check_sql',
					menu_type: 'check'
				})
				this.cardList[4].number = paicah.data.count;
				const result = await this.$http.get('?type=sel', {
					type: 'sel',
					tabid: 'YH_liebiao61c11f22-1a18-4562-a4d7-03237c9ba6f6',
					mid: '9c6a100d-8543-438e-9311-ce6a38e75cae',
					job: 'demo_node_1',
					tbname: 'YH',
					bind: bind,
					level:level,
					T: '隐患列表sql',
					page: 1,
					limit: 10
				})
				this.topNum = result.data.count;
				let alldata = result.data.data
				let get = 0; // 已下达
				let n = 0;
				let x = 0;
				if(!alldata) return;
				for (let i = 0; i < alldata.length; i++) {
					const obj = alldata[i]
					// 已下达
					if (obj.yh_state == '0') {
						get += 1
					}
					if (obj.yh_state == '7') {
						n += 1;
					}
					if (obj.yh_state == '8') {
						x += 1;
					}
				}
				this.cardList[0].number = get
				this.cardList[1].number = n
				this.cardList[2].number = x
				this.cardList[3].number = n
			}
		},
		onLoad() {
			this.tabbar = this.$store.state.list;
			this.getYhCount() //数据
			this.$store.commit('setMessage', '99+')
		}
	}
</script>
<style lang="scss">
	.slot-wrap {
		display: flex;
		align-items: center;
		/* 如果您想让slot内容占满整个导航栏的宽度 */
		flex: 1;
		/* 如果您想让slot内容与导航栏左右有空隙 */
		padding: 0rpx 30rpx;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 20rpx;

		.u-wrap {
			width: 100%;
			height: 250rpx;
			border-radius: 10rpx;
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

		.card {
			width: 100%;
			padding-top: 30rpx;

			.item {
				background: #fff;
				height: 300rpx;
				border-radius: 20rpx;
				margin: 20rpx 0;
				box-shadow: -1px 4px 12px 0px #f8f8f8;
				padding: 0 20rpx;

				&-top-row {
					padding: 20rpx 0;
					display: flex;
					align-items: center;
					justify-content: space-between;
				}

				&-content-row {
					margin-top: 30px;
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
