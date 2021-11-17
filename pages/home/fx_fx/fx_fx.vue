<template>
	<view>
		<u-card margin="20rpx" title="风险分析">
			<view class="charts-box" slot="body">
				<qiun-data-charts :errorShow="true" :errorReload="true" :opts="opts2" :loadingType="2" type="ring"
					:chartData="perdata" />
			</view>
			<view class="charts-box" slot="body">
				<qiun-data-charts :errorShow="true" :errorReload="true" :opts="radar" :loadingType="2" type="radar"
					:chartData="radarOption" />
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
		name: 'fx',
		data() {
			return {
				perDataBase: [],
				lineDataBase: [],
				radarData: [],
				fx_typeData:[],
				err:false,
				radar: {
					"legend": {
						"show": false,
						"position": "bottom",
						"lineHeight": 20,
					},
					"extra": {
						"radar": {
							"gridType": "radar",
							"gridColor": "#CCCCCC",
							"gridCount": 3,
							"opacity": 0.2,
							"max": 20
						},
					}
				},
				opts2: {
					"padding": [
						50,
						0,
						0,
						0,
					],
					"legend": {
						"show":false,
						"position": 'top',
						"float": 'right',
					},
					"title": {
						"name": '风险等级分析', // 专项
						"color": "#000000",
						"fontWeight": 600,
						"fontSize": 16,
						"offsetX": -90,
						"offsetY": -130
					},
					"subtitle": {
						"name": "",
						"fontSize": 25,
						"color": "#7cb5ec"
					},
					"extra": {
						"ring": {
							"border": false,
						},
					},
				},
			}
		},
		computed: {
			...mapState(['user', 'userid']),
			radarOption() {
				let arr = this.fx_typeData;
				console.log(arr)
				let object = {
					'人':0,
					'机':0,
					'管':0,
					'环':0
				};
				for (var i = 0; i < arr.length; i++) {
					const obj = arr[i]
					object[obj.type] = obj.quantity
				}
				let data = [];
				for (let key in object) {
					data.push(object[key])
				}
				return {
					"categories": [
						"人",
						"机",
						"管",
						"环",
					],
					"series": [{
							"name": "",
							"data":data
						}

					]
				}
			},
 
			perdata() {
				let arr = this.perDataBase;
				let d = []
				for (let i = 0; i < arr.length; i++) {
					const obj = arr[i]
					d.push({
						name:obj.level,
						value:obj.quantity
					})
				}
				return {
					"series": [{
						"data": d
					}]
				}
			},
		},
		mounted() {
			this.index();
		},
		methods: {
			async index() {
				let lastYear = new Date().getFullYear() - 1;
				let lastMonth = new Date().getMonth();
				let lastDate = new Date().getDate();
				let t1 = lastYear + '-' + lastMonth + '-' + lastDate
				// 风险等级分析
				this.$http.get('/Query/StatisticsD', {
					t1:t1,
					t2:this.$u.timeFormat(new Date(), 'yyyy-mm-dd')
				}).then(res => {
					if (res.data.data) {
						this.perDataBase = res.data.data
					}
				}).catch(e=>{this.perDataBase = []})
				this.$http.get('/Query/StatisticsE', {
					t1:t1,
					t2:this.$u.timeFormat(new Date(), 'yyyy-mm-dd')
				}).then(res => {
					if (res.data.data) {
						let data = res.data.data;
						this.fx_typeData = data
					}
				})
				 

			},
		}
	}
</script>

<style scoped>
	.charts-box {
		width: 100%;
		height: 500rpx;
		margin: 10px 0;
	}
</style>
