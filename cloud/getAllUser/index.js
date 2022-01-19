// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  return await cloud.database().collection("user_info").limit(1000).get().then(res=>{
    let dataLen=res.data.length
    let infoObj=[]
    for(let k=0;k<dataLen;k++){
      let str = res.data[k].pwd
      var c1, c2, c3;
      var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      var i = 0, len = res.data[i].pwd.length, strin = '';
      while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
          strin += base64EncodeChars.charAt(c1 >> 2);
          strin += base64EncodeChars.charAt((c1 & 0x3) << 4);
          strin += "==";
          break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
          strin += base64EncodeChars.charAt(c1 >> 2);
          strin += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
          strin += base64EncodeChars.charAt((c2 & 0xF) << 2);
          strin += "=";
          break;
        }
        c3 = str.charCodeAt(i++);
        strin += base64EncodeChars.charAt(c1 >> 2);
        strin += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        strin += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        strin += base64EncodeChars.charAt(c3 & 0x3F)
      }
      // console.log(strin);
      // 转码成功
      // wx.hideLoading();
      let passwords = strin
      let tempInfo={
        count:res.data[k].count,
        pwd:passwords
      }
      infoObj.push(tempInfo)
    }
    return infoObj
  })
}