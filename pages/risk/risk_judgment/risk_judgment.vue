<template>
	<view class="u-wrap">
		<u-card v-for="(item,index) in acticeList" :title="'研判时间：'+item.yp_month">
			<view class="" slot="body">
				<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
					<view class="u-body-item-title u-line-2">{{'研判地点：'+item.yp_address}}</view>
				</view>
				<view class="u-body-item u-flex u-row-between u-p-b-0">
					<view class="u-body-item-title u-line-2">{{'责任部门：'+item.yp_dept_name}}</view>
				</view>
			</view>
			<view class="" slot="foot">
				<u-icon name="chat-fill" size="34" color="" label=""></u-icon>
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
			this.index()
		},
		computed: {
			...mapState(['user', 'list']),
		},
		methods: {
			async index() {
				const result = await this.$http.get('/index/Hjob.ashx', {
					type: 'sel',
					T: 'app_yp_sql',
					page: 1,
					limit: 10,
					department_id: this.user.department_id
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
