<template>
	<view class="content">
		<view class="u-wrap">
			<u-card  :show-head="false" title="">
				<view class="charts-box" slot="body" v-if="lineDataBase.length >0">
					<qiun-data-charts  :loadingType="2" type="line" :chartData="chartData" background="none" />
				</view>
			</u-card>
		</view>
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
				lineDataBase:[],
			}
		},
		computed:{
			...mapState(['user','mesNum']),
			chartData(){
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
						"name":"月",
						"data": this.lineDataBase
					}]
				}
			}
		},
		onLoad() {
			this.index();
			
			uni.setTabBarBadge({
				index:1,
				text:String(this.mesNum),
			})
		},
		methods: {
			async index(){
				const index = await this.$http.get('/index/Hjob.ashx?type=sel', {
					T: 'app_home_chart',
					function_perms:this.user.function_perms
				})
				if(index.data.data){
					this.lineDataBase = index.data.data[0].databases.split(',')
				}
			}
		},

	}
</script>

<style lang="scss" scoped>
	/* 请根据需求修改图表容器尺寸，如果父容器没有高度图表则会显示异常 */
	.charts-box {
		width: 100%;
		height: 100px;
	}
</style>
