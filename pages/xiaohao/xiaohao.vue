<template>
	<view class="u-wrap">
		<view v-if="get_data.length <=0">
			<u-empty text="暂无待复查隐患" mode="list"></u-empty>
		</view>
		<view v-for="(item,i) in get_data" :key='item.ids'>
			<u-card :title="item.responsibledepartme" :sub-title="item.createdate" padding="30"
				@click="rectifyFun(item)">
				<view class="" slot="body">
					<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
						<view class="center  u-body-item-title u-line-2">
							<view class="u-body-item-title u-line-2 itempadding">检查人：{{split(item.inspeople)}}</view>
							<view class="u-body-item-title u-line-2 itempadding">检查单位：
								<view class="u-span" :style="{color:levelColor(item)}">
									{{split(item.yh_origin)}}
								</view>
							</view>
							<view class="u-body-item-title u-line-2 itempadding ">隐患内容：<text
									class="content">{{item.yh_content}}</text></view>
							<view class="u-body-item-title u-line-2 itempadding ">隐患状态：<text
									class="content">{{state(item.yh_state) }}</text></view>
							<view class="u-body-item-title u-line-2 itempadding">隐患等级：

								<view class='u-span' :style="{color:item.yh_level.split('~')[2]}">
									{{split(item.yh_level)}}
								</view>
							</view>
						</view>
					</view>
					<view class="u-body-item u-flex u-row-between u-p-b-0 itempadding">
						<view class="u-body-item-title u-line-2">检查地点：
							<view class="u-span timecolor">
								{{item.address}}
							</view>
						</view>
					</view>
				</view>
				<view class="" slot="foot">
					<view class="u-body-item u-flex u-row-between u-p-b-0">
						<view class="u-body-item-title u-line-2">要求完成时间：
							<view class="u-span timecolor">{{item.yh_requesttime}}</view>
						</view>
					</view>
				</view>
			</u-card>
		</view>
		<u-loadmore v-if="get_data.length >0" :status="loadStatus" :load-text="loadText" bgColor="#f2f2f2"></u-loadmore>
		<u-popup v-model="show" mode="center" border-radius="14" width='80%'>
			<u-card :title="form.responsibledepartme">
				<view class="" slot="body">
					<u-form :model="form" ref='uForm'>
						<u-form-item label="复查人:" :required='true' label-width='150' prop="yh_review">
							<u-input type="text" v-model="form.yh_review" />
						</u-form-item>
						<u-form-item label="复查情况:" :required='true' label-width='150' prop="yh_review_state">
							<u-input type="text" v-model="form.yh_review_state" />
						</u-form-item>
						<u-form-item label="复查结果:" :required='true' label-width='150' prop="yh_state">
							<u-radio-group v-model="form.yh_state" @change="radioGroupChange">
								<u-radio name='8'>通过并销号</u-radio>
								<u-radio name='2'>复查不通过</u-radio>
							</u-radio-group>
						</u-form-item>

					</u-form>
				</view>
				<view slot="foot" class="btnbox u-flex u-flex-nowrap uicon-file-text-fill">
					<u-button class="btn" type="success" :ripple="true" size="medium" @click='submit'>复查</u-button>
					<u-button class="btn" type="primary" :ripple="true" size="medium" @click="show = false">取消
					</u-button>
				</view>

			</u-card>
		</u-popup>


		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import LyTree from '@/components/ly-tree/ly-tree.vue'
	import util from '@/config/utils.js'
	export default {
		data() {
			return {
				show: false,
				form: {},
				loadStatus: 'loadmore',
				loadText: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '实在没有了'
				},
				nomore: false,
				page: 1,
				get_data: [],
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
		},
		onReachBottom() {
			if (!this.nomore) {
				this.loadStatus = "loading"
				this.page += 1;
				this.getRquest(true);
			}
		},
		methods: {
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
			radioGroupChange() {

			},
			submit() {
				console.log('复查销号', this.form)
				if (this.vifer()) {
					this.$http.post('/index/Hjob.ashx?type=ajaxaddup', {
						id: this.form.ids,
						mid: 'b9407da8-b0ed-4b91-bd81-226e4d7e319a',
						tabid: 'YH_xiada6f716b7b-bade-4b02-98ec-10b7f83c4050',
						job: ' demo_node_1',
						tbname: 'YH',
						T: 'updatesql',
						yh_review: this.form.yh_review,
						yh_review_time: this.$u.timeFormat(new Date(), 'yyyy-mm-dd'),
						yh_review_state: this.form.yh_review_state,
						yh_state: this.form.yh_state
					}).then(res => {
						this.show = false;
						this.$refs.uToast.show({
							title: '复查成功',
							type: 'success',
						})
						this.getRquest()
					})
				}
			},
			vifer() {
				if (!this.form.yh_review) {
					this.$refs.uToast.show({
						title: '请输入复查人',
						type: 'error',
					})
					return false
				}
				if (!this.form.yh_review_state) {
					this.$refs.uToast.show({
						title: '请输入复查情况',
						type: 'error',
					})
					return false
				}
				if (this.form.yh_state == '7') {
					this.$refs.uToast.show({
						title: '请输入复查结果',
						type: 'error',
					})
					return false
				}
				return true
			},
			handleNodeExpand() {},
			handleNodeClick() {},
			split(v) {
				return v.split('~')[0]
			},
			rectifyFun(obj) { // 下达弹窗
				this.form = obj

				this.form.yh_state = 8
				this.form.yh_review = this.user.users_name; // 复查人
				this.form.yh_review_state = '已完成'; // 复查人

				this.show = true
			},
			async getRquest(isPush = false) {
				const users = this.$store.state.user
				let bind = '';
				if (users) {
					bind = users.department_id;
				}
				const get_data = await this.$http.post('/index/Hjob.ashx?type=sel', {
					T: "app_xh_sql",
					page: this.page,
					limit: 10,
					department_id: bind
				})
				if (get_data.data.data) {
					// this.get_data = get_data.data.data;
					this.loadStatus = "loadmore"
					if (isPush) {
						this.get_data.push(...get_data.data.data)
					} else {
						this.get_data = get_data.data.data;
					}
				} else {
					this.loadStatus = "nomore";
					this.nomore = true;
				}
			}
		}
	}
</script>

<style lang="scss">
	.u-wrap {
		padding-bottom: 20rpx;
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

	.u-span {
		display: inline;
	}

	.timecolor {
		color: $uni-text-color-grey;
	}

	.u-body-item image {
		width: $width;
		flex: 0 0 $width;
		height: 280rpx;
		border-radius: 8rpx;
		margin-left: 12rpx;
	}

	.btnbox {
		text-align: right;
		justify-content: space-between;

		.btn {
			margin: 10rpx;
		}
	}

	.btngroup {
		position: fixed;
		z-index: 2;
		background: #fff;
		bottom: 68rpx;
		padding: 15rpx;
		width: 80%;
		left: 0;
		text-align: center;
		right: 0;
		margin: auto;

		button {
			margin: 10rpx;
		}
	}
</style>
