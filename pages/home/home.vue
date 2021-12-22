<template>
	<view class="content">
		<view class="u-wrap">
			<view class="home-top-bg">
				<view class="title">安全数据概况</view>
				<view class="top-card-box">
					<view class="numbox" @click="yhglan()">
						<u-count-to class="uicon-bag" color="#fff" :start-val="0" separator="," :end-val="yhall">
						</u-count-to>
						<view class="gray">隐患数量</view>
					</view>
					<!-- @click="fxslan()" -->
					<view class="numbox" @click="fxslan()">
						<u-count-to class="uicon-bag" color="#fff" :start-val="0" separator="," :end-val="fxall">
						</u-count-to>
						<view class="gray">风险数量</view>
					</view>
					<view class="numbox" @click="finego()">
						<u-count-to class="uicon-bag" color="#fff" :start-val="0" separator="," :end-val="fkall">
						</u-count-to>
						<view class="gray">罚款数量</view>
					</view>
				</view>
			</view>
			<!--  -->
			<u-card margin="20rpx" title="隐患概览" @click="yhglan()">
				<view class="u-flex" slot="body">
					<view v-for="x,y in yh_glist" :key="y" class="itembox" @click.stop="routes(x.event)">
						<u-image width="100%" height="100%" :src="x.url" mode=""></u-image>
						<view class="textn">
							<view>{{x.text}}</view>
							<view class="gury">
								<text>{{x.num}}</text>
								<text>条</text>
							</view>
						</view>
					</view>
				</view>
			</u-card>
			<!--  -->
			<u-card margin="20rpx" title="隐患分析">
				<view class="charts-box" slot="body">
					<qiun-data-charts :errorShow="true" :errorReload="false" :opts="yh_ring" :loadingType="2"
						type="ring" :chartData="yhLevel" />
				</view>
				<!--  -->
				<view class="charts-box" slot="body">
					<qiun-data-charts :errorShow="true" :echartsH5="true" :echartsApp="true" :errorReload="false"
						:eopts="yh_qushi" :loadingType="1" type="line" :chartData="yhQushi" />
				</view>

				<!-- 各矿隐患 -->
				<view class="charts-box" style="height:1400rpx" slot="body" v-if="permise">
					<qiun-data-charts :errorShow="true" :echartsH5="true" :echartsApp="true" :errorReload="true"
						:eopts="yh_allktypes" :loadingType="1" type="column" :chartData="allkType" />
				</view>
			</u-card>
			<!--  -->
			<fx></fx>
			<!--  -->
			<kh v-if="permise"></kh>

			<u-card margin="20rpx">
				<view class="u-flex header" slot="head">
					<view>消息通知</view>
					<view @click="meslist">
						<text>查看更多</text>
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
				<view class="mesbody" slot="body">
					<u-cell-group :border="false">
						<u-cell-item @click="meslist" v-for="x,y in message" :key="y" :title="x.xx_title"
							:label="x.createdate" :arrow="false" :border-bottom="false" :border-top="false">
							<u-icon slot="right-icon" size="32" name="more-dot-fill"></u-icon>
						</u-cell-item>
					</u-cell-group>
				</view>
			</u-card>
			<u-gap height="40" bg-color=""></u-gap>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import fx from './fx_fx/fx_fx.vue';
	import kh from './kh_fx/kh_fx.vue';
	export default {
		components: {
			fx,
			kh
		},
		data() {
			return {
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				yhall: 0,
				fkall: 0,
				fxall: 0,
				title: '',
				lineDataBase: [],
				perDataBase: [],
				khDataBase: [],
				yhRingData: [],
				yhQushiData: [],
				allkTypeData: null,
				yhq: [],
				yh_allktypes: { // h5
					"color": [
						"#FEE147",
						"#f79533",
						"#f4050d",
						"#FC8452",
						"#FAC858",
						"#EE6666",
						"#3CA272",
						"#9A60B4",
						"#ea7ccc"
					],
					"legend": {
						"top": '5%',
					},
					"grid": {
						"top": 80,
						"bottom": 30,
						"right": 30,
						"left": 50
					},
					"xAxis": {
						"type": 'value',
					},
					"yAxis": {
						"type": 'category',
						"inverse": true,
						"axisLabel": {
							interval: 0,
							rotate: 45
						}
					},
					"title": {
						"text": '年度各矿隐患分布对比',
						"fontSize": 12,
						"color": "#000",
						"textStyle": {
							"fontWeight": 500,
							"fontSize": 16,
						}
					},
					"seriesTemplate": {
						"type": 'bar',
						"data": [],
						"barwidth": 10,
						"label": {
							"show": false,
							"color": "#665809",
							"position": 'right',
						},
					}
				},
				yh_qipao: { // uch
					"xAxis": {
						"disabled": true,
						"disableGrid": true,
						"axisLine": false,
						// "max":100
					},
					"yAxis": {
						"disabled": true,
						"disableGrid": true,
						"axisLine": false,
						"data": [{
							"min": 0,
							"max": 1000
						}]
					},
					"legend": {
						"position": 'bottom',
						"float": 'center',
					},
					"title": {
						"name": '隐患类型分布分析',
						"color": "#000000",
						"fontWeight": 600,
						"fontSize": 16,
					},
				},
				yh_qushi: { // h5
					"color": [
						"#FEE147",
						"#f79533",
						"#f4050d",
						"#3CA272",
						"#9A60B4",
						"#ea7ccc",
						"#EE6666",
						"#FC8452",
						"#FAC858",
					],
					"grid": {
						"show": false
					},
					"title": {
						"text": '隐患趋势分析',
						"color": "#000",
						"textStyle": {
							"fontWeight": 500,
							"fontSize": 16,
						}
					},
					"legend": {
						"top": 'left',
						"right": 'right'
					},
					"grid": {
						"top": 30,
						"bottom": 50,
						"right": 45,
						"left": 10
					},
					"xAxis": {
						"name": '月',
						"show": true,
						"splitLine": {
							"show": false
						},
						"axisTick": {
							"show": false,
						},
						"axisLabel": {
							"show": true,
						},
					},
					"yAxis": {
						"show": false,
					},
					"seriesTemplate": {
						"name": '',
						"type": 'line',
						"data": [],
						"barwidth": 20,
						"label": {
							"show": false,
							"color": "#666666",
							"position": 'top',
						},
					},
				},
				yh_ring: { // uch
					"color": [
						"#FEE147",
						"#f79533",
						"#f4050d",
						"#FAC858",
						"#ea7ccc",
						"#0B69FF",
						"#063fde",
						"#091faf",
						"#9A60B4",
					],
					"padding": [
						50,
						0,
						0,
						0,
					],
					"legend": {
						"position": 'top',
						"float": 'right',
					},
					"title": {
						"name": '隐患等级占比分析图',
						"color": "#000000",
						"fontWeight": 600,
						"fontSize": 16,
						"offsetX": -80,
						"offsetY": -150
					},
					"subtitle": {
						"name": '隐患等级',
						"fontSize": 12,
						"offsetX": -125,
						"offsetY": -150,
						"color": "#949494",
					},
					"extra": {
						"ring": {
							"ringWidth": 10,
							"border": false,
						},
					},
				},
				message: [],
				yh_glist: [{
						url: '../../static/bg/index_YhBg1.png',
						text: '隐患下达',
						num: 0,
						event: '../getDOWN/getDOWN' //
					},
					{
						url: '/static/bg/index_YhBg2.png',
						text: '隐患整改',
						num: 0,
						event: '../zhengGai/zhengGai'
					},
					{
						url: '/static/bg/index_YhBg3.png',
						text: '隐患销号',
						num: 0,
						event: '../xiaohao/xiaohao'
					},
				],

			}
		},
		computed: {
			...mapState(['user', 'mesNum', 'userid']),
			permise() {
				if (this.user.level == 'A') {
					return true
				} else {
					return false
				}
			},
			// 各矿隐患分类对比
			allkType() {
				if (!this.allkTypeData) {
					return
				}
				let arr = this.allkTypeData
				let cateObject = {};
				/* null 和 双引号处理 */
				for (var i = 0; i < arr.length; i++) {
					const obj = arr[i]
					let name = obj.deptName
					if (name) {
						obj.deptName = name.replace(/\"/g, '')
					} else {
						// 为null 时 去掉
						arr.splice(i, 1)
						i--
					}
				}
				/*  */
				for (var i = 0; i < arr.length; i++) {
					const obj = arr[i]
					cateObject[obj.deptName] = obj
				}
				let cate = [];
				let a = []
				let c = []
				let b = []
				for (let key in cateObject) {
					cate.push(key)
				}
				// 把 空的设置成 0
				for (var i = 0; i < cate.length; i++) {
					a.push(0)
					b.push(0)
					c.push(0)
				}
				for (var x = 0; x < cate.length; x++) {
					const obj = cate[x]
					for (var i = 0; i < arr.length; i++) {
						const ele = arr[i]
						if (obj == ele.deptName) {
							switch (ele.levelId) {
								case 'a':
									a.splice(x, 1, ele.quantity)
									break;
								case 'b':
									b.splice(x, 1, ele.quantity)
									break;
								case 'c':
									c.splice(x, 1, ele.quantity)
									break;
							}
						}
					}
				}
				return {
					"categories": cate,
					"series": [ {
						"name": "一般隐患",
						"stack": 'total',
						"data": c
					}, {
						"name": "较大隐患",
						"stack": 'total',
						"data": b
					},{
						"name": "重大隐患",
						"stack": 'total',
						"data": a
					}]
				}
			},
			// 隐患类型分布分析
			yhQiPao() {
				let array = [];
				let arr = this.yhq;
				let object = {};
				for (var i = 0; i < arr.length; i++) {
					const obj = arr[i];
					if (obj.oldofclass) {
						let key = String(obj.oldofclass).trim()
						obj.name = obj.oldofclass;
						obj.data = [];
						object[key] = obj
					}
				}
				for (var i = 0; i < arr.length; i++) {
					const obj = arr[i]
					let key = [obj.oldofclass];
					let num = obj.quantity
					if (object[key]) {
						object[key].data.push([num, num, Math.round(Math.random()) * 10, obj.kind])
					}
				}
				for (let key in object) {
					array.push(object[key]);
				}
				return {
					"series": array
				}
			},
			// 隐患趋势
			yhQushi() {
				let arr = this.yhQushiData;
				let array = [];
				let res = {};
				for (var i = 0; i < arr.length; i++) {
					const obj = arr[i]
					if (obj.levelId != 'f' && obj.levelId != 'd' && obj.levelId != 'e') {
						obj.data = [];
						obj.name = obj.levelName;
						res[obj.levelId] = obj
					}
				}
				for (var i = 0; i < arr.length; i++) {
					const obj = arr[i];
					if (res[obj.levelId]) {
						res[obj.levelId].data.push(obj.quantity)
					}
				}
				for (let key in res) {
					array.push(res[key]);
				}
				// console.log(array);
				let formatdata = [0,0,0];

				for (var i = 0; i < array.length; i++) {
					const obj = array[i]
					if (obj.levelName == '一般隐患') {
						formatdata.splice(0, 1, obj)
					}
					if (obj.levelName == '较大隐患') {
						formatdata.splice(1, 1, obj)
					}
					if (obj.levelName == "重大隐患") {
						formatdata.splice(2, 1, obj)
					}
				}
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
					"series": formatdata
				}
			},
			// 隐患等级
			yhLevel() {
				let arr = this.yhRingData;
				// console.log(arr)
				let array = []
				let zdobj = {
					leve: 0
				}
				for (var i = 0; i < arr.length; i++) {
					const obj = arr[i]
					if (obj.name != "一般不安全行为" && obj.name != "严重不安全行为" && obj.name != "不规范行为") {
						array.push(obj)
					}
					if (obj.name == '重大隐患') {
						zdobj.leve += 1;
					}
				}
				if (zdobj.leve <= 0) {
					array.push({
						name: '重大隐患',
						value: 0
					})
				}
				return {
					"series": [{
						"data": array,
					}]
				}
			},


		},
		onLoad() {
			this.index();
			this.getYhCount();
			// 消息
			this.getMessage()
			// this.$http.get("/index/Hjob.ashx?type=sel&t=app_update",{
			// 	isPrompt: ''
			// }).then(res=>{
			// 	console.log(res)
			// })
			// console.log('load')
		},
		onPullDownRefresh() {
			this.index();
			this.getYhCount().then(res => {
				uni.stopPullDownRefresh()
			})
			// 消息
			this.getMessage()

		},
		onShow() {

			// #ifdef APP-PLUS
			plus.navigator.setFullscreen(true);
			// #endif
		},
		onHide() {
			// #ifdef APP-PLUS
			plus.navigator.setFullscreen(false);
			// #endif
		},
		methods: {
			...mapMutations(['setMessageNum']),

			async index() {
				// 时间参数
				let lastYear = new Date().getFullYear() - 1;
				let lastMonth = new Date().getMonth();
				let lastDate = new Date().getDate();
				let t1 = lastYear + '-' + lastMonth + '-' + lastDate

				// 隐患趋势分析
				this.$http.get('/Query/StatisticsA', {
					userId: this.userid
				}, {
					load: false,
					timeout: 60000
				}).then((yhqushi) => {
					if (yhqushi.data.data) {
						this.yhQushiData = yhqushi.data.data
					}
				})

				// 隐患类型分布
				// this.$http.get('/Query/StatisticsB', {
				// 	userId: this.userid,
				// 	t1: t1,
				// 	t2: this.$u.timeFormat(new Date(), 'yyyy-mm-dd'),
				// }, {
				// 	load: false,
				// 	timeout: 60000
				// }).then(yhqushiB => {
				// 	if (yhqushiB.data.data) {
				// 		this.yhq = yhqushiB.data.data
				// 	}
				// })

				// this.$http.get('/index/Hjob.ashx?type=sel', {
				// 	T: '专项风险类型sql',
				// 	function_perms: this.user.function_perms
				// }).then(res => {
				// 	if (res.data.data) {
				// 		this.perDataBase = res.data.data
				// 	}
				// })
				this.$http.get('/index/Hjob.ashx?type=sel', {
					T: '隐患等级占比分析sql',
					department_id: this.user.department_id,
					function_perms: this.user.function_perms
				}, {
					load: false
				}).then(yhres => {
					if (yhres.data.data) {
						this.yhRingData = yhres.data.data
						// console.log( this.yhRingData )
						// this.yhQushiData = yhres.data.data
					}
				})

				// const index = await this.$http.get('/index/Hjob.ashx?type=sel', {
				// 	T: '每月数据',
				// 	function_perms: this.user.function_perms
				// })
				// if (index.data.data) {
				// 	this.lineDataBase = index.data.data[0].replace.split(',')
				// }

				// 隐患各矿分类对比
				this.$http.get('/Query/StatisticsC', {
					userId: this.userid,
					t1: t1,
					t2: this.$u.timeFormat(new Date(), 'yyyy-mm-dd'),
				}, {
					load: false,
					timeout: 60000
				}).then(all => {
					if (all.data.data) {
						this.allkTypeData = all.data.data;
					}
				}).catch(e => {
					this.allkTypeData = []
				})

				// const kh_statistics = await this.$http.get('/index/Hjob.ashx?type=sel', {
				// 	T: 'app_kh_statistics',
				// 	function_perms: this.user.function_perms
				// })
				// if (kh_statistics.data.data) {
				// 	this.khDataBase = kh_statistics.data.data
				// }
			},
			async getYhCount() {
				// 数量
				const users = this.$store.state.user

				const result = await this.$http.get('/index/Hjob.ashx?type=sel', {
					tabid: 'YH_liebiao79ea742c-4e27-4267-960d-0d1296ee608a',
					mid: '9c6a100d-8543-438e-9311-ce6a38e75cae',
					job: 'demo_node_1',
					tbname: 'YH',
					department_id: this.user.department_id,
					function_perms: this.user.function_perms,
					T: 'app_danger_list_num',
				}, {
					load: false
				})
				let alldata = result.data.data
				this.yhall = result.data.count
				//  专项风险数量
				this.fxall = alldata[0].fx
				this.fkall = alldata[0].fk;
				this.yh_glist[0].num = alldata[0].xd
				this.yh_glist[1].num = alldata[0].zg
				this.yh_glist[2].num = alldata[0].xh
			},
			async getMessage() {
				// 消息
				const mes = await this.$http.get('/index/Hjob.ashx?type=sel', {
					type: 'sel',
					userid: this.userid,
					tabid: 'xx_newc6a24ebc-c69f-4799-9cc5-2ea1db9da957',
					mid: 'f53bc1eb-762e-43bc-9a87-1a676ad577ea',
					job: 'demo_node_1',
					tbname: 'xx_news',
					T: '新消息sql',
					page: 1,
					limit: 3
				}, {
					load: false
				})
				this.message = mes.data.data
				this.setMessageNum(mes.data.count);

				uni.setTabBarBadge({
					index: 1,
					text: String(this.mesNum),
				})
			},
			navto() {
				this.$u.route({
					type: "to",
					url: '../assessment/assessment'
				})
			},
			routes(event) {
				this.$u.route({
					type: "to",
					url: event
				})
			},
			yhglan() {
				this.$u.route({
					type: "to",
					url: '../danger/dangerList'
				})
			},
			finego() {
				this.$u.route({
					type: "to",
					url: '../fine_search/fine_search'
				})
			},
			fxslan() {
				this.$u.route({
					type: "to",
					animationType: 'pop-in',
					url: '../risk/risk',
					params: {
						current: 1
					}
				})
			},
			meslist() {
				this.$u.route({
					type: "to",
					url: '../message/message'
				})
			}
		},

	}
</script>

<style lang="scss" scoped>
	/* 请根据需求修改图表容器尺寸，如果父容器没有高度图表则会显示异常 */
	.charts-box {
		width: 100%;
		height: 500rpx;
		margin: 10px 0;
	}

	.qi_title {
		font-size: 32rpx;
		font-weight: 500;
		margin: 10rpx 0;
		padding-left: 10rpx;
	}

	page {
		height: 100%;

		.content {
			padding-bottom: 20rpx;
			height: 100%;

			.u-wrap {
				.scroll-Y {
					margin-top: 20rpx;
					height: 800rpx;
					overflow: hidden;
				}

				.home-top-bg {
					margin-top: 80rpx;
					width: 100%;
					z-index: 2;
					height: 300rpx;
					background: url('../../static/bg/index_TopBg.png') 100% 100% /100% 100% no-repeat;
				}

				.title {
					text-align: center;
					font-size: 36rpx;
					line-height: 70rpx;
					padding: 10rpx;
					height: 90rpx;
				}

				.top-card-box {
					display: flex;
					justify-content: space-around;
					align-items: center;
					padding: 20rpx;
					text-align: center;
					flex-direction: row;
					flex-wrap: nowrap;
					height: calc(100% - 90rpx);

					.numbox {
						color: #fff;

						.uicon-bag {

							font-size: 50rpx;
						}

						.gray {
							color: #90B6FF;
						}
					}
				}

				.u-flex {
					height: 290rpx;
					flex-direction: row;
					align-items: center;
					flex-wrap: nowrap;
					align-content: center;
					justify-content: space-between;

					.itembox {
						height: 100%;
						width: 29%;
						background-size: 100% 100%;
						background-position: 100% 100%;
						position: relative;

						.textn {
							position: absolute;
							bottom: 30rpx;
							color: #fff;
							text-align: center;
							width: 100%;
							margin: auto;

							.gury {
								color: #90B6FF;
							}
						}
					}
				}

				.header {
					height: 40rpx;
				}

				.mesbody {
					// margin-bottom: 80rpx;
				}

			}
		}
	}
</style>
