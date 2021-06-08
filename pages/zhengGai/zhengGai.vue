<template>
	<view class="u-wrap">
		<view v-if="rectify_data.length <=0">
			<u-empty text="暂无待整改隐患" mode="list"></u-empty>
		</view>
		<view v-for="(item,i) in rectify_data" :key='item.ids' @click="rectifyFun(item.ids)">
			<u-card :title="'编号：'+item.ids" :sub-title="item.createdate"  padding="30">
				<view class="" slot="body">
					<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
						<view class="center  u-body-item-title u-line-2">
							<view class="u-body-item-title u-line-2 itempadding">检查人：{{split(item.inspeople)}}</view>
							<view class="u-body-item-title u-line-2 itempadding">检查单位：{{split(item.yh_origin)}}</view>
							<view class="u-body-item-title u-line-2 itempadding ">隐患内容：<text class="content">{{item.yh_content}}</text></view>
							<view class="u-body-item-title u-line-2 itempadding">隐患等级：{{split(item.yh_level)}}</view>
						</view>
						<image src="https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg" mode="aspectFill"></image>
					</view>
					<view class="u-body-item u-flex u-row-between u-p-b-0 itempadding">
						<view class="u-body-item-title u-line-2">检查地点：{{item.address}}</view>
					</view>
					<view class="u-body-item u-flex u-row-between u-p-b-0 itempadding">
						<view class="u-body-item-title u-line-2">详细地点：{{item.address}}</view>
					</view>
				</view>
				<view class="" slot="foot">
					<!-- <u-icon name="chat-fill" size="34" color="" label="30评论"></u-icon> -->
					<view class="u-body-item u-flex u-row-between u-p-b-0">
						<view class="u-body-item-title u-line-2">要求完成时间：{{item.yh_requesttime}}</view>
					</view>
				</view>
			</u-card>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				rectify_data: [],
			}
		},
		onLoad() {
			this.getRquest();
		},
		methods: {
			split(v) {
				return v.split('~')[0]
			},
			rectifyFun(){
				
			},
			async getRquest() {
				const users = this.$store.state.user
				let level = 'A';
				let bind ='';
				if (users) {
					level = users.level
					bind = users.department_id;
				}
				const zhengai = await this.$http.post('?type=sel', {
					tabid: 'YH_zhenggaiba7d4c77-887b-4775-a4e6-912366f65e49',
					mid: '58bee662-ca80-4356-b769-8d6ec116f5f7',
					job: 'demo_node_1',
					tbname: "YH",
					T: "yhzgsql",
					level: level,
					page: 1,
					limit: 10
				})
				if (zhengai.data.data) {
					this.rectify_data = zhengai.data.data;
				}
			}
		}
	}
</script>

<style lang="scss">
	.itempadding {
		padding: 10rpx 0;
	}
	.content{
		color:$uni-text-color-placeholder;
		line-height:50rpx;
	}
	.u-card-wrap {
		background-color: $u-bg-color;
		padding: 1px;
	}
	$width:170rpx;
	.u-body-item {
		font-size: 32rpx;
		color: #333;
		padding: 20rpx 10rpx;
		justify-content: space-between;
	}
	.u-body-item image {
		width: $width;
		flex: 0 0 $width;
		height:280rpx;
		border-radius: 8rpx;
		margin-left: 12rpx;
	}
</style>
