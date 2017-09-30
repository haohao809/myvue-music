<template>
	<music-list :songs="songs"></music-list>
</template>

<script>
	import MusicList from 'components/music-list/music-list'
	import {getSongList} from 'api/recommend'
	import {createSong} from 'common/js/song'
	export default{
		components:{
			MusicList
		},
		data(){
			return {
				disc :{
					id: 1769127980
				},
				songs:[]
			}
		},
		created(){
			this._getSongList();
		},
		methods:{
			_getSongList(){
				
				getSongList(this.disc.id).then((res)=>{
					if(res.code == 0){
						console.log(res);
//						console.log(res.cdlist[0].songlist);
//						this.songs = this.normalize(res.cdlist[0].songlist);
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
</style>