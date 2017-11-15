import {mapGetters,mapMutations,mapActions} from 'vuex'

export const playlistMixin = {
	computed:{
		...mapGetters(['playList'])
	},
	mounted(){
		this.handlePlaylist(this.playList)
	},
	activated(){
		this.handlePlaylist(this.playList)
	},
	watch:{
		playList(newVal){
			this.handlePlaylist(newVal)
		}
	},
	methods:{
		handlePlaylist(){
			throw new Error('component must implement handlePlaylist method');
		},
	}
}
export const playerMixin = {
	computed: {
		...mapGetters(['favoriteList'])
	},
	methods:{
		toggleFavorite(song){
			if(this.isFavoriteSong(song)){
				this.deleteFavoriteList(song);
			}else{
				this.saveFavoriteList(song);
			}
		},
		getFavoriteIcon(song){
			if(this.isFavoriteSong(song)){
				return 'icon-favorite'
			}else{
				return 'icon-not-favorite'
			}
		},
		isFavoriteSong(song){
			const index = this.favoriteList.findIndex((item) =>{
				return item.id === song.id
			})
			return index >-1
		},
		...mapActions(
			['saveFavoriteList','deleteFavoriteList']
		)
	}
}
export const searchMixin = {
  data() {
    return {
      query: '',
      refreshDelay: 100
    }
  },
  computed: {
    ...mapGetters([
      'searchHistory'
    ])
  },
  methods: {
    onQueryChange(query) {
      // 处理带空格的情况
      this.query = query.trim()
      console.log("this.query" + this.query);
    },
    blurInput() {
      this.$refs.searchBox.blur()
    },
    addQuery(query) {
      this.$refs.searchBox.setCurQuery(query)
    },
    saveSearch() {
      this.saveSearchHistory(this.query)
    },
    ...mapActions([
      'saveSearchHistory',
      'deleteSearchHistory'
    ])
  }
}
