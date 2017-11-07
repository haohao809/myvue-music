<template>
	<ul class="switches">
		<li v-for="(item,index) in switches" class="item" 
		:class="{'active':currentIndex===index}" @click.stop="selectItem(index)">
		<span>{{item}}</span></li>
	</ul>
</template>

<script>
	export default{
		data(){
			return{
				switches:['最近播放','搜索历史'],
				currentIndex:0
			}
		},
		methods:{
			selectItem(index){
				this.currentIndex = index;
			}
		}

	}
</script>

<style scoped>
	.switches{
		display: flex;
		width: 240px;
		margin: 0 auto;
		border: 1px solid #333;
		border-radius: 5px;
	}
	.item{
		flex:1;
		padding: 8px;
		text-align: center;
		font-size: 14px;
		color: rgba(255,255,255,0.3);
	}
	.active{
		color: #FFF;
	}
</style>