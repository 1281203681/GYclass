// pages/active/active.js
let openid = ""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardNum: 0,
    cardMess: ""
  },
  sendFriend() {
    wx.showToast({
      title: '暂未开启',
      icon: 'none',
      image: '',
      duration: 1500,
      mask: false,
      success: (result) => {

      },
    });
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
  togoLoing() {
    wx.switchTab({
      url: '/pages/user/user',
      success: (result) => {

      },
    });
  },
  onShow: function () {
    // 查询是否登录
    wx.getStorage({
      key: 'login',
      success: (res) => {
        // console.log(res);
        if (res.data == false) {
          wx.showModal({
            title: '提示',
            content: '请登录后查询',
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#000000',
            confirmText: '确定',
            confirmColor: '#3CC51F',
            success: (result) => {
              if (result.confirm) {
                this.togoLoing()
              }
              else if (result.cancel) {
                this.togoLoing()
              }
            },
            complete: () => { }
          });
        }
      },
      complete: () => { }
    });
    this.getVip()
  },
  // 查询是否拥有纪念卡
  getVip() {
    wx.cloud.callFunction({
      name: "login",
      success: res => {
        openid = res.result.openid
        wx.cloud.database().collection("user_info").get().then(res => {
          let count = res.data[0].count
          wx.cloud.callFunction({
            name: "testCard",
            data: {
              count: count
            }
          }).then(res => {
            // console.log(res);
            if (res.result.data.length == 0) {
              this.setData({
                cardNum: 0
              })
            }
            else {
              this.setData({
                cardNum: 1,
                cardMess: res.result.data[0]
              })
            }
          })
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