module.exports = {
	//打包之后的地址，使用相对路径
	publicPath: './',
	devServer:{
		port:8000
	},
	productionSourceMap: false,
	configureWebpack:{
		externals:
			process.env.NODE_ENV === 'production'
				? {
					vue: 'Vue',
					'vue-router': 'VueRouter',
					vuex: 'Vuex',
					axios: 'axios'
				}
			: {}
	}
	
};