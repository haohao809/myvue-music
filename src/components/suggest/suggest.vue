<template>
	<scroll class="suggest" 
		:data='result' 
		ref='suggest'
		@scrollToEnd ='searchMore'
		:pullup = 'pullup'
		:beforeScroll = 'beforeScroll'
		@beforeScroll = 'ListScroll'
		>
		<ul class='suggest-list'>
			<li v-for="item in result" class="suggest-item" @click="selectItem(item)">
				<div class="icon">
					<i :class="getIcon(item)"></i>
				</div>
				<div class="name">
					<p v-html="getTextName(item)"></p>
				</div>
			</li>
		<loading v-show="hasMore" title=""></loading>
		</ul>
		<div class="no-result-wrapper" v-show="!hasMore && !result.length">
			<no-result title="抱歉，暂无搜索结果"></no-result>
		</div>
	</scroll>
	
</template>

<script>
	import {search} from 'api/search'
	import {mapGetters,mapMutations,mapActions} from 'vuex'
	import {createSong} from 'common/js/song'
	import Scroll from 'base/scroll/scroll'
	import Loading from 'base/loading/loading'
	import Singer from 'common/js/singer'
	import NoResult from 'base/no-result/no-result'
	
	 export default {
	 	components:{
	 		Scroll,
	 		Loading,
	 		NoResult
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
	 			moreId : '',
	 			beforeScroll: true
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
	 			const song = data.song;
	 			if(!song.list.length || (song.curnum + (song.curpage-1)*20) >= song.totalnum){
	 				this.hasMore = false;
	 			}
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
	 	  },
	 	  selectItem(item){
	 	  	console.log(item);
	 	  	if(item.type && item.type==='singer'){
	 	  		const singer = new Singer({
	 	  			id: item.singermid,
            		name: item.singername
	 	  		})
	 	  		this.$router.push({
					path: `/singer/${item.singermid}`
				})
	 	  		this.setSinger(singer);
	 	  	}else{
	 	  		this.insertSong(item); 
	 	  	}
	 	  },
	 	  ListScroll(){
	 	  	this.$emit('listScroll')
	 	  },
	 	  ...mapMutations({
	        setSinger: 'SET_SINGER'
	      }),
	 	  ...mapActions([
	 	  	'insertSong'
	 	  ])
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
  .no-result-wrapper{
  	width: 100%;
  	top: 50%;
  	position: absolute;
  	transform: translateY(-50%);
  }
}

</style>