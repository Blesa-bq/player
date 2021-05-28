<template>
	<div class="discovery-container">
		<!-- 轮播图 -->
		 <el-carousel :interval="4000" type="card">
		    <el-carousel-item v-for="(item, index) in banners" :key="index" @click="toPlaylist(item.id)">
		      <img :src="item.imageUrl" alt=""/>
		    </el-carousel-item>
		  </el-carousel>
		<!-- 推荐歌单 -->
		<div class="recommend">
			<h3 class="title">
				推荐歌单
			</h3>
			<div class="items">
				<div class="item" v-for="item in songlists" :key="item.id">
					<div class="img-wrap"  @click="toPlaylist(item.id)">
						<div class="desc-wrap">
							<span class="desc">{{item.copywriter}}</span>
						</div>
						<img :src="item.picUrl" alt="" />
						<span class="iconfont icon-play"></span>
					</div>
					<p class="name">{{item.name}}</p>
				</div>
			</div>
		</div>
		
		<!-- 最新音乐 -->
		<div class="news">
			<h3 class="title">
				最新音乐
			</h3>
			<div class="items">
				<div class="item" v-for="(item, index) in newsong" :key="index">
					<div class="img-wrap">
						<img :src="item.picUrl" alt="" />
						<span class="iconfont icon-play" @click="playMusic(item.id)"></span>
					</div>
					<div class="song-wrap">
						<div class="song-name">{{item.name}}</div>
						<div class="singer">{{item.song.artists[0].name}}</div>
					</div>
				</div>
			</div>
		</div>
		
		<!-- 推荐MV -->
		<div class="mvs">
			<h3 class="title">推荐MV</h3>
			<div class="items">
				<div class="item" v-for="item in mv" :key="item.id" @click="toMV(item.id)">
					<div class="img-wrap">
						<img :src="item.picUrl" alt="" />
						<span class="iconfont icon-play"></span>
						<div class="num-wrap">
							<div class="iconfont icon-play"></div>
							<div class="num">{{item.playCount}}</div>
						</div>
					</div>
					<div class="info-wrap">
						<div class="name">{{item.copywriter}}</div>
						<div class="singer">{{item.artistName}}</div>
					</div>
				</div>
			</div>
		</div>
		
	</div>
	
</template>

<script>
	import {banner, songlist, newsong, songUrl, mv} from '@/api/discovery'
	export default{
		name:'discovery',
		data(){
			return{
				//轮播图
				banners:[],
				//推荐歌单
				songlists:[],
				//最新音乐
				newsong: [],
				//歌曲播放url
				songUrl: "",
				//mv
				mv:[]
			}
		},
		created() {
			banner().then(res => {
				this.banners = res.banners;
				console.log("!!!!!!!!!!!!!!!!!!!!!!!!")
				console.log(this.banners)
			})
			songlist().then(res => {
				console.log(res)
				this.songlists = res.result;
			})
			newsong().then( res => {
				this.newsong = res.result;
			})
			mv().then( res => {
				this.mv = res.result;
			})
		},
		methods:{
			playMusic(id){
				songUrl({id:id}).then(res => {
					this.$parent.url = res.data[0].url
				})
			},
			toPlaylist(id){
				this.$router.push('/playlist?id='+id)
			},
			toMV(id){
				this.$router.push('/mv?id='+id)
			}
		}
	}
</script>

<style>
</style>
