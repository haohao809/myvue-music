<template>
	<div class="playlist" v-show='showFlag'>
		<div class="list-wrapper">	
		<div class="list-header">
			<h1 class="title">
				<i class="icon"></i>
				<span></span>
				<span><i class="icon-clear"></i></span>
			</h1>
		</div>
		<div class="list-content">
			<ul>
				<li v-for='(item,index) in sequenceList'>{{item.name}}</li>
			</ul>
		</div>
		<div class="list-operate">
			
		</div>
		<div class="list-close">
			
		</div>
		</div>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	import {playMode} from 'common/js/config'
	export default{
		data(){
			return {
				showFlag : false,
			}
		},
		computed:{
			...mapGetters(['sequenceList','mode'])
		},
		mounted(){
			console.log(this.sequenceList);
			console.log(this.mode)
		},
		methods:{
			show(){
				this.showFlag=true;
			}
		},
	}

</script>

<style scoped>
	.playlist{
		position: fixed;
		top:0;
		left:0;
		right: 0;
		bottom: 0;
		z-index: 200;
		background: rgba(0,0,0,0.3);
	}
	.list-wrapper{
		position: absolute;
		left: 0;
		bottom: 0;
		background: #333;
		width: 100%;
	}
	.list-header{
		position: relative;
		padding: 20px 30px 10px 20px;
	}
</style>