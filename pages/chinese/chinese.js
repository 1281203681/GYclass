let count = ""
let index = 0
let openid = ""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: [],
    array: ["网易云热评", "朋友圈文案", "舔狗日记", "土味情话"],
    index: 0,
    url: ['../../icon/like.png', '../../icon/like.png', '../../icon/like.png', '../../icon/like.png', '../../icon/like.png', '../../icon/like.png', '../../icon/like.png', '../../icon/like.png', '../../icon/like.png', '../../icon/like.png']
  },
  bindPickerChange(e) {
    index = e.detail.value
    this.setData({
      index: index,
      url: ['../../icon/like.png', '../../icon/like.png', '../../icon/like.png', '../../icon/like.png', '../../icon/like.png', '../../icon/like.png', '../../icon/like.png', '../../icon/like.png', '../../icon/like.png', '../../icon/like.png']
    })
    this.query(index)
  },
  query(index) {
    let c = ""
    if (index == 0) {
      c = "1003"
      this.getChinese(c)
    }
    else if (index == 1) {
      c = "1008"
      this.getChinese(c)
    }
    else if (index == 2) {
      c = "1006"
      this.getChinese(c)
    }
    else if (index == 3) {
      c = "1001"
      this.getChinese(c)
    }

  },
  getChinese(c) {
    let arr = []
    for (let i = 0; i < 10; i++) {
      wx.cloud.callFunction({
        name: "getChinese",
        data: {
          c: c
        }
      }).then(res => {
        arr.push(res.result)
        this.setData({
          arr: arr
        })
      })
    }
    // console.log(arr);

  },
  like(e) {
    // this.data.url
    let index_1 = e.currentTarget.dataset.index
    let url = this.data.url
    let url_0 = "../../icon/like.png"
    let url_1 = "../../icon/like_1.png"
    if (url[index_1] == url_0) {
      url[index_1] = url_1
      this.setData({
        url: url
      })
      wx.showToast({
        title: '收藏成功',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false,
        success: (result) => {
          let id = new Date().getTime()
          wx.cloud.database().collection("like").add({
            data: {
              content: this.data.arr[index_1],
              id: id,
              count: count,
              openid: openid,
              type: index
            }
          })
        },
      });
    }
    else {
      url[index_1] = url_0
      this.setData({
        url: url
      })
      wx.showToast({
        title: '取消收藏',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false,
        success: (result) => {
          wx.cloud.database().collection("like").where({ content: this.data.arr[index_1] }).remove().then(res => {
            console.log(res);
          })
        },
      });
    }
  },
  // 复制文案
  copy(e) {
    let index_1 = e.currentTarget.dataset.index
    wx.setClipboardData({
      data: this.data.arr[index_1],
      success: (result) => {
        wx.showToast({
          title: '复制成功',
          icon: 'none',
          image: '',
          duration: 1500,
          mask: false,
          success: (result) => {

          },
          fail: () => { },
          complete: () => { }
        });
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
  onShow: function () {
    this.loginOr()
  },
  // 查询用户数据
  getInfo() {
    wx.cloud.callFunction({
      name: "login"
    }).then(res => {
      openid = res.result.openid
      wx.cloud.database().collection("user_info").where({ openid: openid }).get().then(res => {
        count = res.data[0].count
      })
    })
  },
  // 是否登录
  loginOr() {
    wx.getStorage({
      key: 'login',
      success: (res) => {
        if (res.data == false) {
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
                  fail: () => { },
                  complete: () => { }
                });
              }
            },
          });
        }
        else {
          this.query(index)
          this.getInfo()
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