// 1.导入axios
import axios from 'axios'

// 2.创建axios副本
let _fecth = axios.create({
  baseurl: process.env.VUE_APP_URL
})

// 3.添加请求拦截器
_fecth.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 4.添加响应拦截器
_fecth.interceptors.response.use(function (response) {
  // 对响应数据做点什么:去掉一层data
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

//5.暴露axios副本
export default _fecth 