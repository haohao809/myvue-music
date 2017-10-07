<template>
	<div class="suggest">
		<ul>
			<li v-for="item in result">
				<div class="icon">
					<i :class="getIcon(item)"></i>
				</div>
				<div class="name">
					<p :class="getTextName(item)"></p>
				</div>
			</li>
		</ul>
	</div>
	
</template>

<script>
	import {search} from 'api/search'
	import {mapGetters} from 'vuex'
	import {createSong} from 'common/js/song'
	 export default {
	 	props :{
	 		showSinger:{
	 			type:Boolean,
	 			default:false
	 		}
	 	},
	 	data(){
	 		return {
	 			page:1,
	 			result:[]
	 		}
	 	},
	 	methods:{
	 		search(query){
	 			search(query,this.page,this.showSinger,20)
	 			.then((res) =>{
	 				console.log(res);
	 				if(res.code ===0){
	 					this.result = this.getResult(res.data);
	 				}
	 			})
	 		},
	 		getResult(data){
	 			let ret =[];
	 			if(data.zhida&&data.zhida.singerid){
	 				ret.push({...data.zhida,...{type:'singer'}})
	 			}
	 			if(data.song){
	 				ret = ret.concat(this.normalizeSongs(data.song.list))
	 			}
	 			return ret
	 		},
	 		normalizeSongs(list){
	 			let res = [];
	 			console.log(list);
				list.forEach((musicData) =>{
//					 console.log(musicData);
					 if(musicData.songid && musicData.albummid){
					 		res.push(createSong(musicData))
					 }
				})
				return res
	 		},
	 		getIcon(item){
	 			if(item.type === TYPE_SINGER){
	 				return 'icon-mine'
	 			}else{
	 				return 'icon-music'
	 			}
	 		}
	 	},
	 	computed:{
	 		...mapGetters(['query'])
	 	},
	 	watch:{
	 		query(newquery){
	 			console.log(newquery)
	 			if(!newquery){
	 				return
	 			}
	 			
	 			this.search(newquery)
	 		}
	 	}
	 }
</script>

<style scoped lang='scss'>
.icon-mine{
	
}
.icon-music{
	
}
</style>