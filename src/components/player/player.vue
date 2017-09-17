<template>
	<div class="player" v-show='playList.length>0'>
		<div class="normal-player" v-show='fullScreen'>
			
		</div>
		<div class="mini-player" v-show="!fullScreen">
			
		</div>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	export default{
		computed:{
			...mapGetters([
				'fullScreen',
				'playList'
			])			
		}

	}
</script>

<style scoped>
	.normal-player{
		position: absolute;
		top:0;
		left:0;
		right:0;
		bottom:0;
		background: #222;
		z-index:150
	}
</style>