// 云函数入口文件
const cloud = require('wx-server-sdk')
const rp = require('request-promise')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let url="https://s.weibo.com/ajax/topsuggest.php?key="+event.content+"&_k=1639291469801&_t=1&outjson=1&uid=0"
  return await rp({
    url: url,
    method: "GET",
  }).then(res => {
    return res
  }).catch(err => {
    return err
  })
}