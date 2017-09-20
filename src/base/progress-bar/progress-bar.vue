<template>
	<div class="progress-bar">
		<div class="bar-inner" ref="barInner" @click='progressClick'>
			<div class="progress" ref="progress">
				
			</div>
			<div class="progress-btn-wrapper" ref="progressBtn"
				@touchstart.prevent='touchStart'
				@touchmove.prevent='touchMove'
				@touchend.prevent='touchEnd'				
			>
				<div class="progress-btn">
				
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props:{
			percent: {
				type:Number,
				default:0
			}
		},
		created(){
			this.touch={}
		},
		methods:{
			touchStart(e){
				this.touch.initiated = true;
				this.touch.startX = e.touches[0].pageX;
				this.touch.left = this.$refs.progress.clientWidth;
				
				console.log(e);
			},
			touchMove(e){
				if(!this.touch.initiated){
					return
				}
				const deltax = e.touches[0].pageX - this.touch.startX;
				const maxBarWidth = this.$refs.barInner.clientWidth - 16;
				const offsetWidth = Math.min(maxBarWidth,Math.max(0,this.touch.left + deltax)) ;
				this._offSet(offsetWidth);
				
			},
			touchEnd(e){
				this.touch.initiated = false;
				this._triggerPercent();
			},
			progressClick(e){
				const rect = this.$refs.barInner.getBoundingClientRect();
				const offsetWidth = e.pageX - rect.left;
				this._offSet(offsetWidth);
				this._triggerPercent();				
			},
			_offSet(offsetWidth){
				this.$refs.progress.style.width = `${offsetWidth}px`;
				this.$refs.progressBtn.style.transform = `translate3d(${offsetWidth}px,0,0)`;
			},
			_getPercent(){
				const maxBarWidth = this.$refs.barInner.clientWidth - 16;
				return this.$refs.progress.clientWidth / maxBarWidth;
			},
			_triggerPercent(){
				this.$emit('percentChange',this._getPercent());
			}
		},
		watch:{
			percent(newPercent){
				const barWidth = this.$refs.barInner.clientWidth - 16; //16按钮的宽度
				if(newPercent>=0 && !this.touch.initiated){
					const offSetWidth = barWidth * newPercent;
					this._offSet(offSetWidth);
				}
			}
		}
	}
</script>

<style scoped>
	.progress-bar{
		height: 30px;
	}
	.bar-inner{
		background: rgba(0,0,0,0.3);
		height: 4px;
		position: relative;
		top:13px
	}
	.progress{
		position: absolute;
		background: #FFCD32;
		height: 100%;
	}
	.progress-btn-wrapper{
		height: 30px;
		width: 30px;
		position: absolute;
		top: -13px;
		left: -8px;
	}
	.progress-btn{
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: #FFCD32;
		border: 3px solid #fff;
		box-sizing: border-box;
		position: relative;
		top: 7px;
		left: 7px;
	}
</style>