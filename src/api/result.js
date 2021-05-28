import request from '@/utils/request'
//搜索接口
export function search({keywords, type, limit, offset}) {
	return request({
		url:'/search',
		method:'get',
		params:{
			keywords,
			type,
			limit,
			offset
		}
	})
}