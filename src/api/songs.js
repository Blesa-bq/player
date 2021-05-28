import request from '@/utils/request'
//获取MV地址
export function topSongs({ type }) {
	return request({
		url:'/top/song',
		method:'get',
		params:{
			type
		}
	})
}