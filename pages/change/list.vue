<template name="changeList">
	<view>
		<cu-custom bgColor="bg-gradual-green" :isBack="false">
			<block slot="backText">返回</block>
			<block slot="content">{{TabCur==0?'好友添加':'线索互换'}}</block>
		</cu-custom>
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in Tablist" :key="index"
				 @tap="tabSelect" :data-id="index">
					{{item}}
				</view>
			</view>
		</scroll-view>
		<view v-if="TabCur==0" class="cu-bar bg-white search fixed" v-bind:style="{top:(CustomBar+45)+'px'}">
			<form style="width: 100%;">
				<view class="cu-form-group">
					<view class="title">筛选游戏区服</view>
					<picker @change="PickerChange" :value="serverIndex" :range="serverList">
						<view class="picker" style="text-align: left;">
							{{serverIndex!=null?serverList[serverIndex]:'全部'}}
						</view>
					</picker>
				</view>
			</form>
		</view>
		<view v-if="TabCur==1" class="cu-bar bg-white search fixed" v-bind:style="{top:(CustomBar+45)+'px'}">
			<view class="search-form ">
				<text class="cuIcon-search"></text>
				<input type="text" v-model="keyword" placeholder="搜索需要的线索(数字 空格隔开)"></input>
			</view>
			<button class="cu-btn  bg-green" style="margin-right: 10px;" @tap="search">搜索</button>
		</view>

		<button class="cu-btn cuIcon lg bg-green fixed-btn" style="bottom: 260rpx;" hover-class="none" open-type="share"
		 data-id="2">
			<text class="cuIcon-share"></text>
		</button>

		<button class="cu-btn cuIcon lg bg-green fixed-btn">
			<navigator class="content" :url="'/pages/change/new?tab='+TabCur" navigateTo hover-class="none">
				<text class="cuIcon-add"></text>
			</navigator>
		</button>


		<view class="cu-item shadow" style="margin-bottom: 60px;padding-top:50px">
			<view style="padding:8px;color:#ff0000;background:#ffffe9" class="solid-bottom">现在点击昵称就能直接复制啦~</view>
			<view class="cu-list cu-card menu comment solids-top">

				<view class="cu-item" v-for="change in changeList">

					<view class="content">
						<view v-if="TabCur==1" class="bg-grey padding-sm radius margin-top-xs  text-sm">
							<view class="flex">
								<view> {{change.have}} 换 {{change.need}} </view>
							</view>
						</view>
						<view class="margin-top-xs text-gray text-content text-df">
							{{change.remark}}
						</view>
						<view class="margin-top-xs margin-bottom-xs flex justify-end text-right">
							<view class="text-gray text-df ">
								<view @tap="copyBtn(change.username)" style="color:#666">{{change.username}}</view> {{change.server}}
								{{change.createdtime}}
							</view>
						</view>
					</view>

				</view>
				<view class="cu-item" v-if="changeList.length===0">{{TabCur==0?'还没有人发布过这服务器的信息~':'还没有人发布过这类线索~'}}</view>
				<view class="flex flex-direction" style="padding: 0 30rpx;">
					<button class="cu-btn line-green lg" @tap="nextPage" v-if="changeList.length===10">下一页</button>
					<view class="cu-item" v-if="changeList.length<10" style="text-align: center;">没有更多啦~</view>
				</view>

			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				Tablist: ['好友添加', '线索互换'],
				CustomBar: this.CustomBar,
				changeList: [],
				keyword: '',
				pageIndex: 1,
				pageSize: 10,
				TabCur: 0,
				scrollLeft: 0,
				server: "全部",
				serverIndex: 0,
				serverList: ['全部', '官服', 'B服', '其他'],
			}
		},
		methods: {
			PickerChange(e) {
				console.log(e);
				let tmp = this.serverList[e.detail.value];
				this.serverIndex = e.detail.value;
				this.server = tmp;
				this.getList();
			},
			getTimeAgo: function(dateTimeStamp) { //dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
				let result = "";
				var minute = 1000 * 60; //把分，时，天，周，半个月，一个月用毫秒表示
				var hour = minute * 60;
				var day = hour * 24;
				var week = day * 7;
				//var halfamonth = day * 15;
				var month = day * 30;
				var now = new Date().getTime(); //获取当前时间毫秒
				console.log(now)
				var diffValue = now - dateTimeStamp; //时间差

				if (diffValue < 0) {
					return;
				}
				var minC = diffValue / minute;
				//计算时间差的分，时，天，周，月
				var hourC = diffValue / hour;
				var dayC = diffValue / day;
				var weekC = diffValue / week;
				var monthC = diffValue / month;
				if (monthC >= 1 && monthC <= 3) {
					result = " " + parseInt(monthC.toString()) + "月前"
				} else if (weekC >= 1 && weekC <= 3) {
					result = " " + parseInt(weekC.toString()) + "周前"
				} else if (dayC >= 1 && dayC <= 6) {
					result = " " + parseInt(dayC.toString()) + "天前"
				} else if (hourC >= 1 && hourC <= 23) {
					result = " " + parseInt(hourC.toString()) + "小时前"
				} else if (minC >= 1 && minC <= 59) {
					result = " " + parseInt(minC.toString()) + "分钟前"
				} else if (diffValue >= 0 && diffValue <= minute) {
					result = "刚刚"
				} else {
					var datetime = new Date();
					datetime.setTime(dateTimeStamp);
					var Nyear = datetime.getFullYear();
					var Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
					var Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
					//var Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
					//var Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
					//var Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
					result = Nyear + "-" + Nmonth + "-" + Ndate
				}
				return result;
			},
			search: function() {
				this.pageIndex = 1;
				this.getList();
			},
			getList: function() {
				let that = this;
				let url = '/buddyList';
				let params = {
					pageIndex: this.pageIndex,
					pageSize: this.pageSize,
					keyword: this.keyword
				};
				if (this.TabCur == 0) {
					url = '/buddyList';
					params = {
						pageIndex: this.pageIndex,
						pageSize: this.pageSize,
						keyword: this.server
					};
					if (params.keyword == '全部') {
						params.keyword = null;
					}
				} else if (this.TabCur == 1) {
					url = '/changeList';
					params = {
						pageIndex: this.pageIndex,
						pageSize: this.pageSize,
						keyword: this.keyword
					};
				}
				this.api.post(url, params).then(response => {

					if (response.status === 200) {

						let list = response.data;

						list.forEach((item) => {
							item.createdtime = that.getTimeAgo(new Date(item.createdAt).getTime());
						})


						that.changeList = list;
						uni.pageScrollTo({
							scrollTop: 0,
							duration: 150
						})
					}
				}).catch(function(msg) {
					console.log(msg)
				})

				// app.func.post('/changeList', { pageIndex: this.data.pageIndex, pageSize: this.data.pageSize, keyword: this.data.keyword }, function (response: ArkResp) {

				// })
			},

			nextPage: function() {
				let page = this.pageIndex + 1;
				this.pageIndex = page;
				this.getList();
			},
			lastPage: function() {
				let page = this.pageIndex;
				this.pageIndex = page--;
				this.getList();
			},
			// 一键复制事件
			copyBtn: function(data) {
				uni.setClipboardData({
					//准备复制的数据
					data: data,
					success: function() {
						uni.showToast({
							title: '复制成功',
						});
					}
				});
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
				this.pageIndex = 1;
				this.getList();
			}
		},
		mounted() {
			console.log("mounted");
			this.getList();
		}
	}
</script>

<style>
	.fixed-btn {
		position: fixed;
		right: 20px;
		bottom: 160rpx;
		z-index: 1;
	}

	.cu-bar.fixed,
	.nav.fixed {
		z-index: 999;
	}
</style>
