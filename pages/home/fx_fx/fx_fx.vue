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
				perDataBase: null,
				lineDataBase: [],
				radarData: [],
				fx_typeData: null,
				err: false,
				radar: {
					"color": [
						"#fff14e",
						"#ff963a",
						"#ff5d60",
						"#1890FF",
						"#91CB74",
						"#73C0DE",
						"#3CA272",
						"#9A60B4",
						"#ea7ccc"
					],
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
					"color": [
						"#1890FF",
						"#fff14e",
						"#ff963a",
						"#ff5d60",
						"#91CB74",
						"#73C0DE",
						"#3CA272",
						"#9A60B4",
						"#ea7ccc"
					],
					"padding": [
						50,
						0,
						0,
						0,
					],
					"legend": {
						// "show":false,
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
				if (!arr) {
					return
				}
				let object = {
					'人': 0,
					'机': 0,
					'管': 0,
					'环': 0
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
							"data": data
						}

					]
				}
			},

			perdata() {
				let arr = this.perDataBase;
				if (!arr) {
					return
				}
				let d = []
				console.log(arr)
				let di = {};
				let yb = {};
				let jd = {};
				let zd = {};

				for (let i = 0; i < arr.length; i++) {
					const obj = arr[i]
					if (obj.level == '低风险') {
						di = {
							name: obj.level,
							value: obj.quantity
						}
					}
					if (obj.level == '一般风险') {
						yb = {
							name: obj.level,
							value: obj.quantity
						}
					}
					if (obj.level == '较大风险') {
						jd = {
							name: obj.level,
							value: obj.quantity
						}
					}
					if (obj.level == '重大风险') {
						zd = {
							name: obj.level,
							value: obj.quantity
						}
					}
				}
				d.push(di)
				d.push(yb)
				d.push(jd)
				d.push(zd)
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
				let lastMonth = new Date().getMonth() + 1;
				let lastDate = new Date().getDate();
				let t1 = lastYear + '-' + lastMonth + '-' + lastDate
				let t2 = new Date().getFullYear() + '-' + lastMonth + '-' + (new Date().getDate() + 1)
				// 风险等级分析
				this.$http.get('/Query/StatisticsD', {
					t1: t1,
					t2: t2 //this.$u.timeFormat(new Date(), 'yyyy-mm-dd')
				}, {
					load: false,
					timeout: 60000
				}).then(res => {
					if (res.data.data) {
						this.perDataBase = res.data.data
					}
				}).catch(e => {
					this.perDataBase = []
				})
				this.$http.get('/Query/StatisticsE', {
					t1: t1,
					t2: t2 //this.$u.timeFormat(new Date(), 'yyyy-mm-dd')
				}, {
					load: false,
					timeout: 60000
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
