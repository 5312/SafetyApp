<template>
	<view class="u-wrap">
		<!-- <u-navbar title="研判详表">
			<view class="navbar-right" slot="right">
				<view class="dot-box right-item">
					<u-icon name="plus" size="38" @click="add_judgment"></u-icon>
				</view>
			</view>
		</u-navbar> -->
		<u-card @click="setLevel(item)" v-for="(item,index) in acticeList"  :key="index" :title="'责任部门：'+item.yp_resp_depname">
			<view class="" slot="body">
				<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
					<view class="u-body-item-title u-line-2">{{'研判地点：'+item.yp_address_list}}</view>
				</view>
				<view class="u-body-item u-flex u-row-between u-p-b-0">
					<view class="u-body-item-title u-line-2">{{item.yp_level}}</view>
				</view>
			</view>
			<u-gap height="40" bg-color=""></u-gap>
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
				acticeList: [],
				ids:'',
				paramstype:'yp_level'
			}
		},
		computed: {
			...mapState(['user', 'list']),
		},
		onLoad(option) {
			// this.index(option)
			this.hd_id = option.hd_id
		},
		onShow(){
			this.index({hd_id:this.hd_id})
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
			},
			setLevel(e){
				this.ids = e.ids
				this.show = true;
			},
			closeSetLevel(){
				this.show = false;
				this.index({hd_id:this.hd_id});
			},
			add_judgment(){
				this.$u.route({
					url: './add_judgment_detail/add_judgment_detail',
					params: {
						hd_id: this.hd_id
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