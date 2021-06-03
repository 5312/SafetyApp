<template>
	<view class="content">
		<!-- 录入 -->
		<view class="wrap">
			<u-form :model="form" ref="uForm" :error-type="errorType">
				<u-form-item label-width='150rpx' label="责任部门">
					<u-input v-model="form.responsibledepartme" />
				</u-form-item>
				<u-form-item label-width='150rpx' label="检查地点">
					<u-input v-model="form.address" />
				</u-form-item>
				<u-form-item label-width='150rpx' label="详细地点">
					<u-input v-model="form.yh_address_all" type="text" />
				</u-form-item>
				<u-form-item label-width='150rpx' label="检查人">
					<u-input v-model="form.inspeople" type="select" />
				</u-form-item>
				<u-form-item label-width='150rpx' label="陪检人">
					<u-input v-model="form.accompany" type="select" />
				</u-form-item>
				<u-form-item label-width='150rpx' label="检查日期">
					<u-calendar v-model="dateShow" mode="date" @change='inspectiondateFunc'></u-calendar>
					<!-- <u-picker mode="time" v-model="dateShow" :params="params" @confirm='inspectiondateFunc'></u-picker> -->
					<u-input v-model="form.inspectiondate" type="select" @click='dateShow = true' />
				</u-form-item>
				<u-form-item label-width='150rpx' label="班次">
					<u-checkbox-group>
						<u-checkbox v-model="item.checked" v-for="(item, index) in checkboxList" :key="index"
							:name="item.name">
							{{ item.name }}
						</u-checkbox>
					</u-checkbox-group>
				</u-form-item>
				<u-form-item label-width='150rpx' label="带班领导">
					<u-switch slot="right" v-model="form.leader"></u-switch>
				</u-form-item>
				<u-form-item label-width='150rpx' label="行走路线">
					<u-input v-model="form.yh_route" type="texgt" />
				</u-form-item>
				<u-form-item label-width='150rpx' label="隐患内容">
					<u-input v-model="form.yh_content" type="textarea" />
				</u-form-item>
				<u-form-item label-width='150rpx' label="整改要求">
					<u-input v-model="form.yh_rectify" type="textarea" />
				</u-form-item>
				<u-form-item label-width='150rpx' label="隐患等级">
					<!-- <u-input v-model="form.yh_level" type="textarea" /> -->
					<u-radio-group v-model="radio">
						<u-radio v-for="(item, index) in radioList" :key="index" :name="item.name"
							:disabled="item.disabled">
							{{ item.name }}
						</u-radio>
					</u-radio-group>
				</u-form-item>
			</u-form>

		</view>
		<u-tabbar :list="tabbar" :mid-button="true"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dateShow: false,
				params: {
					year: true,
					month: true,
					day: true,

				},
				// 文字提示
				errorType: ['message'],
				form: {
					name: '',
					intro: '',
					sex: ''
				},
				checkboxList: [{
						name: '早班',
						checked: false,
						disabled: false
					},
					{
						name: '中班',
						checked: false,
						disabled: false
					},
					{
						name: '晚班',
						checked: false,
						disabled: false
					}
				],
				radioList: [{
						name: '鲜甜',
						disabled: false
					},
					{
						name: '麻辣',
						disabled: false
					}
				],
				radio: '',
				switchVal: false
			}
		},
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			this.$refs.uForm.setRules(this.rules);
			// this.oldClass()
		},
		onLoad() {
			this.tabbar = this.$store.state.list
		},
		methods: {
			inspectiondateFunc(d) {
				console.log(d)
				this.form.inspectiondate = d.result

			},
			oldClass(){
				this.$http.post('/index/Hjob.ashx',{
					type:"sel",
					tabid:'YH_liebiao08d2367f-618b-429c-bb8f-5c7634ad508b',
					mid:'9c6a100d-8543-438e-9311-ce6a38e75cae',
					job:'demo_node_1',
					tbname:'YH',
					T:'add_yhsql',
					level:'A'
				}).then(res => {
					console.log(res)
				})
			},
		},

	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 20rpx;

		.wrap {
			width: 100%;
			border-radius: 20rpx;
			padding: 20rpx;
			background-color: #FFF;
		}
	}
</style>
