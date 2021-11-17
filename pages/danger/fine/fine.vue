<template>
	<view class="u-wrap">
		<u-form :model="form" ref="uForm">
			<u-form-item label="关联隐患" label-width="140rpx" prop="link_yh">
				<u-input v-model="form.link_yh" disabled @click="link_yh" />
			</u-form-item>
			<u-form-item label="罚款时间" label-width="140rpx" prop="fine_time">
				<u-input v-model="form.fine_time" type="select" :select-open="time" @click="time = true" />
				<u-calendar v-model="time" mode="date" :max-date="maxdate" @change='change_time'></u-calendar>
			</u-form-item>
			<u-form-item label="罚款人" label-width="140rpx" prop="fine_penalty_name">
				<u-input v-model="form.fine_penalty_name" @click="people" />
			</u-form-item>
			<u-form-item label="问题描述" label-width="140rpx" prop="fine_desc">
				<u-input v-model="form.fine_desc" disabled type="text" />
			</u-form-item>

			<u-form-item label="责任追究" label-width="140rpx">
				<u-switch slot="right" v-model="form.accountabilitys"></u-switch>
			</u-form-item>
			<u-button :plain="true" type="primary" @click="num.push({responsible_person_name: '',
					responsible_person: '',
					responsible_name: '',
					responsible: '',
					fine_sum: '',
					fine_basis: ''})">添加责任单位</u-button>
			<view class="group" v-for="x,y in num" :key="y">
				<u-form-item label="责任部门" label-width="140rpx">
					<u-input v-model="x.responsible_person_name" :select-open='depart' type="select"
						@click='openTree(y)' />
				</u-form-item>
				<u-form-item label="责任人" label-width="140rpx">
					<u-input v-model="x.responsible_name" />
				</u-form-item>
				<u-form-item label="罚款金额" label-width="140rpx">
					<u-input v-model="x.fine_sum" type="number" />
				</u-form-item>
				<u-form-item label="处罚依据" label-width="140rpx">
					<u-input v-model="x.fine_basis" disabled @click="bassis(y)" />
				</u-form-item>
				<u-line color="red" />
			</view>
			<u-button type="success" class="btn" @click="submit">保存</u-button>
		</u-form>
		<u-popup v-model="depart" mode="center" border-radius='14' width='90%' height="90%">
			<view class="p_content">
				<scroll-view scroll-y="true" style="height: 90%;">
					<ly-tree v-if="isReady" ref="tree" :props="props" :showRadio='true' :ready="ready"
						:checkOnClickNode='true' :lazy="true" :load='load' node-key="id">
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
	import LyTree from '@/components/ly-tree/ly-tree.vue'
	import util from '@/config/utils.js'
	import Qs from 'qs'
	export default {
		data() {
			return {
				// bumen tree
				depart: false,
				isReady: false,
				ready: true, // 这里用于自主控制loading加载状态，避免异步正在加载数据的空档显示“暂无数据”
				props: {
					label: 'bumen_name',
					isleaf: 'havechild',
					disabled: function(data, node) {
						return data.disabled = data.radiodisabled
					}
				},
				propsType: {
					label: 'dict_name',
					children: 'children'
				},
				// 第几个
				index: 0,
				// 
				num: [{
					responsible_person_name: '',
					responsible_person: '',
					responsible_name: '',
					responsible: '',
					fine_sum: '',
					fine_basis: ''
				}],
				// 
				show: false,
				time: false,
				form: {
					
					address: '',
					link_yh: '',
					fine_time: '',
					fine_penalty_name: '',
					fine_desc: '',
					accountabilitys: true,
					// 
				},
				rules: {
					fine_time: [{
						required: true,
						trigger: ['change', 'blur'],
						message: '请选择罚款时间',
					}],
					fine_penalty_name: [{
						required: true,
						trigger: ['change', 'blur'],
						message: '请选择罚款人',
					}],
					fine_desc: [{
						required: true,
						trigger: ['change', 'blur'],
						message: '请输入问题描述',
					}],
				}
			};
		},
		computed: {
			...mapState(['user']),
			maxdate() {
				let t = new Date()
				let time = t.getFullYear() + 1;
				let time1 = t.getMonth();
				let time2 = t.getDate();
				return time + '-' + time1 + '-' + time2
			}
		},
		onLoad() {
			// 部门加载
			this.isReady = true;
			uni.$on('fine_people', (res) => {
				this.form.fine_penalty = res.value;
				this.form.fine_penalty_name = res.name;
				this.$forceUpdate()
			})
			// 关联隐患
			uni.$on('yhLibContent', (res) => {
				this.form.link_yh = res.value;
				this.form.fine_desc = res.name
				this.form.address = res.address
				this.$forceUpdate()
			})
			// 依据
			uni.$on('bassis', (res) => {
				let index = this.index;
				this.num[index].fine_basis = res.name
				this.$forceUpdate()
			})
		},
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			openTree(e) {
				// 展开树
				this.depart = true;
				this.index = e
			},
			link_yh() {
				// 关联隐患
				this.$u.route({
					url: './link_yj/link_yj',
					params: {
						type: 'link_yj'
					}
				})
			},
			change_time(e) {
				// 选择时间
				this.form.fine_time = e.result
			},
			people() {
				// 选择人
				this.$u.route({
					url: './fine_people/fine_people',
					params: {
						type: 'fine_people'
					}
				})
			},
			bassis(index) {
				this.index = index;
				// 处罚依据
				this.$u.route({
					url: './bassis/bassis',
					params: {
						type: 'bassis'
					}
				})
			},
			treeSelect() { // 责任部门
				// 选中的部门数据
				let index = this.index;
				let sel = this.$refs.tree.getCheckedNodes()
				if (sel.length != 0) {
					if (this.pin_number && !this.zeren) {
						this.num[index].responsible_person = sel[0].id;
						this.num[index].responsible_person_name = sel[0].bumen_name;
						this.depart = false;
					} else {
						this.num[index].responsible_person = sel[0].id;
						this.num[index].responsible_person_name = sel[0].bumen_name;
						this.depart = false;
					}
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
				this.$refs.uForm.validate(valid => {
					if (valid) {
						this.submitAjax()
						console.log('验证通过');
					} else {
						console.log('验证失败');
					}
				});
			},
			submitAjax() {
				let p = this.form;
				p.accountability = p.accountabilitys ? 1 : 0;
				let arr = this.num;

				for (var i = 0; i < arr.length; i++) {
					const ele = arr[i]
					Object.assign(ele, p)
					this.ajax(ele)
				}
				return

			},
			ajax(params) {
				
				this.$http.get('/index/Hjob.ashx?type=add', {
					mid: 'aed85e31-c77c-4fc7-b248-217a0f1ef8dc',
					tabid: 'fine_dan 83ea3f02-aa75-4f55-b7f7-227ae69b65b3',
					job: 'demo_node_2',
					tbname: 'fine_management',
					add:['address','responsible_person_name','responsible_person','responsible_name','responsible','fine_sum','fine_basis','link_yh','fine_time','fine_penalty_name','fine_desc','accountability','fine_penalty'],
					...params
				}).then(res => {
					this.$refs.uToast.show({
						title: '添加成功',
						type: 'success',
					})
				})
			}
		},

	};
</script>

<style scoped lang="scss">
	.u-wrap {
		margin: 20rpx;
		background-color: #fff;
		padding: 20rpx;
		border-radius: 10rpx;
	}

	.popup_wrap {
		width: 80%;
	}

	.p_content {
		padding: 24rpx;
		height: 100%;
		overflow: hidden;
	}

	.btn {
		margin-top: 20rpx;
	}
</style>
