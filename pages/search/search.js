// pages/search/search.js
let search_content = ""
let value = "title"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      {
        value: "title",
        name: "书名搜索",
        checked: true
      },
      {
        value: "author",
        name: "作者搜索",
        checked: false
      },
      {
        value: "subject",
        name: "主题词搜索",
        checked: false
      },
      {
        value: "isbn",
        name: "ISBN搜索",
        checked: false
      },
    ]
  },
  // 输入的内容
  handleContent(e) {
    search_content = e.detail.value
  },
  // 选择框
  radioChange(e) {
    value = e.detail.value
  },
  // 开始搜索
  search(e) {
    if (search_content == "") {
      wx.showModal({
        title: '提示',
        content: '请输入搜索内容',
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
      wx.navigateTo({
        url: '/pages/login/login?search=' + search_content + "&type=" + value,
        success: (result) => {

        },
      });
    }
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