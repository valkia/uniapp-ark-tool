<template>
	<view>
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">更新日志</block>
		</cu-custom>
		<view class="cu-timeline">

			<!-- <view class="cu-item text-green">
				<view class="bg-gradual-green content shadow">
					<view class="cu-capsule radius">
						<view class="cu-tag bg-white text-green">v1.2.2</view>
						<view class="cu-tag line-white">2019/07/26</view>
					</view>
					<view class="margin-top-sm text-content">
						<view>1.优化了小程序性能</view>
						<view>2.好友名称可以复制了</view>
						<view>3.更换了后台，现在性能和网络更强悍啦~</view>
					</view>
				</view>
			</view> -->

			<view class="cu-item text-green" v-for="(log,logIndex) in logs" >
				<view class="content shadow" :class="logIndex==0?'bg-gradual-green':'bg-green'">
					<view class="cu-capsule radius">
						<view class="cu-tag bg-white text-green">{{log.version}}</view>
						<view class="cu-tag line-white">{{log.date}}</view>
					</view>
					<view class="margin-top-sm text-content" v-for="(item,index) in log.details">
						<view>{{index+1}}.{{item}}</view>
					</view>
				</view>
			</view>

			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				logs: [
					{
						version: "v1.3.4",
						date: "2019/12/24",
						details: [
							"招募数据跟游戏更新保持一致",
							"暂时关闭了信息发布的功能"
						]
					},{
						version: "v1.3.3",
						date: "2019/12/1",
						details: [
							"优化添加好友列表页面的显示"
						]
					},
					{
						version: "v1.3.2",
						date: "2019/11/25",
						details: [
							"增加了好友添加的模块"
						]
					},
					{
					version: "v1.3.1",
					date: "2019/11/02",
					details: [
						"从微信小程序原生代码迁移到了uniapp代码"
					]
				},{
					version: "v1.2.2",
					date: "2019/07/26",
					details: [
						"优化了小程序性能", "好友名称可以复制了", "更换了后台，现在性能和网络更强悍啦~"
					]
				},
				{
					version: "v1.2.1",
					date: "2019/07/10",
					details: [
						"增加了招募页的上传识图功能"
					]
				},
				{
					version: "v1.2.0",
					date: "2019/07/06",
					details: [
						"增加了线索交换模块","增加了线索交换的微信分享转发"
					]
				},
				{
					version: "v1.1.0",
					date: "2019/06/26",
					details: [
						"招募页面增加说明和分享", "增加了关于页面", "关于页面也可以点击右上角分享","增加小程序更新日志","增加联系开发功能","增加吐槽建议功能","增加赞赏二维码"
					]
				},
				{
					version: "v1.0.2",
					date: "2019/06/25",
					details: [
						"招募页增加清空按钮"
					]
				},
				{
					version: "v1.0.1",
					date: "2019/06/25",
					details: [
						"招募页增加通过输入文字来选择标签"
					]
				},{
					version: "v1.0.0",
					date: "2019/06/24",
					details: [
						"1.0版本上线","招募页面"
					]
				},]
			}
		},
		methods: {

		}
	}
</script>

<style>
</style>
