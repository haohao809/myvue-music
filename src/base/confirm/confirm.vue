<template>
	<transition name='confirm-fade'>
	<div class="confirm-wrapper" ref='confirm'>
		<div class="shade">
			<div class="confirm-content">
				<div class="content">
					<p>是否清空所有搜索历史</p>
				<div class="operate">
					<div class="confirm" @click='confirm'>
						确定
					</div>
					<div class="cancel" @click='cancel'>
						取消
					</div>
				</div>
				</div>
			</div>

		</div>
	</div>
	</transition>
</template>

<script>
	export default {
		methods:{
			confirm(){
				this.$emit('confirm');
				this.cancel();
			},
			cancel(){
				this.$refs.confirm.style.display='none';
			},
			show(){
				this.$refs.confirm.style.display='block';
			}
		}
	}
</script>

<style scoped lang='scss'>
.confirm-fade-enter-active{
	animation: confirm-fadein 0.3s;
}
.content{
		animation: confirm-zoom 0.3s;
	}
.confirm-wrapper{
	display: none;
  .shade{
   	 position: fixed;
   	 top: 0;
   	 left: 0;
   	 right: 0;
   	 bottom: 0;
   	 background-color:rgba(0,0,0,0.3);
   	 z-index: 998;
   
	.confirm-content{
		top: 50%;
		left: 50%;
		position: absolute;
		transform: translate(-50%,-50%);
		z-index: 999;
		.content{
			background: #333;
			border-radius: 13px;
			width: 270px;
			font-size: 18px;
			p{
				text-align: center;
				color: rgba(255,255,255,0.5);
				padding: 15px 19px;
				line-height: 22px;
			}
			.operate{
				display: flex;
				align-items: center;				
				color: rgba(255,255,255,0.3);
				border-top: 1px solid #222222 ;
			}
			.confirm,.cancel{
				flex: 1;
				text-align: center;
				padding: 10px 19px;
			}
			.confirm{
				border-right: 1px solid #222222 ;
			}
		}
	}
  }
}	
  @keyframes confirm-fadein{
    0%
     {opacity: 0;} 
    100%
     { opacity: 1;}
}
@keyframes confirm-zoom{
	0%{
		transform: scale(0);
	}
	50%{
		transform: scale(1.1);
	}
	100%{
		transform: scale(1.0);
	}
}
</style>