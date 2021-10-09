<template>
	<view class="wrap">
		<view class="w-title">设置风险等级</view>
		<view class="w-color_box">
			<u-grid :col="2">
				<u-grid-item v-for="(item,y) in list" :key="y" class="grid_box" :style="{background:item.color}"
					@click="set(item)">
					<u-icon :name="item.icon" :size="46"></u-icon>
					<view class="grid-text">{{item.name}}</view>
				</u-grid-item>

			</u-grid>
		</view>
	</view>
</template>

<script>
	export default {
		name: "setLevel",
		props: {
			value: Boolean,
			ids: String,
			paramstype:String
		},
		computed: {
			show() {
				return this.value
			}
		},
		data() {
			return {
				list: [{
						name: '重大风险',
						icon: "warning",
						count: '1',
						color: '#dc143c',
						subtitle: '极其危险，高度关注，重点防控'
					},
					{
						name: '较大风险',
						icon: "warning",
						count: '1',
						color: '#fa8f4d',
						subtitle: '高度危险，应采取严密防控措施'
					},
					{
						name: '一般风险',
						icon: "warning",
						count: '1',
						color: '#d5d505',
						subtitle: '一般危险，应采取有效防控措施'
					},
					{
						name: '低风险',
						icon: "warning",
						count: '1',
						color: '#007dff',
						subtitle: '危险，需严格按章正规操作'
					}
				],
			};
		},
		methods: {
			async set(item) {
				let obj = {};
				obj[this.paramstype] = item.name;
				let urlType = {
					mid: '52b091bc-c0bf-48fd-b03a-785500f08db0',
					tabid: 'nd_fx_detaila7da660c-3527-419e-94a1-d45e851759f5',
					job: 'demo_node_1',
					tbname: 'nd_fx_detail',
				}
				if(this.paramstype == 'yp_level'){
					urlType = {
						tabid: 'fx_zyanpan8d3e0a67-b4d7-42c5-8bb0-bafb0356699a',
						mid: 'fde20747-4d22-4c71-82ed-816479412fe4',
						job: 'demo_node_1',
						tbname: 'fx_yp',
					}
				}
				let params = Object.assign( {
					type: 'add',
					...urlType,
					add: this.paramstype,
					id: this.ids
				},obj)
				const result =await this.$http.post('/index/Hjob.ashx',params)
				if(result.data.statusCode){
					this.$emit('close_setlevel')
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		width: 100%;
		height: 450rpx;
		padding: 40rpx;

		.w-title {
			text-align: center;
			font-size: 36rpx;
			margin: 10rpx;
			margin-top: 0;
		}

		.w-color_box {
			margin-top: 30rpx;
		}
	}
</style>
