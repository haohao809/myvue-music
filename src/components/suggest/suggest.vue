<template>
	<scroll class="suggest" 
		:data='result' 
		ref='suggest'
		@scrollToEnd ='searchMore'
		:pullup = 'pullup'
		>
		<ul class='suggest-list'>
			<li v-for="item in result" class="suggest-item">
				<div class="icon">
					<i :class="getIcon(item)"></i>
				</div>
				<div class="name">
					<p v-html="getTextName(item)"></p>
				</div>
			</li>
		<loading v-show="hasMore" title=""></loading>
		</ul>
	</scroll>
	
</template>

<script>
	import {search} from 'api/search'
	import {mapGetters} from 'vuex'
	import {createSong} from 'common/js/song'
	import Scroll from 'base/scroll/scroll'
	import Loading from 'base/loading/loading'
	 export default {
	 	components:{
	 		Scroll,
	 		Loading
	 	},
	 	props :{
	 		showSinger:{
	 			type:Boolean,
	 			default:true
	 		},
	 		
	 	},
	 	data(){
	 		return {
	 			page:1,
	 			result:[],
	 			pullup: true,
	 			hasMore:true,
	 			moreId : ''
	 		}
	 	},
	 	methods:{
	 		refresh() {
		        this.$refs.suggest.refresh()
		      },
	 		search(query){
	 			search(query,this.page,this.showSinger,20)
	 			.then((res) =>{
	 				console.log(res);
	 				if(res.code ===0){
	 					this.result = this.getResult(res.data);
	 					this.checkMore(res.data)
	 					console.log(this.result);
	 				}
	 			})
	 		},
	 		searchMore(){
	 			if(!this.hasMore){
	 				return
	 			}
	 			this.page++;
	 			search(this.moreId,this.page,this.showSinger,20)
	 			.then((res) =>{
	 				if(res.code===0){
	 					this.result = this.result.concat(this.getResult(res.data));
	 					this.checkMore(res.data);
	 				}
	 			})
	 		},
	 		checkMore(data){
	 			console.log(data);
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
//	 			console.log(newquery)
	 			if(!newquery){
	 				return
	 			}
	 			this.moreId = newquery;
	 			this.search(newquery)
	 		}
	 	}
	 }
</script>

<style scoped lang='scss'>
.suggest{
	height: 100%;
	overflow: hidden;
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
}

</style>