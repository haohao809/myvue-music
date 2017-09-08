<template>
	<music-list></music-list>
</template>

<script>
	import MusicList from 'components/music-list/music-list'
	import {getSongList} from 'api/recommend'
	export default{
		components:{
			MusicList
		},
		data(){
			return {
				disc :{
					id: 3579013188
				},
				song:[]
			}
		},
		created(){
			this._getSongList();
		},
		methods:{
			_getSongList(){
				
				getSongList(this.disc.id).then((res)=>{
					if(res.code == 0){
						console.log(res.cdlist[0].songlist);
					}
				})
				
			},
			normalize(list){
				let res=[];
				list.forEach((data) =>{
					if(data.songid && data.albummid){
						res.push(data);
					}
				})
			}
			
			
		}
	}
</script>

<style>
</style>