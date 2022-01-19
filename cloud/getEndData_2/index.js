// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  return await cloud.database().collection("guang_hua_room").limit(1000).get().then(res=>{
    let dataLen=res.data.length
    let shifArr=[]
    for(let i=0;i<dataLen;i++){
      if(res.data[i].detail.length==0){
        shifArr.push(res.data[i].id)
      }
    }
    for(let j=0;j<shifArr.length;j++){
      cloud.database().collection("guang_hua_room").where({id:shifArr[j]}).remove()
    }
  })
}