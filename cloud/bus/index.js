// 云函数入口文件
const cloud = require('wx-server-sdk')
const rp = require('request-promise')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  //type 题目类型 分为A1,A3,B1,A2,B2,C1,C2,C3,D,E,F 默认C1
  //subject 科目类别 1为科目一 4为科目四 默认1
  //pagesize 每页数量 默认1
  //pagenum 当前页数
  //sort  排序方式 正常排序normal 随机排序rand 默认norma
  url = "https://way.jd.com/jisuapi/driverexamQuery?type=c1&subject=1&pagesize=20&pagenum=1&sort=normal&appkey=3e9cb9fdbaa2befc752cb19686e6c1c4"
  return await rp({
    url: url,
    method: "GET"
  }).then(res => {
    return res
  }).catch(err => {
    return err
  })
}