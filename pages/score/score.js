let openid = ""
let count = ""
// let passwords = ""
let year = ""
let number = ""
var util = require('../../utils/util.js');
let query = 0//查询教务系统为0  查询数据库为1
// pages/score/score.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avg: "",
    year: "",
    sorceObj: "",
    num_arr: [...Array(100)].map((k, i) => i + 1),
    color: ["#cc0000", "#cc0000", "#cc0000", "#cc0000", "#cc0000", "#cc0000", "#cc6600", "#e6d300", "#00cdcd", "#00e63a", "#00e63a"],
    background: ['linear-gradient(to bottom, rgb(204,0,0), rgb(250, 43, 43));', 'linear-gradient(to bottom, rgb(204,0,0), rgb(250, 43, 43));', 'linear-gradient(to bottom, rgb(204,0,0), rgb(250, 43, 43));', 'linear-gradient(to bottom, rgb(204,0,0), rgb(250, 43, 43));', 'linear-gradient(to bottom, rgb(204,0,0), rgb(250, 43, 43));', 'linear-gradient(to bottom, rgb(204,0,0), rgb(250, 43, 43));', 'linear-gradient(to bottom, rgb(230, 133, 36), rgb(243, 155, 67));', 'linear-gradient(to bottom, rgb(255, 226, 62), rgb(255, 244, 117));', 'linear-gradient(to bottom, rgb(0,205,205), rgb(50, 218, 218));', 'linear-gradient(to bottom, rgb(0,230,58), rgb(21, 255, 79));', 'linear-gradient(to bottom, rgb(0,230,58), rgb(21, 255, 79));']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.loginOr()
  },
  // 查询是否登录
  loginOr() {
    wx.getStorage({
      key: 'login',
      success: (res) => {
        if (res.data == true) {
          this.getTime()
        }
        else {
          wx.showModal({
            title: '提示',
            content: '请登录后使用',
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#000000',
            confirmText: '确定',
            confirmColor: '#3CC51F',
            success: (result) => {
              if (result.confirm) {
                wx.switchTab({
                  url: '/pages/user/user',
                  success: (result) => {

                  },
                  fail: () => { },
                  complete: () => { }
                });
              }
              else {
                wx.switchTab({
                  url: '/pages/user/user',
                  success: (result) => {
                  },
                });
              }
            },
          });
        }
      },
    });
  },
  // 查询时间
  getTime() {
    let time = util.formatTime(new Date());
    let arr_1 = []
    let arr_2 = []
    arr_1 = time.split(" ")
    arr_2 = arr_1[1].split(":")
    let hour = arr_2[0]
    // 8点到22点查询教务系统
    if (hour >= 15 && hour <= 22) {
      // this.getSchool()
      this.getNowYear()
      query = 0

    }
    // 其余时间查询数据库
    else {
      this.getInfo()
      query = 1
    }
  },
  // 查询学年
  getNowYear() {
    wx.cloud.database().collection("all_year").where({ status: true }).get().then(res => {
      year = res.data[0].year
      number = res.data[0].number
    }).then(res => {
      this.getSchool(year)
    })
  },
  getSchool(year) {
    wx.showLoading({
      title: "查询中",
      mask: true,
      success: (result) => {
        wx.cloud.callFunction({
          name: "login"
        }).then(res => {
          openid = res.result.openid
          wx.cloud.callFunction({
            name: "getUserInfo",
            data: {
              openid: openid
            }
          }).then(res => {
            // console.log(res);
            let count = res.result.count
            let pwd = res.result.pwd
            let url = "https://jwxt.gdupt.edu.cn/login!doLogin.action"
            wx.hideLoading();
            wx.request({
              url: url,
              method: 'POST',
              success: (res) => {
                let tempCooike = res.header['Set-Cookie']
                let Tcookie = tempCooike.split(";")
                let cookie = Tcookie[0]
                let headers = {
                  "cookie": cookie,
                  "content-type": "application/x-www-form-urlencoded"
                }
                let data = {
                  "account": count,
                  "pwd": pwd,
                  "verifycode": ""
                }
                wx.request({
                  url: url,
                  data: data,
                  header: headers,
                  method: 'POST',
                  success: (res) => {
                    // console.log(res);
                    if (res.data.status == "n") {
                      wx.showToast({
                        title: '账号已过期',
                        icon: 'none',
                        image: '',
                        duration: 1500,
                        mask: false,
                        success: (result) => {
                          wx.navigateBack({
                            delta: 1
                          });
                        },
                      });
                    }
                    else {
                      let data = {
                        xnxqdm: year,//学年
                        jhlxdm: "",
                        page: "1",
                        rows: "60",
                        sort: "xnxqdm,kcbh,ksxzdm",
                        order: "asc",
                      }
                      wx.request({
                        url: 'https://jwxt.gdupt.edu.cn/xskccjxx!getDataList.action',
                        data: data,
                        header: headers,
                        method: 'POST',
                        success: (res) => {
                          // console.log(res);
                          let sorceObj = res.data.rows
                          sorceObj.sort((a, b) => { return b.zcj - a.zcj })
                          let avg = 0
                          let dataLen = sorceObj.length
                          for (let i = 0; i < dataLen; i++) {
                            avg += Number(sorceObj[i].cjjd)
                          }
                          avg = (avg / dataLen).toFixed(2)
                          this.setData({
                            sorceObj: sorceObj,
                            avg: avg,
                            year: year
                          })
                          wx.cloud.database().collection("sorce").where({ count: count, year: year }).get().then(res => {
                            if (res.data.length == 0) {
                              wx.cloud.database().collection("sorce").add({
                                data: {
                                  sorceObj: sorceObj,
                                  count: count,
                                  year: year
                                }
                              })
                            }
                            else {
                              wx.cloud.database().collection("sorce").where({ count: count, year: year }).update({
                                data: {
                                  sorceObj: sorceObj
                                }
                              })
                            }
                          })
                        },
                      });
                    }
                  },
                });
              },
            });
          })
        })
      },
    });
  },
  // 上一学年
  sub() {
    number = String(Number(number) - 1)
    this.getYear(number)
  },
  // 下一学年
  add() {
    number = String(Number(number) + 1)
    this.getYear(number)
  },
  // 根据number查询学年年份
  getYear(number) {
    // console.log(number);
    wx.cloud.database().collection('all_year').where({ number: number }).get().then(res => {
      year = res.data[0].year
      if (query == 0) {
        this.getSchool(year)
      }
      else {
        this.getScore(count, year)
      }
    })
  },
  // 左右滑动
  touchStart(e) {
    if (e.touches.length == 1) {
      this.setData({
        startX: e.touches[0].clientX
      });
    }
  },
  touchMove(e) {
    if (e.touches.length == 1) {
      var moveX = e.touches[0].clientX;
      var towards = this.data.startX - moveX;
      this.setData({
        towards: towards
      })
    }
  },
  touchEnd(e) {
    let that = this
    if (that.data.towards != '') {
      if (that.data.towards < -100) {//向右
        // console.log('向右')
        that.sub()
      } else if (that.data.towards > 100) {//向左
        // console.log('向左')
        that.add()
      }
    }
    that.setData({
      towards: ''
    })
  },
  // 个人信息
  // getInfo() {
  //   wx.cloud.callFunction({
  //     name: "login"
  //   }).then(res => {
  //     openid = res.result.openid
  //     wx.cloud.database().collection("user_info").where({ openid: openid }).get().then(res => {
  //       // 账号
  //       count = res.data[0].count
  //       let pwd = res.data[0].pwd
  //       // 第一步  密码转码base64
  //       let str = pwd
  //       var c1, c2, c3;
  //       var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  //       var i = 0, len = pwd.length, strin = '';
  //       while (i < len) {
  //         c1 = str.charCodeAt(i++) & 0xff;
  //         if (i == len) {
  //           strin += base64EncodeChars.charAt(c1 >> 2);
  //           strin += base64EncodeChars.charAt((c1 & 0x3) << 4);
  //           strin += "==";
  //           break;
  //         }
  //         c2 = str.charCodeAt(i++);
  //         if (i == len) {
  //           strin += base64EncodeChars.charAt(c1 >> 2);
  //           strin += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
  //           strin += base64EncodeChars.charAt((c2 & 0xF) << 2);
  //           strin += "=";
  //           break;
  //         }
  //         c3 = str.charCodeAt(i++);
  //         strin += base64EncodeChars.charAt(c1 >> 2);
  //         strin += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
  //         strin += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
  //         strin += base64EncodeChars.charAt(c3 & 0x3F)
  //       }
  //       // 密码
  //       passwords = strin
  //       // 查询学年信息
  //       wx.cloud.database().collection("all_year").where({ status: true }).get().then(res => {
  //         // console.log(res);
  //         year = res.data[0].year
  //         number = res.data[0].number
  //         this.getSorce(count, passwords)
  //         this.setData({
  //           year: year
  //         })
  //       })
  //     })
  //   })
  // },
  // // 查询成绩
  // getSorce(count, passwords) {
  //   let url = "https://jwxt.gdupt.edu.cn/login!doLogin.action"
  //   wx.request({
  //     url: url,
  //     method: 'POST',
  //     success: (res) => {
  //       let tempCooike = res.header['Set-Cookie']
  //       let Tcookie = tempCooike.split(";")
  //       let cookie = Tcookie[0]
  //       let headers = {
  //         "cookie": cookie,
  //         "content-type": "application/x-www-form-urlencoded"
  //       }
  //       let data = {
  //         "account": count,
  //         "pwd": passwords,
  //         "verifycode": ""
  //       }
  //       wx.request({
  //         url: url,
  //         data: data,
  //         header: headers,
  //         method: 'POST',
  //         success: (res) => {
  //           // console.log(res);
  //           if (res.data.status == "y") {
  //             let data = {
  //               xnxqdm: year,//学年
  //               jhlxdm: "",
  //               page: "1",
  //               rows: "60",
  //               sort: "xnxqdm,kcbh,ksxzdm",
  //               order: "asc",
  //             }
  //             wx.request({
  //               url: 'https://jwxt.gdupt.edu.cn/xskccjxx!getDataList.action',
  //               data: data,
  //               method: 'POST',
  //               header: headers,
  //               success: (res) => {
  //                 let sorceObj = res.data.rows
  //                 let dataLen = sorceObj.length
  //                 sorceObj.sort((a, b) => { return b.zcj - a.zcj })
  //                 // 平均绩点
  //                 let avg = 0
  //                 for (let i = 0; i < dataLen; i++) {
  //                   avg += Number(sorceObj[i].cjjd)
  //                 }
  //                 avg = (avg / dataLen).toFixed(2)
  //                 wx.hideLoading();
  //                 this.setData({
  //                   sorceObj: sorceObj,
  //                   avg: avg,
  //                   year: year
  //                 })
  //                 wx.cloud.database().collection("sorce").where({ count: count, year: year }).get().then(res => {
  //                   // console.log(res);
  //                   if (res.data.length == 0) {
  //                     wx.cloud.database().collection("sorce").add({
  //                       data: {
  //                         year: year,
  //                         count: count,
  //                         sorceObj: sorceObj
  //                       }
  //                     })
  //                   }
  //                   else {
  //                     wx.cloud.database().collection("sorce").where({ count: count, year: year }).update({
  //                       data: {
  //                         sorceObj: sorceObj
  //                       }
  //                     })
  //                   }
  //                 })
  //               },
  //             });
  //           }
  //           else {
  //             // 尝试查询数据库
  //             wx.cloud.callFunction({
  //               name: "getScore",
  //               data: {
  //                 count: count,
  //                 year: year
  //               }
  //             }).then(res => {
  //               console.log(res);
  //             })
  //           }
  //         },
  //       });
  //     },
  //   });
  // },
  getInfo() {
    wx.cloud.callFunction({
      name: "login"
    }).then(res => {
      openid = res.result.openid
      wx.cloud.database().collection("user_info").where({ openid: openid }).get().then(res => {
        count = res.data[0].count
        wx.cloud.database().collection("all_year").where({ status: true }).get().then(res => {
          year = res.data[0].year
          number = res.data[0].number
          // this
          this.getScore(count, year)
        })
      })
    })
  },
  getScore(count, year) {
    wx.cloud.callFunction({
      name: "getScore",
      data: {
        count: count,
        year: year
      }
    }).then(res => {
      console.log(res);
      if (res.result.data.length == 0) {
        wx.showToast({
          title: '暂无数据',
          icon: 'none',
          image: '',
          duration: 1500,
          mask: false,
          success: (result) => {
            this.setData({
              sorceObj: "",
              avg: "avg",
              year: year
            })
          },
        });
      }
      else {
        let sorceObj = res.result.data[0].sorceObj
        let avg = 0
        let dataLen = sorceObj.length
        sorceObj.sort((a, b) => { return b.zcj - a.zcj })
        for (let i = 0; i < dataLen; i++) {
          avg += Number(sorceObj[i].cjjd)
        }
        avg = (avg / dataLen).toFixed(2)
        this.setData({
          sorceObj: sorceObj,
          avg: avg,
          year: year
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})