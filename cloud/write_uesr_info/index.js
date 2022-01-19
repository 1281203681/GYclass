// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  return await cloud.database().collection("user_info").add({
    data: {
      count: event.count,
      pwd: event.pwd,
      openid:event.openid
    }
  })
}