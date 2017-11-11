<template>
	<div class="add-song-wrapper" v-show="showFlag">
		<div class="header">
			<h1 class="title">添加歌曲到列表</h1>
			<div class="close" @click="close">
				<i class="icon-close"></i>
			</div>
		</div>
		<div class="search-box">
			<search-box></search-box>
		</div>
		<div class="short-cut">
			<switches @switch="switchItem"></switches>
			<div class="list-wraper">
				<div class="song-list" v-if="currentIndex===0" :data="playHistory">
					<song-list :songs="playHistory"></song-list>
				</div>
			</div>
		</div>
		<div class="search-result">
			<suggest ></suggest>
		</div>
	</div>
</template>

<script>
	import SearchBox from 'base/search-box/search-box'
	import Switches from 'base/switches/switches'
	import SongList from 'base/song-list/song-list'
	import Suggest from 'components/suggest/suggest'
	import {mapGetters} from 'vuex'
	export default{
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
			Suggest
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
</style>