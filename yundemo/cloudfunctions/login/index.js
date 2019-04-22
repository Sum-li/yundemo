// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const users = db.collection('user')
  var is_host = 0

  if (wxContext.OPENID == 'oS7jE5A6JcWNb0gH8YU6zpLO_UZ4') {
    is_host = 1
  } else if (wxContext.OPENID == 'oS7jE5J65Y26t5LpP7IKuitPqqc4') {
    is_host = 1
  } else if (wxContext.OPENID == 'oS7jE5JMjmrWWnyYKtMC1iFFVGnw') {
    is_host = 1
  }



  var user
  await users.where({
    openid: wxContext.OPENID
  }).get().then(res =>{
    user = res.data
  })

  if(user==false){
    await users.add({
      data: {
        openid: wxContext.OPENID,
        sign_times: 0,
        is_sign: false,
        task_count: 0,
        sign_times:0
      }
    })
  }

  if (user==false){
    return {
      task_counts: 0,
      is_host: is_host
    }
  }else{
    return {
      task_counts: user[0].task_count,
      is_host: is_host
    }
  }
}