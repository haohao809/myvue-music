<template>
	<div class="music-list">
		<div class="back" @click='back'>
			<i class="icon"></i>			
		</div>
		<h1 class="title">{{title}}</h1>
		<div class="bg-image" :style="bgStyle"ref='bgImage'>
			<div class="play-wrapper" ref="playBtn" @click='random'>
				<div class="play">
					<i class="icon-play"></i>
					<span class="text">随机播放全部</span>
				</div>
			</div>
			<div class="filter" ref="filter">
				
			</div>
		</div>
		<div class="bg-layer" ref="layer">			
		</div>
		<scroll  class="list" :data='songs' ref='list' :listen-scroll='listenScroll' :probeType='probeType' @scroll='scroll'>
			<div class="song-list-wrapper">
				<song-list :songs='songs' @select='selectItem'></song-list>
			</div>
		</scroll>
	</div>
</template>

<script>
	import SongList from 'base/song-list/song-list'
	import Scroll from 'base/scroll/scroll'
	import {mapActions} from 'vuex'
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
			this.minTranslateY = -this.imageHeight + 40;            //顶部露出的默认高度
		},
		created(){
			this.probeType = 3
      		this.listenScroll = true
		},
		watch: {
			scrollY(newY){
//				console.log(newY);
				let translateY = Math.max(this.minTranslateY,newY);
				let scale = 1;
				console.log(translateY);
				let zIndex = 0;
				let blur = 0;
				const percent = Math.abs(newY/this.imageHeight);
				if(newY>0){
					scale = 1 + percent;
					zIndex = 10;
				}else{
					blur = Math.min(20,percent*20);
				}
				this.$refs.layer.style.transform = `translate3d(0,${translateY}px,0)`;
				this.$refs.filter.style.backdrop = `blur(${blur})`
				if(newY<this.minTranslateY){
					zIndex = 10;
					this.$refs.bgImage.style.paddingTop = 0
          			this.$refs.bgImage.style.height = `40px`
          			this.$refs.playBtn.style.display = 'none'
				}else{
					this.$refs.bgImage.style.paddingTop = '70%'
          			this.$refs.bgImage.style.height = 0
          			this.$refs.playBtn.style.display = ''
				}
				this.$refs.bgImage.style.zIndex = zIndex;
				this.$refs.bgImage.style.transform = `scale(${scale})`;
			}
		},
		methods :{
			scroll(pos){
				this.scrollY = pos.y
			},
			back(){
				this.$router.back()
			},
			selectItem(song, index){
				this.selectPlay({
					list:this.songs,
					index
				})
			},
			random(){
				this.randomPlay({
					list:this.songs,
				})
			},
			...mapActions([
				'selectPlay',
				'randomPlay'
			])
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
	.bg-layer{
		position: relative;
		background: #222222;
		height: 100%;
	}
	.play-wrapper{
		position: absolute;
		bottom: 20px;
		width: 100%;
		z-index: 50;
	}
	.play{
		color: #ffcd32;
		text-align: center;
		border: 1px solid #FFCD32;
		width: 135px;
		margin: 0 auto;
		padding: 7px 0;
		border-radius: 100px;
	}
	.icon-play{
		font-family: 'music-icon' !important;
	}
	.icon-play:before{
		content: '\E90C';
	}
</style>