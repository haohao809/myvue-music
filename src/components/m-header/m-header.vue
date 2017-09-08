<template>
	<div class="m-header">
		<div class="icon"></div>
		<h1 class="text">Music</h1>
		<router-link  tag="div" class="mine" to="/user">
			<i class="icon-mine"></i>
		</router-link>
		
	</div>
</template>

<script>
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
	.m-header
		position:relative
		color: $color-theme
		text-align:center
		
	.icon
		display:inline-block
		margin-top: 6px
		margin-right: 9px
		width: 40px
		height: 42px
		bg-image('logo')
		background-size: 40px 42px	
				
      	
	.text
		display:inline-block
		font-size:18px
		line-height:44px
		vertical-align:bottom
	.mine
		position: absolute
		top: 0
		right: 0
		cursor: pointer
		.icon-mine
        	display: block
        	padding: 12px
        	font-size: 20px
        	color: $color-theme
</style>