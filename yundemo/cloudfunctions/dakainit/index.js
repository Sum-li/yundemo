// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const users = db.collection('user')
  const days = db.collection('days')

  await users.where({
    openid: wxContext.OPENID
  }).update({
    data: {
      is_sign: false
    }
  })

  await days.where({
    title: '剩余天数'
  }).update({
    data: {
      onlyday: db.command.inc(-1)
    }
  })
}