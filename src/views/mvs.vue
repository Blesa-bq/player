<template>
	<div class="mvs-container">
		<!-- 筛选MV -->
		<div class="filter-wrap">
			<div class="section-wrap">
				<span class="section-type">地区:</span>
				<ul class="tabs-wrap">
					<li class="tab">
						<span class="title" :class="{active: area == '全部'}" @click="area = '全部'">全部</span>
					</li>
					<li class="tab">
						<span class="title" :class="{active: area == '内地'}" @click="area = '内地'">内地</span>
					</li>
					<li class="tab">
						<span class="title" :class="{active: area == '港台'}" @click="area = '港台'">港台</span>
					</li>
					<li class="tab">
						<span class="title" :class="{active: area == '欧美'}" @click="area = '欧美'">欧美</span>
					</li>
					<li class="tab">
						<span class="title" :class="{active: area == '韩国'}" @click="area = '韩国'">韩国</span>
					</li>
					<li class="tab">
						<span class="title" :class="{active: area == '日本'}" @click="area = '日本'">日本</span>
					</li>
				</ul>
			</div>
			<div class="type-wrap">
				<span class="type-type">类型:</span>
				<ul class="tabs-wrap">
					<li class="tab">
						<span class="title" :class="{active: type == '全部'}" @click="type = '全部'">全部</span>
					</li>
					<li class="tab">
						<span class="title" :class="{active: type == '官方版'}" @click="type = '官方版'">官方版</span>
					</li>
					<li class="tab">
						<span class="title" :class="{active: type == '原声'}" @click="type = '原声'">原声</span>
					</li>
					<li class="tab">
						<span class="title" :class="{active: type == '现场版'}" @click="type = '现场版'">现场版</span>
					</li>
					<li class="tab">
						<span class="title" :class="{active: type == '网易出品'}" @click="type = '网易出品'">网易出品</span>
					</li>
				</ul>
			</div>
			<div class="order-wrap">
				<span class="order-type">排序:</span>
				<ul class="tabs-wrap">
					<li class="tab">
						<span class="title" :class="{active: order == '上升最快'}" @click="order = '上升最快'">上升最快</span>
					</li>
					<li class="tab">
						<span class="title" :class="{active: order == '最热'}" @click="order = '最热'">最热</span>
					</li>
					<li class="tab">
						<span class="title" :class="{active: order == '最新'}" @click="order = '最新'">最新</span>
					</li>
				</ul>
			</div>
		</div>
		<!-- 推荐MV -->
		<!-- page-size:每页显示的数目条数 -->
		<div class="mvs">
			<div class="items">
				<div class="item" v-for="item in mvList" :key="item.id" @click="toMV(item.id)">
					<div class="img-wrap">
						<img :src="item.cover" alt=""/>
						<div class="num-wrap">
							<div class="iconfont icon-play"></div>
							<div class="num">{{item.playCount | formatCount}}</div>
						</div>
					</div>
					<div class="info-wrap">
						<div class="name">{{item.name}}</div>
						<div class="singer">{{item.artistName}}</div>
					</div>
				</div>				
			</div>
			<el-pagination 
			@current-change="handleCurrentChange"
			background
			layout="prev, pager, next"
			:total="total"
			:current-page="page"
			:page-size="12"   
			></el-pagination>
		</div>
	</div>
</template>

<script>
	import { allMvs } from '@/api/mvs'
	export default{
		name:'mvs',
		data() {
			return {
				area:'全部',
				type:'全部',
				order:'上升最快',
				//每页展示的数据
				limit:12,
				//页码
				page:1,
				//总条数
				total:0,
				//mv列表数据
				mvList:[]
			}
		},
		methods:{
			//获取mv数据
			getData(){
				allMvs({
					area:this.area,
					type:this.type,
					order:this.order,
					offset:(this.page - 1) * this.limit
				}).then( res => {
					this.mvList = res.data
					// console.log(this.mvList)
					if(res.count) {
						//console.log(res.count)
						this.total = res.count
					}
				})
			},
			handleCurrentChange(val){
				this.page = val
				this.getData()
			},
			toMV(id){
				this.$router.push('/mv?id='+id)
			}
		},
		created() {
			this.getData()
		},
		watch:{
			//传入回调数组，依次进行调用
			area(){
				this.page = 1
				this.getData()
			},
			type(){
				this.page = 1
				this.getData()
			},
			order(){
				this.page = 1
				this.getData()
			}
		}
	}
</script>

<style>
</style>
