<template>
	<div class="mv-container">
		<div class="mv-wrap">
			<h3 class="title">mv详情</h3>
			<!-- mv -->
			<div class="video-wrap">
				<video controls :src="mvUrl"></video>
			</div>
			<!-- mv信息 -->
			<div class="info-wrap">
				<!-- 歌手头像、名称 -->
				<div class="singer-info">
					<div class="avatar-wrap">
						<img :src="artistCover" alt=""/>
					</div>
					<span class="name">{{artistName}}</span>
				</div>
				<div class="mv-info">
					<h2 class="title">{{mvName}}</h2>
					<span class="date">发布：{{publishTime}}</span>
					<span class="number">播放：{{playCount}}</span>
					<p class="desc">{{desc}}</p>
				</div>
			</div>
			<!-- 热门评论 -->
			<div class="comment-wrap" v-if="hotComments.length != 0">
				<p class="title">
					热门评论<span class="number">({{hotComments.length}})</span>
				</p>
				<!-- <div class="comments-wrap" v-for="item in hotComments" :key="item.commentId"> -->
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
				<!-- </div> -->
			</div>
			
			<!-- 最新评论 -->
			<div class="comment-wrap" v-if="comments.length != 0">
				<p class="title">
					最新评论<span class="number">({{total}})</span>
				</p>
				<div class="item" v-for="item in comments" :key="item.commentId">
					<div class="icon-wrap">
						<img :src="item.user.avatarUrl" alt="" >
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
			
			<!-- 分页器 -->
			<el-pagination
			@current-change = "handleCurrentChange"
			background
			layout="prev, pager ,next"
			:total="total"
			:current-page="page"
			:page-size="5"
			></el-pagination>
		</div>
		<div class="mv-recommend">
			<h3 class="title">相关推荐</h3>
			<div class="mvs">
				<div class="items">
					<div class="item" v-for="item in simiMV" :key="item.id" @click="toMV(item.id)">
						<div class="img-wrap">
							<img :src="item.cover" alt="" />
							<span class="iconfont icon-play"></span>
							<div class="num-wrap">
								<div class="iconfont icon-play"></div>
								<div class="num">{{item.playCount | formatCount}}</div>
							</div>
							<span class="time">{{item.duration | formatDuration}}</span>
						</div>
						<div class="info-wrap">
							<div class="name">{{item.name}}</div>
							<div class="singer">{{item.artistName}}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mvUrl, simiMV, mvComments, mvDetail, artistInfo} from '@/api/mv'
	export default {
		name:'mv',
		data(){
			return {
				//mv地址
				mvUrl:'',
				//总条数
				total:0,
				//页码数
				page:1,
				//相似mv
				simiMV:[],
				//热门评论
				hotComments:[],
				//普通评论
				comments:[],
				//mv名字
				mvName:'',
				//播放次数
				playCount:'',
				//发布时间
				publishTime:'',
				//描述
				desc:'',
				//歌手名
				artistName:'',
				//封面
				artistCover:''
				
			}
		},
		methods:{
			handleCurrentChange(val){
				this.page = val
				this.getComments()
			},
			toMV(id){
				this.$router.push('/mv?id='+id)
			},
			getComments(){
				const { id } = this.$route.query
				mvComments({
					id,
					offset:(this.page - 1)*5
				}).then( res => {
					console.log(res)
					if(res.hotComments) {
						this.hotComments = res.hotComments
					}
					this.comments = res.comments
					this.total = res.total
				})
			},
			getInfo(){
				//获取mvUrl
				const { id } = this.$route.query
				mvUrl({ id }).then( res => {
					this.mvUrl = res.data.url
				})
				//获取评论
				this.getComments()
				//获取mv详情
				mvDetail({ mvid:id }).then( res => {
					this.mvName = res.data.name
					this.playCount = res.data.playCount
					this.publishTime = res.data.publishTime
					this.desc = res.data.desc
					//获取歌手信息
					artistInfo({
						artistId:res.data.artistId
					}).then( res => {
						//歌手名
						this.artistName = res.artist.name
						//歌手头像
						this.artistCover = res.artist.picUrl
					})
				})
				//获取相关MV
				simiMV({
					mvid:id
				}).then( res => {
					this.simiMV = res.mvs
				})
			}
		},
		watch:{
			'$route.query.id'(){
				this.page = 1
				this.getInfo()
			}
		},
		created(){
			this.getInfo()
		}
	}
</script>

<style>
</style>
