<template>
	<view class="u-wrap">
		<u-navbar title="考核详情" :custom-back="back">
			<view class="navbar-right" slot="right">
				<view class="dot-box right-item">
					<u-icon name="file-text" size="38" @click="save"></u-icon>
				</view>
			</view>
		</u-navbar>
		<u-alert-tips type="warning" :description="description"></u-alert-tips>
		<u-card v-for="(item,index) in acticeList" :key="index" :title="'考核部门:'+item.fenPeiBumen"
			@click="nd_detail(item)" v-if="showType(item)">
			<view class="" slot="body">
				<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
					<view class="u-body-item-title u-line-2">{{item.kh_point || item.kh_type_name}}</view>
				</view>
				<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
					<view class="u-body-item-title u-line-2 screfunc">
					<u-parse :html="func(item)"></u-parse></view>
				</view>
				<view class="u-body-item u-flex u-row-between u-p-b-0">
					<view class="u-body-item-title u-line-2">考核得分(扣分制):{{item.kh_fenzhi}}</view>
				</view>
			</view>
		</u-card>
		<u-popup v-model="show" mode="center" width='80%'>
			<view class="popup-wrap">
				<u-card title="评分">
					<view class="popup-center" slot="body">
						<u-number-box v-model="value" @change="valChange"></u-number-box>
					</view>
					<view class="foot" slot='foot'>
						<view class="btngroup">
							<u-button size="medium" :ripple="true" shape="square" type="primary" @click="confim">确定
							</u-button>
							<u-button size="medium" :ripple="true" shape="square" type="info" @click="show=false">
								取消
							</u-button>
						</view>
					</view>
				</u-card>
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
	import utils from '../../../config/utils.js'
	export default {
		data() {
			return {
				acticeList: [],
				show: false,
				value: 0,
				ids: null,
				isSave: false,
				isMei: false,
				description:'考核后，请点击右侧保存按钮进行保存再退出'
			}
		},
		onLoad(options) {
			this.kh_link_id = options.kh_link_id
			this.isSave = false
		},
		onShow() {
			this.index()
		},
		computed: {
			...mapState(['user', 'list']),
			showType() {
				return (item) => {
					if (this.isMei) {
						return item.kh_scorefunc
					} else {
						return item.kh_node_type === '3'
					}

				}
			}
		},
		onPullDownRefresh(){
			this.index().then(res=>{
				uni.stopPullDownRefresh()
			})
		},
		methods: {
			async index() {
				const backres = await this.$http.get('/index/Hjob.ashx', {
					type: 'sel',
					job: 'demo_node_1',
					tbname: 'kh_plan',
					T: 'back_sql',
					id: this.kh_link_id
				})
				let back = backres.data.data;
				let backToPid = [{
					ban: '{}'
				}]

				if (back) {
					backToPid = back[0].row_to_json;
				}

				let banTopPid = [{
					ban: '{}'
				}]
				const template = await this.$http.get('/index/Hjob.ashx', {
					type: 'sel',
					job: 'demo_node_1',
					tbname: 'kh_plan',
					T: 'template',
					id: this.kh_link_id
				});
				if (template.data.data) {
					let tt = template.data.data[0].row_to_json;
					banTopPid = tt;
				}


				let json = null;
				if (backToPid.ban) {
					json = backToPid
				} else {
					json = banTopPid ? banTopPid : [{
						ban: '{}'
					}];
				}
				if (json.ban) {
					let arr = JSON.parse(json.ban)
					if (arr[0].kh_type_name == '煤炭板块') {
						this.isMei = true;
					} else {
						this.isMei = false
					}
					this.acticeList = utils.childrenToPid(JSON.parse(json.ban), 'ids', 'kh_pid', 'children');
					console.log(JSON.parse(json.ban))
				}

			},

			nd_detail(item) {
				console.log(item)
				if(item.fenPeiBumen_id == this.user.department_id){
					// 修改分值
					this.show = true;
					this.value = Number(item.kh_fenzhi)
					this.ids = item.ids
				}else{
					this.$refs.uToast.show({
						title: '您无法考核该项！',
						type: 'error',
					})
				}
			},
			back() {
				// 返回
				if (true) { //this.isSave
					this.$u.route({
						type: 'back',
					})
				} else {
					this.$refs.uToast.show({
						title: '请先保存数据',
						type: 'error',
					})
				}

			},
			confim() {
				const array = this.acticeList;
				for (var i = 0; i < array.length; i++) {
					const obj = array[i]
					if (obj.ids == this.ids) {
						obj.kh_fenzhi = this.value
					}
				};
				this.acticeList = array;
				this.show = false
			},
			async save() {
				this.isSave = true;
				let arr = this.acticeList;
				let kh_over_json = utils.toTreeData(arr, 'ids', 'kh_pid', 'children', '');
				let n = this.source();
				const res = await this.$http.post('/index/Hjob.ashx', {
					type: 'add',
					mid: '822da28e-2b9e-4d53-a197-f81bc8ec4060',
					tabid: 'KH_d111ingyi2f235efc-1bd4-4b10-97bf-86d6b9e02b7c',
					job: ' demo_node_1',
					tbname: 'kh_plan_peoplelink',
					isadd: 1,
					id: this.kh_link_id,
					add: 'kh_link_source,kh_link_stime,kh_over_json',
					kh_link_source: n,
					kh_link_stime: this.getdate(),
					kh_over_json: JSON.stringify(kh_over_json),
				})
				if (res.data.statusCode == 200) {
					this.$refs.uToast.show({
						title: '保存成功',
						type: 'success',
						// url: '/pages/assessment/assessment'
					})
				}
			},
			source() {
				let arr = this.acticeList;
				let source = 0;
				for (var i = 0; i < arr.length; i++) {
					const obj = arr[i];
					
					if (this.isMei) {
						if (obj.kh_scorefunc) {
							source += Number(obj.kh_fenzhi)
						}
					} else {
						if (obj.kh_node_type == '3') {
							source += Number(obj.kh_fenzhi)
						}
						// return item.kh_node_type === '3'
					}
				}
				return 100 - source;
			},
			getdate() {
				var myDate = new Date();

				let y = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
				let m = myDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
				let r = myDate.getDate(); //获取当前日(1-31)
				return y + '-' + m + '-' + r
			},
			valChange() {

			},
			func(d) {
				if (d.kh_scorefunc != '') {
					return d.kh_scorefunc
				} else {
					let str = ''
					if (d.children) {
						for (let i = 0; i < d.children.length; i++) {
							const obj = d.children[i];
							str +='<p>' +obj.kh_scorefunc + '</p> <br>'
						}
					}
					return str
				}
			}
		}
	}
</script>
<style scoped lang="scss">
	.u-wrap {
		padding-bottom: 20rpx;
	}

	.u-card-wrap {
		background-color: $u-bg-color;
		padding: 1px;
	}

	.u-body-item {
		font-size: 32rpx;
		color: #333;
		padding: 20rpx 10rpx;
	}

	.u-body-item image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		border-radius: 8rpx;
		margin-left: 12rpx;
	}

	.navbar-right {
		margin-right: 24rpx;
		display: flex;
	}

	.popup-center {
		text-align: center;
	}

	.foot {
		text-align: center;
	}

	.screfunc {
		display: block;
	}
</style>
