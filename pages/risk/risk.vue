<template>
	<view class="content">
		<!-- 隐患 -->
		<u-navbar :is-back="false" title="" height="44">
			<view class="slot-wrap">
				<u-search placeholder="风险查询" :disabled='true' @click='goList'></u-search>
			</view>
		</u-navbar>
		<view class="u-wrap">
			<u-grid :col="2">
				<u-grid-item v-for="(item,y) in type_list" :key="y" class="grid_box" :style="{background:item.color}">
					<u-badge :count="item.count" :offset="[20, 20]"></u-badge>
					<u-icon :name="item.icon" :size="46"></u-icon>
					<view class="grid-text">{{item.name}}</view>
					<!-- <view class="grid-text-subititle">{{item.subtitle}}</view> -->
				</u-grid-item>

			</u-grid>
			<!-- <u-card :show-head="false" title="风险分析" @click="listRouter({router:'../analysis/analysis'})">
				<view class="charts-box" slot="body" v-if="lineDataBase.length >0">
					<qiun-data-charts :loadingType="2" type="line" :chartData="chartData" />
				</view>
			</u-card> -->
		</view>
		<!-- 风险 -->
		<view class="u-content">
			<view v-for="(item,y) in lists" :key="y" class="list-box" @click="listRouter(item)">
				<view class="list-box-title">
					{{item.name}}
				</view>
			</view>
		</view>
		<u-tabbar :list="list" :mid-button="true"></u-tabbar>
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
				type_list: [{
						name: '重大风险',
						icon: "warning",
						count:'1',
						color:'#dc143c',
						subtitle:'极其危险，高度关注，重点防控'
					},
					{
						name: '较大风险',
						icon: "warning",
						count:'1',
						color:'#fa8f4d',
						subtitle:'高度危险，应采取严密防控措施'
					},
					{
						name: '一般风险',
						icon: "warning",
						count:'1',
						color:'#d5d505',
						subtitle:'一般危险，应采取有效防控措施'
					},
					{
						name: '低风险',
						icon: "warning",
						count:'1',
						color:'#007dff',
						subtitle:'危险，需严格按章正规操作'
					}
				],
				lists: [{
						name: '年度风险辨识',
						router: './nd_risk/nd_risk'
					},
					{
						name: '专项风险辨识',
						router: './zx_risk/zx_risk'
					},
					{
						name: '风险研判',
						router: './risk_judgment/risk_judgment'
					}
				],
				// 图表数据
				lineDataBase: [],
			}
		},
		computed: {
			...mapState(['user', 'list']),
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
						"name": '月',
						"data": this.lineDataBase
					}]
				}
			}
		},
		onLoad() {
			this.tabbar = this.$store.state.list;
			this.index()
		},
		methods: {
			async index() {
				const index = await this.$http.get('/index/Hjob.ashx?type=sel', {
					T: '每月数据',
					function_perms: this.user.function_perms
				})
				if (index.data.data) {
					this.lineDataBase = index.data.data[0].replace.split(',')
				}

			},
			goList() {

			},
			listRouter(item) {
				this.$u.route({
					url: item.router,
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.u-wrap {
		width: 100%;
		padding: 0 30rpx;
		margin-top: 20rpx;

		/* 请根据需求修改图表容器尺寸，如果父容器没有高度图表则会显示异常 */
		.charts-box {
			width: 100%;
			height: 100rpx;
		}

		.grid_box {
			color:#fff;
			.grid-text-subititle{
				color:#d4e0e1;
				font-size: 24rpx;
			}
		}
	}

	.u-content {
		padding: 0 30rpx;

		.list-box {
			background-color: $uni-bg-color;
			height: 250rpx;
			margin: 20rpx 0;
			padding: 30rpx;
		}
	}
</style>
