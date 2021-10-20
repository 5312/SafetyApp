<template>
	<view>
		<u-navbar :is-back="false" title="　" :border-bottom="false">
			<view class="u-flex u-row-right" style="width: 100%;">

			</view>
		</u-navbar>
		<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30" @click="gomy">
			<view class="u-m-r-10">
				<u-avatar :src="pic" size="140"></u-avatar>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20">{{name}}</view>
				<view class="u-font-14 u-tips-color">所属部门:{{user.department_name}}</view>
			</view>
			<view class="u-m-l-10 u-p-10">
				<u-icon name="scan" color="#969799" size="28"></u-icon>
			</view>
			<view class="u-m-l-10 u-p-10">
				<u-icon name="arrow-right" color="#969799" size="28"></u-icon>
			</view>
		</view>

		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="setting" title="设置" @click="navUrl('./setting/setting')"></u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import base from '../../config/baseUrl.js'
	export default {
		data() {
			return {
				pic: '',
				show: true,
				name: ''
			}
		},
		onShow() {
			this.name = this.user.users_name
			this.pic = base.baseUrl + this.user.headportrait;

			uni.setTabBarBadge({
				index: 1,
				text: String(this.mesNum),
			})
		},
		onLoad() {

		},
		computed: {
			...mapState(['user', 'mesNum']),
		},
		methods: {
			gomy() {
				this.$u.route({
					url: './my/my'
				})
			},
			navUrl(url) {
				this.$u.route({
					url: url
				})
			},
			navto() {
				this.$u.route({
					type: "to",
					url: '../assessment/assessment'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #ededed;
	}

	.camera {
		width: 54px;
		height: 44px;

		&:active {
			background-color: #ededed;
		}
	}

	.user-box {
		background-color: #fff;
	}
</style>
