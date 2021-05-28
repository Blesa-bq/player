import request from '@/utils/request'

//轮播图接口
export function banner(){
	return request({
		url: '/banner',
		method: 'get'
	});
}

//推荐歌单
export function songlist({ limit = 10 } = {}) {
	return request({
		url: 'personalized',
		method: 'get',
		params: {
			limit
		}
	})
}

//最新音乐
export function newsong(){
	return request({
		url: '/personalized/newsong',
		method:'get'
	})
}

//MV
export function mv(){
	return request ({
		url:'/personalized/mv',
		method:'get'
	})
}




//播放音乐链接
export function songUrl({ id }) {
	return request({
		url:'/song/url',
		method: 'get',
		params:{
			id
		}
	})
}