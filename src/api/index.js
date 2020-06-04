/*
包含n个接口请求函数的模块
函数的返回值: promise对象
 */
import ajax from './ajax'
// const BASE_URL = 'http://localhost:4000'
const BASE_URL = '/api'

// 用户名密码登陆
export const reqPwdLogin = ({name, pwd}) => ajax(BASE_URL+'/login_pwd', {name, pwd}, 'POST')
// 发送短信验证码
export const reqSendCode = (phone) => ajax(BASE_URL+'/sendcode', {phone})
// 手机号验证码登陆
export const reqSmsLogin = (phone, code) => ajax(BASE_URL+'/login_sms', {phone, code}, 'POST')
// 根据会话获取用户信息
export const reqUserInfo = () => ajax(BASE_URL+'/userinfo')
// 用户登出
export const reqLogout = () => ajax(BASE_URL+'/logout')
//新增来访人员
export const reqAddPerson = ({age}) =>ajax(BASE_URL+'/addperson',{age},'POST')

