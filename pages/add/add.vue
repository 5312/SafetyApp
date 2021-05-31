<template>
	<view class="content">
		<!-- 录入 -->
		<view class="wrap">
			<u-form :model="form" ref="uForm" :error-type="errorType">
				<u-form-item label="责任部门">
					<u-input v-model="form.name" />
				</u-form-item>
				<u-form-item label="简介">
					<u-input v-model="form.intro" />
				</u-form-item>
				<u-form-item label="性别">
					<u-input v-model="form.sex" type="select" />
				</u-form-item>
				<u-form-item label="水果">
					<u-checkbox-group>
						<u-checkbox v-model="item.checked" v-for="(item, index) in checkboxList" :key="index"
							:name="item.name">
							{{ item.name }}
						</u-checkbox>
					</u-checkbox-group>
				</u-form-item>
				<u-form-item label="味道">
					<u-radio-group v-model="radio">
						<u-radio v-for="(item, index) in radioList" :key="index" :name="item.name"
							:disabled="item.disabled">
							{{ item.name }}
						</u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item label="开关">
					<u-switch slot="right" v-model="switchVal"></u-switch>
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
				// 文字提示
				errorType: ['message'],
				form: {
					name: '',
					intro: '',
					sex: ''
				},
				checkboxList: [{
						name: '苹果',
						checked: false,
						disabled: false
					},
					{
						name: '雪梨',
						checked: false,
						disabled: false
					},
					{
						name: '柠檬',
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
		methods: {

		},
		onLoad() {
			this.tabbar = this.$store.state.list
		}
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
