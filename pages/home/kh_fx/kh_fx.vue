<template>
	<view>
		<u-card margin="20rpx" title="考核分析" @click="navto">
			<view class="charts-box" slot="body">
				<qiun-data-charts :errorShow="true" :echartsH5="true" :echartsApp="true" :errorReload="false"
					:eopts="opts3" :loadingType="1" type="column" :localdata="khDataBase" />
			</view>

		</u-card>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		name: 'kh',
		data() {
			return {
				khDataBase: [],
				opts3: {
					"color": [
						"#fff14e",
						"#FEE147",
						"#f4050d",
						"#1890FF",
						"#91CB74",
						"#73C0DE",
						"#3CA272",
						"#9A60B4",
						"#ea7ccc"
					],
					"title": {
						"text": '各单位考核扣分情况',
						"color": "#000",
						"textStyle": {
							"fontWeight": 500,
							"fontSize": 16,
						}
					},

					"xAxis": {
						"name": "扣分",
						"type": 'value',
						"disableGrid": true
					},
					"yAxis": {
						"type": 'category',
						"gridType": "dash",
						"rotateLabel": true,
						"axisLabel": {
							'interval': 0,
							'rotate': 53
						}
					},
					"grid": {
						"top": 40,
						"bottom": 20,
						"right": 50,
						"left": 40
					},
					"legend": {
						"show": false,
					},
					"seriesTemplate": {
						"type": 'bar',
						"data": [],
						"barwidth": 10,
						"label": {
							"show": true,
							"color": "#665809",
							"position": 'right',
						},
					},
					
					"dataZoom": [{
							'show': true,
							'realtime': true,
							'yAxisIndex': [0],
							'start': 0,
							'left': '-4%', //滑动条位置
							'end': 50
						},
						{
							'yAxisIndex': [0], //表示y轴折叠
							'type': 'inside', // 'inside',
							'yAxisIndex': [0], //表示y轴折叠
							'realtime': true,
							'start': 0,
							'end': 50
						}
					],
				},
			}
		},
		mounted() {
			this.index();
		},
		computed: {
			...mapState(['user', 'mesNum', 'userid']),
		},
		methods: {
			navto() {
				this.$u.route({
					type: "to",
					url: '../assessment/assessment'
				})
			},
			async index() {
				const kh_statistics = await this.$http.get('/index/Hjob.ashx?type=sel', {
					T: 'app_kh_statistics',
					function_perms: this.user.function_perms
				})
				if (kh_statistics.data.data) {
					this.khDataBase = kh_statistics.data.data
				}
			}
		}
	}
</script>

<style scoped>
	/* 请根据需求修改图表容器尺寸，如果父容器没有高度图表则会显示异常 */
	.charts-box {
		width: 100%;
		height: 1400rpx;
		margin: 10px 0;
	}
</style>
