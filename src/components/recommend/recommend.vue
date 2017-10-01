<template>
	<div class="recommend" ref="recommend">
		<scroll ref="scroll" :data="discList" class="recommend-content">
			<div>
			<div class="slider-show" @mouseover="closeAuto" @mouseout="autoSlider" @click="linkUrl">
					<div class="item" >	
							<transition name="slider-trans">
								<img v-if="isShow&&sliders[nowIndex]" :src='sliders[nowIndex].picUrl' @load="loadImage">
							</transition>
						<transition name="slider-trans-old">
							<img v-if="!isShow&&sliders[nowIndex]" :src='sliders[nowIndex].picUrl' @load="loadImage">
						</transition>					
						<ul class="dots">
								<li class="dot" :class="{active:nowIndex==index}" v-for="(item,index) in sliders"></li>
						</ul>	
					</div>		
			</div>
			<div class="recommend-list">
				<h3 class="list-title">热门歌单推荐</h3>
				<ul>
					<li v-for="itemlist in  discList" class="item-list" @click="select(itemlist)">
						<div class="item-img">
							<img v-lazy="itemlist.imgurl" width="60" height="60"/>
						</div>
						<div class="text">
							<h4 class="text-name">{{itemlist.creator.name}}</h4>
							<p class="text-p">{{itemlist.dissname}}</p>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="load-style" v-show="!discList.length">
			<loading></loading>
		</div>
	 </scroll>
	 <router-view></router-view>	
	</div>
</template>

<script>
	import {getRecommend,getDiscList} from 'api/recommend'
	import Scroll from 'base/scroll/scroll'
	import Loading from 'base/loading/loading'
	import {playlistMixin} from 'common/js/mixin'
	import {mapMutations} from 'vuex'
	export default{
		mixins:[playlistMixin],
		data (){
			return{
				sliders: [],
				discList: [],
				nowIndex: 0,
				isShow: true
			}
		},
		components:{
			Scroll,
			Loading
		},
		created(){
			this._getRecommend()
			this.autoSlider()
			this._getDiscList()
		},
		destroyed(){
			this.closeAuto()
		},
		methods: {
			handlePlaylist(playList){
				const bottom = playList.length > 0 ? '60px' : ''
				this.$refs.recommend.style.bottom = bottom;
				this.$refs.scroll.refresh();
			},
			_getRecommend(){
				getRecommend().then((res)=>{
					if(res.code==0){
						console.log(res.data.slider);
						var slidesArr = res.data.slider;
						for (let i = 0;i < slidesArr.length;i++) {
								this.sliders.push(slidesArr[i])
						}
					}
				})
			},
			autoSlider(){
				
				this.setTime = setInterval( () =>{
//					console.log(this.isShow);
					this.isShow = false;								
					setTimeout(()=>{
						this.isShow = true;
						this.nowIndex = this.nowIndex + 1;
						if(this.nowIndex > 3){
							this.nowIndex = 0;
						}	
					},10)
				},2000)
				
			},
			closeAuto(){
				clearInterval(this.setTime);
			},
			linkUrl(){
				window.location.href=this.sliders[this.nowIndex].linkUrl;
			},
			select(val){
				console.log(val);
				this.$router.push({path: `/recommend/${val.dissid}`})
				this.setDisc(val)
			},
			_getDiscList(){
				getDiscList().then((res)=>{
					if(res.code==0){
						console.log(res.data);
						this.discList = res.data.list;
					}
				})
			},
			loadImage(){
				if(!this.checkLoaded){
					this.checkLoaded = true;
					setTimeout(()=>{
						this.$refs.scroll.refresh();
					},20)
				}
			},
			...mapMutations({
				setDisc:'SET_DISC'
			})
				
			
		}
		
		
	}
</script>

<style scoped>
	/*轮播图*/
	.slider-trans-enter-active{
		transition: all .5s;
	}
		
		.slider-trans-enter{
			transform: translateX(100%);
		}
			
		.slider-trans-old-leave-active{
			transition: all .5s;
			transform: translateX(-100%);
		}
	.recommend{
		position: fixed;
    	width: 100%;
    	bottom: 0;
    	top: 95px;
	}	
	.recommend-content{
		height: 100%;
		overflow: hidden;
	}
	.slider-show{
		position: relative;
		width: 100%;
		height: 0;
		overflow: hidden;
		padding-top: 40%;
	}			
		.item{
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			position: absolute;
		}

		.item img{
			width: 100%;
			position: absolute;
	  		top: 0;
	  		float: left;
	  		cursor: pointer;
		}
		.dots{
			position: absolute;
			bottom: 0px;
			height: 30px;
			width: 100%;
			text-align: center;
		}
		.dot{
			margin: 0 4px;
			display: inline-block;
			width: 8px;
			height: 8px;
			border-radius: 50%;
			background: rgba(250,250,250,0.5);		    
		}
		.active{
			width: 20px;
			border-radius: 5px;
			background: rgba(250,250,250,0.8);
		}
		/*歌单推荐*/
		.list-title{
			margin: 20px 5px;
			text-align: center;
			color: #ffcd32;
			font-size: 14px;
		}
		.item-img{
			padding-right: 20px;
		}
		.text{
			font-size: 14px;
			line-height: 20px;
		}
		.text-name{
			margin-bottom: 10px;
		}
		.item-list{
			padding: 0 20px 20px 20px;
			display: flex;
			align-items: center;
		}
		
		.text-p{
			color:rgba(255,255,255,0.3)
		}
		.load-style{
			position: absolute;
			width: 100%;
			top: 50%;
			transform: translateY(-50%);
		}
</style>