<template>
	<div class="player" v-show='playList.length>0'>
		<transition name='normal'
					@enter='enter'
					@after-enter='afterEnter'
					@leave='leave'
					@after-leave='afterLeave'			
		>
		<div class="normal-player" v-show='fullScreen'>
			<div class="background">
				<img :src="currentSong.imgage" width="100%" height="100%"/>
			</div>
			<div class="top">
				<div class="back" @click='back'>
					<i class="icon-back"></i>					
				</div>
				<h1  class="title"  v-html='currentSong.name'></h1>
				<h2  class="subtitle"  v-html='currentSong.singer'></h2>
			</div>
			<div class="middle"
				@touchstart.prevent="middleTouchStart"
				@touchmove.prevent = "middleTouchMove"
				@touchend.prevent = "middleTouchEnd"
				>
				<div class="middle-l" ref="middleL">
					<div class="cd-wrapper" ref='cdWrapper'>
						<div class="cd" >
							<img v-lazy="currentSong.imgage":class="cdCls" class="image"/>
						</div>
					</div>
					<div class="playing-lyric-wrapper">
						<div class="playing-lyric">
							{{playingLyric}}
						</div>
					</div>
				</div>
				<scroll class="middle-r" ref="lyricList" :data="currentLyric && currentLyric.lines">
					<div class="lyric-wrapper">
						<div v-if="currentLyric">
							<p ref="lyricLine"
								class="text"
								:class="{'current' : currentLineNum === index }"
								v-for="(line,index) in currentLyric.lines"
								>{{line.txt}}</p>
						</div>
					</div>
					
				</scroll>
			
			</div>
			<div class="bottom">
				<div class="dot-wrapper">
					<span class="dot" :class="{active:currentShow==='cd'}"></span>
					<span class="dot" :class="{active:currentShow==='lyric'}"></span>
				</div>
				<div class="progress">
					<span class="time-s">{{format(currentTime)}}</span>
					<div class="progress-bar">
						<progress-bar :percent="percent" @percentChange='percentChange'></progress-bar>
					</div>
					<span class="time-e">{{format(currentSong.duration)}}</span>
				</div>
				<div class="operators">
					<div class="icon i-left" @click='changeMode'>
						<i :class="iconMode"></i>
					</div>
					<div class="icon i-left" :class="disableCls">
						<i class="icon-prev" @click='prev'></i>
					</div>
					<div class="icon i-center" :class="disableCls">
						<i :class="playIcon" @click='togglePlaying'></i>
					</div>
					<div class="icon i-right" :class="disableCls">
						<i class="icon-next" @click='next'></i>
					</div>
					<div class="icon i-right">
						<i class="icon" @click="toggleFavorite(currentSong)" :class="getFavoriteIcon(currentSong)"></i>
					</div>
				</div>
			</div>
		</div>
		</transition>
		<div class="mini-player" v-show='!fullScreen' @click="open">
			<div class="small-icon">
				<div class="imgWrapper">
					<img v-lazy='currentSong.imgage' width="40px" height="40px" :class='cdCls'/>
				</div>
			</div>
			<div class="text">
				<h2 class="name" v-html="currentSong.name"></h2>	
				<p class="desc" v-html="currentSong.singer"></p>
			</div>
			<div class="control">
				<progress-circle :radius="radius" :percent="percent">
					<i class="icon-mini" :class ='miniIcon' @click.stop="togglePlaying">
						
					</i>
				</progress-circle>
			</div>
			<div class="control">
				<i class="icon-playlist" @click.stop='showPlayList'></i>
			</div>
		</div>
		<play-list ref="playlist"></play-list>
		<audio ref='audio' @play="ready" @error="error" @timeupdate="timeupdate"
			@ended="end" @pause="paused"></audio>
	</div>
</template>

<script>
	import {mapGetters,mapMutations,mapActions} from 'vuex'
	import animations from 'create-keyframe-animation'
	import ProgressBar from 'base/progress-bar/progress-bar'
	import ProgressCircle from 'base/progress-circle/progress-circle'
	import {playMode} from 'common/js/config'
	import {shuffle} from 'common/js/util'
	import Lyric from 'lyric-parser'
	import Scroll from 'base/scroll/scroll'
	import PlayList from '../playList/playList'
	import {playerMixin} from 'common/js/mixin'
	export default{
		mixins: [playerMixin],
		data(){
			return {
				songReady: false,
				currentTime: 0,
				radius:32,
				currentLyric: null,
				currentLineNum: 0,
				currentShow: 'cd',
				playingLyric: '',
				playingLyric: ''
			}
		},
		components:{
			ProgressBar,
			ProgressCircle,
			Scroll,
			PlayList
		},
		created() {
			this.touch = {}
		},
		mounted() {
			console.log(this.currentSong);
		},
		computed:{
			cdCls(){
				return this.playing ? 'play':''
			},
			playIcon(){
				return this.playing ?'icon-pause' : 'icon-play'
			},
			miniIcon(){
				return this.playing ?'icon-pause-mini' : 'icon-play-mini'
			},
			percent(){
				return this.currentTime / this.currentSong.duration
			},
			iconMode(){
				return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' :  'icon-random'
			},
			disableCls(){
				return this.songReady ? '' : 'disable'
			},
			...mapGetters([
				'fullScreen',
				'playList',
				'playing',
				'currentSong',
				'currentIndex',
				'mode',
				'sequenceList'
			])			
		},
		watch:{
			 currentSong(newSong,oldSong){
			 if (!newSong.id || !newSong.url) {
			          return
			     }
		        if (newSong.id === oldSong.id) {
		          return
		        }
		        if(this.currentLyric){
		        	this.currentLyric.stop()
		        }
			 	this.songReady = false;
			 	clearTimeout(this.timer)
//			 	 this.timer = setTimeout(() => {
//		          this.$refs.audio.play()
//		          this.getLyric()
//		        }, 1000)
				console.log(newSong);
				this.$refs.audio.src = newSong.url;
				this.$refs.audio.play()
				this.getLyric()
			 },
			 playing(newPalying){
			 	if (!this.songReady) {
			          return
			    }
//				console.log(this.songReady);
//			 	console.log(newPalying);
				const audio = this.$refs.audio;
				this.$nextTick(() =>{
					newPalying ? audio.play() : audio.pause() 
				})
			 }
		},
		methods:{
			back(){
				this.setFullScreen(false);
			},
			open(){
				this.setFullScreen(true);
			},
			prev(){
				if (!this.songReady) {
		          return
		       }
				if(this.playList.length===1){
					
					this.loop();
					return
				}
				else{
				 let index	= this.currentIndex-1;
				 if(index === -1){
				 	index = this.playList.length-1;
				 }
				  this.setCurrentIndex(index);
				  if (!this.playing) {
		            this.togglePlaying()
		          }
				}
			},
			next(){
				if (!this.songReady) {
		          return
		       }
				if(this.playList.length===1){					
					this.loop();
					return;
				}
				else{
					let index	= this.currentIndex+1;
					if(index === this.playList.length){
						index=0;
					}
					console.log(index);
					this.setCurrentIndex(index);
					console.log(this.playing);
					if (!this.playing) {
		            this.togglePlaying()
		          }
				}
			},
			timeupdate(e){
				this.currentTime = e.target.currentTime;
			},
			format(time){
				time = time|0;
				const minute = time/60 | 0;
				let second = time%60 | 0;
				if(second.toString().length==1){
					second = '0' + second;
				}
				return `${minute}:${second}`;
			},
			togglePlaying(){
				if (!this.songReady) {
		          return
		       }
				this.setPlayingState(!this.playing)
				if(this.currentLyric){
					this.currentLyric.togglePlay()
				}
			},
			changeMode(){
//				console.log(this.mode);
				const mode = (this.mode+1)%3;
//				console.log(mode);
				this.setPalyMode(mode);
				let list = null;
				if(mode === playMode.random){
					list = shuffle(this.sequenceList);
				}else{
					list = this.sequenceList;
				}
				this.resetCurrentIndex(list);
				this.setPlayList(list);
//				console.log(list);
			},
			resetCurrentIndex(list) {
				let index = list.findIndex((item)=>{
					return item.id === this.currentSong.id;
				})
//				console.log(index);
				this.setCurrentIndex(index);
			},
			...mapMutations({
				setFullScreen: 'SET_FULL_SCREEN',
				setPlayingState: 'SET_PLAYING_STATE',
				setCurrentIndex: 'SET_CURRENT_INDEX',
				setPalyMode: 'SET_PLAY_MODE',
				setPlayList: 'SET_PLAYLIST'
			}),
			...mapActions(
				['savePlayHistory']
			),
			ready(){
				console.log(this.songReady);
				//延时避免快速切换歌曲导致DOM 报错
				setTimeout(() => {
					this.songReady = true;
				}, 500)
				
//				this.songReady = true;
				this.savePlayHistory(this.currentSong)
				//如果歌曲的播放晚于歌词的出现，播放时需同步歌词
				if(this.currentLyric && !this.isPureMusic){
					this.currentLyric.seek(this.currentTime * 1000)
				}
				
			},
			error() {
		       this.songReady = true
		     },
		     end(){
		     	this.currentTime = 0;
		     	console.log(this.mode);
		     	if(this.mode === playMode.loop){
		     		this.loop();
		     	}
		     	else{
//		     		 this.songReady = true
		     		this.next();
		     	}
		     },
		     loop(){
		     	this.currentTime = 0;
		     	this.$refs.audio.play();
		     	this.setPlayingState(true);
		     	if(this.currentLyric){
		     		this.currntLyric.seek(0)
		     	}
		     },
		     paused(){
		     	this.setPlayingState(false);
		     },
			enter(el,done){
				const {x,y,scale} = this._getPosAndScale()
				let animation ={
					0:{
						transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
					},
					60: {
						transform: `translate3d(0,0,0) scale(1.1)`
					},
					100:{
						transform: `translate3d(0,0,0) scale(1)`
					}					
				}
				animations.registerAnimation({
					name:'move',
					animation,
					presets:{
						duration:400,
						easing: 'linear'
					}
				})
				animations.runAnimation(this.$refs.cdWrapper,'move',done)
			},
			afterEnter() {
				animations.unregisterAnimation('move');
				this.$refs.cdWrapper.style.animation = '';
			},
			leave(el,done){
				this.$refs.cdWrapper.style.transition = 'all 0.4s';
				const {x,y,scale} = this._getPosAndScale();
				this.$refs.cdWrapper.style.transform = `translate3d(${x}px,${y}px,0) scale(${scale})`;
				const timer = setTimeout(done,400);
				this.$refs.cdWrapper.addEventListener('transitionend',() =>{
					clearTimeout(timer);
					done()
				})
			},
			afterLeave(){
				this.$refs.cdWrapper.style.transition = ''
				this.$refs.cdWrapper.style.transform = ''
			},
			 _getPosAndScale(){
			 	const targetWidth = 40;
			 	const paddingLeft = 40;
			 	const paddingBottom = 30;
			 	const paddingTop = 80;  //大圆距顶部top值
			 	const width = window.innerWidth*0.8;
			 	const scale = targetWidth / width;
			 	const x = -(window.innerWidth/2 - paddingLeft);
			 	const y = window.innerHeight - paddingTop - width/2-paddingBottom;
			 	return {
			 		x,
			 		y,
			 		scale
			 	}
			 },
			 percentChange(percent){
			 	const  currentTime = this.currentSong.duration*percent;
			 	this.currentTime = this.$refs.audio.currentTime = currentTime;
			 	if(this.currentLyric){
			 		this.currentLyric.seek(currentTime*1000)
			 	}
			 },
			 getLyric(){
			 	this.currentSong.getLyric().then((lyric) => {
//			 		console.log(lyric);
			 		if(this.currentSong.lyric != lyric){
			 			return
			 		}
			 		this.currentLyric = new Lyric(lyric,this.handleLyric)
			 		if(this.playing){
			 			this.currentLyric.play()
			 		}
			 	}).catch(()=>{
			 		this.currentLyric = null
			 		this.playingLyric = ''
			 		this.currentLineNum = 0
			 	})
			 },
			 handleLyric({lineNum,txt}){
			 	if(!this.$refs.lyricLine){
			 		return
			 	}
			 	this.currentLineNum = lineNum;
			 	console.log(this.currentLineNum);
			 	if(lineNum > 5){
			 		let lineEl = this.$refs.lyricLine[lineNum-5];
			 		this.$refs.lyricList.scrollToElement(lineEl,1000)
			 	}else{
			 		this.$refs.lyricList.scrollTo(0,0,1000)
			 	}
			 	this.playingLyric = txt
			 },
			 middleTouchStart(e){
			 	this.touch.initiated = true;
			 	this.touch.moved = false;
			 	const touch = e.touches[0];
			 	this.touch.startX = touch.pageX;
			 	this.touch.startY = touch.pageY;
			 },
			 middleTouchMove(e){
			 	if(!this.touch.initiated){
			 		return
			 	}
			 	const touch = e.touches[0];
			 	const deltaX = touch.pageX - this.touch.startX;
			 	const deltaY = touch.pageY - this.touch.startY;
			 	if(Math.abs(deltaY) > Math.abs(deltaX)){
			 		return
			 	}
			 	if(!this.touch.moved){
			 		this.touch.moved = true
			 	}
			 	const left = this.currentShow === 'cd' ? 0 : -window.innerWidth;
			 	const offsetWidth = Math.min(0,Math.max(-window.innerWidth,left + deltaX));
//			 	console.log(offsetWidth);
			 	this.touch.percent = Math.abs(offsetWidth / window.innerWidth);
			 	this.$refs.lyricList.$el.style.transform = `translate3d(${offsetWidth}px,0,0)`;
			 	this.$refs.lyricList.$el.style.transitionDuration = 0;
			 	this.$refs.middleL.style.opacity = 1 - this.touch.percent
			 	this.$refs.middleL.style.transitionDuration = 0
			 },
			 middleTouchEnd(e){
			 	if(!this.touch.moved){
			 		this.touch.moved = true
			 	}
			 	let offsetWidth
			 	let opacity
//			 	console.log(this.currentShow);
			 	if(this.currentShow === 'cd'){
			 		if(this.touch.percent > 0.1){
			 			offsetWidth = -window.innerWidth
			 			opacity = 0
			 			this.currentShow = 'lyric'
			 		}else{
			 			offsetWidth = 0
			 			opacity =1
			 			this.currentShow = 'cd'
			 		}
			 	}else{
			 		if(this.touch.percent  < 0.9){
			 			offsetWidth = 0
			 			opacity =1
			 			this.currentShow ='cd'
			 		}else{
			 			offsetWidth = -window.innerWidth
			 			opacity = 0
			 			this.currentShow = 'lyric'
			 		}
			 	}
			 	const time =300
			 	this.$refs.lyricList.$el.style.transform = `translate3d(${offsetWidth}px,0,0)`
			 	this.$refs.lyricList.$el.style.transitionDuration = `${time}ms`
			 	this.$refs.middleL.style.opacity = opacity
			 	this.$refs.middleL.style.transitionDuration = `${time}ms`
			 	this.touch.initiated = false
			 },
			 showPlayList(){
			 	this.$refs.playlist.show();
			 },
		}
	}
</script>

<style scoped>
	.normal-enter-active,.normal-leave-active{
		transition: all .3s ease;
	}
	.normal-enter-active .top,.normal-enter-active .bottom,.normal-leave-active .top,.normal-leave-active .bottom{
		transition: all 0.3s cubic-bezier(0.86, 0.18, 0.82, 1.32);
	}
	.normal-enter,.normal-leave-to{
		opacity: 0;
	}
	.normal-enter .top,.normal-leave-to .top{
		transform: translate3d(0,-100px,0);
	}
	.normal-enter .bottom,.normal-leave-to .bottom{
		transform: translate3d(0,100px,0);
	}
	.normal-player {
		position: absolute;
		top:0;
		left:0;
		right:0;
		bottom:0;
		background: #222;
		z-index:150
	}
	.background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		opacity: 0.6;
		filter: blur(20px);
	}
	.top{
		position: relative;
		margin-bottom: 25px;
	}
	.back{
		position: absolute;
		top: 0;
		left: 6px;
		z-index: 50;
	}
	.icon-back{
		display: block;
		padding: 9px;
		color: #FFCD32;
		font-size: 22px;
		transform: rotate(-90deg);
	}
	.title{
		width: 70%;
		margin: 0 auto;
		text-align: center;
		height: 40px;
		line-height: 40px;
		font-size: 18px;
		color: #fff;
		overflow: hidden;		
	}
	.subtitle{
		text-align: center;
		font-size: 14px;
		line-height: 20px;
	}
	.middle{
		width: 100%;
		position: fixed;
		top: 80px;
		bottom: 170px;
	}
	.middle-l{
		position: relative;
		width: 100%;
		padding-top: 80%;
		height: 0;
		display: inline-block;
	}
	.middle-r{
		display: inline-block;
		width: 100%;
		height: 100%;
		vertical-align: top;
		position: absolute;
		top: 0;
		left: 100%;
		overflow: hidden;
	}
	.text{
		font-size: 14px;
		line-height: 20px;
		color: rgba(255,255,255,0.5);
		flex: 1;
		display:flex;
		flex-direction: column;
	}
	.current{
		color: #FFF;
	}
	.lyric-wrapper{
		margin: 0 auto;
		text-align: center;
		overflow: hidden;
	}
	.cd-wrapper{
		position: absolute;
		top: 0;
		width: 80%;
		left: 10%;
		height: 100%;
	}
	.cd{
		border-radius: 50%;
		width: 100%;
		height: 100%;
	}
	.cd img{
	    border-radius: 50%;
		width: 100%;
		height: 100%;
		border: 10px solid rgba(250,250,250,0.1);
		box-sizing: border-box
	}
	.play{
		animation:  rotate 20s linear infinite;
	}
	.bottom{
		position: fixed;
		bottom: 60px;
		width: 100%;
	}
	.dot-wrapper{
		text-align: center;
	}
	.dot{
		display: inline-block;
		width: 8px;
		height: 8px;	
		border-radius: 50%;
		background: rgba(255,255,255,0.5);
	}
	.progress{
		display: flex;
		align-items: center;
		padding: 10px 0;
		width: 80%;
		margin: 0 auto;
	}
	.operators{
		display: flex;
		align-items: center;
	}
	.icon{
		color: #FFCD32;
		flex: 1;
	}
	.icon i{
		font-size: 30px;
	}
	.icon-favorite{
		color:#d93f30;
	}
	.i-left{
		text-align: right;
	}
	.i-right{
		text-align: left;
	}
	.i-center{
		padding: 0 20px;
		text-align: center;
		font-size: 40px;
	}
	.i-center i{
		font-size: 40px;
	}
	.mini-player{
		position: absolute;
		bottom: 0;
		height: 60px;
		background: #333;
		width: 100%;
		z-index: 180;
		display: flex;
		align-items: center;
	}
	.small-icon{
		width: 40px;
		height: 40px;
		padding: 0 10px 0 20px;
	}
	.imgWrapper{
		width: 100%;
		height: 100%;
	}
	.imgWrapper img{
		border-radius: 50%;
	}

	.name{
		font-size: 14px;
	}
	.desc{
		 /*padding-top: 10px;*/
		 font-size: 12px;
		color: rgba(250,250,250,0.3);
	}
	.control{
		padding: 0 10px;
		flex: 0 0 30px;
	}
	.icon-mini{
		font-size: 32px;
		color: rgba(255,205,49,0.5);
		position: absolute;
		top: 0;
		left: 0;
	}
	.icon-playlist{
		font-size: 30px;
		color: rgba(255,205,49,0.5);
	}
	.time-s,.time-e{
		font-size: 12px;
		width: 30px;
	}
	.time-s{
		text-align: left;
	}
	.time-e{
		text-align: right;
	}
	.progress-bar{
		flex:1;
	}
	.playing-lyric{
		text-align: center;
		font-size: 14px;
		color: rgba(255,255,255,0.5);
		padding-top: 20px;
	}
	.active{
		width: 20px;
        border-radius: 5px;
        background: rgba(255,255,255,0.5)
	}
	@keyframes rotate{
	 0%{
	  transform: rotate(0);
	 }
     
    100%{
      transform: rotate(360deg);
    }   		
}
</style>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   