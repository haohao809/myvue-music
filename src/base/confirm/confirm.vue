<template>
	<div class="confirm-wrapper" ref='confirm'>
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
	.confirm-wrapper{
		top: 50%;
		left: 50%;
		position: absolute;
		transform: translate(-50%,-50%);
		z-index: 999;
		display: none;
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
</style>