<template>
	<view class="content">
		<view class="u-wrap">
			<u-card  :show-head="false" title="">
				<view class="charts-box" slot="body">
					<qiun-data-charts type="line" :chartData="chartData" background="none" />
				</view>
			</u-card>
		</view>
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
			}
		},
		methods: {

		},
		onLoad() {
		}
	}
</script>

<style lang="scss">
	/* 请根据需求修改图表容器尺寸，如果父容器没有高度图表则会显示异常 */
	.charts-box {
		width: 100%;
		height: 100px;
	}
</style>
