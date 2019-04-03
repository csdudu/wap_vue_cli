//ajax控制模块，被common.js调用

import axios from 'axios';

// const ROOT_PROD = "http://www.lingsitech.net/api";
const ROOT_PROD = "https://easy-mock.com/mock/5c70d363d1144c6946b8bf81/smart_cloud";
// const TOKEN = window.localStorage.getItem("token");
const TOKEN = "vukIYOFoWurjnylmEpJv";

const api_server = axios.create({
  baseURL: ROOT_PROD,
  timeout: 8000,
});

const my_token = TOKEN || "";
api_server.defaults.headers = {
    token: my_token,
    post:{
        'Content-Type':'application/json;charset=UTF-8'
        // 'Content-Type':'application/x-www-form-urlencoded'
    }
};


//请求拦截器
api_server.interceptors.request.use(function (config) {
    if (config.method == 'post') {
        config.data = JSON.stringify(config.data)
        // console.log('请求地址' + config.url, '请求参数', JSON.parse(config.data))
    }
    return config
}, function (error) {
    console.log("错误的传参")
    return Promise.reject(error)
})

//响应拦截器
api_server.interceptors.response.use(function (res) {

    switch(res.code)
    {
        case 400:   // 用户发出的请求有错误
            return Promise.reject(res.data.msg);
            break;

        case 401:    //表示用户没有权限（令牌、用户名、密码错误）

          return Promise.reject("获取信息失败!");
          break;

        case 403:
          console.log('403');
          return Promise.reject("需要登录!");
          break;

        case 404:    //用户发出的请求针对的是不存在的记录
          console.log('error',res.data);
          break;

        case 410:    //购物提交时发生的错误，退回到/cart状态
          return Promise.reject(res.data.mode);
          break;

        case 500:
          return Promise.reject(res.data.msg);
          break;

        default:
            return res.data.data;
    }
  
}, function (error) {
    if (error.message.indexOf('timeout') >= 0) {
        // bus.$emit('error',"数据无法获取");
        return Promise.reject('请求超时')
    }
    else if (error.message.indexOf('Network Error') >= 0) {
        // bus.$emit('error',"发生连接错误");
        return Promise.reject('发生连接错误')
    }
    else if (error.message.indexOf('404') >= 0) {
        // bus.$emit('error',"数据接口失败");
        return Promise.reject('数据接口失败')
    }
    // bus.$emit('error',"网络不明问题");
    return Promise.reject('网络不明问题')
});

export default api_server
