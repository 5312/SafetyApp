<template>
	<view class="u-wrap">
		<!-- <u-navbar title="评估详表">
			<view  class="navbar-right" slot="right">
				<view  class="dot-box right-item">
					<u-icon name="plus" size="38" @click="addDetailRisk"></u-icon>
				</view>
			</view>
		</u-navbar> -->
		<!--  -->
		<view v-if='acticeList'>
			<u-card  v-for="(item,index) in acticeList"
			:key="index" 
			:title="'辨识部门：'+item.nd_d_ps_detp" 
			@click="setLevel(item)">
				<view class="" slot="body">
					<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
						<view class="u-body-item-title u-line-2">一水平：{{item.nd_d_address}}</view>
					</view>
					<view class="u-body-item u-flex u-row-between u-p-b-0">
						<view class="u-body-item-title u-line-2">风险类型：{{item.nd_d_type}}</view>
					</view>
					<view class="u-body-item u-flex u-row-between u-p-b-0">
						<view class="u-body-item-title u-line-2">评估结果：{{item.nd_d_result}}</view>
					</view>
					
				</view>
			</u-card>
			<u-gap height="40" bg-color=""></u-gap>
		</view>
		<view v-else class="page-box">
			<view>
				<view class="centre">
					<image src="https://cdn.uviewui.com/uview/template/taobao-order.png" mode="">
					</image>
					<view class="explain">
						暂无数据
						<view class="tips">
						</view>
					</view>
					<view class="btn">查看其他</view>
				</view>
			</view>
		</view>
		<u-popup v-model="show" width="80%" mode="center"  border-radius="20">
			<setLevel :ids="ids" :paramstype="paramstype" @close_setlevel='closeSetLevel'></setLevel>
		</u-popup>
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
				show:false,
				ids:'',
				acticeList:null,
				ndid:'', // 上级评估类型 id
				paramstype:'nd_d_result'
			}
		},
		computed: {
			...mapState(['user', 'list']),
		},
		onLoad(option) {
			let {ndid} = option;
			this.ndid = ndid;
			// this.index()
		},
		onShow(){
			this.index()
		},
		methods: {
			async index(){
				const result = await this.$http.get('/index/Hjob.ashx', {
					type: 'sel',
					T: '年度风险详情列表sql',
					page: 1,
					limit: 10,
					ndid: this.ndid
				})
				this.acticeList = result.data.data;
			},
			setLevel(e){
				this.ids = e.ids
				this.show = true;
			},
			closeSetLevel(){
				this.show = false;
				this.index();
			},
			addDetailRisk(){
				this.$u.route({
					url:'./ad_detail/ad_detail',
					params:{
						ndid:this.ndid
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
.u-card-wrap { 
		background-color: $u-bg-color;
		padding: 1px;
	}
	
	.u-body-item {
		font-size: 32rpx;
		color: #333;
		padding: 20rpx 10rpx;
	}
		
	.u-body-item image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		border-radius: 8rpx;
		margin-left: 12rpx;
	}
	.navbar-right {
		margin-right: 24rpx;
		display: flex;
	}
	.centre {
		text-align: center;
		margin: 200rpx auto;
		font-size: 32rpx;
	
		image {
			width: 164rpx;
			height: 164rpx;
			border-radius: 50%;
			margin-bottom: 20rpx;
		}
	
		.tips {
			font-size: 24rpx;
			color: #999999;
			margin-top: 20rpx;
		}
	
		.btn {
			margin: 80rpx auto;
			width: 200rpx;
			border-radius: 32rpx;
			line-height: 64rpx;
			color: #ffffff;
			font-size: 26rpx;
			background: linear-gradient(270deg, rgba(249, 116, 90, 1) 0%, rgba(255, 158, 1, 1) 100%);
		}
	}
</style>