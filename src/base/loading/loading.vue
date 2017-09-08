<template>
	<div class="loading">
		<img width="24" height="24" src="./loading.gif" />
	   <p class="desc">{{title}}</p>	
	</div>
</template>

<script>
	export default{
		props:{
			title :{
				type: String,
				default: '正在载入中...'
			}
		}
	}
</script>

<style scoped>
	.loading{
		text-align: center;
	}
	.desc{
		font-size: 12px;
		color: rgba(255,255,255,0.5);
	}
</style>