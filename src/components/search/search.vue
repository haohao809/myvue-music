<template>
	<div class="search">
		<div class="search-box">
			<search-box ref='searchBox'></search-box>
		</div>
		<div class="shortcut-wrapper">
			<div class="shortcut" v-show='!query'>
				<div>
					<div class="hot-key">
						<h1 class="title">热门搜索</h1>
						<ul>
							<li v-for="item in hotKey" class='item' @click="addQuery(item)">
								<span>{{item.k}}</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<div class="search-result" v-show='query'>
			<suggest @listScroll = 'blurInput' @select='saveSearch'></suggest>
		</div>
	</div>
</template>

<script>
	import SearchBox from 'base/search-box/search-box'
	import {getHotKey} from 'api/search' 
	import Suggest from 'components/suggest/suggest'
	import {mapGetters,mapActions} from 'vuex'
	export default {
		components:{
			SearchBox,
			Suggest
		},
		created(){
			this._getHotKey();
		},
		data(){
			return {
				hotKey: [],
//				query: ''
			}
		},
		computed:{
			...mapGetters(['query'])
		},
		methods:{
			_getHotKey(){
				getHotKey().then((res) =>{
//					console.log(res.data);
					this.hotKey = res.data.hotkey.slice(0,10);
//					console.log(this.hotKey);
				})
				.catch((error)=>{
					console.log(error);
				})
			},
			addQuery(item){
				this.$refs.searchBox.setCurQuery(item.k);
			},
			blurInput(){
				this.$refs.searchBox.blur();
			},
			saveSearch(){
				this.saveSearchHistory(this.query)
			},
			...mapActions([
				'saveSearchHistory'
			])
		},
		watch:{
//			query(newQuery){
//				this.query = newQuery
//			}
		}
	}
</script>

<style lang='scss' scoped>
	.search-box{
		margin: 20px;
	}
	.shortcut {
		.hot-key{
			margin: 0 20px 20px 20px;
			.title{
				margin-bottom: 20px;
				color: rgba(255,255,255,0.3);
				font-size: 14px;
			}
			.item{
				display: inline-block;
				background: #333;
				font-size: 14px;
				margin: 0 20px 10px 0;
				color:rgba(255,255,255,0.3);
				padding: 5px 10px;
				border-radius: 8px;
				
			}
		}
	}
	.search-result{
		position: fixed;
		top: 178px;
		bottom: 0;
		width: 100%;
	}
</style>