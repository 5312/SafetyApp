<template>
	<view class="wrap">
		<view>
			<view>
				<u-field v-model="address_list" @click="ad_list = true" :disabled="true" required label="评估范围"
					placeholder="请填写评估范围">
				</u-field>
				<u-field v-model="bassis_list" required label="评估标准" placeholder="请填写评估标准">
				</u-field>
				<!--  -->
				<u-field v-model="nd_list_nae" :select-open='depart' right-icon="arrow-down-fill" @click="show = true"
					:disabled='true' required label="年度" placeholder="请填写年度">
				</u-field>
				<u-picker v-model="show" mode="time" @confirm="time" :params="params"></u-picker>
				<!--  -->
				<u-field :error-message="errorbumn" :disabled="true" v-model="nd_resp_bumenname" required label="责任部门"
					@click='depart = true' placeholder="请填写责任部门">
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
				<u-field v-model="be_resp_leadern" label="负责领导" placeholder="请填写负责领导">
				</u-field>
				<u-field v-model="nd_mark" type="textarea" label="备注" placeholder="请填写备注">
				</u-field>
			</view>
			<view class="confrim-btn">
				<u-button @click="submit">提交</u-button>
			</view>
		</view>
		<u-popup v-model="ad_list" mode="center"  border-radius='14' width='80%' height="80%">
			<Addresslist  @list="addlist" @close="close" />
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
				errorbumn: '',
				address_list_id:"",
				address_list: '',
				bassis_list: '',
				nd_list_nae: '',
				nd_respone_bumen: '',
				nd_resp_bumenname: '',
				be_resp_leadern: '',
				nd_mark: '',
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
		onLoad() {
			this.isReady = true;
			this.nd_list_nae = new Date().getFullYear()+'-'+ (new Date().getMonth()+1)+'-'+ (new Date().getDate());
		},
		computed: {
			...mapState(['user', 'userid', 'list']),
		},
			
		methods: {
			addlist(e){
				// 子组件传值
				this.address_list_id = e.address_list_id;
				this.address_list = e.address_list;
				
				this.ad_list = false;
			},
			close(){
				this.ad_list = false
			},
			time(e) {
				this.nd_list_nae = e.year +'-'+e.month +'-'+e.day
			},
			submit() {
				if (this.nd_resp_bumenname == '') {
					this.errorbumn = '请选择责任部门';
					return
				} else {
					this.errorbumn = '';
				}
				
				let a = Qs.stringify({
					isadd: 1,
					add:['zx_add_dep','zx_address_id','zx_address_list','zx_standard','zx_time','zx_resp_deptid','zx_resp_bumenid','zx_leader','zx_leader_name','zx_mark'],
					zx_add_dep: this.user.department_id,
					zx_address_id: this.address_list_id,
					zx_address_list: this.address_list,
					zx_standard: this.bassis_list,
					zx_time: this.nd_list_nae,
					
					zx_resp_deptid: this.nd_respone_bumen,
					zx_resp_bumenid: this.nd_resp_bumenname,
					
					zx_leader:'',
					zx_leader_name: this.be_resp_leadern,
					zx_mark: this.nd_mark
				},{indices:false})
				
				let url = Qs.stringify({
					mid:'80313f2e-9f75-458d-8521-b55cc2cdea53',
					tabid: 'fx_zhuanxiang_psa2108613-b111-4cdd-8c7a-3dc7b2252983',
					job:' demo_node_1',
					tbname:'zx_fx_ps'
				})
				this.$http.post('/index/Hjob.ashx?type=add&'+url,Qs.parse(a)).then(res => {
					if (res.data.statusCode == 200) {
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
					this.nd_respone_bumen = bids.join(',')
					this.nd_resp_bumenname = bname.join(',')
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
