var host = 'https://node.dtodo.cn/ark'; //正式域名
//var host = 'http://127.0.0.1:7001/ark';//本地开发
//var rootDocment = 'http://176.122.161.8:8080/ark';//正式域名

function success(res, resolve, reject) {
	if (res.statusCode === 404) {
		uni.showToast({
			title: "系统升级中，请稍等",
			icon: "none",
			duration: 2000
		})
		return;
	} else if (res.statusCode === 200) {
		resolve(res.data);
	} else {
		uni.showToast({
			title: "系统出错啦，请联系管理员",
			icon: "none",
			duration: 2000
		})
		return;
	}
}

function fail() {
	uni.showToast({
		title: "网络错误或服务器升级中",
		icon: "none",
		duration: 2000
	})
	return;
}

function post(url, data) {
	
	return new Promise(function(resolve, reject) {
		uni.request({
			url: host + url,
			data: data,
			method: 'post',
			success: function(res) {
				success(res, resolve, reject);
			},
			fail: function(err) {
				fail();
			}
		})
	});
}

function get(url, data) {
	return new Promise(function(resolve, reject) {
		uni.request({
			url: host + url,
			data: data,
			method: 'get',
			header: {
				'Content-Type': 'application/json'
			},
			success: function(res) {
				success(res, resolve, reject);
			},
			fail: function(err) {
				fail();
			}
		})


	});

}


module.exports = {
	post: post,
	get: get
}
