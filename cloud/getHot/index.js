// 云函数入口文件
const cloud = require('wx-server-sdk')
const rp = require('request-promise')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  url="https://api.vvhan.com/api/wbhot"
  return await rp({
    url:url,
    method:"GET"
  }).then(res=>{
    return res
  }).catch(err=>{
    return err
  })
}