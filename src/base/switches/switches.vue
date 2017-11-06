<template>
	<ul>
		<li v-for="(item,index) in switches"><span>{{item}}</span></li>
	</ul>
</template>

<script>
	export default{
		data(){
			return{
				switches:['最近播放','搜索历史']
			}
		}
	}
</script>

<style>
</style>