// pages/demo2/demo2.js
let openid = ""
let count = ""
let tempObj = {
  kb_data: "",
  kb_year: ""
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    class_num: [
      {
        num: 1,
        time: "8:00"
      },
      {
        num: 2,
        time: "9:40"
      },
      {
        num: 3,
        time: "10:00"
      },
      {
        num: 4,
        time: "11:40"
      },
      {
        num: 5,
        time: "14:30"
      },
      {
        num: 6,
        time: "16:10"
      },
      {
        num: 7,
        time: "16:20"
      },
      {
        num: 8,
        time: "17:50"
      },
      {
        num: 9,
        time: "19:40"
      },
      {
        num: 10,
        time: "21:20"
      },
      {
        num: 11,
        time: "22:05"
      },
    ],
    colorArrays: ["#ffcc99", "#99ccff", "#ff9999", "#bfc1ed", "#b4e4b4", "#ff9999", "#9ddaf4", "#00cccc","#ffcc99","#99ccff"],
    day_num: {},
    classArr: "",
    month: 11,
    week: 11
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
  gotoLogin() {
    wx.switchTab({
      url: '/pages/user/user',
      success: (result) => {

      },
    });
  },
  onShow: function () {
    // this.geiClass()
    // 是否登录
    wx.getStorage({
      key: 'login',
      success: (res) => {
        // console.log(res.data);
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
                this.gotoLogin()
              }
              else if (result.cancel) {
                this.gotoLogin()
              }
            },
          });
        }
        else {
          // 获取openid
          wx.getStorage({
            key: 'date',
            success: (res) => {
              let week = res.data.week
              let month = res.data.month
              this.setData({
                week: week,
                month: month
              })
            },
            complete: () => {
              wx.cloud.callFunction({
                name: "login",
                success: res => {
                  openid = res.result.openid
                  wx.cloud.database().collection("user_info").where({ openid: openid }).get().then(res => {
                    // console.log(res);
                    count = res.data[0].count
                    this.getKb()
                  })
                  // this.getMess()
                }
              })
            }
          });
        }
      },
    });
  },
  // 获取课表信息
  getKb() {
    wx.showLoading({
      title: "请稍候",
      mask: true,
      success: (result) => {
        // console.log(count);
        wx.cloud.callFunction({
          name: "getKB",
          data: {
            count: count
          },
          success: res => {
            // console.log(res);
            let dataLen = res.result.data.length
            for (let j = 1; j < dataLen; j++) {
              if (res.result.data[j].i == this.data.week) {
                tempObj.kb_data = res.result.data[j].kb_data,
                  tempObj.kb_year = res.result.data[j].kb_year
              }
            }
            // console.log(tempObj);
            // 课程开始
            let len = tempObj.kb_data.length
            let classArr = []
            for (let k = 1; k < 8; k++) {
              let tempClass = []
              for (let n = 0; n < len; n++) {
                if (tempObj.kb_data[n].xq == k) {
                  tempClass.push(tempObj.kb_data[n])
                }
              }
              classArr.push(tempClass)
            }
            // console.log(classArr);
            // 课程结束
            // 日期开始
            let day = tempObj.kb_year
            let arr = []
            for (let i = 0; i < day.length; i++) {
              let tempArr = []
              tempArr = day[i].rq.split("-")
              arr.push(tempArr)
            }
            let dayObj = []
            let weekDay = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
            for (let j = 0; j < 7; j++) {
              let tempDay = {
                "month": arr[j][1],
                "day": arr[j][2] - 1,
                "week_day": weekDay[j],
                "class_detail": classArr[j]
              }
              dayObj.push(tempDay)
            }
            this.setData({
              day_num: dayObj
            })
            wx.hideLoading();
          }
        })
      },
    });

  },
  // 上一周
  sub() {
    this.setData({
      week: this.data.week - 1
    })
    this.getKb()
  },
  // 下一周
  add() {
    this.setData({
      week: this.data.week + 1
    })
    this.getKb()
  },
  // 课程详情
  detail(e) {
    console.log(e);
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