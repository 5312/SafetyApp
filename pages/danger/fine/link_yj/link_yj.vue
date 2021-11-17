<template>
	<view class="content">
		
		<view class="wrap">
			<u-search placeholder="" v-model="keyword" :animation="true"  
				placeholder="请入搜素的内容" @search="addsearch" ></u-search>
		</view>
		<view class="address_list">
			<u-cell-group>
				<u-cell-item v-for="(item,index) in address" :key='index' 
					icon="plus-circle" :arrow="false" :title="item.yh_content" @click="click(item)">
					<view slot="label">
						编号：{{item.yh_code}}
						<br>
						责任部门：{{item.responsibledepartme}}
						<br>
						检查人：{{split(item.inspeople)}}
					</view>
				</u-cell-item>
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
				pname_id: '',
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
			this.index();
		},
		onReachBottom() {
			if (this.nomore) return;
			this.status = 'loading';
			this.page = ++this.page;

			this.index()
		},
		methods: {
			split(e){
				if(e){
					let a = e.split('~');
					return a[0]
				}else{
					return e
				}
			},
			async index() {
				let _this = this
				const result_address = await this.$http.get('/index/Hjob.ashx?type=sel', {
					tabid: 'YH_lib0130efb6-968e-4abe-b1db-e6008414f97b',
					mid: 'e7d500ff-b985-4671-bb92-ac02059f28b7',
					job: 'demo_node_1',
					tbname: 'yh_lib',
					T: 'app_search_sql',
					function_perms:this.user.function_perms,
					department_id:this.user.department_id,
					jobnumber:this.user.jobnumber,
					page: this.page,
					limit: 10,
					keyword: '',
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
					tabid: 'YH_lib0130efb6-968e-4abe-b1db-e6008414f97b',
					mid: 'e7d500ff-b985-4671-bb92-ac02059f28b7',
					job: 'demo_node_1',
					tbname: 'yh_lib',
					T: 'app_search_sql',
					function_perms:this.user.function_perms,
					department_id:this.user.department_id,
					jobnumber:this.user.jobnumber,
					page: 1,
					limit: 10,
					keyword: this.keyword,
				}, {
					load: false
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
			addsearch() {
				let _this = this
				uni.navigateBack({
					url: '../add',
					success: function() {
						uni.$emit('yhLibContent', {
							yh_lib_content: _this.keyword,
						});
					}
				})
			},
			click(e) {
				let _this = this
				
				uni.navigateBack({
					url: '../add',
					success: function() {
						uni.$emit('yhLibContent', {
							value: e.ids,
							name: e.yh_content,
							address: e.address,
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
