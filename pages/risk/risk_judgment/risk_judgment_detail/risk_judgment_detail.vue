<template>
	<view class="u-wrap">
		<u-card v-for="(item,index) in acticeList"  :key="index" :title="'责任部门：'+item.yp_resp_depname">
			<view class="" slot="body">
				<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
					<view class="u-body-item-title u-line-2">{{'研判地点：'+item.yp_address_list}}</view>
				</view>
				<view class="u-body-item u-flex u-row-between u-p-b-0">
					<view class="u-body-item-title u-line-2">{{item.yp_level}}</view>
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
		computed: {
			...mapState(['user', 'list']),
		},
		onLoad(option) {
			this.index(option)
		},
		methods: {
			async index(options){
				let {hd_id} = options
				const result = await this.$http.get('/index/Hjob.ashx', {
					type: 'sel',
					T: 'app_yp_detail_sql',
					page: 1,
					limit: 10,
					hd_id: hd_id,
					department_id:this.user.department_id
				})
				this.acticeList = result.data.data;
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
</style>