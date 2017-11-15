<template>
	<transition name='slide'>
		<div class="user">
			<div class="back" @click="back">
				<i class="icon-back"></i>
			</div>
			<div class="switches-wraper" @click="random">
				<switches :switches="switches" :currentIndex="currentIndex"></switches>
			</div>
			<div class="play-btn">
				<i class="icon-play"></i>
				<span class="text">随机播放全部</span>
			</div>
		</div>
	</transition>
</template>

<script>
	import Switches from 'base/switches/switches'
	export default{
		data() {
			return {
				currentIndex: 0,
		        switches: [
		          {
		            name: '我喜欢的'
		          },
		          {
		            name: '最近听的'
		          }
		         ]
			}
		},
		components:{
			Switches
		},
		methods:{
			back(){
				this.$router.back();
			},
			random(){
				
			}
		}
	}
</script>

<style lang='scss' scoped>
	.user{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		z-index: 100;
		background: #222;
		.back{
			position: absolute;
			left:6px;
			top:0;
			z-index: 50;
			.icon-back{
				color:#ffcd32;
				font-size: 22px;
				padding: 10px;
				display: block;
			}
		}
		.switches-wraper{
			margin:10px 0 30px 0
		}
		.play-btn{
			text-align: center;
			border: 1px solid #666666;
			padding: 7px 0;
			width: 135px;
			margin: 0 auto;
			border-radius: 100px;
			color: rgba(255,255,255,0.5);
			.icon-play{
				font-size: 16px;
				margin-right: 5px;
				display: inline-block;
				vertical-align: middle;
			}
			.text{
				font-size: 12px;
				vertical-align: middle;
			}
		}
	}
</style>