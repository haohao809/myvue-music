<template>
	<div class="suggest">
		<ul class='suggest-list'>
			<li v-for="item in result" class="suggest-item">
				<div class="icon">
					<i :class="getIcon(item)"></i>
				</div>
				<div class="name">
					<p v-html="getTextName(item)"></p>
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
	 			default:true
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
//	 				console.log(res);
	 				if(res.code ===0){
	 					this.result = this.getResult(res.data);
//	 					console.log(this.result);
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
//	 			console.log(list);
				list.forEach((musicData) =>{
//					 console.log(musicData);
					 if(musicData.songid && musicData.albummid){
					 		res.push(createSong(musicData))
					 }
				})
				return res
	 		},
	 		getIcon(item){
	 			if(item.type === 'singer'){
	 				return 'icon-mine'
	 			}else{
	 				return 'icon-music'
	 			}
	 		},
	 		getTextName(item){
	 			if(item.type === 'singer'){
	 				return item.singername
	 			}else{
	 				return `${item.name}-${item.singer}`
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
 .suggest-list{
 	padding: 0 30px;
 	.suggest-item{
	display: flex;
	align-items: center;
	padding-bottom: 20px;
	.icon{
		width:30px;
		.icon-mine{
		font-size: 14px;
		color: rgba(255,255,255,0.3);
	}
		.icon-music{
			font-size: 14px;
			color: rgba(255,255,255,0.3);
		}
	}

	.name{
		font-size: 14px;
		color: rgba(255,255,255,0.3);
	}
}
 }


</style>