// 云函数入口文件
const cloud = require('wx-server-sdk')
const rp = require('request-promise')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let url = "http://agentdockingopac.featurelib.libsou.com/"
  return await rp({
    url:url+event.url,
    data: {},
    header: { 'content-type': 'application/json' },
    method: 'GET',
    dataType: 'json',
    responseType: 'text',
  }).then(res=>{
    return res
  }).catch(err=>{
    return err
  })
}