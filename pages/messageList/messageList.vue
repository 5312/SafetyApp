<template>
	<view>
		
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
				
			}
		},
		computed:{
			...mapState(['mesNum', 'message']),
		},
		methods: {
			async index(){
				const resutl = await this.$http.get('/index/Hjob.ashx',{
					
				})
			}
		}
	}
</script>

<style>

</style>
