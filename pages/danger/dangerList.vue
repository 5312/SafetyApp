<template>
	<view>
		<!-- 隐患 -->
		<u-navbar :is-back="true" back-text="返回" title="" height="44">
			<view class="slot-wrap">
				<u-search placeholder="隐患查询"></u-search>
			</view>
		</u-navbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.slot-wrap {
		display: flex;
		align-items: center;
		/* 如果您想让slot内容占满整个导航栏的宽度 */
		flex: 1;
		/* 如果您想让slot内容与导航栏左右有空隙 */
		padding: 0rpx 30rpx;
	}
</style>
