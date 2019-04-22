// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  var count = 0
  await db.collection('user').where({
    openid: wxContext.OPENID
  }).get().then(res =>{
    if(res.data[0]){
      count = res.data[0].task_count
    }
  })

  return {
    count:count
  }
}