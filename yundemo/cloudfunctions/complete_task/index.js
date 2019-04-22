// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const tasks = db.collection('task')
  const users = db.collection('user')
  var is_done

  await tasks.doc(event.taskid).update({
    data: {
      is_done: true
    }
  }).then(res =>{
    is_done = res.stats.updated
  })

  if(is_done==1){
    await users.where({
      openid: wxContext.OPENID
    }).update({
      data: {
        task_count: db.command.inc(-1)
      }
    })
  }
  return {
  }
}