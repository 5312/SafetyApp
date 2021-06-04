<template>
	<view class="content">
		<!-- 隐患 -->
		<u-navbar :is-back="false" title="" height="44">
			<view class="slot-wrap">
				<u-search placeholder="隐患查询"></u-search>
			</view>
		</u-navbar>
		<view class="u-wrap" @click="">
			<view class="wrap-top">
				<view>隐患排查</view>
				<u-icon name='more-dot-fill'></u-icon>
			</view>
			<!-- 统计数据 -->
			<view class="wrap-content">
				<view>10,235,450</view>
			</view>
		</view>
		<view class="card">
			<u-row gutter="30" align="center" justify='center'>
				<u-col span="6" v-for="(item,i) in cardList" :key="i">
					<view class="item">
						<view class="item-top-row">
							<u-icon :name="item.icon" :color="item.color"  custom-prefix="safety-icon" ></u-icon>
							<!-- <view>{{item.text}}</view> -->
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
		<u-tabbar :list="tabbar" :mid-button="true"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				tabbar: "",
				cardList: [{
						icon: 'xiada--release_circle',
						text: '下达',
						number: '2,393',
						color:'#1296db',
						de: '下达',
						bg:'xiada--release_circle.png'
					},
					{
						icon: 'zhenggai',
						text: '整改',
						color:'#f4ea2a',
						number: '2,393',
						de: '整改'
					}, {
						icon: 'xiaohaoshenqing_xiaohaoshenqing',
						text: '复查销号',
						color:'red',
						number: '2,393',
						de: '销号'
					}, {
						icon: 'choucha1',
						text: '抽查',
						number: '2,393',
						color:'#d4237a',
						de: '抽查'
					}, {
						icon: 'paichaxiang',
						text: '排查',
						number: '2,393',
						color:'#d81e06',
						de: '排查'
					},
					{
						icon: 'xiaoxi3',
						text: '消息',
						number: '20',
						color:'#8a8a8a',
						de: '来自十矿的整改消息'
					}
				]
			}
		},
		methods: {

		},
		onLoad() {
			this.tabbar = this.$store.state.list
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
					.detail{
						padding:20rpx 0;
						color:$uni-text-color-grey;
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
