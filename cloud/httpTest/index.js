// 云函数入口文件
const cloud = require('wx-server-sdk')
const rp = require('request-promise')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let url = "http://agentdockingopac.featurelib.libsou.com/showhome/search/showSearch?schoolId=665"
  return await rp({
    url: "http://agentdockingopac.featurelib.libsou.com/showhome/searchlist/opacSearchList?search=" + encodeURIComponent(event.search) + "&xc=3&schoolId=665&centerDomain=&searchtype=" + event.value + '&page=' + event.count,
    data: {},
    header: { 'content-type': 'application/json' },
    method: 'GET',
    dataType: 'json',
    responseType: 'text',
  }).then(res => {
    return res
  }).catch(err => {
    return err
  })
}