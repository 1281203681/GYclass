// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  return await cloud.database().collection("vip_card").where({ card_status: 0 }).limit(1000).get().then(res=>{
    let cardId=res.data[0]._id
    cloud.database().collection("vip_card").where({_id:cardId}).update({
      data:{
        card_status:1,
        card_user:event.count
      }
    })
  })
}