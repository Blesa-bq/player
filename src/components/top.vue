<template>
	<div class="top-container">
		<div class="left-box">
			<!-- 图标 -->
			<div class="icon-wrapper">
				<span @click="$router.replace('/')" class="iconfont icon-home"></span>
				<span class="iconfont icon-sami-select"></span>
				<span class="iconfont icon-full-screen"></span>
			</div>
			<!-- 回退按钮 -->
			<div class="history-wrapper">
				<span @click="$router.go(-1)" class="iconfont icon-arrow-lift"></span>
				<span @click="$router.go(1)" class="iconfont icon-arrow-right"></span>
			</div>
		</div>
		<div class="right-box">
			<!-- 搜索输入框 -->
			<!-- 如果用了封装组件的话，比如element，这个时候使用按键修饰符需要加上.native -->
			<el-input size="small"  prefix-icon="el-icon-search" placeholder="搜索" v-model.trim="query" @keyup.enter.native="toResult">
			</el-input>
		</div>
	</div>
</template>

<script>
	export default{
		name:'top',
		data(){
			return{
				query:''
			}
		},
		methods:{
			toResult(){
				//非空判断
				if(this.query == ''){
					this.$message.warning('请输入内容！')
				} else{
					this.$router.push('/result?keywords='+this.query)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
