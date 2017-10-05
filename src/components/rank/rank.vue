<template>
	<div class="rank" ref="rank">
		<scroll class="top-list" :data='topList' ref="toplist">
			<ul>
				<li v-for="(item,index) in topList" class="item" @click="selectItem(item)">
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
			<div class="loading" v-show = "!topList.length">
				<loading></loading>
			</div>
		</scroll>
		<router-view :title = 'title'></router-view>
	</div>
</template>

<script>
	import {getTopList} from 'api/rank'
	import Loading from 'base/loading/loading'
	import Scroll from 'base/scroll/scroll'
	import {playlistMixin} from 'common/js/mixin'
	export default{
		mixins: [playlistMixin],
		data(){
			return{
				topList:[],
				title: ''
			}
		},
		components:{
			Scroll,
			Loading
		},
		created(){
			this._getTopList();
		},
		methods:{
			handlePlaylist(playList){
				const bottom = playList.length > 0 ? '60px' : ''
				this.$refs.rank.style.bottom = bottom
				this.$refs.toplist.refresh()
			},
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
			},
			selectItem(val){
				console.log(val);
				this.title = val.topTitle;
				this.$router.push({
					path: `rank/${val.id}`
				})
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.rank{
		position: fixed;
		top:95px;
		bottom: 0;
		width: 100%;
		.top-list{
			height: 100%;
			overflow: hidden;
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
		.loading{
			position: absolute;
			width: 100%;
			top: 50%;
			transform: translateY(-50%);
		}
	}
</style>