import Vue from 'vue'
import App from './App'



import tags from './pages/tags/tags.vue'
Vue.component('tags', tags)

import changeList from './pages/change/list.vue'
Vue.component('changeList', changeList)

import about from './pages/about/about.vue'
Vue.component('about', about)

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom', cuCustom)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()





import api from './api' // 导入api接口
import http from './api/request.js'
Vue.prototype.$api = api; // 将api挂载到vue的原型上
Vue.prototype.api = {
	get: http.get,
	get2: http.get2,
	post: http.post,
post2:http.post2,
}
