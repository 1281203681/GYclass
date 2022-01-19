// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  return event.kb_arr
  // return await cloud.database().collection("user_kb").where({count: event.count }).update({
  //   data:{
  //     kb_arr: event.kb_arr
  //   }
  // })
}