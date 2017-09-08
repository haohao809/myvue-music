<template>
	<div class="singer">
		<list-view ></list-view>
		<router-view></router-view>
	</div>
</template>

<script>
	import ListView from 'base/listview/listview'
	import {getSingerList} from 'api/singer'
	export default {
		components:{
			ListView
		},
		created(){
			this._getSingerList()
		},
		methods:{
			_getSingerList() {
				getSingerList().then((res) => {
					if(res.code == 0){
						console.log(res.data);
					}
				})
				
				
			}
		}
	}
</script>

<style>
</style>