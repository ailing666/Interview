// 导入处理好的axios副本
import _fetch from "@/utils/request.js"

// 获取短信验证码
function getCode(data) {
  return _fetch({
    url: '/sendsms',
    data,
    method: 'post'
  })
}
// 用户注册
function userRegister(data) {
  return _fetch({
    url: '/register',
    data,
    method: "post"
  })
}
export { getCode, userRegister }
