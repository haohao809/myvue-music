<template>
  <transition name='slideRight'>
	<music-list :title='title' :bg-img='bgImg'></music-list>
 </transition>
</template>

<script>
	import MusicList from 'components/music-list/music-list'
	import { mapGetters } from 'vuex'
	import {getSingerDetail} from 'api/singer'
	export default {
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
				 getSingerDetail(this.singer.id).then((res)=>{
				 	  if(res.code==0){
				 	  	console.log(res.data.list);
				 	  }
				 })
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