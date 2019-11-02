/**
 * article模块接口列表
 */

import base from './base'; // 导入接口域名列表
import axios from '../request/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const ark = {    
    // 新闻列表    
    postChange (params) {
        return axios.post(`${base.host}/postChange`, params);    
    },  
	
    // 新闻详情,演示    
    getChangeList (params) {        
        return axios.post(`${base.host}/changeList`, params);    
    },
    
    // 其他接口…………
	tagsAval(){
		return axios.get(`${base.host}/tagsAval`);   
	}
	
}

export default ark;