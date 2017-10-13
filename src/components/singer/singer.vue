<template>
	<div class="singer" ref="singer">
		<list-view :data = 'singers' @select='selectSinger' ref="list"></list-view>
		<router-view></router-view>
	</div>
</template>

<script>
	import ListView from 'base/listview/listview'
	import {getSingerList} from 'api/singer'
	import Singer from 'common/js/singer'
	import {mapMutations} from 'vuex'
	import {playlistMixin} from 'common/js/mixin'
//	console.log(Singer);
	export default {
		 mixins: [playlistMixin],
		components:{
			ListView
		},
		data () {
			return {
				singers :[]
			}
		},
		created(){
			this._getSingerList()
		},
		methods:{
			_getSingerList() {
				getSingerList().then((res) => {
					if(res.code == 0){
						this.singers = this.normalizeSinger(res.data.list);
//						console.log(this.singers);
					}
				})
				
				
			},
			normalizeSinger(list){
				let map = {
					hot: {
						title : '热门',
						items  : []
					}					
				}
				for(var i= 0;i<list.length; i++){
					if(i < 10){
						map.hot.items.push(new Singer({
							name : list[i].Fsinger_name,
							id : list[i].Fsinger_mid
					  }))
					}
					const key = list[i].Findex;
					if(!map[key]){
						map[key] = {
							title : key,
							items  : []
						}
					}
					map[key].items.push(new Singer({
						name : list[i].Fsinger_name,
						id : list[i].Fsinger_mid
					}))
				}
//				console.log(map);
				let res = []
				let hot = []
				for(var key in map){
					if(key.match(/[a-zA-z]/)&& key!=='hot'){
						res.push(map[key])
					}
					else if(key === 'hot'){
						hot.push(map[key]);
					}
				}
				res.sort((a,b) =>{
					return a.title.charCodeAt(0) - b.title.charCodeAt(0);
				})
				return hot.concat(res);
			},
			selectSinger(item){
				console.log(item);
				this.$router.push({
					path: `/singer/${item.id}`
				})
				this.setSinger(item)
//				this.$store.commit('SET_SINGER',item);
			},
			handlePlaylist(playList){
				console.log(123);
				const bottom = playList.length > 0 ? '60px' : ''
				this.$refs.singer.style.bottom = bottom;
				this.$refs.list.refresh();
			},
			...mapMutations({
         	setSinger: 'SET_SINGER'
      		})
		},

	}
</script>

<style scoped>
	.singer{
		position: fixed;
		top:95px;
		bottom: 0;
		width: 100%;
	}
</style>