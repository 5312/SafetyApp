<template>
	<view class="u-wrap">
		<view v-if="rectify_data.length <=0">
			<u-empty text="暂无待整改隐患" mode="list"></u-empty>
		</view>

		<view v-for="(item,i) in rectify_data" :key='item.ids'>
			<u-card :title="item.responsibledepartme" @click="rectifyFun(item)" :sub-title="item.createdate"
				padding="30">
				<view class="" slot="body">
					<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
						<view class="center  u-body-item-title u-line-2">
							<view class="u-body-item-title u-line-2 itempadding">检查人：<view class="u-span color">
									{{split(item.inspeople)}}
								</view>
							</view>
							<view class="u-body-item-title u-line-2 itempadding">检查单位：
								<view class="u-span color" :style="{color:levelColor(item)}">
									{{split(item.yh_origin)}}
								</view>
							</view>
							<view class="u-body-item-title u-line-2 itempadding ">隐患内容：<text
									class="content">{{item.yh_content}}</text></view>
							<view class="u-body-item-title u-line-2 itempadding">隐患等级：
								<view class='u-span'
									:style="{color:item.yh_level.split('~')[2]}">{{split(item.yh_level)}}
								</view>
							</view>
						</view>
						 
					</view>
					<view class="u-body-item u-flex u-row-between u-p-b-0 itempadding">
						<view class="u-body-item-title u-line-2">检查地点：<view class="u-span color">{{item.address}}</view>
						</view>
					</view>
					 
				</view>
				<view class="" slot="foot">
					<view class="u-body-item u-flex u-row-between u-p-b-0">
						<view class="u-body-item-title u-line-2">要求完成时间：<view class="u-span timecolor">
								{{item.yh_requesttime}}
							</view>
						</view>
					</view>
				</view>
			</u-card>
		</view>
		<u-loadmore :status="loadStatus" :load-text="loadText" bgColor="#f2f2f2"></u-loadmore>
		<u-popup v-model="show" mode="center" border-radius="14" width='80%'>
			<u-card :title="form.responsibledepartme">
				<view class="" slot="body">
					<u-form :model="form" ref='uForm'>
						<u-form-item label="整改措施:" :required='true' label-width='150' prop="yh_rectify_step">
							<u-input type="textarea" v-model="form.yh_rectify_step" />
						</u-form-item>
						<u-form-item label="整改人:" :required='true' label-width='150' prop="rectify_time">
							<u-input type="text" v-model="form.rectify_man" />
						</u-form-item>
						<u-form-item label="整改情况:" :required='true' label-width='150' prop="rectify_state">
							<u-input type="text" v-model="form.rectify_state" />
						</u-form-item>
					</u-form>
				</view>
				<view slot="foot" class="btnbox u-flex u-flex-nowrap uicon-file-text-fill">
					<u-button class="btn" type="success" :ripple="true" size="medium" @click='submit'>整改</u-button>
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
	import util from '@/config/utils'
	export default {
		data() {
			return {
				show: false,
				form: {
					rectify_time: new Date(),
					yh_rectify_step: '已完成',
					rectify_state: '已完成',
					rectify_man: '',
				},
				nomore:false,
				page:1,
				rectify_data: [],
				loadStatus: 'loadmore',
				loadText: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '实在没有了'
				}
			}
		},
		onLoad() {
			this.getRquest();
		},
		computed: {
			...mapState(['user']),
		},
		onReachBottom(){
			if(!this.nomore){
				this.loadStatus = "loading"
				this.page += 1;
				this.getRquest(true);
			}
		},
		methods: {
			split(v) {
				return v.split('~')[0]
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
			rectifyFun(obj) {
				this.form = obj
				this.show = true;
				console.log(this.form)
				this.form.rectify_man = this.user.users_name
				this.form.yh_rectify_step = '已完成'
				this.form.rectify_state = '已完成'
			},
			async getRquest(isPush = false) {
				const users = this.$store.state.user
				let level = 'A';
				let bind = '';
				if (users) {
					level = users.level
					bind = users.department_id;
				}
				const zhengai = await this.$http.post('/index/Hjob.ashx?type=sel', {
					tabid: 'YH_zhenggaiba7d4c77-887b-4775-a4e6-912366f65e49',
					mid: '58bee662-ca80-4356-b769-8d6ec116f5f7',
					job: 'demo_node_1',
					tbname: "YH",
					T: "app_yhzg_sql",
					level: level,
					department_id: bind,
					page: this.page,
					limit: 10
				})
				if (zhengai.data.data) {
					this.loadStatus = "loadmore"
					if(isPush){
						this.rectify_data.push(...zhengai.data.data)
					}else{
						this.rectify_data = zhengai.data.data;
					}
				} else {
					this.loadStatus = "nomore";
					this.nomore = true;
				}
				this.show = false;
			},
			submit() {
				// 责任单位可退回
				if (this.form.responsibledepartmeid != this.user.department_id) {
					this.$refs.uToast.show({
						title: '责任单位可整改',
						type: 'error',
					})
					return;
				}
				if (this.verifi()) {
					this.$http.post('/index/Hjob.ashx?type=ajaxaddup', {
						id: this.form.ids,
						mid: ' 58bee662-ca80-4356-b769-8d6ec116f5f7',
						tabid: 'YH_zhenggai40b54c26-afa3-4f2a-a848-eb15df17f7c5',
						job: 'demo_node_1',
						T: ' update',
						tbname: 'YH',
						yh_state: 7,
						yh_rectify_step: this.form.yh_rectify_step,
						rectify_time: util.toDateString(new Date(), 'yyyy-MM-dd'),
						rectify_man: this.form.rectify_man,
						rectify_state: this.form.rectify_state,
					}).then(res => {
						this.getRquest();
					})
				}
			},
			verifi() {
				if (this.form.yh_rectify_step == '') {
					this.$refs.uToast.show({
						title: '请输入整改措施',
						type: 'error',
					})
					return false
				}
				if (this.form.rectify_man == '') {
					this.$refs.uToast.show({
						title: '请输入整改人',
						type: 'error',
					})
					return false
				}
				if (this.form.rectify_state == '') {
					this.$refs.uToast.show({
						title: '请输入整改情况',
						type: 'error',
					})
					return false
				}
				return true
			}
		}
	}
</script>

<style lang="scss">
	.u-wrap{
		padding-bottom: 20rpx;
	}
	.itempadding {
		padding: 10rpx 0;
	}

	.u-span {
		display: inline;
	}

	.timecolor {
		color: $uni-text-color-grey;
	}

	.color {
		color: $uni-color-subtitle;
	}

	.content {
		color: $uni-color-subtitle;
		color: $uni-color-subtitle;
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
