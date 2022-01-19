// pages/task/task.js
let openid = ""
let year = ""
let number = ""
let count = ""
let passwords = ""
var util = require('../../utils/util.js');
let query = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num_arr: [...Array(100)].map((k, i) => i + 1),
    taskObj: "",
    year: ""

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
  loginOr(){
    wx.getStorage({
      key: 'login',
      success: (res)=>{
        // console.log(res);
        if(res.data==true){
          this.getTime()
        }
        else{
          wx.showModal({
            title: '提示',
            content: '请登录后使用',
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#000000',
            confirmText: '确定',
            confirmColor: '#3CC51F',
            success: (result) => {
              if(result.confirm){
                wx.switchTab({
                  url: '/pages/user/user',
                  success: (result)=>{
                    
                  },
                });
              }
              else{
                wx.switchTab({
                  url: '/pages/user/user',
                  success: (result)=>{
                    
                  },
                  fail: ()=>{},
                  complete: ()=>{}
                });
              }
            },
          });
        }
      },
    });
  },
  getTime() {
    let time = util.formatTime(new Date());
    let arr_1 = []
    let arr_2 = []
    arr_1 = time.split(" ")
    arr_2 = arr_1[1].split(":")
    let hour = arr_2[0]
    // 8点到22点查询教务系统
    if (hour >= 8 && hour <= 22) {
      this.getNowYear()
      query = 0
    }
    // 其余时间查询数据库
    else {
      this.getInfo()
      query = 1
    }
  },
  // 查询当前学年
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
        }).then(res => {
          wx.cloud.callFunction({
            name: "getUserInfo",
            data: {
              openid: openid
            }
          }).then(res => {
            // console.log(res);
            let count = res.result.count
            let pwd = res.result.pwd
            wx.hideLoading();
            let url = "https://jwxt.gdupt.edu.cn/login!doLogin.action"
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
                    if (res.data.status == "n") {
                      wx.showToast({
                        title: '账号已过期',
                        icon: 'none',
                        image: '',
                        duration: 1500,
                        mask: false,
                        success: (res) => {
                          wx.navigateBack({
                            delta: 1
                          });
                        },
                      });
                    }
                    else {
                      let data = {
                        xnxqdm: year,
                        kcdldm: "",
                        kcfldm: "",
                        kcmc: "",
                        page: "1",
                        rows: "60",
                        sort: "kcbh",
                        order: "asc",
                      }
                      wx.request({
                        url: 'https://jwxt.gdupt.edu.cn/xskktzd!getDataList.action',
                        data: data,
                        header: headers,
                        method: 'POST',
                        success: (res) => {
                          // console.log(res);
                          let taskObj = res.data.rows
                          this.setData({
                            taskObj: taskObj,
                            year: year
                          })
                          wx.cloud.database().collection("task").where({ count: count, year: year }).get().then(res => {
                            if (res.data.length == 0) {
                              wx.cloud.database().collection("task").add({
                                data: {
                                  taskObj: taskObj,
                                  year: year,
                                  count: count
                                }
                              }).then(res => {

                              })
                            }
                            else {
                              wx.cloud.database().collection("task").where({ count: count, year: year }).update({
                                data: {
                                  taskObj: taskObj
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


  // // 查询上课任务
  // getTask(count, passwords) {
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
  //         method: "POST",
  //         header: headers,
  //         data: data,
  //         success: (res) => {
  //           // 密码正确  登录成功
  //           if (res.data.status == "y") {
  //             let data = {
  //               xnxqdm: year,
  //               kcdldm: "",
  //               kcfldm: "",
  //               kcmc: "",
  //               page: "1",
  //               rows: "60",
  //               sort: "kcbh",
  //               order: "asc",
  //             }
  //             wx.request({
  //               url: 'https://jwxt.gdupt.edu.cn/xskktzd!getDataList.action',
  //               data: data,
  //               header: headers,
  //               method: 'POST',
  //               dataType: 'json',
  //               responseType: 'text',
  //               success: (res) => {
  //                 // console.log(res);
  //                 let taskObj = res.data.rows
  //                 this.setData({
  //                   taskObj: res.data.rows,
  //                   year: year
  //                 })
  //                 wx.cloud.database().collection("task").where({ count: count, year: year }).get().then(res => {
  //                   if (res.data.length == 0) {
  //                     wx.cloud.database().collection("task").add({
  //                       data: {
  //                         count: count,
  //                         year: year
  //                       }
  //                     }).then(res => {
  //                       wx.cloud.database().collection("task").where({ count: count, year: year }).update({
  //                         data: {
  //                           taskObj: taskObj
  //                         }
  //                       }).then(res => {
  //                         wx.hideLoading();
  //                       })
  //                     })
  //                   }
  //                   else {
  //                     wx.cloud.database().collection("task").where({ count: count, year: year }).update({
  //                       data: {
  //                         taskObj: taskObj
  //                       }
  //                     }).then(res => {
  //                       wx.hideLoading();
  //                     })
  //                   }
  //                 })
  //               },
  //             });
  //           }
  //           // 密码错误  登录失败
  //           else if (res.data.status == "n") {
  //             wx.showModal({
  //               title: '提示',
  //               content: '账号或密码失效，请重新登录',
  //               showCancel: true,
  //               cancelText: '取消',
  //               cancelColor: '#000000',
  //               confirmText: '确定',
  //               confirmColor: '#3CC51F',
  //               success: (result) => {
  //                 if (result.confirm) {
  //                   wx.hideLoading();
  //                 }
  //               },
  //             });
  //           }
  //           // 其它错误
  //           else {
  //             wx.showModal({
  //               title: '提示',
  //               content: '校园服务器错误，请在教务系统开放时间重试',
  //               showCancel: true,
  //               cancelText: '取消',
  //               cancelColor: '#000000',
  //               confirmText: '确定',
  //               confirmColor: '#3CC51F',
  //               success: (result) => {
  //                 if (result.confirm) {
  //                   wx.hideLoading();
  //                 }
  //               },
  //             });
  //           }
  //         },
  //       });
  //     },
  //   });
  // },
  // // 查询学生信息
  // getInfo() {
  //   wx.cloud.callFunction({
  //     name: "login"
  //   }).then(res => {
  //     openid = res.result.openid
  //     wx.cloud.database().collection("user_info").where({ openid: openid }).get().then(res => {
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
  //       passwords = strin
  //       //  查询学期学年
  //       wx.cloud.database().collection("all_year").where({ status: true }).get().then(res => {
  //         // console.log(res);
  //         year = res.data[0].year
  //         number = res.data[0].number
  //         this.getTask(count, passwords)
  //       })
  //     })
  //   })
  // },
  // 使用number查询年份并更新数据
  userNumber(number) {
    wx.cloud.database().collection("all_year").where({ number: number }).get().then(res => {
      year = res.data[0].year
      if (query == 0) {
        this.getSchool(year)
      }
      else {
        this.getTask(count, year)
      }
    })
  },
  sub() {
    number = String(Number(number) - 1)
    this.userNumber(number)
  },
  add() {
    number = String(Number(number) + 1)
    this.userNumber(number)
  },
  // 左右滑动
  touchStart(e) {
    // console.log(e);
    // console.log(e.touches[0].clientX);
    if (e.touches.length == 1) {
      this.setData({
        startX: e.touches[0].clientX
      });
    }
  },
  touchMove(e) {
    // console.log(e);
    // console.log(e.touches[0].clientX);
    if (e.touches.length == 1) {
      var moveX = e.touches[0].clientX;
      var towards = this.data.startX - moveX;
      this.setData({
        towards: towards
      })
    }
  },
  touchEnd(e) {
    // console.log(e);
    console.log(this.data.towards);
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
          this.getTask(count, year)
        })
      })
    })
  },
  // getTask
  getTask(count, year) {
    wx.cloud.callFunction({
      name: "getTask",
      data: {
        count: count,
        year: year
      }
    }).then(res => {
      // console.log(res);
      if (res.result.data.length == 0) {
        wx.showToast({
          title: '暂无数据',
          icon: 'none',
          image: '',
          duration: 1500,
          mask: false,
          success: (result) => {
            this.setData({
              taskObj: "",
              year: year
            })
          },
          fail: () => { },
          complete: () => { }
        });
      }
      else {
        let taskObj = res.result.data[0].taskObj
        this.setData({
          taskObj: taskObj,
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