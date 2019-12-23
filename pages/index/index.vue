<template>
	<view>

		<tags v-if="PageCur=='tags'"></tags>
		<changeList v-if="PageCur=='changeList'"></changeList>
		<about v-if="PageCur=='about'"></about>
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-cur="tags">
				<view class='cuIcon-cu-image'>
					<text class=" lg " :class="PageCur=='tags'?'text-green cuIcon-friendaddfill':'text-gray cuIcon-friendadd'"></text>
				</view>
				<view :class="PageCur=='tags'?'text-green':'text-gray'">招募</view>
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
	export default {
		data() {
		return {
				PageCur: 'tags'
			}
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			},
			onShareAppMessage(res) {
			        if (res.from == "button") {
			            if (res.target.dataset.id === '1') {
			                return {
			                    title: '支持识别截图的公开招募助手',
			                    desc: '支持识别截图的公开招募助手',
			                    imageUrl: '../../static/ark11.jpg'
			                };
			            }
			            else if (res.target.dataset.id === '3') {
			                return {
			                    title: '支持识别截图的公开招募助手',
			                    desc: '支持识别截图的公开招募助手',
								imageUrl: '../../static/ark11.jpg'
			                };
			            }
			            else if (res.target.dataset.id === '2') {
			                var value = wx.getStorageSync('changeClue');
			                if (!value) {
			                    value = "快来找到你需要的线索~";
			                }
			                return {
			                    title: value,
			                    desc: value,
			                    imageUrl: '../../static/ark66.jpg'
			                };
			            }
			            else {
			                return {
			                    title: '支持识别截图的公开招募助手',
			                    desc: '支持识别截图的公开招募助手',
			                    imageUrl: '../../static/ark11.jpg'
			                };
			            }
			        }
			        else {
			            return {
			                title: '支持识别截图的公开招募助手',
			                desc: '支持识别截图的公开招募助手',
			                imageUrl: '../../static/ark11.jpg',
			            };
			        }
			    }
		}
	}
</script>

<style>


</style>
