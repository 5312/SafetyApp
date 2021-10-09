<template>
	<view class="u-wrap">
		<u-navbar title="评估详表">
			<view  class="navbar-right" slot="right">
				<view  class="dot-box right-item">
					<u-icon name="plus" size="38" @click="addDetailRisk"></u-icon>
				</view>
			</view>
		</u-navbar>
		<!--  -->
		<u-card v-for="(item,index) in acticeList" 
		:key="index" 
		:title="item.nd_d_ps_detp" 
		@click="setLevel(item)">
			<view class="" slot="body">
				<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
					<view class="u-body-item-title u-line-2">{{item.nd_d_address}}</view>
				</view>
				<view class="u-body-item u-flex u-row-between u-p-b-0">
					<view class="u-body-item-title u-line-2">{{item.nd_d_result}}</view>
				</view>
			</view>
		</u-card>
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
				acticeList: [],
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
</style>