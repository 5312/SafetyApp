<template>
	<view class="u-wrap">
		<view v-if="get_data.length <=0">
			<u-empty text="暂无待下达隐患" mode="list"></u-empty>
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
							<view class="u-body-item-title u-line-2 itempadding">隐患等级：
								<view class='u-span' :style="{color:item.yh_level.split('~')[2]}">
									{{split(item.yh_level)}}
								</view>
							</view>
						</view>
					</view>
					<view class="u-body-item u-flex u-row-between u-p-b-0 itempadding">
						<view class="u-body-item-title u-line-2">检查地点：{{item.address}}</view>
					</view>
					<!-- 		<view class="u-body-item u-flex u-row-between u-p-b-0 itempadding">
						<view class="u-body-item-title u-line-2">详细地点：{{item.address}}</view>
					</view> -->
				</view>
				<view class="" slot="foot">
					<!-- <u-icon name="chat-fill" size="34" color="" label="30评论"></u-icon> -->
					<view class="u-body-item u-flex u-row-between u-p-b-0">
						<view class="u-body-item-title u-line-2">要求完成时间：
							<view class="u-span timecolor">{{item.yh_requesttime}}</view>
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
						<u-form-item label="隐患详情:" label-width='150' prop="yh_content">
							<u-input type="textarea" :disabled='true' v-model="form.yh_content" />
						</u-form-item>
						 

					</u-form>
				</view>
				<view slot="foot" class="btnbox u-flex u-flex-nowrap uicon-file-text-fill">
					<u-button class="btn" type="success" :ripple="true" size="medium" @click='submit'>下达</u-button>
					<u-button class="btn" type="primary" :ripple="true" size="medium" @click="show = false">取消
					</u-button>
				</view>

			</u-card>
		</u-popup>
		<u-popup v-model="copy" mode="center" border-radius='14' width='90%' height="90%">
			<ly-tree ref="chasong" :props="props" :showRadio='true' :tree-data="treeData" :ready="ready" node-key="id"
				@node-expand="handleNodeExpand" @node-click="handleNodeClick">
			</ly-tree>
			<view class="btngroup">
				<u-button size="medium" :ripple="true" shape="square" type="primary" @click="copyFunc">确定
				</u-button>
				<u-button size="medium" :ripple="true" shape="square" type="info" @click="copy=false">取消
				</u-button>
			</view>
		</u-popup>
		<u-popup v-model="receive" mode="center" border-radius='14' width='90%' height="90%">
			<ly-tree ref="jieshou" :props="props" :showRadio='true' :tree-data="treeData" :ready="ready" node-key="id"
				@node-expand="handleNodeExpand" @node-click="handleNodeClick">
			</ly-tree>
			<view class="btngroup">
				<u-button size="medium" :ripple="true" shape="square" type="primary" @click="receiveFunc">确定
				</u-button>
				<u-button size="medium" :ripple="true" shape="square" type="info" @click="receive=false">取消
				</u-button>
			</view>
		</u-popup>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import LyTree from '@/components/ly-tree/ly-tree.vue'
	import util from '@/config/utils.js'
	export default {
		data() {
			return {
				show: false,
				copy: false,
				receive: false, // 接收
				ready: false,
				form: {},
				yh_copy: '',
				yh_receive: "",
				departmentData: [],
				props: {
					label: 'bumen_name', // 指把数据中的‘personName’当做label也就是节点名称
					children: 'children' // 指把数据中的‘childs’当做children当做子节点数据
				},
				propsType: {
					label: 'dict_name', // 指把数据中的‘personName’当做label也就是节点名称
					children: 'children' // 指把数据中的‘childs’当做children当做子节点数据
				},
				rangeKey: 'bumen_name',
				get_data: [],
				page:1,
				nomore:false,
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
			// this.bumenTree();
		},
		onReachBottom(){
			if(!this.nomore){
				this.loadStatus = "loading"
				this.page += 1;
				this.getRquest(true);
			}
		},
		computed: {

			treeData() {
				const childrenData = util.toTreeData(this.departmentData, 'id', 'pid', 'children', '')
				return childrenData
			},
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
			bumenTree() {
				const department = uni.getStorageSync('depart');
				if (department) {
					this.departmentData = department
				} else {
					this.$http.get('/index/Hjob.ashx?type=sel', {
						tabid: 'YH_liebiao178698a5-ccf0-439a-8cf1-f4d8dc8121d8',
						mid: '9c6a100d-8543-438e-9311-ce6a38e75cae',
						job: 'demo_node_1',
						tbname: 'YH',
						T: '部门管理sql',
						level: 'A'
					}).then(res => {
						this.departmentData = res.data.data
						uni.setStorageSync('depart', res.data.data)
					})
				}
				this.ready = true
			},
			treeFunc() {
				this.copy = true;
			},
			resFunc() {
				this.receive = true;
			},
			copyFunc() {
				// 抄送
				// console.log('抄送')
				// 选中的部门数据
				let sel = this.$refs.chasong.getCheckedNodes()
				if (sel.length != 0) {
					this.form.yh_copy = sel[0].bumen_name + '~' + sel[0].id;
					this.form.yh_copyt = sel[0].bumen_name;
					this.yh_copy = sel[0].bumen_name;
					this.copy = false;
				} else {
					this.$refs.uToast.show({
						title: '请选择抄送部门',
						type: 'error',
					})
				}
			},
			receiveFunc() {
				// 接收
				// console.log(' 接收')
				// 选中的部门数据
				let sel = this.$refs.jieshou.getCheckedNodes()
				if (sel.length != 0) {
					this.form.yh_receive = sel[0].bumen_name + '~' + sel[0].id;
					this.form.yh_receivet = sel[0].bumen_name;
					this.yh_receive = sel[0].bumen_name;
					this.receive = false;
				} else {
					this.$refs.uToast.show({
						title: '请选择接收部门',
						type: 'error',
					})
				}
			},
			submit() {
				// console.log('下达', this.form)
				if (true) {
					this.$http.post('/index/Hjob.ashx?type=ajaxaddup', {
						id: this.form.ids,
						mid: 'b9407da8-b0ed-4b91-bd81-226e4d7e319a',
						tabid: 'YH_xiada5b7ae5f8-52da-4b50-affd-d735627b1322',
						job: ' demo_node_1',
						tbname: 'YH',
						T: 'updatesql',
						// yh_receive: this.form.yh_receive,
						// yh_copy: this.form.yh_copy,
						yh_state: 1
					}).then(res => {
						this.show = false;
						this.$refs.uToast.show({
							title: '下达成功',
							type: 'success',
						})
						// this.get_data = []
						this.getRquest()
					})
				}
			},
			handleNodeExpand() {},
			handleNodeClick() {},
			split(v) {
				return v.split('~')[0]
			},
			rectifyFun(obj) { // 下达弹窗
				this.form = obj
				this.yh_copy = this.split(obj.yh_copy)
				this.yh_receive = this.split(obj.yh_receive)
				this.show = true
			},
			async getRquest(isPush = false) {
				const users = this.$store.state.user
				let level = 'A';
				let bind = '';
				if (users) {
					level = users.level
					bind = users.department_id;
				}
				const get_data = await this.$http.post('/index/Hjob.ashx?type=sel', {
					T: "隐患列表_无cookie_sql",
					level: level,
					department_id: bind,
					state: 0,
					page: this.page,
					limit: 10
				})
				if (get_data.data.data) {
					this.loadStatus = "loadmore"
					if(isPush){
						this.get_data.push(...get_data.data.data)
					}else{
						this.get_data = get_data.data.data;	
					}
				} else {
					this.loadStatus = "nomore";
					this.nomore = true;
					// this.get_data = []
				}
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

	.content {
		color: $uni-text-color-placeholder;
		line-height: 50rpx;
	}

	.u-span {
		display: inline;
	}

	.u-card-wrap {
		background-color: $u-bg-color;
		padding: 1px;
	}

	.timecolor {
		color: $uni-text-color-grey;
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
