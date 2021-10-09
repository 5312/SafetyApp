<template>
	<view class="content">
		<view class="wrap">
			<u-search placeholder="" v-model="keyword" :animation="true" :show-action="true" action-text="搜索"
				@search="search" @custom="search"></u-search>
		</view>
		<view class="address_list">
			<!-- <u-cell-group>
				<u-cell-item v-for="(item,index) in address" :key='index' :label="item.fxd_dy_knames" icon="plus-circle"
					:arrow="false" :title="item.fxd_names" @click="click(item)"></u-cell-item>
			</u-cell-group> -->
			<!--  @change="checkboxGroupChange" -->
			<u-checkbox-group class="checkbox_group" :wrap="true">
				<!-- @change="checkboxChange" -->
				<u-checkbox class="checkbox" v-model="item.checked" v-for="(item,index) in address" :key="index"
					:name="item.fxd_dy_knames">{{item.fxd_names}}</u-checkbox>
			</u-checkbox-group>
			<u-loadmore :status="status" @loadmore='loadmore' />
		</view>
		<view class="btngroup">
			<u-button size="medium" :ripple="true" shape="square" type="primary" @click="click">确定
			</u-button>
			<u-button size="medium" :ripple="true" shape="square" type="info" @click="close">
				取消
			</u-button>
		</view>
		<u-toast ref="uToast" />
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
				status: 'loadmore',
				keyword: '',
				address: [],
				page: 1,
				nomore: false,
				pname_id: ''
			}
		},
		watch: {
			keyword() {
				this.search()
			}
		},
		computed: {
			...mapState(['user', 'userid']),
		},

		mounted(option) {
			this.nomore = false;
			this.index(option).then(() => {
				this.getAddress()
			})
		},
		onReachBottom() {
			if (this.nomore) return;
			this.status = 'loading';
			this.page = ++this.page;

			this.getAddress()
		},
		methods: {
			async index(option) {
				// 获取pname
				const pname = await this.$http.get('/index/Hjob.ashx?type=sel', {
					tabid: 'YH_liebiao4a1fea89-cba9-4375-a015-9f2a4e20e42d',
					mid: '9c6a100d-8543-438e-9311-ce6a38e75cae',
					job: 'demo_node_1',
					tbname: 'YH',
					T: 'app_get_panem',
					bumen_id: this.user.department_id
				})
				if (pname.data.code != 0) {
					return
				}
				this.pname_id = pname.data.data[0].pname_id

			},
			async getAddress() {
				let _this = this
				const result_address = await this.$http.get('/index/Hjob.ashx?type=sel', {
					tabid: 'YH_liebiao4a1fea89-cba9-4375-a015-9f2a4e20e42d',
					mid: '9c6a100d-8543-438e-9311-ce6a38e75cae',
					job: 'demo_node_1',
					tbname: 'YH',
					T: '风险点管理SQL',
					page: this.page,
					limit: 10,
					keyword: "",
					ascription: _this.pname_id
				});
				if (result_address.data.code == 0) {
					if (result_address.data.data && result_address.data.data.length > 0) {
						this.address.push(...result_address.data.data);
						this.status = 'loadmore';
					} else {
						this.nomore = true;
						this.status = 'nomore';
					}
				}
			},
			loadmore() {
				if (this.nomore) return;
				this.status = 'loading';
				this.page = ++this.page;

				this.getAddress()
			},
			search() {
				this.$http.get('/index/Hjob.ashx?type=sel', {
					tabid: 'YH_liebiao4a1fea89-cba9-4375-a015-9f2a4e20e42d',
					mid: '9c6a100d-8543-438e-9311-ce6a38e75cae',
					job: 'demo_node_1',
					tbname: 'YH',
					T: '风险点管理SQL',
					page: 1,
					limit: 10,
					keyword: this.keyword,
					ascription: this.pname_id
				}).then(result_address => {
					if (result_address.data.code == 0) {
						if (result_address.data.data && result_address.data.data.length > 0) {
							this.address = result_address.data.data;
						}
					}
				})
			},
			click(e) {
				let array = this.address;
				let arr = [];
				let arrids = []
				for (var i = 0; i < array.length; i++) {
					const ele = array[i]
					if (ele.checked) {
						arr.push(ele.fxd_names)
						arrids.push(ele.ids)
					}
				}
				// if (arrids.length == 0) {
				// 	this.$refs.uToast.show({
				// 		title: '请选择地点',
				// 		type: 'error',
				// 	})
				// 	return
				// }
				this.$emit('list', {
					'address_list': arr.join(','),
					'address_list_id': arrids.join(',')
				})
			},
			close() {
				this.$emit('close')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		height: 100%;

		.wrap {
			// height: 100%;
			background-color: #FFF;
			padding: 20rpx;
		}

		.checkbox_group {
			padding: 20rpx;
			// 	display: flex;
			// 	flex-direction: column;
		}

		.btngroup {
			text-align: center;
			margin: 20rpx;
		}
	}
</style>
