/*
包含n个接口请求函数的模块
函数的返回值: promise对象
 */
import ajax from './ajax'
const BASE_URL = '/api'

// 用户名密码登陆
export const reqPwdLogin = ({
    mineID,
    pwd
}) => ajax(BASE_URL + '/login_pwd', {
    mineID,
    pwd
}, 'POST')
// 管理员密码登陆
export const reqAdminLogin = ({
    adminName,
    adminPwd
}) => ajax(BASE_URL + '/login_admin', {
    adminName,
    adminPwd
}, 'POST')
// 根据会话获取用户信息
export const reqUserInfo = () => ajax(BASE_URL + '/userinfo')
// 用户登出
export const reqLogout = () => ajax(BASE_URL + '/logout')
// 按条件查询
export const reqConditionsQuery = (obj) => ajax(BASE_URL + '/person_conditions', obj, 'POST')
//查询来访人员数据
export const reqQueryPerson = (obj) => ajax(BASE_URL + '/person_query', obj, 'POST')
//新增来访人员
export const reqAddPerson = (obj) => ajax(BASE_URL + '/person_add', obj, 'POST')
//删除来访人员
export const reqDelPerson = (obj) => ajax(BASE_URL + '/person_del', obj, 'POST')
//编辑来访人员
export const reqUpdatePerson = (obj) => ajax(BASE_URL + '/person_update', obj, 'POST')
//查询工作安排表
export const reqQueryArrange = (obj) => ajax(BASE_URL + '/arrange_query', obj, 'POST')
//新增建议反馈
export const reqAddFeedback = (obj) => ajax(BASE_URL + '/feedback_add', obj, 'POST')
//查询我的信息
export const reqQueryMine = (obj) => ajax(BASE_URL + '/mine_query', obj, 'POST')
//查询工作日记
export const reqQueryDiary = (obj) => ajax(BASE_URL + '/diary_query', obj, 'POST')
//查询预约数据
export const reqQueryOrder = (obj) => ajax(BASE_URL + '/order_query', obj, 'POST')
//发布公告
export const reqAddAnnouncement = (obj) => ajax(BASE_URL + '/announcement_add', obj, 'POST')
//写日记
export const reqAddDiary = (obj) => ajax(BASE_URL + '/diary_add', obj, 'POST')
//健康打卡
export const reqAddHealth = (obj) => ajax(BASE_URL + '/health_add', obj, 'POST')
//删除预约
export const reqDelOrder = (obj) => ajax(BASE_URL + '/order_del', obj, 'POST')
// 按手机查询预约
export const reqOrderConditionsQuery = (obj) => ajax(BASE_URL + '/order_conditions', obj, 'POST')
//删除公告
export const reqDelAnnouncement = (obj) => ajax(BASE_URL + '/announcement_del', obj, 'POST')
//新增用户
export const reqAddUser = (obj) => ajax(BASE_URL + '/user_add', obj, 'POST')
//查询用户
export const reqQueryUser = (obj) => ajax(BASE_URL + '/user_query', obj, 'POST')
//删除用户
export const reqDelUser = (obj) => ajax(BASE_URL + '/user_del', obj, 'POST')
//查询员工信息
export const reqInfConditionsQuery = (obj) => ajax(BASE_URL + '/inf_conditions', obj, 'POST')
//编辑员工信息
export const reqUpdateInf = (obj) => ajax(BASE_URL + '/inf_update', obj, 'POST')
// 工作安排条件查询
export const reqWorkConditionsQuery = (obj) => ajax(BASE_URL + '/work_conditions', obj, 'POST')
//工作安排
export const reqQueryWork = (obj) => ajax(BASE_URL + '/work_query', obj, 'POST')
//新增工作
export const reqAddWork = (obj) => ajax(BASE_URL + '/work_add', obj, 'POST')
//查询健康打卡
export const reqQueryHealth = (obj) => ajax(BASE_URL + '/health_query', obj, 'POST')
//查询意见反馈
export const reqQueryFeedback = (obj) => ajax(BASE_URL + '/feedback_query', obj, 'POST')
//查询公告
export const reqQueryAnnouncement = (obj) => ajax(BASE_URL + '/announcement_query', obj, 'POST')
//线上预约
export const reqAddOrder = (obj) => ajax(BASE_URL + '/order_add', obj, 'POST')
// 发送短信验证码
export const reqSendCode = (orderPhone) => ajax(BASE_URL + '/sendcode', {
    orderPhone
})
// 手机号验证码登陆
export const reqSmsLogin = (orderPhone, code) => ajax(BASE_URL + '/login_sms', {
    orderPhone,
    code
}, 'POST')