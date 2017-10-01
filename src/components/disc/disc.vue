<template>
	<transition name="slide">
	<music-list :songs="songs" :title="title" :bg-img="bgImg"></music-list>
	</transition>
</template>

<script>
	import MusicList from 'components/music-list/music-list'
	import {getSongList} from 'api/recommend'
	import {createSong} from 'common/js/song'
	import {mapGetters} from 'vuex'
	export default{
		components:{
			MusicList
		},
		computed:{
			title(){
				console.log(this.disc);
				return this.disc.dissname
			},
			bgImg() {
	        	return this.disc.imgurl
	        },
			...mapGetters(['disc'])
		},
		data(){
			return {
				songs:[]
			}
		},
		created(){
			this._getSongList();
		},
		methods:{
			_getSongList(){
				
				getSongList(this.disc.dissid).then((res)=>{
					if(res.code == 0){
						console.log(res);
						console.log(res.cdlist[0].songlist);
						this.songs = this.normalize(res.cdlist[0].songlist);
					}
				})
				
			},
			normalize(list){
				let res=[];
				list.forEach((data) =>{
					if(data.songid && data.albummid){
						res.push(createSong(data));
					}
				})
				return ret
			}
			
			
		}
	}
</script>

<style>
	.slide-enter-active,.slide-leave-active{
		transition: all ease  0.3s
	}
	.slide-enter,.slide-leave-to{
		transform: translateX(100%);
	}
</style>