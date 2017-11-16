<template>
	<transition name='slide'>
		<div class="user">
			<div class="back" @click="back">
				<i class="icon-back"></i>
			</div>
			<div class="switches-wraper" @click="random">
				<switches :switches="switches" :currentIndex="currentIndex" @switch="switchItem"></switches>
			</div>
			<div class="play-btn" @click="random">
				<i class="icon-play"></i>
				<span class="text">随机播放全部</span>
			</div>
			<div class="list-wrapper" ref="listWrapper" >
				<scroll :data='favoriteList' v-if="currentIndex===0"   class="list-scroll"  ref="favoriteList">
					<div class="line-list">
						<song-list :songs='favoriteList' @select="selectSong"></song-list>
					</div>
				</scroll>
				<scroll :data='playHistory' v-if="currentIndex===1"  class="list-scroll"  ref="playHistory">
					<div class="line-list">
						<song-list :songs='playHistory' @select="selectSong"></song-list>
					</div>
				</scroll>
			</div>
		</div>
	</transition>
</template>

<script>
	import Switches from 'base/switches/switches'
	import Scroll from 'base/scroll/scroll'
	import SongList from 'base/song-list/song-list'
	import {mapGetters,mapActions} from 'vuex'
	import Song from 'common/js/song'
	import {playlistMixin} from 'common/js/mixin'
	export default{
		mixins : [playlistMixin],
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
			Switches,
			Scroll,
			SongList
		},
		computed:{
			...mapGetters(['favoriteList','playHistory'])
		},
		methods:{
			back(){
				this.$router.back();
			},
			random(){
				let list = this.currentIndex === 0 ? this.favoriteList : this.playHistory
		        if (list.length === 0) {
		          return
		        }
		        list = list.map((song) => {
		          return new Song(song)
		        })
		        this.randomPlay({
		          list
		        })
			},
			handlePlaylist(playlist){
				const bottom = playlist.length > 0 ? '60px' : '';
				this.$refs.listWrapper.style.bottom = bottom;
				this.$refs.playHistory&&this.$refs.playHistory.refresh();
				this.$refs.favoriteList&&this.$refs.favoriteList.refresh();
				
			},
			switchItem(index){
				this.currentIndex = index;
			},
			selectSong(item){
				this.insertSong(new Song(item))
			},
			...mapActions(
				['insertSong','randomPlay']
			)
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
		.list-wrapper{
			position: absolute;
			top: 110px;
			bottom: 0;
			width: 100%;
			.line-list{
				padding: 20px 30px;
			}
			.list-scroll{
				height:100%;
				overflow: hidden;
			}
		}
	}
</style>