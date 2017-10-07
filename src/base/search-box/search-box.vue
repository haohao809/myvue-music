<template>
	<div class="search-input">
		<i class='icon-search'></i>
		<input :placeholder="placeholder" v-model="query"/>
		<i class='icon-dismiss' v-show='query' @click='clear'></i>
	</div>
</template>

<script>
	import {mapMutations} from 'vuex'
	export default{
		data(){
			return {
				query:''
			}
		},
		props:{
			placeholder:{
				type: String,
				default: '搜索歌曲、歌手'
			}
		},
		methods:{
			clear(){
				this.query = '';
			},
			setCurQuery(query){
				this.query = query;
			},
			...mapMutations({
				setQuery: 'SET_QUERY'
			})
		},
		created(){
			this.$watch('query',(newquery) =>{
//				this.$emit('query',newquery);
				console.log(newquery);
				this.setQuery(newquery);
			})
		}
	}
</script>

<style lang='scss' scoped>
	.search-input{
		text-align: center;
		background: #333;
		width: 100%;
		height: 40px;
		display: flex;
		align-items: center;
		border-radius: 6px;
		padding: 0 6px;
		box-sizing: border-box;
		.icon-search{
			font-size: 24px;
			color: #222;
		}
		.icon-dismiss{
			font-size: 16px;
			color: #222;
		}
		input{
			background: #333;
			color: #fff;
			margin: 0 5px;
			outline: none;	
			flex: 1;
			font-size: 14px;
		}
	}
</style>