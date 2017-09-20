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
			<div class="middle">
				<div class="middle-l">
					<div class="cd-wrapper" ref='cdWrapper'>
						<div class="cd" >
							<img v-lazy="currentSong.imgage":class="cdCls" class="image"/>
						</div>
				</div>
				</div>
			
			</div>
			<div class="bottom">
				<div class="dot-wrapper">
					<span class="dot"></span>
					<span class="dot"></span>
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
						<i class="icon-not-favorite"></i>
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
				<i class="icon-playlist"></i>
			</div>
		</div>
		<audio ref='audio' :src='currentSong.url' @play="ready" @error="error" @timeupdate="timeupdate"
			@ended="end" @pause="paused"></audio>
	</div>
</template>

<script>
	import {mapGetters,mapMutations} from 'vuex'
	import animations from 'create-keyframe-animation'
	import ProgressBar from 'base/progress-bar/progress-bar'
	import ProgressCircle from 'base/progress-circle/progress-circle'
	import {playMode} from 'common/js/config'
	import {shuffle} from 'common/js/util'
	export default{
		data(){
			return {
				songReady: false,
				currentTime: 0,
				radius:32
			}
		},
		components:{
			ProgressBar,
			ProgressCircle
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
			 if (!newSong.id) {
			          return
			     }
		        if (newSong.id === oldSong.id) {
		          return
		        }			 	
			 	this.songReady = false;
			 	clearTimeout(this.timer)
			 	 this.timer = setTimeout(() => {
		          this.$refs.audio.play()
		        }, 1000)
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
					return
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
			ready(){
				console.log(this.songReady);
				this.songReady = true;
				
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
			 }
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
	.text{
		flex: 1;
	}
	.name{
		font-size: 14px;
	}
	.desc{
		 padding-top: 10px;
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
	@keyframes rotate{
	 0%{
	  transform: rotate(0);
	 }
     
    100%{
      transform: rotate(360deg);
    }   		
}
</style>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   