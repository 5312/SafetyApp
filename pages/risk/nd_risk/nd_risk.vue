<template>
	<view class="u-wrap">
		<u-navbar title="年度风险辨识">
			<view  class="navbar-right" slot="right">
				<view  class="dot-box right-item">
					<u-icon name="plus" size="38" @click="addNdRisk"></u-icon>
					<!-- <u-badge size="mini" :is-dot="true" :offset="[-6, -6]"></u-badge> -->
				</view>
			</view>
			
		</u-navbar>
		<u-card v-for="(item,index) in acticeList" :key="index" :title="item.nd_list_nae" @click="nd_detail(item)">
			<view class="" slot="body">
				<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
					<view class="u-body-item-title u-line-2">{{item.address_list}}</view>
				</view>
				<view class="u-body-item u-flex u-row-between u-p-b-0">
					<view class="u-body-item-title u-line-2">{{item.nd_resp_bumenname}}</view>
				</view>
			</view>
			<!-- view class="" slot="foot">
				<u-icon name="chat-fill" size="34" color="" label=""></u-icon>
	</view> -->
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
			// this.index()
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
					tabid: 'fx_niandu_psc3ce835f-bac8-4064-b01b-29327429be0b',
					mid: '5bd8b71e-521b-44e7-b2cc-caae556e0e6d',
					job: 'demo_node_1',
					tbname: 'nd_fx_ps',
					T: 'app_fenxian_nd_sql',
					page: 1,
					limit: 10,
					department_id: this.user.department_id
				})
				this.acticeList = result.data.data;
			},
			// 跳转年度详情
			nd_detail(item) {
				this.$u.route({
					url: '../nd_detail/nd_detail',
					params: {
						ndid: item.ids
					}
				})
			},
			addNdRisk(){
				//
				this.$u.route({
					url:'./add_nd_risk/add_nd_risk'
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
