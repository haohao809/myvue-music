<template>
	<div class="add-song-wrapper" v-show="showFlag">
		<div class="header">
			<h1 class="title">添加歌曲到列表</h1>
			<div class="close" @click="close">
				<i class="icon-close"></i>
			</div>
		</div>
		<div class="search-box">
			<search-box ref="searchBox" @query="onQueryChange"></search-box>
		</div>
		<div class="short-cut" v-show="!query">
			<switches @switch="switchItem"></switches>
			<div class="list-wraper">
				<scroll class="song-list" v-if="currentIndex===0" :data="playHistory">
					<div class="list-inner">
					<song-list :songs="playHistory" @select="selectSong"></song-list>						
					</div>
				</scroll >
				<scroll class="song-list" v-if="currentIndex===1" :data="searchHistory">
					<div class="list-inner">
					<search-list @delete="deleteSearchHistory" @select="addQuery" :searches="searchHistory"></search-list>
					</div>
				</scroll>
			</div>
		</div>
		<div class="search-result" v-show="query">
			<suggest :query="query"></suggest>
		</div>
	</div>
</template>

<script>
	import SearchBox from 'base/search-box/search-box'
	import Switches from 'base/switches/switches'
	import SongList from 'base/song-list/song-list'
	import SearchList from 'base/search-list/search-list'
	import Scroll from 'base/scroll/scroll'
	import Suggest from 'components/suggest/suggest'
	import {mapGetters,mapActions} from 'vuex'
	import Song from 'common/js/song'
	import {searchMixin} from 'common/js/mixin'
	export default{
		mixins: [searchMixin],
		data(){
			return{
				showFlag:false,
				currentIndex: 0,
			}
		},
		components:{
			SearchBox,
			Switches,
			SongList,
			Suggest,
			Scroll,
			SearchList
		},
		computed:{
			...mapGetters(
				['playHistory']
			)
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
			},
			switchItem(index){
				this.currentIndex = index
			},
			selectSong(song,index){
				console.log(song)
				console.log(new Song(song))
				if(index!=0){
					this.insertSong(new Song(song));
				}
			},
			...mapActions(
				['insertSong']				
			)
		},
		watch: {
			query(newVal){
				console.log(newVal);
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
	.search-box{
		margin: 20px;
	}
	.list-inner{
		padding: 20px 30px;
	}
	.list-wraper{
		position: absolute;
		top:165px;
		bottom: 0;
		width:100%
	}
	.song-list{
		height: 100%;
		overflow: hidden;
	}
</style>