// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const users = db.collection('user')

  await users.where({
    openid: wxContext.OPENID,
    is_sign: false
}).update({
      data: {
        is_sign: true,
        sign_times: db.command.inc(1)
      }
  })
  return {
  }
}