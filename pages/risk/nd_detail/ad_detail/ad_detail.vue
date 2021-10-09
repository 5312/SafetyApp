<template>
	<view class="wrap">
		<view>
			<view>
				<!--  -->
				<u-field :error-message="errorbumn" :disabled="true" v-model="nd_d_ps_detp" required label="辨识部门"
					@click='depart = true' placeholder="请填写辨识部门">
				</u-field>
				<u-popup v-model="depart" mode="center" border-radius='14' width='90%' height="90%">
					<view class="p_content">
						<scroll-view scroll-y="true" style="height: 90%;">
							<ly-tree v-if="isReady" ref="tree" :props="props" :showCheckbox='true' :ready="ready"
								:checkOnClickNode='true' :expandOnClickNode="true" :expandOnCheckNode="false"
								:lazy="true" :load='load' node-key="id">
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
				<u-field v-model="nd_d_bassis" :error-message="bass_err" required label="评估标准" placeholder="请填写评估标准">
				</u-field>
				<u-field v-model="nd_d_address" :error-message="addlist_err" @click="ad_list = true" :disabled="true"
					required label="风险点" placeholder="请填写风险点">
				</u-field>
				<u-field v-model="nd_d_type" :error-message="riskType_err" @click="risk_type = true" :select-open='risk_type'
					right-icon="arrow-down-fill" :disabled="true" required label="风险类型">
				</u-field>
				<u-select v-model="risk_type" :list="risk_type_data" :default-value="[0]" @confirm="type_select">
				</u-select>
				<!--  -->
				<u-field v-model="nd_d_time" :select-open='depart' right-icon="arrow-down-fill" @click="show = true"
					:disabled='true' required label="评估时间" placeholder="请填写评估时间">
				</u-field>
				<u-picker v-model="show" mode="time" @confirm="time" :params="params"></u-picker>
				<!--  -->
				<u-field v-model="nd_d_result" @click="res_show = true" :select-open='res_show'
					right-icon="arrow-down-fill" :error-message="result_err" :disabled="true" required label="评估结果">
				</u-field>
				<u-select v-model="res_show" :list="results_data" :default-value="[0]" @confirm="result_select">
				</u-select>
				<u-field v-model="nd_d_mark" type="textarea" label="风险描述" placeholder="请填写风险描述">
				</u-field>
			</view>
			<view class="confrim-btn">
				<u-button @click="submit">提交</u-button>
			</view>
		</view>
		<u-popup v-model="ad_list" mode="center" border-radius='14' width='80%' height="80%">
			<Addresslist @list="addlist" @close="close" />
		</u-popup>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import Qs from 'qs'
	import LyTree from '@/components/ly-tree/ly-tree.vue';
	import Addresslist from '@/components/addresslist.vue';
	export default {
		components: {
			Addresslist
		},
		data() {
			return {
				isReady: false,
				ready: true,
				depart: false,
				props: {
					label: 'bumen_name',
					isleaf: 'havechild',
					disabled: 'disabled'
				},
				show: false,
				ad_list: false,
				// 错误提示
				errorbumn: '',
				bass_err: '',
				addlist_err: '',
				riskType_err:'',
				result_err:'',
				nd_d_address_id: "",
				nd_d_address: '',
				// 辨识部门
				nd_d_ps_detpid: '',
				nd_d_ps_detp: '',
				// 评估指标
				nd_d_bassis: '',
				// 风险类型
				nd_d_type: '',
				risk_type: false,
				risk_type_data: [{
						value: '人',
						label: '人'
					},
					{
						value: '机',
						label: '机'
					},
					{
						value: '管',
						label: '管'
					},
					{
						value: '还',
						label: '还'
					}
				],
				// 风险描述
				nd_d_mark: '',
				// 评估结果
				res_show: false,
				nd_d_result: '',
				results_data: [{
					value: '重大风险',
					label: '重大风险'
				}, {
					value: '较大风险',
					label: '较大风险'
				}, {
					value: '一般风险',
					label: '一般风险'
				}, {
					value: '低风险',
					label: '低风险'
				}],
				params: {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false
				},
			}
		},
		onLoad(option) {
			this.isReady = true;
			this.nd_d_time = new Date().getFullYear() + '-' + (new Date().getMonth() * 1 + 1) + '-' + new Date()
				.getDate();

			this.ndid = option.ndid
		},
		computed: {
			...mapState(['user', 'userid', 'list']),
		},

		methods: {
			addlist(e) {
				// 子组件传值
				this.nd_d_address_id = e.address_list_id;
				this.nd_d_address = e.address_list;

				this.ad_list = false;
			},
			close() {
				this.ad_list = false
			},
			time(e) {
				this.nd_d_time = e.year + '-' + e.month + '-' + e.day
			},
			type_select(e) {
				this.nd_d_type = e[0].value
			},
			result_select(e) {
				this.nd_d_result = e[0].value
			},
			verifyErrorEmpty(){
				this.errorbumn = '';
				this.bass_err = '';
				this.addlist_err = '';
				this.riskType_err = '';
				this.result_err = '';
			},
			verify() {
				this.verifyErrorEmpty();
				if (this.nd_d_ps_detpid == '') {
					this.errorbumn = '请选择辨识部门';
					return false
				}
				if (this.nd_d_bassis == '') {
					this.bass_err = '请选择评估标准';
					return false
				}
				if (this.nd_d_address_id == '') {
					this.addlist_err = '请选择风险点';
					return false
				}
				
				if (this.nd_d_type == '') {
					this.riskType_err = '请选择风险类型';
					return false
				}
				
				if (this.nd_d_result == '') {
					this.result_err = '请选择评估结果';
					return false
				}
				return true;
			},
			submit() {
				if (!this.verify()) {
					return
				}
				let a = Qs.stringify({
					isadd: 1,
					add: ['nd_fx_ps_pid', 'nd_d_ps_detpid', 'nd_d_ps_detp', 'nd_d_bassis', 'nd_d_type',
						'nd_d_address',
						'nd_d_address_id', 'nd_d_mark', 'nd_d_result', 'nd_d_time'
					],
					nd_fx_ps_pid: this.ndid,
					nd_d_ps_detpid: this.nd_d_ps_detpid,
					nd_d_ps_detp: this.nd_d_ps_detp,
					nd_d_bassis: this.nd_d_bassis,
					nd_d_type: this.nd_d_type,
					nd_d_address: this.nd_d_address,
					nd_d_address_id: this.nd_d_address_id,
					nd_d_mark: this.nd_d_mark,
					nd_d_result: this.nd_d_result,
					nd_d_time: this.nd_d_time
				}, {
					indices: false
				})

				let url = Qs.stringify({
					mid: '52b091bc-c0bf-48fd-b03a-785500f08db0',
					tabid: 'nd_fx_detaila7da660c-3527-419e-94a1-d45e851759f5',
					job: 'demo_node_1',
					tbname: 'nd_fx_detail'
				})
				this.$http.post('/index/Hjob.ashx?type=add&' + url, Qs.parse(a)).then(res => {
					if (res.data.statusCode == "200") {
						this.$u.route({
							type:'back'
						})
					}
				})
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
			treeSelect() { // 责任部门
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
					this.nd_d_ps_detpid = bids.join(',')
					this.nd_d_ps_detp = bname.join(',')
					this.depart = false

				} else {
					this.$refs.uToast.show({
						title: '请选择部门',
						type: 'error',
					})
				}
			},
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
		padding: 10rpx;

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
