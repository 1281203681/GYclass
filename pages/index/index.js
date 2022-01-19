var util = require('../../utils/util.js');
let time = ""
let openid = ""
let db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tiemObj: "",
    play_mess: "",
    todayClass: "",
    addObj: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 判断是否登录
  judgeLogin(){
    let login=wx.getStorageSync("login");
    if(login==""){
      // 缓存清除或未登录
      wx.cloud.callFunction({
        name:"login"
      }).then(res=>{
        openid=res.result.openid
        db.collection("user_info").where({openid:openid}).get().then(res=>{
          // 没有数据，未登录过
          if(res.data.length==0){
            wx.setStorage({
              key: 'login',
              data: false,
              success: (result)=>{
                
              },
            });
          }
          // 登陆过，缓存清除
          else{
            
          }
        })
      })
    }
    // 没有登录
    else if(login==false){

    }
    // 登录，且有缓存
    else if(login==true){

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
    this.getPlayMess()
    this.getAdd()
    // 判断是否登录
    wx.cloud.callFunction({
      name: "login",
      success: res => {
        // console.log(res.result.openid);
        openid = res.result.openid
        wx.cloud.database().collection("user_info").where({ openid: openid }).get().then(res => {
          if (res.data.length == 0) {
            wx.setStorage({
              key: 'login',
              data: false,
              success: (result) => {
              },
            });
          }
          // 写入已登录
          else {
            wx.setStorage({
              key: 'login',
              data: true,
              success: (result) => {
                // 获取周次
                wx.cloud.database().collection("kb_year").get().then(res => {
                  let week = res.data[0].week//周次
                  time = util.formatTime(new Date());
                  let timeArr = []
                  let timeArr_1 = []
                  timeArr = time.split("/")
                  timeArr_1 = timeArr[2].split(" ")
                  // console.log(timeArr_1);
                  let today = util.getWeekByDate(new Date())
                  let tiemObj = {
                    year: timeArr[0],
                    month: timeArr[1],
                    day: timeArr_1[0],
                    week: week,
                    today: today//星期
                  }
                  wx.setStorage({
                    key: 'date',
                    data: tiemObj,
                    success: (res) => {
                      this.setData({
                        tiemObj: tiemObj,
                      })
                    },
                  });
                  // 查询今日课表
                  wx.cloud.callFunction({
                    name: "getTodayKb",
                    data: {
                      openid: openid,
                      date: timeArr[0] + "-" + timeArr[1] + "-" + timeArr_1[0]
                      // date:"2021-10-19"
                    }
                  }).then(res => {
                    // console.log(res);
                    if (res.result == null) {
                      // 今日无课
                    }
                    else {
                      let dataLen = res.result.length
                      let dataArr = []
                      for (let i = 0; i < dataLen; i++) {
                        if (res.result[i].xq == today) {
                          dataArr.push(res.result[i])
                        }
                      }
                      dataArr.sort((a, b) => { return a.jcdm - b.jcdm })
                      this.setData({
                        todayClass: dataArr
                      })
                      // console.log(tiemObj);

                    }
                  })
                })
              },
            });
          }
        })
      }
    })

  },
  // 获取轮播图
  getPlayMess() {
    wx.cloud.database().collection("play_mess").get().then(res => {
      // console.log(res);
      let dataLen = res.data.length
      let play_mess = []
      for (let i = 0; i < dataLen; i += 4) {
        play_mess.push(res.data.slice(i, i + 4))
      }
      this.setData({
        play_mess: play_mess
      })
    })
  },
  // 获取广告图
  getAdd() {
    wx.cloud.database().collection("add_mess").get().then(res => {
      // console.log(res);
      this.setData({
        addObj: res.data
      })
    })
  },
  // 广告详情页
  goDetail(e) {
    // console.log(e.currentTarget.dataset.index);
    let index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: this.data.addObj[index].url,
      success: (result) => {

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