<template>
	<div class="index-container">
		<div class="nav">
			<ul>
				<li>
					<!-- 添加路由链接  最终会被解析成a标签 -->
					<router-link to="/discovery">
						<span class="iconfont icon-find-music"></span>
						发现音乐
					</router-link>
				</li>
				<li>
					<!-- 添加路由链接 -->
					<router-link to="/playlists">
						<span class="iconfont icon-music-list"></span>
						推荐歌单
					</router-link>
				</li>
				<li>
					<!-- 添加路由链接 -->
					<router-link to="/songs">
						<span class="iconfont icon-music"></span>
						最新音乐
					</router-link>
				</li>
				<li>
					<!-- 添加路由链接 -->
					<router-link to="/mvs">
						<span class="iconfont icon-mv"></span>
						最新MV
					</router-link>
				</li>
			</ul>
		</div>
		<div class="main">
			<!-- 路由填充位，通过路由规则匹配到的组件将会被渲染到<router-view></router-view>所在的位置 -->
			<router-view></router-view>
		</div>
		<div class="player">
			<audio controls :src="url" autoplay></audio>
		</div>
	</div>
</template>

<script>
	export default{
		name:'index',
		data(){
			return{
				url:''
			}
		}
	}
</script>

<style lang="scss">
</style>
