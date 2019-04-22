// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const days = db.collection('days')
  const user = db.collection('user')
  var task = db.collection('task')
  var sign_time
  var onlyday
  var is_sign
  var task1
  var task2

  await user.where({
    openid: wxContext.OPENID
  }).get().then(res =>{
    sign_time = res.data[0].sign_times
    is_sign = res.data[0].is_sign
  })

  await days.where({
    title: '剩余天数'
  }).get().then(res =>{
    onlyday = res.data[0].onlyday
  })

  await task.where({
    openid: wxContext.OPENID,
    is_done: false
  }).orderBy('pub_time', 'desc').field({
    description: true
  }).get().then(res =>{
    task1 = res.data
  })

  await task.where({
    openid: wxContext.OPENID,
    is_done: true
  }).orderBy('pub_time', 'desc').field({
    description: true
  }).get().then(res =>{
    task2 = res.data
  })

  return {
    rough: task1,
    complete: task2,
    is_sign: is_sign,
    sign_time: sign_time,
    onlyday: onlyday
  }
}