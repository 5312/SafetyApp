<template>
	<view class="u-wrap">
		<u-dropdown>
			<u-dropdown-item v-model="value1" title="状态" :options="options1"></u-dropdown-item>
			<u-dropdown-item v-model="value2" title="班次" :options="options2"></u-dropdown-item>
			<u-dropdown-item v-model="value3" title="班次" :options="options2"></u-dropdown-item>
		</u-dropdown>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value1: 0,
				value2: 1,
				value3: 1,
				options1: [{
						label: '所有',
						value: 0,
					},{
						label: '新排查',
						value: 1,
					},
					{
						label: '已下达',
						value: 2,
					},
					{
						label: '已整改',
						value: 3,
					},
					{
						label: '已销号',
						value: 4,
					}
				],
				options2: [{
						label: '早班',
						value: 1,
					},
					{
						label: '中班',
						value: 2,
					},{
						label: '晚班',
						value: 3,
					}
				],
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
.u-wrap{
	background: #fff;
}
</style>
