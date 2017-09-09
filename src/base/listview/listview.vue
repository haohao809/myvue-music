<template>
	<scroll :data="data" class="listview">
		<ul>
			<li v-for="group in data" class="group">
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
				<li v-for="(item,index) in data" class="letter-title" @touchstart.stop.prevent='onTouchstart' :data-index="index">
					{{item.title.substr(0,1)}}
				</li>
			</ul>
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
		mounted(){
			this._init()
		},
		methods:{
			_init(){
				console.log(this.data);
			},
			onTouchstart(e){
				let anchorIndex = e.target.getAttribute('data-index');
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
	}
	.letter-title{
		font-size: 14px;
		color: rgba(255,255,255,0.5);
		background: #333;
		padding: 3px;
	}
</style>