<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>


<style lang="scss">
	/* 此处为style标签内容的最前面 */
	@import "./static/font-icon/iconfont.css";
	@import "uview-ui/index.scss";
	body{
		background-color: #f2f7fd;
	}
</style>
