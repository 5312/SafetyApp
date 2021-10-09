<template>
	<view>
		<view v-for="item,y in addPageTypeList" :key="y">
			<view>{{item.name}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"add_type",
		data() {
			return {
				addPageTypeList:[
					{
						name:'隐患',
						type:'danger'
					},
					{
						name:'年度风险辨识',
						type:'nd_risk'
					},
					{
						name:'专项风险辨识',
						type:'zx_risk'
					},
					{
						name:'风险研判',
						type:'risk——judgment'
					}
				]
			};
		}
	}
</script>

<style lang="scss">

</style>
