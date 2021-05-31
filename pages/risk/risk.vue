<template>
	<view class="content">
		<!-- 风险 -->
		<image class="logo" src="/static/uview/common/logo.png"></image>
		<view class="text-area">
			<view class="">
				adsfasdf
			</view>
			<text class="title">{{title}}</text>
		</view>
		<u-tabbar :list="tabbar" :mid-button="true"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				tabbar: ""
			}
		},
		methods: {

		},
		onLoad() {
			this.tabbar = this.$store.state.list
			console.log(this.tabbar)
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
