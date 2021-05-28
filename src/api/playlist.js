import request from '@/utils/request'

//歌单详情
export function playlistDetail({ id }){
	return request({
		url:'/playlist/detail',
		method:'get',
		params:{
			id
		}
	})
}

//热门评论
export function hotComments({ id }){
	return request({
		url:'/comment/hot',
		method:'get',
		params:{
			id,
			type:2
		}
	})
}

//最新评论
export function listComments({ id, offset }){
	return request({
		url:'/comment/playlist',
		method:'get',
		params:{
			id,
			offset,
			limit:5
		}
	})
}