// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  // return await cloud.database().collection("vip_card").limit(1000).get().then(res => {
  //   let dataLen = res.data.length
  //   for (let i = 0; i < dataLen; i++) {
  //     if(res.data[i].card_user)
  //   }
  // })
  return await cloud.database().collection("vip_card").where({ card_user: event.count }).get()
}