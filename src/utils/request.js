import axios from 'axios'

const request = axios.create({
	baseURL:'https://autumnfish.cn',
	timeout:30000
})

//添加请求拦截器
request.interceptors.request.use(function(config){
	window.console.log('请求拦截器----'+ config)
	if(!config.params){
		config.params = {}
	}
	config.params.t = Date.now()
	//在发送请求之前做某事
	return config;
	}, function (error){
		//处理响应的错误信息
		return Promise.reject(error);
})


//添加响应拦截器
request.interceptors.response.use(function(response){
	//对返回的数据进行处理
	window.console.log('响应拦截器-----'+ response.data)
	return response.data;
	
	}, function (error){
		//处理响应的错误信息
		return Promise.reject(error);
	
})

export default request