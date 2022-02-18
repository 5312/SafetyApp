<template>
	<view>
		<view class="mesbody">
			<u-cell-group>
				<u-cell-item
				  v-for="(x,y) in message"
				  :key="y"
				  :title="x.xx_title" :label="x.createdate" :arrow="false">
				  </u-cell-item>
			</u-cell-group>
		</view>
		<u-loadmore v-if="message.length > 0" :status="loadStatus" :load-text="loadText" bgColor="#f5f5f5"
			@loadmore="loadmore"></u-loadmore>
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
				message:[],
				page: 1,
				nomore: false,
				loadStatus: 'loadmore',
				loadText: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '实在没有了'
				},
			}
		},
		onLoad() {
			this.getMessage()
		},
		computed:{
			...mapState(['user', 'mesNum','userid']),
		},
		onReachBottom() {
			this.loadStatus = "loading"
			this.page += 1;
			this.getMessage(true)
		},
		methods: {
			...mapMutations(['setMessageNum']),
			async getMessage(ispush = false){
				if (this.nomore) {
					this.loadStatus = 'nomore';
					return
				}
				// 消息
				const mes = await this.$http.get('/index/Hjob.ashx?type=sel', {
					type: 'sel',
					userid:this.userid,
					tabid: 'xx_newc6a24ebc-c69f-4799-9cc5-2ea1db9da957',
					mid: 'f53bc1eb-762e-43bc-9a87-1a676ad577ea',
					job: 'demo_node_1',
					tbname: 'xx_news',
 
					T: '全部消息sql',//'新消息sql',
					page: 1,
					limit:3
 
				})
				this.loading = false;
				if (!mes.data.data) {
					this.nomore = true;
					this.loadStatus = "nomore";
					return;
				}
				if (ispush) {
					this.message.push(...mes.data.data)
				} else {
					this.message = mes.data.data;
				}
				this.loadStatus = "loadmore";
				// this.message = mes.data.data
				this.setMessageNum(mes.data.count)
			},
		}
	}
</script>

<style>

</style>
