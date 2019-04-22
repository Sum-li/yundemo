// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  var iconv = require('iconv-lite')

  const res = await cloud.downloadFile({
    fileID: event.id
  })
  const buffer = res.fileContent
  return iconv.decode(buffer,event.bm)
}