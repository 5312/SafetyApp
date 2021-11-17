<template>
	<view class="content">
		<view class="wrap">
			<u-search placeholder="" v-model="keyword" :animation="true" :show-action="true" action-text="搜索"
				@search="search" @custom="search"></u-search>
		</view>
		<view class="address_list">
			<u-cell-group>
				<u-cell-item v-for="(item,index) in address" :key='index' :label="item.file_basis" icon="plus-circle"
					:arrow="false" :title="item.lb" @click="click(item)"></u-cell-item>
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
			this.index()
			this.type = option.type
			console.log(this.type)
		},
		onReachBottom() {
			if (this.nomore) return;
			this.status = 'loading';
			this.page = ++this.page;
			this.index()
		},
		methods: {
			async index() {
				let _this = this
				// 检查人
				const result_address = await this.$http.get('/index/Hjob.ashx?type=sel', {
					tabid: 'fine_dan 83ea3f02-aa75-4f55-b7f7-227ae69b65b3',
					mid: 'aed85e31-c77c-4fc7-b248-217a0f1ef8dc',
					job: 'demo_node_2',
					tbname: ' fine_management',
					T: 'app_zhixing_sql',
					function_perms: this.user.function_perms,
					department_code: this.user.department_code,
					page: this.page,
					limit: 10
				})

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
					tabid: 'fine_dan 83ea3f02-aa75-4f55-b7f7-227ae69b65b3',
					mid: 'aed85e31-c77c-4fc7-b248-217a0f1ef8dc',
					job: 'demo_node_2',
					tbname: ' fine_management',
					T: 'app_zhixing_sql',
					function_perms: this.user.function_perms,
					department_code: this.user.department_code,
					page: 1,
					limit: 10,
					keyword: this.keyword,
				}).then(result_address => {
					if (result_address.data.code == 0) {
						if (result_address.data.data && result_address.data.data.length > 0) {
							this.address = result_address.data.data;
						} else {
							this.address = []
						}
					}
				})
			},
			click(e) {
				let _this = this
				uni.navigateBack({
					success: function() {
						switch (_this.type) {
							case 'bassis':
								uni.$emit('bassis', {
									name: e.file_basis
								});
								break;
						}
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
