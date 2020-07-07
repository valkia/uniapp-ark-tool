<template>
	<view>
		<view class="tips" v-if="tipsFlag" @click="hideTips" v-bind:style="'top:'+(CustomBar)+'px'">添加到我的小程序，方便下次使用<view
			 class="d4" v-bind:style="'top:'+(CustomBar-15)+'px'"></view>
			<view class="close"></view>
		</view>
		<tags v-if="PageCur=='tags'"></tags>
		<changeList v-if="PageCur=='changeList'"></changeList>
		<DetailsLayout v-if="PageCur=='DetailsLayout'"></DetailsLayout>
		<about v-if="PageCur=='about'"></about>
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-cur="tags">
				<view class='cuIcon-cu-image'>
					<text class=" lg " :class="PageCur=='tags'?'text-green cuIcon-friendaddfill':'text-gray cuIcon-friendadd'"></text>
				</view>
				<view :class="PageCur=='tags'?'text-green':'text-gray'">招募</view>
			</view>
			<view class="action" @click="NavChange" data-cur="DetailsLayout">
				<view class='cuIcon-cu-image'>
					<text class=" lg " :class="PageCur=='DetailsLayout'?'text-green cuIcon-formfill':'text-gray cuIcon-form'"></text>
				</view>
				<view :class="PageCur=='DetailsLayout'?'text-green':'text-gray'">图鉴</view>
			</view>
			<view class="action" @click="NavChange" data-cur="changeList">
				<view class='cuIcon-cu-image'>
					<text class=" lg " :class="PageCur=='changeList'?'text-green cuIcon-formfill':'text-gray cuIcon-form'"></text>
				</view>
				<view :class="PageCur=='changeList'?'text-green':'text-gray'">好友/线索</view>
			</view>
			<view class="action" @click="NavChange" data-cur="about">
				<view class='cuIcon-cu-image'>
					<text class=" lg " :class="PageCur=='about'?'text-green cuIcon-homefill':'text-gray cuIcon-home'"></text>
				</view>
				<view :class="PageCur=='about'?'text-green':'text-gray'">关于</view>
			</view>
		</view>
	</view>
</template>

<script>
	import DetailsLayout from '../../components/DetailsLayout'
	export default {
		data() {
			return {
				CustomBar: this.CustomBar,
				PageCur: 'tags',
				tipsFlag: true
			}
		},
		components:{DetailsLayout},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			},
			hideTips() {
				this.tipsFlag = false;
				try {
					uni.setStorageSync('tipsFlag', false);
				} catch (e) {
					// error
				}
			},
			onShareAppMessage(res) {
				if (res.from == "button") {
					if (res.target.dataset.id === '1') {
						return {
							title: '支持识别截图的公开招募助手',
							desc: '支持识别截图的公开招募助手',
							imageUrl: '../../static/ark11.jpg'
						};
					} else if (res.target.dataset.id === '3') {
						return {
							title: '支持识别截图的公开招募助手',
							desc: '支持识别截图的公开招募助手',
							imageUrl: '../../static/ark11.jpg'
						};
					} else if (res.target.dataset.id === '2') {
						var value = wx.getStorageSync('changeClue');
						if (!value) {
							value = "快来找到你需要的线索~";
						}
						return {
							title: value,
							desc: value,
							imageUrl: '../../static/ark66.jpg'
						};
					} else {
						return {
							title: '支持识别截图的公开招募助手',
							desc: '支持识别截图的公开招募助手',
							imageUrl: '../../static/ark11.jpg'
						};
					}
				} else {
					return {
						title: '支持识别截图的公开招募助手',
						desc: '支持识别截图的公开招募助手',
						imageUrl: '../../static/ark11.jpg',
					};
				}
			}
		},
		mounted: function() {
			try {
				let tipsFlag = uni.getStorageSync('tipsFlag');
				console.log(tipsFlag)
				this.tipsFlag = tipsFlag === "" ? true : tipsFlag;
				console.log(this.tipsFlag)
			} catch (e) {
				console.log(e)
			}
		}
	}
</script>

<style>
	.tips {
		position: fixed;
		top: 70px;
		z-index: 20000;
		right: 20px;
		font-size: 0.6rem;
		background: #000;
		color: #fff;
		padding: 8px 30px 8px 10px;
		border-radius: 6px;
		opacity: 0.8;
	}

	.close {
		position: absolute;
		right: 15px;
		top: 9px;
		/* right: 0px; */
		width: 0.1em;
		height: 1.2em;
		background: #fff;
		-webkit-transform: rotate(45deg);
		-moz-transform: rotate(45deg);
		-o-transform: rotate(45deg);
		-ms-transform: rotate(45deg);
		transform: rotate(45deg);
		display: inline-block;
	}

	.close:after {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 0.1em;
		height: 1.2em;
		background: #fff;
		-webkit-transform: rotate(270deg);
		-moz-transform: rotate(270deg);
		-o-transform: rotate(270deg);
		-ms-transform: rotate(270deg);
		transform: rotate(270deg);
	}

	.d4 {
		position: fixed;
		right: 60px;
		top: 50px;
		/* margin-left: 10px; */
		/* float: left; */
		width: 0;
		height: 0;
		border-width: 10px;
		border-style: solid;
		border-color: transparent #000 transparent transparent;
		-webkit-transform: rotate(90deg);
		transform: rotate(90deg);
		opacity: 0.8;
	}
</style>
