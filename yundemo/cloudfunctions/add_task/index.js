// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const tasks = db.collection('task')
  const users = db.collection('user')

  await tasks.add({
    data: {
      description: event.task,
      is_done: false,
      openid: wxContext.OPENID,
      pub_time: db.serverDate()
    }
  })

  await users.where({
    openid: wxContext.OPENID
  }).update({
    data: {
      task_count: db.command.inc(1)
    }
  })

  return {
  }
}