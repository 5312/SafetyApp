<template>
	<view>
		<u-navbar title="" :is-back="false">
			<view class="slot-wrap" slot="">
				<view class="u-flex left">
					<u-icon name="arrow-leftward" size="36" @click="back"></u-icon>
					<view class="line"></view>
					<view>我的账号</view>
				</view>
			</view>
		</u-navbar>
		<u-gap height="30"></u-gap>
		<u-cell-group>
			<u-cell-item title="头像">
				<u-avatar :src="url" ></u-avatar>
			</u-cell-item>
			<u-cell-item title="用户名" :value="user.users_name"></u-cell-item>
			<u-cell-item title="账号密码" :value="user.jobnumber"></u-cell-item>
			<u-cell-item title="手机号" :value="user.iphone"></u-cell-item>
			<u-cell-item title="所属部门" :value="user.department_name"></u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import base from '../../../config/baseUrl.js'
	export default {
		data() {
			return {
				url:''
			}
		},
		computed: {
			...mapState(['user']),
		},
		onLoad() {
			this.url = base.baseUrl + this.user.headportrait
		},
		methods: {
			back(){
				this.$u.route({
					type:"back"
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.slot-wrap {
		display: flex;
		align-items: center;
		/* 如果您想让slot内容占满整个导航栏的宽度 */
		/* 如果您想让slot内容与导航栏左右有空隙 */
		padding: 0 30rpx;

		.left {
			width: 30%;
			height: 100%;
			justify-content: space-around;
			align-items: center;

			.line {
				border-left: 2rpx solid #cccccc;
				height: 30rpx;
				width: 1rpx;
			}
		}
	}
</style>
