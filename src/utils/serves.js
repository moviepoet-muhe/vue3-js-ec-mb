import axios from "axios"

/*
    development 开发环境
    production 生产环境
*/

const baseURL = import.meta.env.MODE === 'development' ? 'http://113.45.10.129:3000' : 'https://www.wj.com'

const serves = axios.create({
  baseURL,  // 项目的基地址
  timeout: 5000, // 请求超时时间
})

// 添加请求拦截器
serves.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  // 例如：添加 token 
  return config;
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
serves.interceptors.response.use(response => {
  // 对响应数据做点什么
  // 例如：axios 返回的数据经过包装的，可以在这里把需要的数据拿出来再返回
  return response.data;
}, error => {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default serves