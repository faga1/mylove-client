<template>
	<view class="picDetail">
		<view class="pic-item" v-for="item in picList">
			<image :src="item" mode="widthFix" @click="previewPic(item)"></image>
		</view>
	</view>
</template>
<script>
	import request from '../../commons/js/request.js'
	export default {
		onLoad(options){
			console.log(options.id)
			request(...['get',{_id:options.id},'/getEvent']).then((val)=>{
				console.log(val)
				this.picList = val.data[0].picList;
			})
		},
		data() {
			return {
				picList:[]
			};
		},
		methods:{
			previewPic(url){
				let imgUrl = []
				imgUrl.push(url)
				uni.previewImage({
					urls:imgUrl,
					current:imgUrl[0]
				})
			}
		}
	}
</script>

<style lang="scss">
	.picDetail{
		width: 100%;
	}
	.pic-item{
		margin: 80rpx auto;
		width: 500rpx;
		image{
			display: block;
			width: 500rpx;
			border-radius: 20rpx;
			box-shadow: 20rpx 20rpx 20rpx #ccc;
		}
		
	}
</style>
