<template>
	<ul class="switches">
		<li v-for="(item,index) in switches" class="item" 
		:class="{'active':currentIndex===index}" @click.stop="selectItem(index)">
		<span>{{item.name}}</span></li>
	</ul>
</template>

<script>
	export default{
		props:{
			switches:{
				type: Array,
				default: []
			},
			currentIndex:{
				type: Number,
				default:0
			}
		},
		data(){
			return{

			}
		},
		methods:{
			selectItem(index){
				this.$emit('switch', index)
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
		background: #333;
	}
</style>