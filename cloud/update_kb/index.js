// // 云函数入口文件
// const cloud = require('wx-server-sdk')
// const rp = require('request-promise')

// cloud.init()

// // 云函数入口函数
// exports.main = async (event, context) => {
//   const wxContext = cloud.getWXContext()
//   let url = "https://jwxt.gdupt.edu.cn/login!doLogin.action"

//   return await cloud.database().collection("user_info").limit(1000).get().then(res => {
//     let dataLen = res.data.length
//     let dataObj = res.data
//     // 删除原有数据--再更新数据
//     for (let index = 0; index < dataLen; index++) {
//       cloud.database().collection("user_kb").where({ count: dataObj[index].count }).remove().then(res => {
//         // 更新数据--登录教务系统--获取cookie--保存数据
//         // 获取账号密码（转译）
//         let pwd = dataObj[index].pwd
//         let str = pwd
//         var c1, c2, c3;
//         var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
//         var i = 0, len = pwd.length, strin = '';
//         while (i < len) {
//           c1 = str.charCodeAt(i++) & 0xff;
//           if (i == len) {
//             strin += base64EncodeChars.charAt(c1 >> 2);
//             strin += base64EncodeChars.charAt((c1 & 0x3) << 4);
//             strin += "==";
//             break;
//           }
//           c2 = str.charCodeAt(i++);
//           if (i == len) {
//             strin += base64EncodeChars.charAt(c1 >> 2);
//             strin += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
//             strin += base64EncodeChars.charAt((c2 & 0xF) << 2);
//             strin += "=";
//             break;
//           }
//           c3 = str.charCodeAt(i++);
//           strin += base64EncodeChars.charAt(c1 >> 2);
//           strin += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
//           strin += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
//           strin += base64EncodeChars.charAt(c3 & 0x3F)
//         }
//         // console.log(strin);
//         // 转码成功
//         // wx.hideLoading();
//         let passwords = strin//密码
//         let count = dataObj[index].count//账号

//         rp({
//           url: url,
//           method: "POST",
//         }).then(res => {
//           let tempCooike = res.header['Set-Cookie']
//           let Tcookie = tempCooike.split(";")
//           let cookie = Tcookie[0]
//           let headers = {
//             "cookie": cookie,
//             "content-type": "application/x-www-form-urlencoded"
//           }
//           let data = {
//             "account": count,
//             "pwd": passwords,
//             "verifycode": ""
//           }
//           rp({
//             url: url,
//             method: "POST",
//             header: headers,
//             data: data,
//           }).then(res => {
//             for (let i = 1; i < 23; i++) {
//               rp({
//                 url: "https://jwxt.gdupt.edu.cn/xsgrkbcx!getKbRq.action?xnxqdm=202101&zc=" + i,
//                 method: "GET",
//                 headers: headers,
//               }).then(res => {
//                 cloud.database().collection("user_kb").add({
//                   data: {
//                     count: count,
//                     i: i,
//                     year: 202101,
//                     kb_year: res.data[1],
//                     kb_data: res.data[0]
//                   }
//                 })
//               })
//             }
//           })
//         })
//       })
//     }
//   })
// }