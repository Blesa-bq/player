<template>
	<div class="playlist-container">
		<div class="top-wrap">
			<div class="img-wrap">
				<img :src="coverImgUrl" alt="" />
			</div>
			<div class="info-wrap">
				<p class="title">{{title}}</p>
				<div class="author-wrap">
					<img class="avatar" :src="avatarUrl" alt="" />
					<span class="name">{{nickname}}</span>
					<span class="time">{{createTime}} 创建</span>
				</div>
				<div class="tag-wrap">
					<span class="title">标签：</span>
					<ul>
						<li v-for="item in tags" :key="item">{{item}}</li>
					</ul>
				</div>
				<div class="desc-wrap">
					<span class="title">简介：</span>
					<span class="desc">{{signature}}</span>
				</div>
			</div>
		</div>
		<el-tabs v-model="activeIndex">
			<el-tab-pane label="歌曲列表" name="1">
				<table class="el-table playlit-table">
					<thead>
						<th></th>
						<th></th>
						<th>音乐标题</th>
						<th>歌手</th>
						<th>专辑</th>
						<th>时长</th>
					</thead>
					<tbody>
						<tr v-for="(item, index) in tableData" :key="item.id">
							<td>{{ index + 1 }}</td>
							<td>
								<div class="img-wrap" @click="playMusic(item.id)">
									<img :src="item.al.picUrl" alt=""/>
									<span class="iconfont icon-play"></span>
								</div>
							</td>
							<td>
								<div class="song-wrap">
									<div class="name-wrap">
										<span>{{item.name}}</span>
										<span v-if="item.mv != 0" @click="toMV(item.mv)" class="iconfont icon-mv"></span>
									</div>
									<span> {{item.subTitle}} </span>
								</div>
							</td>
							<td>{{item.ar[0].name}}</td>
							<td>{{item.al.name}}</td>
							<td>{{item.dt|formatDuration}}</td>
						</tr>
					</tbody>
				</table>
			</el-tab-pane>
			<el-tab-pane :label="`评论(${total + hotComments.length })`" name="2">
				<!-- 热门评论 -->
				<div v-if="hotComments.length != 0" class="comment-wrap">
					<p class="title">
						热门评论<span class="number">({{hotComments.length}})</span>
					</p>
					<div class="item" v-for="item in hotComments" :key="item.commentId">
						<div class="icon-wrap">
							<img :src="item.user.avatarUrl" alt="" />
						</div>
						<div class="content-wrap">
							<div class="content">
								<span class="name">{{item.user.nickname}}：</span>
								<span class="comment">{{item.content}}</span>
							</div>
							<div class="reply-content" v-if="item.beReplied.length != 0">
								<span class="name">{{item.beReplied[0].user.nickname}}：</span>
								<span class="comment">{{item.beReplied[0].content}}</span>
							</div>
							<div class="date">{{item.time | formatTime}}</div>
						</div>
					</div>
				</div>
				<!-- 最新评论 -->
				<div class="comment-wrap" v-if="comments.length != 0">
					<p class="title">
						最新评论<span class="number">({{total}})</span>
					</p>
					<div class="item" v-for="item in comments" :key="item.commentId">
						<div class="icon-wrap">
							<img :src="item.user.avatarUrl" alt="" />
						</div>
						<div class="content-wrap">
							<div class="content">
								<span class="name">{{item.user.nickname}}：</span>
								<span class="content">{{item.content}}：</span>
							</div>
							<div class="reply-content" v-if="item.beReplied.length != 0">
								<span class="name">{{item.beReplied[0].user.nickname}}：</span>
								<span class="content">{{item.beReplied[0].content}}：</span>
							</div>
							<div class="date">{{item.time | formatTime}}</div>
						</div>
					</div>
				</div>
				<!-- 分页器 -->
				<el-pagination
				@current-change="handleCurrentChange"
				background
				layout="prev, pager, next"
				:total="total"
				:current-page="page"
				:page-size="5"
				></el-pagination>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	import { playlistDetail, hotComments, listComments } from '@/api/playlist'
	import { songUrl } from '@/api/discovery'
	import moment from 'moment'
	export default{
		name:'playlist',
		data(){
			return {
				activeIndex:'1',
				tableData:[],
				title:'',
				avatarUrl:'',
				signature:'',
				coverImgUrl:'',
				tags:[],
				nickname:'',
				createTime:'',
				//热门评论
				hotComments:[],
				//普通评论
				comments:[],
				//每页数据
				limit:20,
				//页码
				page:1,
				//总条数
				total:0
			}
		},		
		methods:{
			getPlaylistInfo(){
				const { id } = this.$route.query
				playlistDetail({
					id
				}).then( res => {
					this.title = res.playlist.name
					// console.log(res.playlist)
					this.avatarUrl = res.playlist.creator.avatarUrl
					this.coverImgUrl = res.playlist.coverImgUrl
					this.signature = res.playlist.creator.signature
					this.nickname = res.playlist.creator.nickname
					this.tags = res.playlist.tags
					this.tableData = res.playlist.tracks
					this.createTime = moment(res.playlist.createTime).format('YYYY-MM-DD')
				})
			},
			//获取热门评论
			getHotComments(){
				const { id } = this.$route.query
				hotComments({
					id
				}).then( res => {
					this.hotComments = res.hotComments
					console.log(this.hotComments)
				})
			},
			//获取最新评论
			getComments(){
				const { id } = this.$route.query
				listComments({
					id,
					offset:(this.page - 1) * 5
				}).then( res => {
					this.total = res.total
					this.comments = res.comments
				})
			},
			toMV(id){
				this.$router.push('/mv?id='+id)
			},
			handleCurrentChange(val){
				this.page = val
				this.getComments()
			},
			playMusic(id){
				songUrl({
					id
				}).then( res => {
					this.$parent.url = res.data[0].url
				})
			}
		},
		created(){
			this.getPlaylistInfo()
			this.getHotComments()
			this.getComments()
		}
	}
</script>

<style>
</style>
