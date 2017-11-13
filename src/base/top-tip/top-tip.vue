<template>
	<div class="top-tip" v-show="showFlag" @click.stop="hide">
		<slot></slot>
	</div>
</template>

<script>
	export default{
		props:{
			delay:{
				type:Number,
				default:2000
			}
		},
		data(){
			return {
				showFlag:false
			}
		},
		methods:{
			show(){
				this.showFlag=true;
				setTimeout(()=>{
					this.showFlag=false
				},this.delay)
			},
			hide(){
				this.showFlag=false
			}
		}
	}
</script>

<style scoped>
	.top-tip{
		position: fixed;
		top:0;
		width: 100%;
		background: #666;
		z-index: 500;
	}
</style>