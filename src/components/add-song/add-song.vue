<template>
	<transition name="slide">
	<div class="add-song-wrapper" v-show="showFlag" @click.stop>
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
				<scroll class="song-list" v-if="currentIndex===0" :data="playHistory" ref="songList">
					<div class="list-inner">
					<song-list :songs="playHistory" @select="selectSong"></song-list>						
					</div>
				</scroll >
				<scroll class="song-list" v-if="currentIndex===1" :data="searchHistory" ref="searchList">
					<div class="list-inner">
					<search-list @delete="deleteSearchHistory" @select="addQuery" :searches="searchHistory"></search-list>
					</div>
				</scroll>
			</div>
		</div>
		<div class="search-result" v-show="query">
			<suggest :query="query" @select="selectSuggest"></suggest>
		</div>
		<top-tip ref="topTip">
			<div class="top-title">
				<i class=icon-ok></i>
				<span class="text">1首歌已经添加到播放列表里</span>
			</div>
		</top-tip>
	</div>
	</transition>
</template>

<script>
	import SearchBox from 'base/search-box/search-box'
	import Switches from 'base/switches/switches'
	import SongList from 'base/song-list/song-list'
	import SearchList from 'base/search-list/search-list'
	import Scroll from 'base/scroll/scroll'
	import Suggest from 'components/suggest/suggest'
	import TopTip from 'base/top-tip/top-tip'
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
			SearchList,
			TopTip
		},
		computed:{
			...mapGetters(
				['playHistory']
			)
		},
		methods:{
			show(){
				this.showFlag=true;
				if(this.currentIndex===0){
					this.$refs.songList.refresh();
				}else{
					this.$refs.searchList.refresh();
				}
				
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
					this.$refs.topTip.show()
				}
				
			},
			selectSuggest(){
				this.$refs.topTip.show()
				this.saveSearch()
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
	.slide-enter-active, .slide-leave-active{
		transition: all 0.3s;
	}
	.slide-enter,.slide-leave-to{
		transform: translateX(100%);
	}
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
	.top-title{
		text-align: center;
		padding: 18px 0;
	}
	.top-title .icon-ok{
		font-size: 14px;
		color: #ffcd32;
		margin-right: 4px;
	}
	.top-title .text{
		font-size: 14px;
		color: #fff;
	}
</style>