<template>
	<div class="music-list">
		<div class="back">
			<i class="icon"></i>			
		</div>
		<h1 class="title">{{title}}</h1>
		<div class="bg-image">
			
		</div>
	</div>
</template>

<script>
	export default {
		props:{
			title :{
				type:String,
				default:''
			},
			bgImg :{
				type:String,
				default:''
			}
		}
	}
</script>

<style scoped>
	.music-list{
		position: fixed;
		background: #222;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 100;
	}
	.icon{
		display: block;
		padding: 10;
		font-size: 22px;
		color: #ffcd32;
	}
	.icon:before{
		content: "\e911";
	}
</style>