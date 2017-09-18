<template>
	<div class="player" v-show='playList.length>0'>
		<div class="normal-player" v-show='fullScreen'>
			<div class="background">
				<img :src="currentSong.imgage" width="100%" height="100%"/>
			</div>
			<div class="top">
				<div class="back">
					<i class="icon-back"></i>					
				</div>
				<h1  class="title"  v-html='currentSong.name'></h1>
				<h2  class="subtitle"  v-html='currentSong.singer'></h2>
			</div>
			<div class="middle">
				<div class="middle-l">
					<div class="cd-wrapper">
						<div class="cd">
							<img :src="currentSong.imgage" />
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
					
				</div>
				<div class="operators">
					<div class="icon i-left">
						<i class="icon-sequence"></i>
					</div>
					<div class="icon i-left">
						<i class="icon-prev"></i>
					</div>
					<div class="icon i-center">
						<i class="icon-play"></i>
					</div>
					<div class="icon i-right">
						<i class="icon-next"></i>
					</div>
					<div class="icon i-right">
						<i class="icon-not-favorite"></i>
					</div>
				</div>
			</div>
		</div>
		<div class="mini-player" >
			<div class="small-icon">
				<div class="imgWrapper">
					<img :src='currentSong.imgage' width="40px" height="40px"/>
				</div>
			</div>
			<div class="text">
				<h2 class="name" v-html="currentSong.name"></h2>	
				<p class="desc" v-html="currentSong.singer"></p>
			</div>
			<div class="control">
				<div class="progress-circle">
					<i class="icon-mini icon-play-mini">
						
					</i>
				</div>
			</div>
			<div class="control">
				<i class="icon-playlist"></i>
			</div>
		</div>
		<p>{{currentSong}}</p>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	export default{
		computed:{
			...mapGetters([
				'fullScreen',
				'playList',
				'playing',
				'currentSong'
			])			
		},
		watch:{
			 currentSong(newSong,oldSong){
			 	
			 }
		}

	}
</script>

<style scoped>
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
		color: #FFCD32;
	}
	.icon-playlist{
		font-size: 30px;
		color: rgba(255,205,49,0.5);
	}
</style>