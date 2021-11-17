<template>
	<view>
		<u-card margin="20rpx" title="考核分析" @click="navto">
			<view class="charts-box" slot="body">
				<qiun-data-charts :errorShow="true" :echartsH5="true" :echartsApp="true" :errorReload="false"
					:eopts="opts3" :loadingType="1" :dataLabel="true" type="column" :localdata="khDataBase" />
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
					"title": {
						"text": '各单位考核扣分情况',
						"color": "#000",
						"textStyle": {
							"fontWeight": 500,
							"fontSize": 16,
						}
					},
					"padding": [
						20,
						0,
						0,
						 0,
					],
					"xAxis": {
						"type": 'value',
						"disableGrid": true
					},
					"yAxis": {
						"type": 'category',
						"name": "扣分",
						"gridType": "dash",
					},
					"legend": {
						"show": false,
						"position": "bottom",
						"lineHeight": 10,
					},
					"seriesTemplate":{
						"type": 'bar',
						"data": [],
						"barwidth": 10,
						"label": {
							"show": true,
							"color": "#665809",
							"position": 'right',
						},
					}
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
		height: 700rpx;
		margin: 10px 0;
	}
</style>
