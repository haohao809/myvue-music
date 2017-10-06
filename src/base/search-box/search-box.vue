<template>
	<div class="search-input">
		<i class='icon-search'></i>
		<input :placeholder="placeholder"/>
	</div>
</template>

<script>

</script>

<style lang='scss' scoped>
	.search-input{
		text-align: center;
		background: #333;
		width: 100%;
		height: 40px;
		.icon-search{
			font-size: 24px;
			color: #222;
			padding-top: 10px;
			display: inline-block;
		}
		input{
			background: #333;
			color: #fff;
			margin: 0 5px;
			outline: none;		
		}
	}
</style>