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
		...mapGetters([
			'fullScreen',
			'playList'
		])
	}
</script>

<style>
</style>