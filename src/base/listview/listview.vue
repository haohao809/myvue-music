<template>
	<scroll :data="data" class="listview" ref="listview" @scroll="scroll" :listenScroll="listenScroll" :probeType="probeType">
		<ul>
			<li v-for="group in data" class="group" ref='listGroup'>
				<h2 class="list-title">{{group.title}}</h2>
				<ul>
					<li v-for="item in group.items" class="item-group">
						<img  class="item-img" v-lazy="item.avatar" />
						<span class="item-span">{{item.name}}</span>
					</li>
				</ul>
			</li>
		</ul>
		<div class="mark">
			<ul>
				<li v-for="(item,index) in data" class="letter-title" @touchstart.stop.prevent='onTouchstart' @touchmove.stop.prevent='onTouchMove' 
					 :class="{'current': currentIndex == index}"
					 :data-index="index">
					{{item.title.substr(0,1)}}
				</li>
			</ul>
		</div>
		<div class="fixed" v-show="fixedTitle" ref="fixed">
			<div class="fixed-title">
				{{fixedTitle}}
			</div>
		</div>
	</scroll>

</template>

<script>
	import Scroll from 'base/scroll/scroll'
	export default {
		props:{
			data:{
				type:Array,
				default:[]
			}
		},
		created(){
			this.touch = {}
			this.listenScroll= true
			this.listHeight = []
			this.probeType = 3
		},
		data(){
			return {
			 currentIndex: 0,
			 scrollY: -1,
			 diff: -1
			}

		},
		computed:{
			fixedTitle(){
				if(this.scrollY > 0){
					return '';
				}
				return this.data[this.currentIndex] ? this.data[this.currentIndex].title : '';
			}
		},
		methods:{
			_init(){
				console.log(this.data);
			},
			onTouchstart(e){
				let firstTouch = e.touches[0]
				console.log(firstTouch);
        		this.touch.y1 = firstTouch.pageY
				let anchorIndex = e.target.getAttribute('data-index');
				this._scrollTo(anchorIndex);
				this.touch.anchorIndex = anchorIndex
			},
			refresh() {
		        this.$refs.listview.refresh()
		     },
		     scroll(pos) {
		        this.scrollY = pos.y
//		        console.log(this.scrollY);
		     },
		     onTouchMove(e){
		     	let firstTouch = e.touches[0]
		     	this.touch.y2 = firstTouch.pageY
		        let delta = (this.touch.y2 - this.touch.y1) / 18 | 0
		     	let anchorIndex = parseInt(this.touch.anchorIndex) + delta
		     	this._scrollTo(anchorIndex);
		     },
			_scrollTo(index){
				if (!index && index !== 0) {
		          return
		        }
				if(index<0){
					index = 0;
				}else if(index > this.listHeight.length-2){
					index = this.listHeight.length-2;
				}
				this.scrollY = -this.listHeight[index];
				console.log(this.scrollY);
				this.$refs.listview.scrollToElement(this.$refs.listGroup[index],0)
				
			},
			_calculateHeight() {
				this.listHeight =[];
				let height =0;
				this.listHeight.push(height);
				const list = this.$refs.listGroup;
				for(let i = 0; i<list.length;i++){
					let item = list[i];
					height += item.clientHeight;
					this.listHeight.push(height);
				}
			}
		},
		watch:{
			data(){
				setTimeout(() =>{
					this._calculateHeight()
				},20)
			},
			scrollY(newY){
				const listHeight = this.listHeight;
				//当滚动到顶部
				if(newY>0){
					this.currentIndex = 0;
				}
//				console.log(-newY);
//				console.log(this.listHeight);
				//在中间
				for(let i = 0; i<listHeight.length-1; i++){
					let height1 = listHeight[i];
					let height2 = listHeight[i+1];
					if(-newY >= height1 && -newY < height2){
						this.currentIndex = i;
						this.diff = height2 + newY;
//						console.log(this.currentIndex);
						return
					}
				}
				//当滚动到底部
				this.currentIndex = listHeight.length - 2;
				console.log(this.currentIndex);
			},
			diff(val){
				let DValue = (val > 0 && val < 30) ? val-30 : 0;  //30是fixtitle高度
				console.log(DValue);
				console.log(this.DValue);
				if(this.DValue === DValue){
					return
				}
				this.DValue = DValue;
				this.$refs.fixed.style.transform = `translate3d(0,$(DValue)px,0)`
			}
		},
		components:{
			Scroll
		}
	}
</script>

<style scoped>
	.listview{
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: #222;
	}
	.item-img{
		width: 50px;
		height:50px;
		border-radius: 50%;
	}
	.list-title{
		font-size: 12px;
		background: #333;
		width: 100%;
		height: 30px;
		line-height: 30px;
		color: rgba(255,255,255,0.5);
		padding-left: 20px;
	}
	.item-group{
		padding: 10px;
		display: flex;
		align-items: center
	}
	.item-span{
		padding-left: 15px;
		font-size: 14px;
		color: rgba(255,255,255,0.5);
		display: inline-block;
	}
	.mark{
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
	}
	.letter-title{
		font-size: 12px;
		color: rgba(255,255,255,0.5);
		background: #333;
		padding: 3px;
	}
	.current{
		color:#ffcd32;
	}
	.fixed{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}
	.fixed-title{
		font-size:12px;
		color: rgba(255,255,255,0.5);
		background: #333;
		padding-left: 20px;
		height: 30px;
		line-height: 30px;
	}
</style>