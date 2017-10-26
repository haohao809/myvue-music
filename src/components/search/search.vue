<template>
	<div class="search">
		<div class="search-box">
			<search-box ref='searchBox'></search-box>
		</div>
		<div class="shortcut-wrapper">
			<scroll class="shortcut" v-show='!query' :data='shortcut' ref='shortcut'>
				<div>
					<div class="hot-key">
						<h1 class="title">热门搜索</h1>
						<ul>
							<li v-for="item in hotKey" class='item' @click="addQuery(item.k)">
								<span>{{item.k}}</span>
							</li>
						</ul>
					</div>
					<div class="search-history" v-show='searchHistory.length'>
						<h1 class='title'>
							<span class="text">搜索历史</span>
							<span class="icon" @click='showConfirm'>
								<i class="icon-clear"></i>
							</span>
						</h1>
						<search-list @select='addQuery' @delete='deleteSearchItem'></search-list>
					</div>
				</div>
			</scroll>
		</div>
		<div class="search-result" v-show='query'>
			<suggest @listScroll = 'blurInput' @select='saveSearch'></suggest>
		</div>
		<confirm ref="confirm" @confirm='clearSearchHistoryAll'></confirm>
	</div>
</template>

<script>
	import SearchBox from 'base/search-box/search-box'
	import {getHotKey} from 'api/search' 
	import Suggest from 'components/suggest/suggest'
	import SearchList from 'base/search-list/search-list'
	import Confirm from 'base/confirm/confirm'
	import {mapGetters,mapActions} from 'vuex'
	import Scroll from 'base/scroll/scroll'
	export default {
		components:{
			SearchBox,
			Suggest,
			SearchList,
			Confirm,
			Scroll
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
			...mapGetters(['query','searchHistory']),
			shortcut(){
				this.hotKey.concat(this.searchHistory)
			}
		},
		mounted(){
			console.log(this.searchHistory);
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
				console.log(123);
				this.$refs.searchBox.setCurQuery(item);
			},
			blurInput(){
				this.$refs.searchBox.blur();
			},
			saveSearch(){
				this.saveSearchHistory(this.query)
			},
			...mapActions([
				'saveSearchHistory',
				'deleteSearchHistory',
				'clearSearchHistory'
			]),
			deleteSearchItem(item){
				console.log(item);
				this.deleteSearchHistory(item);
			},
			clearSearchHistoryAll(){
				this.clearSearchHistory();
			},
			showConfirm(){
				this.$refs.confirm.show();
			}
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
		.search-history{
			margin: 0 20px;
			position: relative;
			.title{
				display: flex;
				font-size: 14px;
				
				.text{
					flex: 1;	
					color: rgba(255,255,255,0.5);				
				}
				.icon{
					color: rgba(255,255,255,0.3);
				}
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