Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModalStatus:false
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
    this.getHot()
  },
  getHot() {
    wx.cloud.callFunction({
      name: "getHot"
    }).then(res => {
      let str = res.result
      let json = JSON.parse(str)
      console.log(json);
      this.setData({
        hotObj: json.data
      })
    })
  },
  detail(e) {
    // this.clickme()
    let url = e.currentTarget.dataset.item.url
    let mes=url.match(/q=.*?&Refer/g)
    let content=mes[0].replace(/q=|&Refer/g,"")
    wx.cloud.callFunction({
      name: "getHotDetail",
      data: {
        content: content
      }
    }).then(res => {
      // console.log(res);
      let str=res.result
      let json=JSON.parse(str)
      // console.log(json);
      this.setData({
        topicObj:json.querys,
      })
      this.showModal();
    })
  },
//点击我显示底部弹出框
  // clickme: function () {
  //   this.showModal();
  // },

  //显示对话框
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  // 隐藏
  cancel(){
    this.hideModal()
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