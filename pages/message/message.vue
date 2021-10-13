<template>
	<view>
		<view class="mesbody">
			<u-cell-group>
				<u-cell-item
				  v-for="x,y in message"
				  :key="y"
				  :title="x.xx_title" :label="x.createdate" :arrow="false">
				  </u-cell-item>
			</u-cell-group>
		</view>
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
			}
		},
		onLoad() {
			this.getMessage()
		},
		computed:{
			...mapState(['user', 'mesNum','userid']),
		},
		methods: {
			...mapMutations(['setMessageNum']),
			async getMessage(){
				// 消息
				const mes = await this.$http.get('/index/Hjob.ashx?type=sel', {
					type: 'sel',
					userid:this.userid,
					tabid: 'xx_newc6a24ebc-c69f-4799-9cc5-2ea1db9da957',
					mid: 'f53bc1eb-762e-43bc-9a87-1a676ad577ea',
					job: 'demo_node_1',
					tbname: 'xx_news',
					T: '新消息sql',
					page: 1,
					limit:3
				})
				this.message = mes.data.data
				this.setMessageNum(mes.data.count)
			},
		}
	}
</script>

<style>

</style>
