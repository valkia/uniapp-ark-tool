<template>
	<view>
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">线索发布</block>
		</cu-custom>
		<view class="bg-white padding">
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-green"></text>选择你需要的线索
				</view>
			</view>
			<view class="padding-xs flex align-center">
				<view class="flex-sub text-left">
					<view class="flex flex-wrap">
						<view class="tag-wrap">
							<view class="flex flex-wrap">
								<view class="tag-text cu-tag" :class="clue.showFlag?'bg-olive':'line-olive'" v-for="(clue,index) in clueList['need']"
								 @tap="clickClue(index,'need')">{{clue.name}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-green"></text>选择你用来交换的线索
				</view>
			</view>
			<view class="padding-xs flex align-center">
				<view class="flex-sub text-left">
					<view class="flex flex-wrap">
						<view class="tag-wrap">
							<view class="flex flex-wrap">
								<view class="tag-text cu-tag" :class="clue.showFlag?'bg-olive':'line-olive'" v-for="(clue,index) in clueList['have']"
								 @tap="clickClue(index,'have')">{{clue.name}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<form>
				<view class="cu-form-group margin-top">
					<view class="title">游戏ID</view>
					<input placeholder="游戏昵称#2333" v-model="id"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">游戏区服</view>
					<picker @change="PickerChange" :value="serverIndex" :range="serverList">
						<view class="picker">
							{{serverIndex!=null?serverList[serverIndex]:'请选择区服'}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">备注</view>
					<input placeholder="请输入备注（最多30个字）" maxlength="30" v-model='remark'></input>
				</view>

				<view class="padding flex flex-direction">
					<button class="cu-btn bg-green margin-tb-sm lg" v-on:tap="saveChange" :disabled="loading">
						<text class="cuIcon-loading2 iconfont-spin" v-if="loading"></text> 提交</button>
				</view>
			</form>

		</view>
		<view class="ad-bottom-fixed">
			<ad unit-id="adunit-84ba84af2ab9997c"></ad>
		</view>

		<view class="cu-modal" :class="modalShow?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">提示</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					发布成功，是否分享到群？
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">返回</button>
						<button class="cu-btn bg-green margin-left" open-type="share" hover-class="none" data-id="2">分享</button>

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
				CustomBar:this.CustomBar,
				id: "",
				server: "",
				serverIndex: null,
				serverList: ['官服', 'B服', '其他'],
				clueList: {
					"need": [{
						name: "1",
						showFlag: false
					}, {
						name: "2",
						showFlag: false
					}, {
						name: "3",
						showFlag: false
					}, {
						name: "4",
						showFlag: false
					}, {
						name: "5",
						showFlag: false
					}, {
						name: "6",
						showFlag: false
					}, {
						name: "7",
						showFlag: false
					}],
					"have": [{
						name: "1",
						showFlag: false
					}, {
						name: "2",
						showFlag: false
					}, {
						name: "3",
						showFlag: false
					}, {
						name: "4",
						showFlag: false
					}, {
						name: "5",
						showFlag: false
					}, {
						name: "6",
						showFlag: false
					}, {
						name: "7",
						showFlag: false
					}]
				},
				remark: "",
				loading: false,
				modalShow: false
			}
		},
		methods: {
			onShareAppMessage() {
				console.log("onShareAppMessage");
				var value = wx.getStorageSync('changeClue');
				if (!value) {
					value = "快来找到你需要的线索~";
				}
				return {
					title: value,
					desc: value,
					path: 'pages/index/index',
					imageUrl: '../../../images/ark66.jpg'
				};
			},
			PickerChange(e) {
				console.log(e);
				let tmp = this.serverList[e.detail.value];
				this.serverIndex = e.detail.value;
				this.server = tmp;
			},
			InputChange: function(e) {
				console.log(e.target.dataset.type);
				console.log(e.detail.value);
				let type = e.target.dataset.type;
				if (type === 'remark') {
					this.remark = e.detail.value;
				} else if (type === 'id') {
					this.id = e.detail.value;
				}
			},
			hideModal: function() {
				uni.navigateBack({
					delta: 1
				});
			},
			clickClue(clue, type) {
				let clueTmp = this.clueList[type][clue];
				clueTmp.showFlag = !clueTmp.showFlag;
				this.clueList = this.clueList;
			},
			saveChange() {
				if (!this.id) {
					uni.showToast({
						title: "请输入游戏id",
						icon: "none",
						duration: 2000
					});
					return;
				}
				if (!this.server) {
					uni.showToast({
						title: "请选择游戏区服",
						icon: "none",
						duration: 2000
					});
					return;
				}
				let needFlag = false;
				let needStr = "";
				this.clueList['need'].forEach((clue) => {
					if (clue.showFlag) {
						needFlag = true;
						needStr += clue.name + " ";
					}
				});
				let haveFlag = false;
				let haveStr = "";
				this.clueList['have'].forEach((clue) => {
					if (clue.showFlag) {
						haveFlag = true;
						haveStr += clue.name + " ";
					}
				});
				if (!needFlag) {
					uni.showToast({
						title: "请选择至少一个需要的线索",
						icon: "none",
						duration: 2000
					});
					return;
				}
				if (!haveFlag) {
					uni.showToast({
						title: "请选择至少一个用来交换的线索",
						icon: "none",
						duration: 2000
					});
					return;
				}
				let req = {
					id: this.id,
					server: this.server,
					remark: this.remark,
					clueList: this.clueList
				};
				let that = this;
				let changeClueStr = this.id + " " + this.server + " " + haveStr + "换 " + needStr;
				that.loading = true;
				//this.$api.ark.postChange
				this.api.post('/postChange',req).then(response=>{
					console.log(response);
					if (response.status === 200) {
						uni.setStorage({
							key: "changeClue",
							data: changeClueStr
						});
						that.loading = false;
						that.modalShow = true;
					}
				}).catch(msg=>{
					
				})
				// app.func.post('/postChange', req, function(response) {
				// 	console.log(response);
				// 	if (response.status === 200) {
				// 		uni.setStorage({
				// 			key: "changeClue",
				// 			data: changeClueStr
				// 		});
				// 		that.loading = false;
				// 		that.modalShow = true;
				// 	}
				// });
			}
		}
	}
</script>

<style>
	.tag-text {
		/* text-align: center; */
		padding: 10rpx;
		margin: 8rpx;
		flex-basis: 10%;
		text-align: justify;
		text-justify: inter-ideograph;
	}

	.tag-wrap {
		flex-basis: 100%;
	}

	.cu-form-group .title {
		min-width: calc(4em + 30rpx);
	}

	.cu-form-group picker .picker {
		text-align: left;
	}
</style>
