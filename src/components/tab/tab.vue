<template>
	<div class="tab">
		<ul class="tab-ul">
			<router-link tag="li"  to="/recommend" class="tab-item">推荐</router-link>
			<router-link tag="li"  to="/singer"  class="tab-item">歌手</router-link>
			<router-link tag="li"  to="/rank" class="tab-item">排行</router-link>
			<router-link tag="li"  to="/search" class="tab-item">搜索</router-link>
		</ul>
	</div>
</template>

<script>
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	.tab-ul
		display: flex
		margin-top: 10px
		height: 44px
		line-height: 44px
		font-size: $font-size-medium
	.tab .tab-item
		flex: 1
		text-align: center
		cursor: pointer	
	.router-link-active
		color: $color-theme
		border-bottom: 2px solid $color-theme		  
</style>