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
				<view :class="PageCur=='changeList'?'text-green':'text-gray'">线索交换</view>
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
			}
		}
	}
</script>

<style>


</style>
