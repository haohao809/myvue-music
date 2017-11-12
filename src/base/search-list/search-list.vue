<template>
	<div class="search-list">
		<transition-group name="list" tag="ul">
			<li :key="item" v-for='item in searchHistory' class='search-item' @click.stop="select(item)">
			 <span class='text'>{{item}}</span>
			 <span class="icon" @click.stop='deleteOne(item)'>
			 	<i class="icon-delete"></i>
			 </span>
			</li>
		</transition-group>
	</div>
</template>

<script> 
	import {mapGetters} from 'vuex'
	export default{
		computed:{
			...mapGetters(['searchHistory'])
		},
		methods:{
			select(item){
				this.$emit('select',item);
			},
			deleteOne(item){
				this.$emit('delete',item);
			}
		}
	}
</script>

<style scoped lang='scss'>
	.search-list{
		.list-enter-active, .list-leave-active
		{
			transition: all 0.1s
		}	
		.list-enter,.list-leave-to{
			height: 0
		}
		.search-item{
		display: flex;
		position: relative;
		
		height:40px;
		align-items: center;
		.text{
			flex: 1;
			color:rgba(255,255,255,0.5);
		}
		.icon{
			font-size: 12px;
			color:rgba(255,255,255,0.3);
		}
	  }
	}
</style>