<template>
	<transition>
		<music-list :songs ='songs' :bgImg='bgImg'></music-list>
	</transition>
</template>

<script>
	import MusicList from 'components/music-list/music-list'
	import {getMusicList} from 'api/rank'
	import {createSong} from 'common/js/song'
	export default {
		computed : {
			title(){
				return this.topList.topTitle
			},
			bgImg(){
				if(this.songs.length){
					return this.songs[0].imgage
				}
				return ''
			}
		},
		data() {
			return {
				songs:[]
			}
		},
		components:{
			MusicList
		},
		created(){
			this.fetchData();
//			this._getMusicList();
		},
		methods:{
			fetchData(){
				console.log(this.$route.path);
				let route = this.$route.path;
				let id = route.substring(route.lastIndexOf('\/')+1,route.length);
				console.log(id);
				this._getMusicList(id);
			},
			_getMusicList(id){
				getMusicList(id).then((res)=>{
					console.log(res);
					if(res.code === 0){
						this.songs = this.normalizeSongs(res.songlist);
						console.log(this.songs);
					}
				}).catch((error) =>{
					console.log(error)
				})
			},
			normalizeSongs(list){
				let ret = []
		        list.forEach((item) => {
		          const musicData = item.data
		          if (musicData.songid && musicData.albummid) {
		            ret.push(createSong(musicData))
		          }
		        })
		        return ret
			}
		},
		watch:{
			'$route':'fetchdata'
		},
	}
</script>

<style>
</style>