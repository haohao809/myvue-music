<template>
	<div class="playlist" v-show='showFlag' @click="close">
		<div class="list-wrapper" @click.stop>	
		<div class="list-header">
			<h1 class="title" @click='changeMode'>
				<i class="icon" :class='iconMode'></i>
				<span class="text">{{modeText}}</span>
				<span @click='showConfirm'><i class="icon-clear"></i></span>
			</h1>
		</div>
		<scroll class="list-content" :data='sequenceList' ref='listContent' >
			<transition-group tag='ul' name="list" ref='list'>
				<li :key='item.id' v-for='(item,index) in sequenceList' class="item" @click='selectItem(item,index)'>
					<i class="current" :class="getCurrentIcon(item)"></i>	
					<span class='text'>{{item.name}}</span>
					<span class="like">
						<i class="icon-not-favorite"></i>
					</span>
					<span class='delete' @click="deleteOne(item)">
						<i class='icon-delete'></i>
					</span>
				</li>
			</transition-group>
		</scroll>
		<div class="list-operate">
			<div class="add-song" @click.stop="addSong">
				<i class="icon-add"></i>
				<span class="text-add">添加歌曲到队列列表</span>
			</div>
		</div>
		<div class="list-close" @click="close">
			<span>关闭</span>
		</div>
		</div>
		<confirm ref='confirm' :tips='tips' @confirm="confirmClear"></confirm>
		<add-song ref="addSong"></add-song>
	</div>
</template>

<script>
	import {mapGetters,mapActions,mapMutations} from 'vuex'
	import {playMode} from 'common/js/config'
	import Scroll from 'base/scroll/scroll'
	import Confirm from 'base/confirm/confirm'
	import AddSong from 'components/add-song/add-song'
	import {shuffle} from 'common/js/util'
	export default{
		data(){
			return {
				showFlag : false,
				tips: '是否清空播放列表'
			}
		},
		components:{
			Scroll,
			Confirm,
			AddSong
		},
		computed:{
			...mapGetters(['sequenceList','mode','currentSong']),
			iconMode(){
				return this.mode===playMode.sequence ? 'icon-sequence' : this.mode===playMode.loop ? 'icon-loop' : 'icon-random'
			},
			modeText(){
				return this.mode===playMode.sequence ? '顺序播放' : this.mode===playMode.loop ? '单曲循环' : '随机播放'
			}
		},
		watch:{
			sequenceList(val){
				console.log(val);
			}
		},
		mounted(){
			console.log(this.sequenceList);
			console.log(this.mode)
		},
		methods:{
			show(){
				this.showFlag=true;
				setTimeout(() => {
		          this.$refs.listContent.refresh()
		          this.scrollToCurrent(this.currentSong)
		        }, 20)
			},
			close(){
				this.showFlag=false;
			},
			selectItem(item,index){
				
			},
			deleteOne(item){
				this.deleteSong(item);
			},
			...mapActions([
				'deleteSong',
				'deleteSongList'
			]),
			showConfirm(){
				this.$refs.confirm.show()
			},
			confirmClear(){
				this.deleteSongList()
			},
			getCurrentIcon(item){
				if(this.currentSong.id===item.id)
				return 'icon-play'
			},
			scrollToCurrent(current){
				const index = this.sequenceList.findIndex((song) =>{
					return current.id === song.id
				})
				this.$refs.listContent.scrollToElement(this.$refs.list.$el.children[index],300)
			},
			changeMode(){
//				console.log(this.mode);
				const mode = (this.mode+1)%3;
//				console.log(mode);
				this.setPalyMode(mode);
				let list = null;
				if(mode === playMode.random){
					list = shuffle(this.sequenceList);
				}else{
					list = this.sequenceList;
				}
				this.resetCurrentIndex(list);
				this.setPlayList(list);
//				console.log(list);
			},
			resetCurrentIndex(list) {
				let index = list.findIndex((item)=>{
					return item.id === this.currentSong.id;
				})
//				console.log(index);
				this.setCurrentIndex(index);
			},
			...mapMutations({
				setPalyMode: 'SET_PLAY_MODE',
				setPlayList: 'SET_PLAYLIST'
			}),
			addSong(){
				this.$refs.addSong.show();
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
	.list-content{
		max-height:240px;
		overflow: hidden;
	}
	.title{
		display: flex;
		align-items: center;
	}
	.icon{
		font-size: 30px;
		margin-right: 10px;
		color: rgba(255,205,49,0.5);
	}
	.text{
		flex: 1;
		font-size: 14px;
		color: rgba(255,255,255,0.5);
	}
	.icon-clear{
		font-size: 14px;
		color: rgba(255,255,255,0.3);
	}
	.item{
		display: flex;
		align-items: center;
		height: 40px;
		padding: 0 30px 0 20px;
		overflow: hidden;
	}
	.icon-play{
		width: 20px;
		font-size: 12px;
		color: rgba(255,205,49,0.5);
	}
	.like{
		font-size: 12px;
		margin-right: 15px;
		color: #FFCD32;
		position: relative;
	}
	.delete{
		font-size: 12px;
		color: #FFCD32;
		position: relative;
	}
	.list-close{
		line-height: 50px;
		background: #222222;
		width: 100%;
		text-align: center;
		color: rgba(255,255,255,0.5);
		font-size: 16px;
	}
	.current{
		width: 20px;
	}
	.list-operate{
		width: 180px;
		margin: 20px auto 30px auto;
	}
	.add-song{
		text-align: center;
		border: 1px solid ;
		border-radius: 100px;
		padding: 8px 6px;
		border-color: rgba(255,255,255,0.5);
		color: rgba(255,255,255,0.5);
		font-size: 10px;
	}
	.list-enter-active, .list-leave-active{
		transition: all 0.1s
	}
	.list-enter,.list-leave-to{
		height:0
	}
</style>