// pages/user/user.js
let count = ""
let password = ""
let openid = ""
let time = ""
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    login_page: "",
    list_item: [
      {
        name: "使用帮助",
        icon: "../../icon/help.png",
        en:"Help",
        url:"/pages/help/help",
        style:"background-image: linear-gradient(to right, rgb(146, 230, 255), rgb(134, 255, 235));"
      },
      {
        name: "关于助手",
        icon: "../../icon/about.png",
        en:"About",
        url:"/pages/about/about",
        style:"background-image: linear-gradient(to right, rgb(207, 164, 247), rgb(255, 189, 246));"
      },
      {
        name: "纪念卡",
        icon: "../../icon/vipCard.png",
        en:"VIP",
        url:"/pages/active/active",
        style:"background-image: linear-gradient(to right, rgb(146, 230, 255), rgb(134, 255, 235));"
      },
      {
        name: "更新日志",
        icon: "../../icon/log.png",
        en:"Log",
        url:"/pages/log/log",
        style:"background-image: linear-gradient(to right, rgb(207, 164, 247), rgb(255, 189, 246));"
      }
    ]
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
  // 账号
  count(e) {
    count = e.detail.value
  },
  // 密码
  password(e) {
    password = e.detail.value
  },
  // 登录
  login() {
    // console.log();
    if (count == "" || password == "") {
      wx.showToast({
        title: '请输入账号密码',
        icon: 'error',
        image: '',
        duration: 1500,
        mask: false,
        success: (result) => {

        },
      });
    }
    else {
      wx.showLoading({
        title: "请稍候",
        mask: true,
        success: (result) => {
          // 第一步  密码转码base64
          let str = password
          var c1, c2, c3;
          var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
          var i = 0, len = password.length, strin = '';
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
          wx.request({
            url: 'https://jwxt.gdupt.edu.cn/login!doLogin.action',
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
                "pwd": passwords,
                "verifycode": ""
              }
              wx.request({
                url: "https://jwxt.gdupt.edu.cn/login!doLogin.action",
                method: "POST",
                header: headers,
                data: data,
                success: res => {
                  // console.log(res);
                  if (res.data.status == "n") {
                    wx.hideLoading();
                    wx.showModal({
                      title: '提示',
                      content: '您的账号或密码不正确，修改密码请到教务系统官网！',
                      showCancel: true,
                      cancelText: '取消',
                      cancelColor: '#000000',
                      confirmText: '确定',
                      confirmColor: '#3CC51F',
                      success: (result) => {
                        if (result.confirm) {
                        }
                      },
                    });
                  }
                  else {
                    // 账号存在 则更新个人信息即可
                    wx.cloud.database().collection("user_info").where({ count: count }).get().then(res => {
                      if (res.data.length == 0) {
                        wx.showLoading({
                          title: "载入中",
                          mask: true,
                          success: (result) => {

                            wx.cloud.callFunction({
                              name: "write_uesr_info",
                              data: {
                                count: count,
                                pwd: password,
                                openid: openid
                              }
                            }).then(res => {
                              // console.log(res);
                              // 账号信息写入成功
                              wx.cloud.callFunction({
                                name: "getYear",
                                success: res => {
                                  let year = res.result.data[0].year
                                  for (let i = 1; i < 23; i++) {
                                    wx.request({
                                      url: 'https://jwxt.gdupt.edu.cn/xsgrkbcx!getKbRq.action?xnxqdm=' + year + '&zc=' + i,
                                      method: "GET",
                                      header: headers,
                                      success: (res) => {
                                        wx.cloud.database().collection("user_kb").add({
                                          data: {
                                            // year: year,
                                            count: count,
                                            i: i,
                                            year: year,
                                            kb_year: res.data[1],
                                            kb_data: res.data[0]
                                          }
                                        })
                                      },
                                    });
                                  }
                                }
                              })
                            })
                          },
                        });
                        wx.hideLoading();
                        wx.showToast({
                          title: '载入成功！',
                          icon: 'none',
                          image: '',
                          duration: 1500,
                          mask: false,
                          success: (result) => {
                            this.setData({
                              login_page: false
                            })
                          },
                        });
                      }
                      else {
                        wx.cloud.database().collection("user_info").add({
                          data: {
                            openid: openid,
                            count: count,
                            pwd: password
                          }
                        }).then(res => {
                          wx.hideLoading();
                          wx.showToast({
                            title: '载入成功！',
                            icon: 'none',
                            image: '',
                            duration: 1500,
                            mask: false,
                            success: (result) => {
                              this.setData({
                                login_page: false
                              })
                            },
                          });
                        })
                      }
                    })
                  }
                }
              })
            },
          });
        },
        complete: () => { }
      });
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    time = util.formatTime(new Date());
    // console.log(time);
    // 判断是否登录
    wx.cloud.callFunction({
      name: "login",
      success: res => {
        openid = res.result.openid
        // console.log(res.result.openid);
        wx.cloud.database().collection("user_info").where({ openid: openid }).get().then(res => {
          // console.log(res);
          if (res.data.length == 0) {
            wx.showToast({
              title: '请登录',
              icon: 'none',
              image: '',
              duration: 1500,
              mask: false,
              success: (result) => {
                this.setData({
                  login_page: true
                })
              },
            });
          }
          else {
            wx.showToast({
              title: '欢迎回来',
              icon: 'none',
              image: '',
              duration: 1500,
              mask: false,
              success: (result) => {
                this.setData({
                  login_page: false
                })
              },
            });
          }
        })
      }
    })
  },
  // 退出登录
  exit() {
    wx.showModal({
      title: '警告',
      content: '退出登录后将清除您的所有数据（包括本地数据和云数据）',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        if (result.confirm) {
          wx.showLoading({
            title: "清除中",
            mask: true,
            success: (res) => {
              wx.cloud.database().collection("user_info").where({ openid: openid }).remove().then(res => {
                wx.cloud.database().collection("user_kb").where({ _openid: openid }).remove().then(res => {
                  wx.hideLoading();
                })
              }).then(res => {
                wx.showToast({
                  title: '感谢使用',
                  icon: 'none',
                  image: '',
                  duration: 1500,
                  mask: false,
                  success: (result) => {
                    this.setData({
                      login_page: true
                    })
                  },
                });
              })
            },
          });
        }
      },
    });
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