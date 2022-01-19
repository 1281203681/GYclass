// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  return await cloud.database().collection("xi_cheng_room").limit(1000).get().then(res=>{
    let dataLen=res.data.length
    let shiftArr=[]
    for(let i=0;i<dataLen;i++){
      if(res.data[i].detail.length==0){
        shiftArr.push(res.data[i].id)
      }
    }
    // return shiftArr
    let shiftLen=shiftArr.length
    for(let j=0;j<shiftLen;j++){
      cloud.database().collection("xi_cheng_room").where({id:shiftArr[j]}).remove()
    }
  })
}