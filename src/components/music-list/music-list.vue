<template>
	<div class="music-list">
		<div class="back">
			<i class="icon"></i>			
		</div>
		<h1 class="title">{{title}}</h1>
		<div class="bg-image" :style="bgStyle" @scroll='scroll'  ref='bgImage'>			
		</div>
		<scroll class="list" :data='songs' ref='list'>
			<div class="song-list-wrapper">
				<song-list :songs='songs'></song-list>
			</div>
		</scroll>
	</div>
</template>

<script>
	import SongList from 'base/song-list/song-list'
	import Scroll from 'base/scroll/scroll'
	export default {
		props:{
			title :{
				type:String,
				default:''
			},
			bgImg :{
				type:String,
				default:''
			},
			songs :{
				type :Array,
				default: []
			}
		},
		data() {
			return {
				scrollY : 0
			}
		},
		computed : {
			bgStyle(){
				return `background-image:url(${this.bgImg})`
			}
		},
		components:{
			SongList,
			Scroll
		},
		mounted(){
			this.imageHeight = this.$refs.bgImage.clientHeight;
			this.$refs.list.$el.style.top = `${this.imageHeight}px`
		},
		methods :{
			scroll(pos){
				this.scrollY = pos.y
			}
		}
		
	}
</script>

<style scoped>
	.list{
		position: absolute;
		bottom: 0;
		top: 0;
		width: 100%;
		background: #222;
	}
	.music-list{
		position: fixed;
		background: #222;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 100;
	}
	.back{
		position: absolute;
		top: 0;
		left: 6px;
		z-index: 50;
	}
	.icon{
		display: block;
		padding: 10px;
		font-size: 22px;
		color: #ffcd32;
		font-family: 'music-icon' !important;
		font-style: normal;
	}
	.icon:before{
		content: "\e911";
	}
	.title{
		position: absolute;
		left:10%;
		width: 80%;
		line-height: 40px;
		vertical-align: middle;
		text-align: center;
		font-size: 18px;
		color: #fff;
		z-index: 40;
		
	}
	.bg-image{
		position: relative;
		width: 100%;
		padding-top: 70%;
		background-size: cover;
	}
	.song-list-wrapper{
		padding: 20px 30px;
	}
</style>