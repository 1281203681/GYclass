// 云函数入口文件
const cloud = require('wx-server-sdk')
const rp = require('request-promise')
const md5 = require('md5.js')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  // let url="https://api.ixiaowai.cn/tgrj/index.php"
  let url="https://route.showapi.com/107-32?showapi_appid=851765&showapi_sign=11fd802e7e214fc0bb64a00e811b273c"
  return await rp({
    url: url,
    method: "GET",
  }).then(res => {
    return res
  }).catch(err => {
    return err
  })
}