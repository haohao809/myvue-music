<template>
  <transition name='slideRight'>
	<music-list :title='title' :bg-img='bgImg' :songs='songs'></music-list>
 </transition>
</template>

<script>
	import MusicList from 'components/music-list/music-list'
	import { mapGetters } from 'vuex'
	import {getSingerDetail} from 'api/singer'
	import {createSong} from 'common/js/song'
	export default {
		data(){
			return {
				songs: []
			}
		},
		components:{
			MusicList
		},
		computed : {
			title(){
				return this.singer.name;
			},
			bgImg(){
				return this.singer.avatar;
			},
			...mapGetters([
				'singer'
			])
		},
		created(){
			this._getDetail();
		},
		mounted (){
			console.log(this.singer);
		},
		methods:{
			_getDetail(){
					if(!this.singer.id){
						this.$router.push({
							path:'/singer'
						})
						return
					}
				 getSingerDetail(this.singer.id).then((res)=>{
				 	  if(res.code===0){
//				 	  	console.log(res.data.list);
				 	  	this.songs =this.normalizeSongs(res.data.list);
//				 	  	console.log(this.songs);
				 	  }
				 })
			},
			normalizeSongs(list){
				let res = [];
				list.forEach((item) =>{
					 let {musicData} = item
					 if(musicData.songid && musicData.albummid){
					 		res.push(createSong(musicData))
					 }
				})
				return res
			}
		}
	}
</script>

<style scoped>
	.slideRight-enter-active,.slide-leave-active{
		transition: all .3s ease;
	}
	.slideRight-enter, .slider-trans-leave-to{
		transform: translateX(100%);
	}
</style>