<template name="about">
	<view>
		<scroll-view scroll-y class="scrollPage">
		  <view class="UCenter-bg">
		    <image src="../../static/rabbit.png" class="png" mode="widthFix"></image>
		    <view class="text-xl">明日方舟助手
		      <text class="text-df">{{version}}</text>
		    </view>
		    <image src="https://ws1.sinaimg.cn/large/007RRq42gy1g8k81024qxg30be03wx6n.gif" mode="scaleToFill" class="gif-wave"></image>
		  </view>
		  <view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg radius">
		    <view class="cu-item arrow">
		      <button class="cu-btn content" open-type="share" hover-class="none" data-id="3">
		        <text class="cuIcon-share text-yellow"></text>
		        <text class="text-grey">分享</text>
		      </button>
		    </view>
		    <view class="cu-item arrow">
		      <navigator class="content" url="/pages/about/log" hover-class="none">
		        <text class="cuIcon-formfill text-green"></text>
		        <text class="text-grey">更新日志</text>
		      </navigator>
		    </view>
		    <view class="cu-item arrow">
		      <view class="content" @tap="showQrcode">
		        <text class="cuIcon-appreciatefill text-red"></text>
		        <text class="text-grey">赞赏支持</text>
		      </view>
		    </view>
		        <view class="cu-item arrow">
		      <navigator class="content" hover-class="none"  target="miniProgram" open-type="navigate" :app-id=" appId " :extra-data="extraData" version="release">
		        <text class="cuIcon-markfill text-pink"></text>
		        <text class="text-grey">意见反馈</text>
		      </navigator>
		    </view>
		    <view class="cu-item arrow">
		      <button class="cu-btn content" open-type="contact">
		        <text class="cuIcon-writefill text-cyan"></text>
		        <text class="text-grey">联系开发小哥</text>
		      </button>
		    </view>
		  </view>
		  <view class="cu-tabbar-height"></view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				version: this.version,
				appId: "wx8abaf00ee8c3202e",
				        extraData: {
				            id: "64691",
				            customData: {}
				        }
			}
		},
		methods: {
			showQrcode: function () {
			            uni.previewImage({
			                urls: ['https://wx1.sinaimg.cn/mw690/007RRq42gy1g4eofoktc1j30st0jyu0y.jpg'],
			                current: 'https://wx1.sinaimg.cn/mw690/007RRq42gy1g4eofoktc1j30st0jyu0y.jpg'
			            });
			        },
		}
	}
</script>

<style>
	page{
	  padding-top: 0rpx!important;
	}
.UCenter-bg {
  background-image: url(../../static/index.jpg);
  background-size: cover;
  height: 550rpx;
  display: flex;
  justify-content: center;
  padding-top: 40rpx;
  overflow: hidden;
  position: relative;
  flex-direction: column;
  align-items: center;
  color: #fff;
  font-weight: 300;
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
}

.UCenter-bg text {
  opacity: 0.8;
}

.UCenter-bg image {
  width: 200rpx;
  height: 200rpx;
}

.UCenter-bg .gif-wave{
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  z-index: 99;
  mix-blend-mode: lighten; 
  height: 100rpx;   
}

map,.mapBox{
  left: 0;
  z-index: 99;
  mix-blend-mode: screen;  
  height: 100rpx;   
}

map,.mapBox{
  width: 750rpx;
  height: 300rpx;
}


</style>
