// pages/vip/vip.js
let openid = ""
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
    wx.cloud.callFunction({
      name: "login",
      success: res => {
        openid = res.result.openid
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  vip() {
    wx.showLoading({
      title: "查询中",
      mask: true,
      success: (result) => {
        wx.cloud.callFunction({
          name: "cardNum"
        }).then(res => {
          // 卡号余量为0
          if (res.result.data.length == 0) {
            wx.showModal({
              title: '提示',
              content: '该版本纪念卡已领完，请等待补卡',
              showCancel: true,
              cancelText: '取消',
              cancelColor: '#000000',
              confirmText: '确定',
              confirmColor: '#3CC51F',
              success: (result) => {
                if (result.confirm) {

                }
              },
              fail: () => { },
              complete: () => { }
            });
          }
          else {
            wx.cloud.database().collection("user_info").where({ openid: openid }).get().then(res => {
              let count = res.data[0].count
              // 学号不存在，则无法领取
              if (res.data[0].count.length == 0) {
                wx.hideLoading();
                wx.showModal({
                  title: '提示',
                  content: '请登录后领取',
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
                  },
                });
              }
              // 学号存在  1.未领取则领取成功  2.已领取则无法重复领取
              else {
                wx.cloud.callFunction({
                  name: "testCard",
                  data: {
                    count
                  }
                }).then(res => {
                  // 已领取  无法重复领取
                  // console.log(res);
                  if (res.result.data.length != 0) {
                    wx.hideLoading();
                    wx.showModal({
                      title: '提示',
                      content: '您已领取该版本纪念卡，请勿重复领取',
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
                  // 未领取  开始领取
                  else {
                    wx.showLoading({
                      title: "领取中",
                      mask: true,
                      success: (result) => {
                        wx.cloud.callFunction({
                          name: "getVip",
                          data: {
                            count: count
                          }
                        }).then(res => {
                          // console.log(res);
                          wx.showToast({
                            title: '领取成功',
                            icon: 'none',
                            image: '',
                            duration: 1500,
                            mask: false,
                            success: (result) => {

                            },
                          });
                        })
                      },
                    });
                  }
                })
              }
            })
          }
        })
      },
      complete: () => { }
    });

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