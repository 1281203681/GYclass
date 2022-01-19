// 云函数入口文件
const cloud = require('wx-server-sdk')
const rp = require('request-promise')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  // let url="https://way.jd.com/jisuapi/get?channel=%E5%A4%B4%E6%9D%A1&num=10&start=0&appkey=3e9cb9fdbaa2befc752cb19686e6c1c4"
  return await rp({
    url:url,
    method:"POST"
  }).then(res=>{
    return res
  }).catch(err=>{
    return err
  })
}