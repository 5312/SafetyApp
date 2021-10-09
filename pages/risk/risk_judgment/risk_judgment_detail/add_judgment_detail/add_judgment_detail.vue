<template>
	<view class="wrap">
		<u-form :model="form" ref="uForm">
			<u-form-item label="风险地点" required label-width="150rpx" prop="yp_address_list">
				<u-input v-model="form.yp_address_list" @click="ad_list = true" placeholder="请选择风险地点" />
			</u-form-item>
			<u-form-item label="研判时间" required label-width="150rpx" prop="yp_time">
				<u-input v-model="form.yp_time" type="select" :select-open="show" @click='show = true' />
				<u-picker v-model="show" mode="time" @confirm="confirm"></u-picker>
			</u-form-item>
			<u-form-item label="风险类型" required prop="yp_type" label-width="150rpx">
				<u-input v-model="form.yp_type" type="text" />
			</u-form-item>
			<u-form-item label="责任部门" required label-width="150rpx" prop="yp_resp_depname">
				<u-input v-model="form.yp_resp_depname" type="select" @click="depart = true" />
			</u-form-item>
			<u-form-item label="研判依据" prop="yp_bassis" label-width="150rpx">
				<u-input v-model="form.yp_bassis" type="textarea" />
			</u-form-item>
			<view class="confrim-btn">
				<u-button @click="submit">提交</u-button>
			</view>
		</u-form>
		<!-- 1 -->
		<u-popup v-model="ad_list" mode="center" border-radius='14' width='80%' height="80%">
			<Addresslist @list="addlist" @close="close" />
		</u-popup>
		<!-- 2 -->
		<u-popup v-model="depart" mode="center" border-radius='14' width='90%' height="90%">
			<view class="p_content">
				<scroll-view scroll-y="true" style="height: 90%;">
					<ly-tree v-if="isReady" ref="tree" :props="props" :showCheckbox='true' :ready="ready"
						:checkOnClickNode='true' :expandOnClickNode="true" :expandOnCheckNode="false" :lazy="true"
						:load='load' node-key="id">
					</ly-tree>
				</scroll-view>
				<view class="btngroup">
					<u-button size="medium" :ripple="true" shape="square" type="primary" @click="treeSelect">确定
					</u-button>
					<u-button size="medium" :ripple="true" shape="square" type="info" @click="depart=false">
						取消
					</u-button>
				</view>
			</view>
		</u-popup>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import LyTree from '@/components/ly-tree/ly-tree.vue';
	import Addresslist from '@/components/addresslist.vue';
	import Qs from 'qs'
	export default {
		components: {
			Addresslist
		},
		data() {
			return {
				// 部门
				isReady: false,
				ready: true,
				depart: false,
				props: {
					label: 'bumen_name',
					isleaf: 'havechild',
					disabled: 'disabled'
				},
				// 
				show: false,
				ad_list: false,
				form: {
					hd_id:'',
					yp_add_depid: '',
					yp_add_name: '',
					
					yp_address_list_id: '',
					yp_address_list: '',
					yp_type:'',
					
					yp_time: '',
					yp_resp_depid: '',
					yp_resp_depname: '',
					yp_leader:'',
					yp_leader_id:'',
					yp_bassis: ''
				},
				rules: {
					yp_address_list: [{
						required: true,
						message: '请选择评估范围',
						trigger: ['blur', 'change']
					}],
					yp_type: [{
						required: true,
						message: '请输入风险类型',
						trigger: ['blur', 'change']
					}],
					yp_resp_depname: [{
						required: true,
						message: '请选择责任部门',
						trigger: ['blur', 'change']
					}]
				}
			}
		},
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		onLoad(option) {
			this.form.hd_id = option.hd_id
			this.isReady = true;
			this.form.yp_add_depid = this.user.department_id
			this.form.yp_add_name = this.user.users_name
			this.form.yp_time = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
		},
		computed: {
			...mapState(['user']),
		},
		methods: {
			confirm(e) {
				this.form.yp_time = e.year + '-' + e.month + '-' + e.day
			},
			addlist(e) {
				this.form.yp_address_list = e.address_list
				this.form.yp_address_list_id = e.address_list_id
				this.ad_list = false
			},
			close() {
				this.ad_list = false
			},
			treeSelect() {
				// 选中的部门数据
				let sel = this.$refs.tree.getCheckedNodes()
				if (sel.length != 0) {
					let bids = [];
					let bname = [];
					for (var i = 0; i < sel.length; i++) {
						const ele = sel[i];
						bids.push(ele.id)
						bname.push(ele.bumen_name)
					}
					this.form.yp_resp_depid = bids.join(',')
					this.form.yp_resp_depname = bname.join(',')
					this.depart = false

				} else {
					this.$refs.uToast.show({
						title: '请选择部门',
						type: 'error',
					})
				}
			},
			load(node, resolve) {
				let function_perms = ''
				if (this.user.function_perms) {
					function_perms = this.user.function_perms.split(",")
				}
				let perms = {
					permsid: function_perms.join("','")
				}
				if (node.key) {
					perms = {}
				}
				let params = Object.assign({
					tabid: 'YH_liebiao178698a5-ccf0-439a-8cf1-f4d8dc8121d8',
					mid: '9c6a100d-8543-438e-9311-ce6a38e75cae',
					job: 'demo_node_1',
					tbname: 'YH',
					T: '部门管理sql',
					level: 'A',
					pid: node.key,
				}, perms)
				this.$http.get('/index/Hjob.ashx?type=sel', params).then(res => {
					let array = res.data.data;
					if (array) {
						resolve(array)
					} else {
						resolve([])
					}
				})
			},
			submit() {
				let params = this.form;

				let add = [];
				for (let key in this.form) {
					add.push(key)
				}
			 
				this.$refs.uForm.validate(valid => {
					if (valid) {
						this.$http.post('/index/Hjob.ashx?type=add&' + Qs.stringify({
							mid: 'fde20747-4d22-4c71-82ed-816479412fe4',
							tabid: 'fx_zyanpan8d3e0a67-b4d7-42c5-8bb0-bafb0356699a',
							job: 'demo_node_1',
							tbname: 'fx_yp',
						}), {
							add: add,
							...params
						}).then(res => {
							if (res.data.statusCode) {
								this.$u.route({
									type:'back',
									// url:'../risk_judgment_detail',
									// params:{
									// 	hd_id:this.hd_id
									// }
								})
							}
						})
					} else {
						console.log('验证失败');
					}
				})

			}
		}
	}
</script>

<style scoped lang="scss">
	.wrap {
		background-color: #fff;
		width: 90%;
		margin: auto;
		margin-top: 20rpx;
		border-radius: 10rpx;
		padding: 10rpx 25rpx;

		.p_content {
			padding: 24rpx;
			height: 100%;
			overflow: hidden;

			.btngroup {
				background: #fff;
				bottom: 10rpx;
				left: 0;
				text-align: center;
				right: 0;
				margin: auto;

				button {
					margin: 10rpx;
				}
			}
		}
	}
</style>
