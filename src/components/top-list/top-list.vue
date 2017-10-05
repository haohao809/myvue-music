<template>
	<transition name='slide'>
		<music-list :songs ='songs'  :title= 'title' :bgImg='bgImg'></music-list>
	</transition>
</template>

<script>
	import MusicList from 'components/music-list/music-list'
	import {getMusicList} from 'api/rank'
	import {mapGetters} from 'vuex'
	import {createSong} from 'common/js/song'
	export default {
		props: ['title'],
		computed : {
//			title(){
//				return this.topList.topTitle
//			},
			bgImg(){
				if(this.songs.length){
					return this.songs[0].imgage
				}
				return ''
			},
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
//						console.log(this.songs);
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

<style scoped>
	.slide-enter-active,.slide-leave-active{
		transition: all ease .3s;
	}
	.slide-enter,.slide-leave-to{
		transform: translateX(100%);
	}
</style>