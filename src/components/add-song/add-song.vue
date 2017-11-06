<template>
	<div class="add-song-wrapper" v-show="showFlag">
		<div class="header">
			<h1 class="title">添加歌曲到列表</h1>
			<div class="close" @click="close">
				<i class="icon-close"></i>
			</div>
		</div>
		<div class="search-box">
			
		</div>
		<div class="short-cut">
			
		</div>
		<div class="search-result">
			
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				showFlag:false,
			}
		},
		methods:{
			show(){
				this.showFlag=true;
			},
			hide(){
				this.showFlag=false;
			},
			close(){
				this.hide();
			}
		}
	}
</script>

<style scoped>
	.add-song-wrapper{
		position: fixed;
		top: 0;
		bottom: 0;
		width: 100%;
		z-index: 200;
		background: #222;
	}
	.header{
		height: 44px;
		text-align: center;
		position: relative;
	}
	.close{
		position: absolute;
		top: 0;
		right: 8px;
	}
	.title{
		line-height: 44px;
		font-size: 18px;
	}
	.icon-close{
		font-size: 20px;
		padding: 12px;
		color: #ffcd32;
		display: block;
	}
</style>