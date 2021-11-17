<template>
	<view class="content">
		<view class="wrap">
			<u-search placeholder="" v-model="keyword" :animation="true" :show-action="true" action-text="搜索"
				@search="search" @custom="search"></u-search>
		</view>
		<view class="address_list">
			<u-cell-group>
				<u-cell-item v-for="(item,index) in address" :key='index' :label="item.fxd_dy_knames" icon="plus-circle"
					:arrow="false" :title="item.fxd_names" @click="click(item)"></u-cell-item>
			</u-cell-group>
			<u-loadmore :status="status" />
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

		onLoad(option) {
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
					bumen_id: option.pname
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
					} else {
						this.nomore = true;
						this.status = 'nomore';
					}
				}
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
				let _this = this
				uni.navigateBack({
					url: '../add',
					success: function() {
						uni.$emit('backAddress', {
							address_name: e.fxd_names,
							address: e.ids,
							depart_pname: _this.pname_id
						});
					}
				})

			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		height: 100%;
	}

	.content {
		height: 100%;

		.wrap {
			// height: 100%;
			background-color: #FFF;
			padding: 20rpx;
		}
	}
</style>
