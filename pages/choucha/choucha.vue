<template>
	<view class="u-wrap">
		<view class='u-bg'>
			<u-dropdown>
				<u-dropdown-item v-model="value1" title="状态" :options="options1"></u-dropdown-item>
				<u-dropdown-item v-model="value2" title="班次" :options="options2"></u-dropdown-item>
				<!-- <u-dropdown-item v-model="value3" title="班次" :options="options2"></u-dropdown-item> -->
			</u-dropdown>
		</view>
		<view v-if="get_data.length <=0">
			<u-empty text="暂无待抽查隐患" mode="list"></u-empty>
		</view>
		<view v-for="(item,i) in get_data" :key='item.ids'>
			<u-card :title="item.responsibledepartme" :sub-title="item.createdate" padding="30"
				@click="rectifyFun(item)">
				<view class="" slot="body">
					<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
						<view class="center  u-body-item-title u-line-2">
							<view class="u-body-item-title u-line-2 itempadding">检查人：{{split(item.inspeople)}}</view>
							<!-- <view class="u-body-item-title u-line-2 itempadding">检查单位：{{split(item.yh_origin)}}</view> -->
							<view class="u-body-item-title u-line-2 itempadding">检查单位：
								<view class="u-span" :style="{color:levelColor(item)}">
									{{split(item.yh_origin)}}
								</view>
							</view>
							<view class="u-body-item-title u-line-2 itempadding ">隐患内容：<text
									class="content">{{item.yh_content}}</text></view>
							<view class="u-body-item-title u-line-2 itempadding">隐患等级：
								<view class='u-span' :style="{color:item.yh_level.split('~')[2]}">
									{{split(item.yh_level)}}
								</view>
							</view>
							<view class="u-body-item-title u-line-2 itempadding">隐患状态：
								<view class="right u-span" :style="{color:stateColor(item.yh_state)}">{{ state(item.yh_state) }}
								</view>
							</view>
							<view class="u-body-item-title u-line-2 itempadding">班次：
								<view class="right u-span" >{{ item.oldofclass }}
								</view>
							</view>
						</view>
					</view>
					<view class="u-body-item u-flex u-row-between u-p-b-0 itempadding">
						<view class="u-body-item-title u-line-2">检查地点：{{item.address}}</view>
					</view>
				
				</view>
				<view class="" slot="foot">
					<view class="u-body-item u-flex u-row-between u-p-b-0">
						<view class="u-body-item-title u-line-2">要求完成时间：{{item.yh_requesttime}}</view>
					</view>
				</view>
			</u-card>
		</view>
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
				get_data: [],
				value1: 0,
				value2: 1,
				value3: 1,
				page: 1,
				options1: [{
						label: '所有',
						value: 0,
					},
					{
						label: '已下达',
						value: 2,
					},
					{
						label: '已整改',
						value: 3,
					},
					{
						label: '已销号',
						value: 4,
					}
				],
				options2: [{
						label: '八点班',
						value: 1,
					},
					{
						label: '四点班',
						value: 2,
					}, {
						label: '零点班',
						value: 3,
					}
				],
			}
		},
		onLoad() {
			this.getRquest();
		},
		computed: {
			...mapState(['user']),
			state() {
				const stateText = {
					0: '已录入',
					1: '已下达',
					2: "复查不通过",
					3: '分发',
					4: '整改',
					5: '待验收',
					6: '签字',
					7: '已整改',
					8: '已销号',
					9: '合格',
				}
				return val => {
					return stateText[val]
				}
			},
			stateColor() {
				const stateColor = {
					0: '#007aff',
					1: '#d2d2d2',
					7: '#f0ad4e',
					8: '#009688',
				}
				return val => {
					return stateColor[val]
				}
			}
		},
		methods: {
			rectifyFun() {

			},
			levelColor(d) {
				let bgcolor = {
					集团: 'red',
					矿: '#dada36',
				}
				let color = {
					集团: "#fff",
					矿: "#000",
				}
				return bgcolor[d.level]
			},
			split(v) {
				return v.split('~')[0]
			},
			async getRquest() {
				const users = this.$store.state.user
				let level = 'A';
				let bind = '';
				if (users) {
					level = users.level
					bind = users.department_id;
				}
				const get_data = await this.$http.post('/index/Hjob.ashx?type=sel', {
					T: "app_choucha_sql",
					tabid: 'YH_searchc90a546a-1ca9-489a-8646-ad8aef707ec7',
					mid: 'bfc4916f-b94f-40e0-aa97-1a1299559d83',
					job: 'demo_node_3',
					tbname: 'YH',
					page: this.page,
					limit: 10,
					department_id: this.user.department_id
				})
				if (get_data.data.data) {
					this.get_data = get_data.data.data;
				} else {
					this.get_data = []
				}
			}
		}
	}
</script>

<style lang="scss">
	.u-wrap {
		.u-bg {
			background: #fff;
		}
	}

	.u-span {
		display: inline;
	}

	.itempadding {
		padding: 10rpx 0;
	}

	.content {
		color: $uni-text-color-placeholder;
		line-height: 50rpx;
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
		height: 280rpx;
		border-radius: 8rpx;
		margin-left: 12rpx;
	}
</style>
