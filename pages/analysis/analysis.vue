<template>
	<view class="content">
		<view class="u-wrap">
			<u-card  title="隐患状态分析">
				<view class="charts-box" slot="body">
					<qiun-data-charts type="ring" :chartData="chartData" background="none" />
				</view>
			</u-card>
		</view>
		<u-tabbar :list="tabbar" :mid-button="true"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				chartData: {
					"categories": [
						"2016",
						"2017",
						"2018",
						"2019",
						"2020",
						"2021"
					],
					"series": [{
						"data": [{
								"name": "一矿",
								"value": 50
							},
							{
								"name": "二矿",
								"value": 30
							},
							{
								"name": "三矿",
								"value": 20
							},
							{
								"name": "十矿",
								"value": 18
							},
							{
								"name": "八矿",
								"value": 8
							}
						]
					}]
				},
				title: '',
				tabbar: ""
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
	/* 请根据需求修改图表容器尺寸，如果父容器没有高度图表则会显示异常 */
	.charts-box {
		width: 100%;
		height: 300px;
	}
</style>
