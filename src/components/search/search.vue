<template>
	<div class="search">
		<div class="search-box">
			<search-box></search-box>
		</div>
	</div>
</template>

<script>
	import SearchBox from 'base/search-box/search-box'
	export default {
		components:{
			SearchBox
		}
	}
</script>

<style lang='scss' scoped>
	.search-box{
		margin: 20px;
	}
</style>