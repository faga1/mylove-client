<template>
	<view class="addEvent">
		<view class="locationInput">
			<view class="label">
				<image src="../../static/location.png" mode="widthFix"></image>
				地点:
			</view>
			<input type="text" v-model="location" />
		</view>
		<view class="timeSelector">
			<view class="startTime selectorItem">
				<image src="../../static/calendar1.png" mode="widthFix" ></image>
				开始时间：
				{{startTime}}
				<picker mode="date" :start="startDate" :end="endDate" @change="getStartTime">
					<image src="../../static/rightArrow.png" mode="widthFix" class="arrow"></image>
				</picker>
			</view>
			<view class="endTime selectorItem">
				<image src="../../static/calendar7.png" mode="widthFix"></image>
				结束时间：
				{{endTime}}
				<picker mode="date" @change="getEndTime">
					<image src="../../static/rightArrow.png" mode="widthFix" class="arrow"></image>
				</picker>
			</view>
		</view>
		<view class="picSelector">
			<image src="../../static/picture.png" mode="widthFix"></image>
			照片：
			<image src="../../static/rightArrow.png" mode="widthFix" class="arrow" @click="choosePic"></image>
		</view>
		<view class="picContainer">
			<view class="picItem" v-for='item in picList'>
				<image :src="item" mode="widthFix" @click="previewPic(item)"></image>
			</view>
		</view>
		<view class="commit" @click="put">
			提交
		</view>
	</view>
</template>

<script>
	import {putObject} from '../../commons/js/putPic.js'
	export default {
		data() {
			return {
				location:'',
				startTime:'',
				endTime:'',
				picList:[],
				fileList:[]
			};
		},
		computed:{
			startDate() {
			            return this.getDate('start');
			},
			endDate() {
			            return this.getDate('end');
			}
		},
		methods:{
			 getDate(type) {
			    const date = new Date();
			    let year = date.getFullYear();
			    let month = date.getMonth() + 1;
			    let day = date.getDate();
			
			    if (type === 'start') {
			        year = year - 60;
			    } else if (type === 'end') {
			        year = year ;
			        }
			    month = month > 9 ? month : '0' + month;
			    day = day > 9 ? day : '0' + day;
			    return `${year}-${month}-${day}`;
			},
			getStartTime(e){
				this.startTime=e.target.value
			},
			getEndTime(e){
				this.endTime=e.target.value
			},
			choosePic(){
				const that = this;
				uni.chooseImage({
					sourceType: ['album'],
					success: function (res) {
						that.picList = [...that.picList,...res.tempFilePaths]
						that.fileList = [...that.fileList,...res.tempFiles]
						console.log(res.tempFiles)
					},
				});
			},
			previewPic(url){
				let imgUrl = []
				imgUrl.push(url)
				uni.previewImage({
					urls:imgUrl,
					current:imgUrl[0]
				})
			},
			put(){
				for(var i = 0;i<this.picList.length;i++){
					uni.compressImage({
						src:this.picList[i],
						quality:100,
						success(res){
							console.log(res)
						}
					})
				}
			},
			
			
		}
	}
</script>

<style lang="scss">
	.addEvent{
		padding:80rpx 30rpx 0;
		position: relative;
		min-height: 100vh;
		.locationInput{
			image{
				width: 50rpx;
				vertical-align: middle;
			}
			line-height: 50rpx;
			display: flex;
			input{
				width: 400rpx;
				height: 60rpx;
				background-color: #f3f4f6;
				border-radius: 10rpx;
				margin-left: 40rpx;
				padding-left: 30rpx;
			}
		}
		.timeSelector{
			
			height: 50rpx;
			
			.selectorItem{
				position:relative;
				margin-top: 50rpx;
				display: flex;
				image{
					width: 50rpx;
					vertical-align: middle;
					margin-right:20rpx;
				}
				
				.arrow{
					position: absolute;
					right: 0;
				}
			}
			
		}
		.picSelector{
			margin-top: 150rpx;
			image{
				width: 50rpx;
				vertical-align: middle;
				margin-right:20rpx;
			}
			.arrow{
				float:right;
			}
			
		}
		.picContainer{
			display: flex;
			margin-top: 40rpx;
			image{
				width: 280rpx;
				border-radius: 10rpx;
				margin-right: 50rpx;
				box-shadow: 10rpx 10rpx 10rpx #ccc;
			}
		}
		.commit{
			position:absolute;
			bottom:60rpx;
			left:50%;
			transform: translateX(-50%);
			width: 60vw;
			height: 90rpx;
			background-color: rgb(18,150,219);
			color:#ffffff;
			text-align: center;
			line-height: 90rpx;
			border-radius: 10rpx;
		}
	}
</style>
