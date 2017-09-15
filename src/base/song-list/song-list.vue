<template>
	<div class="song-list">
		<ul>
			<li v-for='(song, index) in songs' class="item">
				<div class="content">
					<h1>{{song.name}}</h1>
					<p class="desc">{{getDesc(song)}}</p>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		props:{
			songs: {
				type: Array,
				default: []
			}
		},
//		created(){
//			console.log(this.songs);
//		}
		methods:{
			getDesc(song){
				return `${song.singer}·${song.album}`
			}
		}
	}
</script>

<style scoped>
	.item{
		height: 64px;
		display: flex;
		align-items: center;
		font-size: 14px;
	}
	.content{
		flex: 1;
		line-height: 20px;
	}
	.desc{
		margin-top: 4px;
		color:rgba(255,255,255,0.3);;
	}
</style>