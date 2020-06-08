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
//查询来访人员数据
export const reqQueryPerson = (obj) => ajax(BASE_URL+'/person_query',obj,'POST')
//新增来访人员
export const reqAddPerson = (obj) => ajax(BASE_URL+'/person_add',obj,'POST')
//删除来访人员
export const reqDelPerson = (obj)=>ajax(BASE_URL+'/person_del',obj,'POST')
//编辑来访人员
export const reqUpdatePerson = (obj)=>ajax(BASE_URL+'/person_update',obj,'POST')
//查询工作安排表
export const reqQueryArrange = (obj) =>ajax(BASE_URL+'/arrange_query',obj,'POST')
//查询员工信息表
export const reqQueryEmployee = (obj) =>ajax(BASE_URL+'/employee_query',obj,'POST')
//新增建议反馈
export const reqAddFeedback = (obj) => ajax(BASE_URL+'/feedback_add',obj,'POST')
