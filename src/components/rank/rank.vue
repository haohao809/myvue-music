<template>
	<div class="rank" ref="rank">
		<scroll class="top-list" :data='topList'>
			<ul>
				<li v-for="(item,index) in topList" class="item">
					<div class="icon">
						<img width="100" height="100" :src="item.picUrl"/>
					</div>
					<ul class="songlist">
						<li v-for="(song,index) in item.songList" class="song">
							<span>{{index+1}}</span>
							<span>{{song.songname}}-{{song.singername}}</span>
						</li>
					</ul>
				</li>
			</ul>
		</scroll>
	</div>
</template>

<script>
	import {getTopList} from 'api/rank'
	import Scroll from 'base/scroll/scroll'
	export default{
		data(){
			return{
				topList:[]
			}
		},
		components:{
			Scroll
		},
		created(){
			
			this._getTopList();
		},
		methods:{
			_getTopList(){
				getTopList().then((res) =>{
					if(res.code === 0){
						console.log(res)
						this.topList = res.data.topList
					}
				}).catch((error) => {
					console.log(error)
				})
				console.log(this.topList)
			}
		}
	}
</script>

<style scoped lang="scss">
	.rank{
		position: absolute;
		top:88px;
		bottom: 0;
		width: 100%;
		.top-list{
			height: 100%;
			.item{
				display: flex;
				margin: 0 20px;
				padding-top: 20px;
				height: 100px;
				.songlist{
					flex:1;
					font-size: 12px;
					color: rgba(255,255,255,0.3);
					display: flex;
					flex-direction:column;
					justify-content: center;
					padding: 0 20px;
					background:#333;
					overflow: hidden;
					.song{
						line-height: 26px;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
				
			}
		}
	}
</style>