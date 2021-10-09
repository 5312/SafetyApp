<template>
	<view class="u-wrap">
		<u-navbar title="风险研判">
			<view class="navbar-right" slot="right">
				<view class="dot-box right-item">
					<u-icon name="plus" size="38" @click="add_judgment"></u-icon>
				</view>
			</view>
		</u-navbar>
		<u-card v-for="(item,index) in acticeList" :key="index" :title="'研判时间：'+item.yp_month"
			@click="judgment_detail(item)">
			<view class="" slot="body">
				<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
					<view class="u-body-item-title u-line-2">{{'研判地点：'+item.yp_address}}</view>
				</view>
				<view class="u-body-item u-flex u-row-between u-p-b-0">
					<view class="u-body-item-title u-line-2">{{'责任部门：'+item.yp_dept_name}}</view>
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
		onLoad() {},
		onShow() {
			this.index()
		},
		computed: {
			...mapState(['user']),
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
			},
			judgment_detail(item) {
				this.$u.route({
					url: './risk_judgment_detail/risk_judgment_detail',
					params: {
						hd_id: item.ids
					}
				})
			},
			add_judgment() {
				this.$u.route({
					url: './add_judgment/add_judgment'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.u-wrap{
		padding-bottom: 20rpx;
	}
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
