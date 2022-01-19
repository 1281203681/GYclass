let openid = ""
let count = ""
var util = require('../../utils/util.js');
// let passwords = ""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    expanObj: "",
    totalGrade: "",
    num_arr: [...Array(100)].map((k, i) => i + 1),
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
            content: '请登陆后使用',
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
  // 获取当前时间
  getTime() {
    let time = util.formatTime(new Date());
    let arr_1 = []
    let arr_2 = []
    arr_1 = time.split(" ")
    arr_2 = arr_1[1].split(":")
    let hour = arr_2[0]
    // 8点到22点查询教务系统
    if (hour >= 8 && hour <= 22) {
      this.getSchool()
    }
    // 其余时间查询数据库
    else {
      this.getInfo()
    }
  },
  getSchool() {
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
        let count = res.result.count
        let pwd = res.result.pwd
        let url = "https://jwxt.gdupt.edu.cn/login!doLogin.action"
        wx.request({
          url: url,
          method: 'POST',
          success: (res) => {
            // console.log(res);
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
                    success: (result) => {
                      wx.navigateBack({
                        delta: 1
                      });
                    },
                  });
                }
                else {
                  let data = {
                    xnxqdm: "",
                    page: 1,
                    rows: 60,
                    sort: "cjsj",
                    order: "desc",
                  }
                  wx.request({
                    url: 'https://jwxt.gdupt.edu.cn/xsktsbxx!getYxktDataList.action',
                    data: data,
                    header: headers,
                    method: 'POST',
                    success: (res) => {
                      let expanObj = res.data.rows
                      let dataLen = expanObj.length
                      let totalGrade = 0
                      for (let i = 0; i < dataLen; i++) {
                        totalGrade += Number(expanObj[i].hdxf)
                      }
                      wx.cloud.database().collection("expand").where({ count: count }).get().then(res => {
                        this.setData({
                          expanObj: expanObj,
                          totalGrade: totalGrade.toFixed(2)
                        })
                        if (res.data.length == 0) {
                          wx.cloud.database().collection("expand").add({
                            data: {
                              count: count,
                              expanObj: expanObj
                            }
                          }).then(res => {
                          })
                        }
                        else {
                          wx.cloud.database().collection("expand").where({ count: count }).update({
                            data: {
                              expanObj: expanObj
                            }
                          }).then(res => {

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
  /**
   * 生命周期函数--监听页面隐藏
   */
  getInfo() {
    wx.cloud.callFunction({
      name: "login"
    }).then(res => {
      openid = res.result.openid
      wx.cloud.database().collection("expand").where({ openid: openid }).get().then(res => {
        count = res.data[0].count
      }).then(res => {
        this.getExpand(count)
      })
    })
  },
  // 查询素拓分
  getExpand(count) {
    wx.cloud.callFunction({
      name: "getExpand",
      data: {
        count: count,
      }
    }).then(res => {
      // console.log(res.result.data[0].expandObj);
      let expanObj = res.result.data[0].expanObj
      let totalGrade = 0
      let dataLen = expanObj.length
      for (let i = 0; i < dataLen; i++) {
        totalGrade += Number(expanObj[i].hdxf)
      }
      this.setData({
        expanObj: expanObj,
        totalGrade: totalGrade
      })

    })
  },
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