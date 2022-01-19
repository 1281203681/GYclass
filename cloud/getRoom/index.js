// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let id = event.id
  let day = event.day
  let week = event.week
  if (id == 0) {
    return await cloud.database().collection("xi_cheng_room").where({ xq: day, week: week }).limit(1000).get()
  }
  else if(id==1){
    return await cloud.database().collection("guan_du_room").where({xq: day, week: week}).limit(1000).get()
  }
  else{
    return await cloud.database().collection("guang_hua_room").where({xq: day, week: week}).limit(1000).get()
  }
}