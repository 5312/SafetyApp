<template>
	<view class="u-wrap">
		<u-navbar title="专项风险辨识">
			<view  class="navbar-right" slot="right">
				<view  class="dot-box right-item">
					<u-icon name="plus" size="38" @click="addZxRisk"></u-icon>
				</view>
			</view>
		</u-navbar>
		<u-card v-for="(item,index) in acticeList"  :key="index" :title="item.zx_time" @click="zx_detail(item)">
			<view class="" slot="body">
				<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
					<view class="u-body-item-title u-line-2">{{item.zx_address_list}}</view>
				</view>
				<view class="u-body-item u-flex u-row-between u-p-b-0">
					<view class="u-body-item-title u-line-2">{{item.zx_resp_bumenid}}</view>
				</view>
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
		data() {
			return {
				acticeList: []
			}
		},
		onLoad() {
		},
		onShow(){
			this.index()
		},
		computed: {
			...mapState(['user', 'list']),
		},
		methods: {
			async index() {
				const result = await this.$http.get('/index/Hjob.ashx', {
					type: 'sel',
					T: 'app_zx_risk_list',
					page: 1,
					limit: 10,
					department_id: this.user.department_id
				})
				this.acticeList = result.data.data;
			},
			// 跳转 详情
			zx_detail(item){
				this.$u.route({
					url:'../nd_detail/nd_detail',
					params:{
						ndid:item.ids,
					}
				})
			},
			addZxRisk(){
				this.$u.route({
					url:'./add_zx_risk/add_zx_risk'
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
