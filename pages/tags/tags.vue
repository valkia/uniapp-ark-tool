<template name="tags">
	<view>
		<cu-custom bgColor="bg-gradual-green" :isBack="false">
			<block slot="backText">返回</block>
			<block slot="content">明日方舟助手</block>
		</cu-custom>
		<!-- style="top:{{CustomBar}}px" -->
		<!-- v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }" -->
		<view class="cu-bar bg-white search fixed" v-bind:style="'top:'+CustomBar+'px'">
			<view class="search-form ">
				<text class="cuIcon-search"></text>
				<input type="text" v-model="keywords" placeholder="关键字（空格隔开，支持模糊搜索）" confirm-type="search" v-on:input="search(keywords)"></input>
			</view>
			<button class="cu-btn  bg-grey" style="margin-right: 10px;" @tap="clean">清空</button>
			<button class="cu-btn  bg-grey" style="margin-right: 10px;" @tap="upload">上传</button>
		</view>

		<view class="bg-white" style="padding: 0px;padding-top:55px">
			<!-- <view class="flex flex-wrap">
 {{checkedTags}}
</view> -->
			<view style="padding:8px;color:#ff0000;background:#ffffe9" class="solid-bottom">新增识图功能，点击右边上传按钮上传游戏中的公开招募界面截图即可</view>
			<view class="flex flex-wrap" style="padding:5px 5px 0 5px">
				<view v-for="item in showStars" v-bind:key="item.name" v-on:tap="clickStars(item.name)" class="tag-number cu-tag"
				 :class="item.showFlag?'bg-olive':'line-olive'">{{item.name}}</view>
			</view>
		</view>

		<view class="bg-white padding">
			<view>
				<view class="flex flex-wrap" v-for="tag in tags" v-bind:key="tag.cn">
					<view class="tag-title cu-tag bg-grey light">{{tag.cn}}</view>
					<view class="tag-wrap">
						<view class="flex flex-wrap">
							<view class="tag-text cu-tag" :class="t.showFlag?'bg-olive':'line-olive'" v-for="t in tag.cntags" v-bind:key="t.name"
							 v-on:tap="clickTag(t.name)">{{t.name}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="bg-white padding">
			<view>
				<view class="flex flex-wrap" v-for="item in possible" v-if="item.possible.length>0" v-bind:key="item">
					<!-- {{filters.toFix(item.score)}} -->
					<view class="possible-title">
						<view class="cu-tag bg-olive light" v-for="t in item.tags" v-bind:key="t">{{t}}</view>
					</view>
					<view class="possible-wrap">
						<view class="flex flex-wrap">
							<view class=" cu-tag star " :class="'star-'+p.level" v-for="p in item.possible" v-bind:key="p.name">{{p.name}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="bg-white padding">
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-green"></text>说明
				</view>
			</view>
			<view class="padding-xs flex align-center">

				<view class="flex-sub text-left">
					<view class="text-df padding">对照游戏中的招募标签选择上面的标签</view>
					<view class="text-df padding">也可以在输入框中输入，每个标签都需要空格隔开</view>
					<view class="text-df padding">输入框可以是单字，但如果该字在两个标签中出现，就无法匹配（例如 干员 就无法匹配）；也可以是完整的文本</view>
					<view class="text-df padding">选择或输入标签后，下面出现的是标签组合可能出现的干员</view>
					<view class="text-df padding">按星数排序，第一行是最推荐的标签组合</view>
					<view class="text-df padding">选择完毕点击输入框右边的清空按钮即可重新输入</view>
				</view>
			</view>
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-green"></text>
					<button open-type="share" class="share-btn" hover-class="none">觉得不错？点击分享给你的朋友吧</button>
				</view>
			</view>
			<view class="ad-bottom">
				<ad unit-id="adunit-84ba84af2ab9997c"></ad>
			</view>
			<view class="padding-sm flex align-center">
				<view class="flex-sub text-left">
					<view class="text-df padding">对照游戏中的招募标签选择上面的标签</view>
				</view>
			</view>
		</view>
		<view class="cu-load load-modal" v-if="loadModal">
			<!-- <view class="cuIcon-emojifill text-orange"></view> -->

			<view class="gray-text">上传中...</view>
		</view>
		<view class="cu-modal" :class="modalFlag?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">提示</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					{{modalMsg}}
				</view>
			</view>
		</view>


	</view>
</template>


<script>
	import ArkResp from '../../model/ArkResp.js';
	class HeroBasic {
		constructor(name, type, level, img) {
			this.name = name;
			this.type = type;
			this.level = level;
			this.img = img;
		}
	}
	export default {
		name:"tags",
		data() {
			return {
				CustomBar:this.CustomBar,
				modalMsg: "",
				modalFlag: false,
				loadModal: false,
				keywords: "",
				tags: [{
						"cn": "资质",
						"cntags": [{
							name: "新手",
							showFlag: false
						}, {
							name: "资深干员",
							showFlag: false
						}, {
							name: "高级资深干员",
							showFlag: false
						}]
					},
					{
						"cn": "位置",
						"cntags": [{
							name: "远程位",
							showFlag: false
						}, {
							name: "近战位",
							showFlag: false
						}]
					},
					{
						"cn": "性别",
						"cntags": [{
							name: "男性干员",
							showFlag: false
						}, {
							name: "女性干员",
							showFlag: false
						}]
					},
					{
						"cn": "种类",
						"cntags": [{
							name: "先锋干员",
							showFlag: false
						}, {
							name: "狙击干员",
							showFlag: false
						}, {
							name: "医疗干员",
							showFlag: false
						}, {
							name: "术师干员",
							showFlag: false
						}, {
							name: "近卫干员",
							showFlag: false
						}, {
							name: "重装干员",
							showFlag: false
						}, {
							name: "辅助干员",
							showFlag: false
						}, {
							name: "特种干员",
							showFlag: false
						}]
					},
					{
						"cn": "词缀",
						"cntags": [{
							name: "治疗",
							showFlag: false
						}, {
							name: "支援",
							showFlag: false
						}, {
							name: "输出",
							showFlag: false
						}, {
							name: "群攻",
							showFlag: false
						}, {
							name: "减速",
							showFlag: false
						}, {
							name: "生存",
							showFlag: false
						}, {
							name: "防护",
							showFlag: false
						}, {
							name: "削弱",
							showFlag: false
						}, {
							name: "位移",
							showFlag: false
						}, {
							name: "控场",
							showFlag: false
						}, {
							name: "爆发",
							showFlag: false
						}, {
							name: "召唤",
							showFlag: false
						}, {
							name: "快速复活",
							showFlag: false
						}, {
							name: "费用回复",
							showFlag: false
						}]
					}
				],
				tags_aval: {} = {},
				checkedTags: [] = [],
				checkedTagsTL: [] = [],
				possible: [] ,
				optStars: [] = [""],
				showStars: [] = [{
					name: "清空",
					showFlag: true
				}, {
					name: "6",
					showFlag: true
				}, {
					name: "5",
					showFlag: true
				}, {
					name: "4",
					showFlag: true
				}, {
					name: "3",
					showFlag: true
				}, {
					name: "2",
					showFlag: true
				}, {
					name: "1",
					showFlag: true
				}],
			}
		},
		mounted() {
			console.log("mounted");
			this.init();
		},
		methods: {

			
			upload() {
				this.clean();
				let that = this;
				console.log("upload start");
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],
					success(res) {
						const tempFilePaths = res.tempFilePaths;
						console.log(tempFilePaths);
						const systemInfo = uni.getSystemInfoSync();
						//没有systemInfo.brand 说明是h5 不支持压缩
						if (systemInfo.brand) {

							uni.compressImage({
								src: tempFilePaths[0],
								quality: 50,
								success: res => {
									const tempFilePath = res.tempFilePath;
									that.showLoading();
									uni.uploadFile({
										url: 'https://node.dtodo.cn/ark/upload',
										//url: 'http://127.0.0.1:7001/ark/upload',
										filePath: tempFilePath,
										name: 'file',
										formData: {
											'user': 'test'
										},
										success(res) {
											that.hideLoading();
											let result = JSON.parse(res.data).data;
											if (result != '[]') {
												let tagList = result;
												for (let i = 0; i < tagList.length; i++) {
													that.clickTagF(tagList[i], true);
												}
											} else {
												that.showModal("没有识别的招募标签，请检查图片。", 3000);

											}
										},
										fail(res) {
											that.hideLoading();
											that.showModal("没有识别的招募标签，请检查图片。", 3000);
										}
									});
								},
								fail: err => {
									console.log(err)
								}
							});
						} else {
							that.showLoading();
							uni.uploadFile({
								url: 'https://node.dtodo.cn/ark/upload',
								//url: 'http://127.0.0.1:7001/ark/upload',
								filePath: tempFilePaths[0],
								name: 'file',
								formData: {
									'user': 'test'
								},
								success(res) {
									that.hideLoading();
									let result = JSON.parse(res.data).data;
									if (result != '[]') {
										let tagList = result;
										for (let i = 0; i < tagList.length; i++) {
											that.clickTagF(tagList[i], true);
										}
									} else {
										that.showModal("没有识别的招募标签，请检查图片。", 3000);
									}
								},
								fail(res) {
									that.hideLoading();
									that.showModal("没有识别的招募标签，请检查图片。", 3000);
								}
							});
						}

					}
				});
			},
			showLoading() {
				this.loadModal = true;
			},
			hideLoading() {
				this.loadModal = false;
			},
			showModal(msg, time) {
				if (time) {
					this.modalFlag = true;
					this.modalMsg = msg;
					setTimeout(() => {
						this.modalFlag = false;
					}, time)
				} else {
					this.modalFlag = true;
				}
			},
			hideModal() {
				this.modalFlag = false;
			},
			search(keyword) {

				let keyArray = keyword.split(/\s+/);
				let that = this;
				this.tags.forEach((t) => {
					t['cntags'].forEach((t2) => {
						if (t2.showFlag === true) {
							t2.showFlag = false;
						}
					});
				});
				that.checkedTags = [];
				that.tags = this.tags;
				that.keywords = keyword;
				if (keyArray.length === 0)
					that.calc();
				keyArray.forEach(key => {
					let times = 0;
					let result = "";
					this.tags.forEach((t) => {
						t['cntags'].forEach((t2) => {
							if (t2.name.includes(key)) {
								times++;
								result = t2.name;
							}
						});
					});
					if (times === 1) {
						that.clickTagF(result, false);
					}
				});
			},
			clean() {
				this.tags.forEach((t) => {
					t['cntags'].forEach((t2) => {
						if (t2.showFlag === true) {
							t2.showFlag = false;
						}
					});
				});
				this.checkedTags = [];
				this.tags = this.tags;
				this.keywords = "";
				this.calc();
			},
			clickStars(value) {

				if (value === '清空') {
					this.showStars.forEach((s) => {
						s.showFlag = false;
					});
					this.showStars[0] = {
						name: "全选",
						showFlag: true
					};
					this.optStars = [];
					this.showStars = this.showStars;
				}
				if (value === '全选') {
					this.showStars.forEach((s) => {
						s.showFlag = true;
					});
					this.showStars[0] = {
						name: "清空",
						showFlag: true
					};
					this.optStars = ['清空', '6', '5', '4', '3', '2', '1'];
					this.showStars = this.showStars;
				} else {
					this.showStars.forEach((s) => {
						if (s.name === value) {
							s.showFlag = !s.showFlag;
						}
					});
					let tmp = this.optStars;
					if (this.optStars.includes(value)) {
						tmp = this.optStars.filter(function(v, _, __) {
							return v !== value;
						});
					} else {
						tmp.push(value);
					}
					this.optStars = tmp;
					this.showStars = this.showStars;
				}
				this.calc();
			},
			bindViewTap() {
				wx.navigateTo({
					url: '../index/index'
				});
			},
			calc() {
				let len = this.checkedTags.length;
				let count = Math.pow(2, this.checkedTags.length);
				let combs = [];
				for (let i = 0; i < count; i++) {
					let ts = [];
					let tsTL = [];
					for (let j = 0, mask = 1; j < len; j++) {
						if ((i & mask) !== 0) {
							ts.push(this.checkedTags[j]);
							tsTL.push(this.checkedTagsTL[j]);
						}
						mask = mask * 2;
					}
					combs.push({
						"tags": ts,
						"tagsTL": tsTL,
						"score": 0.0,
						"possible": []
					});
				}
				let optStars = this.optStars;
				var that = this;
				combs.forEach((comb) => {
					let tags = comb.tags;
					if (tags.length === 0 || tags.length > 3)
						return;
					let chars = [...that.tags_aval[tags[0]]];
					for (let i = 1; i < tags.length; i++) {
						let reduced_chars = [];
						chars.forEach((char) => {
							let tmp = that.tags_aval[tags[i]];
							tmp.forEach((tgch) => {
								if (char.name === tgch.name) {
									reduced_chars.push(char);
									return false;
								}
							});
						});
						chars = reduced_chars;
					}
					if (chars.length === 0)
						return;
					if (!tags.includes("高级资深干员")) {
						let reduce6 = [];
						chars.forEach(function(char) {
							if (char.level !== 6) {
								reduce6.push(char);
							}
						});
						chars = reduce6;
					}
					let filtered_chars = [];
					chars.forEach(function(char) {
						if (optStars.includes(char.level.toString())) {
							filtered_chars.push(char);
						}
					});
					chars = filtered_chars;
					comb.possible = chars;
					if (chars.length === 0)
						return;
					let s = 0;
					chars.forEach(function(char) {
						s += char.level;
					});
					s = s / chars.length;
					comb.score = s + 0.1 / tags.length + 0.9 / chars.length;
				});
				combs.sort(function(a, b) {
					return a.score > b.score ? -1 : (a.score < b.score ? 1 :
						(a.tags.length > b.tags.length ? 1 : (a.tags.length < b.tags.length ? -1 :
							0)));
				});
				combs.forEach((comb) => {
					if (!comb.possible || comb.possible.length === 0)
						return false;
					comb.possible.sort(function(a, b) {
						return a.level > b.level ? -1 : (a.level < b.level ? 1 : 0);
					});
				});
				that.possible = combs;
			},
			init() {
				let _that = this;
				var that = this;
				this.api.get('/tagsAval',{}).then(res => {

					that.tags_aval = res.data;
					console.log(that.tags_aval)
				}).catch(function(msg) {
					console.log(msg)
				})
				// app.func.get('/tagsAval', {}, function(response) {
				// 	if (response.status === 200) {
				// 		that.setData({
				// 			tags_aval: JSON.parse(response.data)
				// 		});
				// 	}
				// });
				this.optStars = ['清空', '6', '5', '4', '3', '2', '1'];
				_that.calc();
			},
			clickTag(tag) {

				this.clickTagF(tag, true);
			},
			clickTagF(tag, clickFlag) {
				let _that = this;
				let checked = false;
				if (!clickFlag) {
					this.tags.forEach((t) => {
						t['cntags'].forEach((t2) => {
							if (t2.name === tag && t2.showFlag === false) {
								t2.showFlag = true;
							}
						});
					});
				} else {
					this.tags.forEach((t) => {
						t['cntags'].forEach((t2) => {
							if (t2.name === tag) {
								t2.showFlag = !t2.showFlag;
							}
						});
					});
				}
				if ((_that.checkedTags).includes(tag)) {
					checked = true;
				}
				if (checked) {
					if (clickFlag) {
						let tmp = _that.checkedTags;
						tmp = _that.checkedTags.filter(function(v, _, __) {
							return v !== tag;
						});
						_that.checkedTags = tmp;
					}
				} else {
					if (_that.checkedTags.length >= 6) {
						wx.showToast({
							title: "无法选择更多标签：最多6个。",
							icon: "none",
							duration: 2000
						});
						return;
					} else {
						_that.checkedTags.push(tag);
						_that.checkedTags = _that.checkedTags;
					}
				}
				_that.tags = _that.tags;
				_that.calc();
			}
		},
		
	}
</script>


<style scoped>
	page {
		padding-top: 100rpx;
	}

	.tag-title {
		/* text-align: center; */
		padding: 10rpx;
		margin: 8rpx;
		flex-basis: 17%;
		text-align: justify;
		text-justify: inter-ideograph
	}



	.tag-text {
		/* text-align: center; */
		padding: 10rpx;
		margin: 8rpx;
		flex-basis: 20%;
		text-align: justify;
		text-justify: inter-ideograph;
	}

	.tag-number {
		/* text-align: center; */
		padding: 6rpx;
		margin: 8rpx;
		width: 10%;
		text-align: justify;
		text-justify: inter-ideograph
	}

	.tag-wrap {
		flex-basis: 80%;
	}

	.possible-wrap {
		flex-basis: 100%;
		border-bottom: 1px solid #ddd;
	}

	.possible-title {
		padding: 10rpx;
		flex-basis: 100%;

	}

	.possible-text {
		/* text-align: center; */
		padding: 10rpx;
		flex-basis: 25%;
		text-align: justify;
		text-justify: inter-ideograph
	}

	.padding {
		padding: 15rpx 10rpx;
	}

	.star {
		margin: 8rpx;
	}

	.star-6 {
		background: #f0e028 !important;
	}

	.star-5 {
		background: #f0a94d !important;
	}

	.star-4 {
		background: #8960ce !important;
		color: white;
	}

	.star-3 {
		background: #618bf5 !important;
		color: white;
	}

	.star-2 {
		background: #dedede !important;
	}

	.star-1 {
		background: #dedede !important;
	}

	.share-btn {
		border: 1px solid white;
		font-size: 16px;
		background: unset;
		text-decoration: underline;
	}

	.share-btn::after {
		border: 1px solid white;
	}
</style>
