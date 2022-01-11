<template>
	<view class="picWall">
		<view class="noData" v-if='!eventList.length'>
			<image src="../../static/暂无数据.png" mode="widthFix"></image>
			<view class="noData-text">
				暂无事件
			</view>
		</view>
		<view class="addEvent" @click="toAddEvent">
			添加事件
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(){
			
		},
		data() {
			return {
				eventList:[]
			};
		},
		methods:{
			toAddEvent(){
				uni.navigateTo({
					url:'../addEvent/addEvent'
				})
			}
		}
	}
</script>

<style lang="scss">
	.picWall{
		min-height: 100vh;
		position: relative;
		.noData{
			width: 100%;
			text-align: center;
			color:rgb(205,205,205);
			font-size: 40rpx;
			image{
				margin:100rpx auto 50rpx;
				width: 400rpx;
			}
		}
		.addEvent{
			position:absolute;
			bottom:80rpx;
			width: 60vw;
			left:50%;
			transform: translateX(-50%);
			height: 90rpx;
			color:#ffffff;
			border-radius: 10rpx;
			text-align: center;
			line-height: 100rpx;
			background-color: rgb(50,205,50);
		}
	}
	
</style>
