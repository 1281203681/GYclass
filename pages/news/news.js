// pages/news/news.js
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
    this.getNews()
    // this.getNewsData()
  },
  getNews() {
    wx.cloud.callFunction({
      name: "getNews"
    }).then(res => {
      // console.log(res.result);
      let str=res.result
      str=JSON.parse(str)
      console.log(str);
      // wx.cloud.database().collection("news").add({
      //   data:{
      //     news:str.result
      //   }
      // })
    })
  },
  getNewsData(){
    wx.cloud.database().collection("news").get().then(res=>{
      // console.log(res.data[0].news.data);
      this.setData({
        newsObj:res.data[0].news.data
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