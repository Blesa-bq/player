import Vue from 'vue';
//导入element-ui样式
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';


// use 一下
Vue.use(ElementUI);

// 导入全局初始化样式
import '@/style/base.scss';

//路由整合
import VueRouter from 'vue-router';
Vue.use(VueRouter);

//导入对应的路由
import discovery from '@/views/discovery.vue'
import mv from '@/views/mv.vue'
import mvs from '@/views/mvs.vue'
import playlist from '@/views/playlist.vue'
import playlists from '@/views/playlists.vue'
import result from '@/views/result.vue'
import songs from '@/views/songs.vue'

const router = new VueRouter({
	routes:[
		{
			//发现音乐
			path: '/',
			redirect:'/discovery',
		},
		{
			//发现音乐
			path:'/discovery',
			component:discovery
		},
		{
			//最新音乐
			path:'/songs',
			component:songs
		},
		{
			//最新MV
			path:'/mvs',
			component:mvs
		},
		{
			//MV详情
			path:'/mv',
			component:mv
		},
		{
			//推荐歌单
			path:'/playlists',
			component:playlists
		},
		{
			//歌曲列表
			path:'/playlist',
			component:playlist
		},
		{
			//搜索结果
			path:'/result',
			component:result
		}
	]
});

//全局过滤器
import moment from 'moment'
//时间格式化
Vue.filter('formatDuration', (dt) => {
	//转分
	let min = Math.ceil( dt / 1000 / 60 ) //Math.ceil()向上取整函数
	min = min < 10 ? '0' + min : min
	//转秒
	let sec = Math.ceil(( dt / 1000 ) % 60 )
	sec = sec < 10 ? '0' + sec : sec
	return min + ":" + sec
})
//日期格式化
Vue.filter( 'formatTime', (time) => {
	return moment(time).format('YYYY-MM-DD hh:mm:ss')
})
//播放量格式化
Vue.filter('formatCount', (count) => {
	if( count / 10000 > 10 ){
		return parseInt( count / 10000 ) + '万'
	}else{
		return count
	}
});



Vue.config.productionTip = false;

new Vue({
  el: '#app',
  render: h => h(App),
  //把router挂在到Vue示例上
  router
});
