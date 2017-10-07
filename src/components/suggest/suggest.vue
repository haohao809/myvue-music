<template>
	<div class="suggest">
		<ul>
			<li></li>
		</ul>
	</div>
	
</template>

<script>
	import {search} from 'api/search'
	import {mapGetters} from 'vuex'
	 export default {
	 	props :{
//	 		query:{
//	 			type:String,
//	 			default:''
//	 		},
	 		showSinger:{
	 			type:Boolean,
	 			default:false
	 		}
	 	},
	 	data(){
	 		return {
	 			page:1
	 		}
	 	},
	 	methods:{
	 		search(query){
	 			search(query,this.page,this.showSinger,20)
	 			.then((res) =>{
	 				console.log(res);
	 			})
	 		},	 		
	 	},
	 	computed:{
	 		...mapGetters(['query'])
	 	},
	 	watch:{
	 		query(newquery){
	 			console.log(newquery)
	 			if(!newquery){
	 				return
	 			}
	 			
	 			this.search(newquery)
	 		}
	 	}
	 }
</script>

<style>
</style>