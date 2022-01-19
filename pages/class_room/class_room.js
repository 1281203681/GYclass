// pages/class_room/class_room.js
let week = ""
let day = ""
let id = ""
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    free_obj: "",
    // index: 0,
    free_time:"全天",
    // towards: "",
    day: "",
    week: "",
    classStatus: 1,
    items: [
      { value: 'all_day', name: '全天', checked: 'true' },
      { value: 'now', name: '当前' },
      { value: 'am', name: '上午' },
      { value: 'pm', name: '下午' },
      { value: 'night', name: '晚上' },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    id = options.id
    let tempday = util.getWeekByDate(new Date())
    let classStatus = 0
    day = Number(tempday)
    wx.getStorage({
      key: 'date',
      success: (res) => {
        week = res.data.week
        this.setData({
          day: day,
          week: week,
          id: id
        })
        this.getTime(id, day, week, classStatus)
      },
    })

  },
  // 上一页
  sub() {
    if (this.data.index >= 1) {
      this.setData({
        index: this.data.index - 1
      })
    }
  },
  // 下一页
  add() {
    this.setData({
      index: this.data.index + 1
    })
  },
  // // 左右滑动
  // touchStart(e) {
  //   if (e.touches.length == 1) {
  //     this.setData({
  //       startX: e.touches[0].clientX
  //     });
  //   }
  // },
  // touchMove(e) {
  //   // console.log(e);
  //   // console.log(e.touches[0].clientX);
  //   if (e.touches.length == 1) {
  //     var moveX = e.touches[0].clientX;
  //     var towards = this.data.startX - moveX;
  //     this.setData({
  //       towards: towards
  //     })
  //   }
  // },
  // touchEnd(e) {
  //   // console.log(e);
  //   // console.log(this.data.towards);
  //   let that = this
  //   if (that.data.towards != '') {
  //     if (that.data.towards < -100) {//向右
  //       // console.log('向右')
  //       that.sub()
  //     } else if (that.data.towards > 100) {//向左
  //       // console.log('向左')
  //       that.add()
  //     }
  //   }
  //   that.setData({
  //     towards: ''
  //   })
  // },
  // 当前无课
  // lessClass() {
  //   let date = util.formatTime(new Date());
  //   let dateArr = []
  //   dateArr = date.split(" ")
  //   let time = dateArr[1].split(":")
  //   let hour = time[0]

  //   let roomObj = this.data.free_obj
  //   let roomLen = roomObj.length
  //   let free = []
  //   // console.log(roomObj);
  //   if (hour >= 0 && hour < 10) {
  //     // 1.2节
  //     for (let i = 0; i < roomLen; i++) {
  //       if (roomObj[i].jc == 1) {
  //         free.push(roomObj[i])
  //       }
  //     }
  //     this.setData({
  //       free_obj_less: free
  //     })
  //   }
  //   else if (hour >= 10 && hour < 12) {
  //     // 3.4节
  //     for (let i = 0; i < roomLen; i++) {
  //       if (roomObj[i].jc == 3) {
  //         free.push(roomObj[i])
  //       }
  //     }
  //     this.setData({
  //       free_obj_less: free
  //     })
  //   }
  //   else if (hour >= 12 && hour < 16) {
  //     // 5.6
  //     for (let i = 0; i < roomLen; i++) {
  //       if (roomObj[i].jc == 5) {
  //         free.push(roomObj[i])
  //       }
  //     }
  //     this.setData({
  //       free_obj_less: free
  //     })
  //   }
  //   else if (hour >= 16 && hour < 18) {
  //     // 7.8
  //     for (let i = 0; i < roomLen; i++) {
  //       if (roomObj[i].jc == 7) {
  //         free.push(roomObj[i])
  //       }
  //     }
  //     this.setData({
  //       free_obj_less: free
  //     })
  //   }
  //   else {
  //     // 
  //     for (let i = 0; i < roomLen; i++) {
  //       if (roomObj[i].jc == 9) {
  //         free.push(roomObj[i])
  //       }
  //     }
  //     this.setData({
  //       free_obj_less: free
  //     })
  //   }
  // },
  // // 全天无课
  // all_day() {
  //   let id = this.data.id
  //   let str = pwd
  //   var c1, c2, c3;
  //   var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  //   var i = 0, len = pwd.length, strin = '';
  //   while (i < len) {
  //     c1 = str.charCodeAt(i++) & 0xff;
  //     if (i == len) {
  //       strin += base64EncodeChars.charAt(c1 >> 2);
  //       strin += base64EncodeChars.charAt((c1 & 0x3) << 4);
  //       strin += "==";
  //       break;
  //     }
  //     c2 = str.charCodeAt(i++);
  //     if (i == len) {
  //       strin += base64EncodeChars.charAt(c1 >> 2);
  //       strin += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
  //       strin += base64EncodeChars.charAt((c2 & 0xF) << 2);
  //       strin += "=";
  //       break;
  //     }
  //     c3 = str.charCodeAt(i++);
  //     strin += base64EncodeChars.charAt(c1 >> 2);
  //     strin += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
  //     strin += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
  //     strin += base64EncodeChars.charAt(c3 & 0x3F)
  //   }
  //   let password = strin
  //   wx.showLoading({
  //     title: "查询中",
  //     mask: true,
  //     success: (res) => {
  //       wx.request({
  //         url: 'https://jwxt.gdupt.edu.cn/login!doLogin.action',
  //         method: 'POST',
  //         success: (res) => {
  //           let cookies = res.cookies[0]
  //           let arr = []
  //           arr = cookies.split(";")
  //           let cookie = arr[0]

  //           let data = {
  //             "account": count,
  //             "pwd": password,
  //             "verifycode": ""
  //           }
  //           let headers = {
  //             "cookie": cookie,
  //             "content-type": "application/x-www-form-urlencoded"
  //           }
  //           wx.request({
  //             url: 'https://jwxt.gdupt.edu.cn/login!doLogin.action',
  //             data: data,
  //             header: headers,
  //             method: 'POST',
  //             success: (res) => {
  //               if (res.data.status == "y") {
  //                 // 西城校区
  //                 if (id == 0) {
  //                   let data = {
  //                     xq: day,
  //                     zc: week,
  //                     jc: "01,02,03,04,05,06,07,08,09,10",
  //                     isqy: "1",
  //                     curzc: "14",
  //                     zhzc: "16",
  //                     xnxqdm: "202101",
  //                     szxqdm: "102940570",
  //                     ssgnqdm: "",
  //                     ssjzwdm: "103589811",
  //                     jxcddm: "",
  //                     page: "1",
  //                     rows: "60",
  //                     sort: "jxcdbh",
  //                     order: "asc"
  //                   }
  //                   let url = "https://jwxt.gdupt.edu.cn/teajssqxx!getPlJsDataList.action?primarySort=jxcddm%20desc"
  //                   wx.request({
  //                     url: url,
  //                     data: data,
  //                     header: headers,
  //                     method: 'POST',
  //                     dataType: 'json',
  //                     responseType: 'text',
  //                     success: (res) => {
  //                       // console.log(res.data.rows);
  //                       this.setData({
  //                         all_day: res.data.rows,
  //                         classStatus: 3
  //                       })
  //                       wx.hideLoading();
  //                     },
  //                   });
  //                 }
  //                 // 官渡校区
  //                 else if (id == 1) {
  //                   let data = {
  //                     xq: day,
  //                     zc: week,
  //                     jc: "01,02,03,04,05,06,07,08,09,10",
  //                     isqy: "1",
  //                     curzc: "14",
  //                     zhzc: "16",
  //                     xnxqdm: "202101",
  //                     szxqdm: "1",
  //                     ssgnqdm: "",
  //                     ssjzwdm: "",
  //                     jxcddm: "",
  //                     page: "1",
  //                     rows: "60",
  //                     sort: "jxcdbh",
  //                     order: "asc",
  //                   }
  //                   let url = "https://jwxt.gdupt.edu.cn/teajssqxx!getPlJsDataList.action?primarySort=jxcddm%20desc"
  //                   wx.request({
  //                     url: url,
  //                     data: data,
  //                     header: headers,
  //                     method: 'POST',
  //                     dataType: 'json',
  //                     responseType: 'text',
  //                     success: (res) => {
  //                       console.log(res);
  //                       this.setData({
  //                         all_day: res.data.rows,
  //                         classStatus: 3
  //                       })
  //                       wx.hideLoading();
  //                     },
  //                   });
  //                 }
  //                 // 光华校区
  //                 else {
  //                   let data = {
  //                     xq: day,
  //                     zc: week,
  //                     jc: "01,02,03,04,05,06,07,08,09,10",
  //                     isqy: "1",
  //                     curzc: "14",
  //                     zhzc: "16",
  //                     xnxqdm: "202101",
  //                     szxqdm: "2",
  //                     ssgnqdm: "",
  //                     ssjzwdm: "",
  //                     jxcddm: "",
  //                     page: "1",
  //                     rows: "60",
  //                     sort: "jxcdbh",
  //                     order: "asc",
  //                   }
  //                   let url = "https://jwxt.gdupt.edu.cn/teajssqxx!getPlJsDataList.action?primarySort=jxcddm%20desc"
  //                   wx.request({
  //                     url: url,
  //                     data: data,
  //                     header: headers,
  //                     method: 'POST',
  //                     dataType: 'json',
  //                     responseType: 'text',
  //                     success: (res) => {
  //                       // console.log(res.data.rows);
  //                       this.setData({
  //                         all_day: res.data.rows,
  //                         classStatus: 3
  //                       })
  //                       wx.hideLoading();
  //                     },
  //                   });
  //                 }

  //               }
  //               else {
  //                 wx.hideLoading();
  //                 wx.showModal({
  //                   title: '提示',
  //                   content: '学校服务器错误，请在开放时间使用',
  //                   showCancel: true,
  //                   cancelText: '取消',
  //                   cancelColor: '#000000',
  //                   confirmText: '确定',
  //                   confirmColor: '#3CC51F',
  //                   success: (result) => {
  //                     if (result.confirm) {

  //                     }
  //                   },
  //                 });
  //               }
  //             },
  //           });
  //         },
  //       });
  //     },
  //   });
  // },
  // 选择器
  radioChange(e) {
    let status = e.detail.value
    console.log(status);
    if (status == "all_day") {
      this.setData({
        classStatus: 0,
      })
      let classStatus = 0
      this.getTime(id, day, week, classStatus)
    }
    else if (status == "now") {
      this.setData({
        classStatus: 1
      })
      let classStatus = 1
      this.getTime(id, day, week, classStatus)
    }
    else if (status == "am") {
      this.setData({
        classStatus: 2
      })
      let classStatus = 2
      this.getTime(id, day, week, classStatus)
    }
    else if (status == "pm") {
      this.setData({
        classStatus: 3
      })
      let classStatus = 3
      this.getTime(id, day, week, classStatus)
    }
    else if (status == "night") {
      this.setData({
        classStatus: 4
      })
      let classStatus = 4
      this.getTime(id, day, week, classStatus)
    }
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
    // this.getTime()
  },
  // 获取当前时间
  getTime(id, day, week, classStatus) {
    if (classStatus == 0) {
      let jc = "01,02,03,04,05,06,07,08,09,10"
      this.getRoom(id, day, week, jc),
      this.setData({
        free_time:"全天"
      })
    }
    else if (classStatus == 1) {
      let date = util.formatTime(new Date());
      let dateArr = []
      dateArr = date.split(" ")
      let time = dateArr[1].split(":")
      let hour = time[0]
      let jc = ""
      if (hour >= 8 && hour < 10) {
        jc = "01,02"
        this.setData({
          free_time:"01~02节"
        })
      }
      else if (hour >= 10 && hour < 12) {
        jc = "03,04"
        this.setData({
          free_time:"03~04节"
        })
      }
      else if (hour >= 12 && hour < 14) {
        jc = "05,06"
        this.setData({
          free_time:"05~06节"
        })
      }
      else if (hour >= 14 && hour < 16) {
        jc = "07,08"
        this.setData({
          free_time:"07~08节"
        })
      }
      else if (hour >= 16 && hour < 23) {
        jc = "09,10"
        this.setData({
          free_time:"09~10节"
        })
      }
      this.getRoom(id, day, week, jc)
    }
    else if (classStatus == 2) {
      let jc = "01,02,03,04"
      this.getRoom(id, day, week, jc)
      this.setData({
        free_time:"01~04节"
      })
    }
    else if (classStatus == 3) {
      let jc = "05,06,07,08"
      this.getRoom(id, day, week, jc)
      this.setData({
        free_time:"05~08节"
      })
    }
    else if (classStatus == 4) {
      let jc = "09,10"
      this.getRoom(id, day, week, jc)
      this.setData({
        free_time:"09~10节"
      })
    }
  },
  getRoom(id, day, week, jc) {
    wx.cloud.callFunction({
      name: "login"
    }).then(res => {
      let openid = res.result.openid
      wx.cloud.callFunction({
        name: "getUserInfo",
        data: {
          openid: openid
        }
      }).then(res => {
        // console.log(res);
        let count = res.result.count
        let pwd = res.result.pwd
        let time = util.formatTime(new Date());
        let arr = time.split(" ")
        let arr1 = arr[1].split(":")
        let hour = arr1[0]
        console.log(hour);
        if (hour >= 23 || hour <= 8) {
          wx.showToast({
            title: '8点后查询',
            icon: 'none',
            image: '',
            duration: 1500,
            mask: false,
            success: (result) => {

            },
          });
        }
        else {
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
                    wx.showModal({
                      title: '提示',
                      content: '您的账号已过期，请重新登录',
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
                          });
                        }
                        else {
                          wx.navigateBack({
                            delta: 1
                          });
                        }
                      },
                    });
                  }
                  else {
                    let url = "https://jwxt.gdupt.edu.cn/teajssqxx!getPlJsDataList.action?primarySort=jxcddm%20desc"
                    // 西城校区
                    if (id == 0) {
                      let data = {
                        xq: day,
                        zc: week,
                        jc: jc,
                        isqy: "1",
                        curzc: "14",
                        zhzc: "16",
                        xnxqdm: "202101",
                        szxqdm: "102940570",
                        ssgnqdm: "",
                        ssjzwdm: "103589811",
                        jxcddm: "",
                        page: "1",
                        rows: "60",
                        sort: "jxcdbh",
                        order: "asc"
                      }
                      wx.request({
                        url: url,
                        data: data,
                        header: headers,
                        method: 'POST',
                        success: (res) => {
                          // console.log("西城", res);
                          this.setData({
                            free_obj: res.data.rows
                          })
                        },
                      });
                    }
                    // 官渡校区
                    else if (id == 1) {
                      let data = {
                        xq: day,
                        zc: week,
                        jc: jc,
                        isqy: "1",
                        curzc: "14",
                        zhzc: "16",
                        xnxqdm: "202101",
                        szxqdm: "1",
                        ssgnqdm: "",
                        ssjzwdm: "",
                        jxcddm: "",
                        page: "1",
                        rows: "60",
                        sort: "jxcdbh",
                        order: "asc",
                      }
                      wx.request({
                        url: url,
                        data: data,
                        header: headers,
                        method: 'POST',
                        success: (res) => {
                          // console.log("官渡", res);
                          this.setData({
                            free_obj: res.data.rows
                          })
                        },
                      });
                    }
                    // 光华校区
                    else {
                      let data = {
                        xq: day,
                        zc: week,
                        jc: jcs,
                        isqy: "1",
                        curzc: "14",
                        zhzc: "16",
                        xnxqdm: "202101",
                        szxqdm: "2",
                        ssgnqdm: "",
                        ssjzwdm: "",
                        jxcddm: "",
                        page: "1",
                        rows: "60",
                        sort: "jxcdbh",
                        order: "asc",
                      }
                      wx.request({
                        url: url,
                        data: data,
                        header: headers,
                        method: 'POST',
                        success: (res) => {
                          // console.log("光华", res);
                          this.setData({
                            free_obj: res.data.rows
                          })
                        },
                      });
                    }
                  }
                },
              });
            },
          });
        }
      })
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