// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  return await cloud.database().collection("user_kb").where({ _openid: event.openid }).get()
    .then(res => {
      let dataLen = res.data.length
      for (let i = 0; i < dataLen; i++) {
        for (let j = 0; j < 6; j++) {
          if (res.data[i].kb_year[j].rq == event.date) {
            return res.data[i].kb_data
          }
        }
      }
    })
}