<template>
	<view class="picWall">
		<view class="noData" v-if='!eventList.length'>
			<image src="../../static/暂无数据.png" mode="widthFix"></image>
			<view class="noData-text">
				暂无事件
			</view>
		</view>
		<view class="events">
			<view class="event-item" v-for="(item,index) in eventList" @click="toEventDetail(index)">
				<view class="location">
					<image src="../../static/location.png" mode="widthFix"></image>
					{{item.location}}
				</view>
				<view class="time">
					<view>From:{{item.startTime}} To:{{item.endTime}}</view>
				</view>
				<view class="pics">
					<view class="pic-item" v-for="(item1,index1) in item.picList" v-if='index1<2'>
						<image :src="item1" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="addEvent" @click="toAddEvent">
			添加事件
		</view>
	</view>
</template>

<script>
	import request from '../../commons/js/request.js';
	export default {
		
		onShow(){
			request(...['get',,'/getEvent']).then((val)=>{
				this.eventList = val.data;
 			})
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
			},
			toEventDetail(index){
				uni.navigateTo({
					url:`../picDetail/picDetail?id=${this.eventList[index]._id}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.picWall{
		background-color: rgb(248,248,248);
		padding: 80rpx 0 150rpx;
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
			position:fixed;
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
		.events{
			.event-item{
				background-color: #ffffff;
				margin: 0 auto 50rpx;
				padding:30rpx;
				width: 690rpx;
				line-height: 50rpx;
				height: 450rpx;
				image{
					width: 50rpx;
					vertical-align: middle;
				}
				.time{
					display: flex;
					font-size: 28rpx;
					color:#ccc;
				}
				.pics{
					margin-top: 30rpx;
					image{
						width: 250rpx;
						border-radius: 10rpx;
						box-shadow: 10rpx 10rpx 10rpx #ccc;
					}
					display: flex;
					justify-content: space-between;
				}
			}
		}
	}
	
</style>
