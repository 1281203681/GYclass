// pages/fress/fress.js
let openid = ""
let login = false
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count:"",
    pwd:""
  },
  // 校区选择
  search(e) {
    if (login == false) {
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
            wx.switchTab({
              url: '/pages/user/user',
              success: (result)=>{
                
              },
            });
          }
        },
      });
    }
    else {
      wx.navigateTo({
        url: '/pages/class_room/class_room?id=' + e.currentTarget.id+"&count="+this.data.count+"&pwd="+this.data.pwd,
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
    this.login()
    // this.judgeLogin()
  },
  getRoom() {
    wx.request({
      url: 'https://jwxt.gdupt.edu.cn/login!doLogin.action',
      data: {},
      header: { 'content-type': 'application/json' },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: (result) => {
        // console.log(result);
        let cookieArr = result.cookies[0]
        let tempCookie = cookieArr.split(";")
        let cookie = tempCookie[0]
        let headers = {
          "cookie": cookie,
          "content-type": "application/x-www-form-urlencoded"
        }
        let data = {
          "account": 20114340331,
          "pwd": "emFxMTIzNDU2",
          "verifycode": ""
        }
        wx.request({
          url: 'https://jwxt.gdupt.edu.cn/login!doLogin.action',
          header: headers,
          method: 'POST',
          data: data,
          success: (res) => {
            if (res.data.status == "n") {
              wx.showToast({
                title: '服务器错误',
                icon: 'error',
                image: '',
                duration: 1500,
                mask: false,
                success: (result) => {

                },
              });
            }
            else {
              let roomData = {
                "xq": 7,//星期
                "zc": 12,//周数
                "jc": "01",//节次
                "isqy": 1,
                "curzc": 12,
                "zhzc": 15,
                "xnxqdm": 202101,//学年学期
                "szxqdm": 102940570,
                "ssgnqdm": "",
                "ssjzwdm": 103589811,
                "jxcddm": "",
                "page": 1,//分页
                "rows": 20,
                "sort": "jxcdbh",
                "order": "asc",//排序
              }
              wx.request({
                url: 'https://jwxt.gdupt.edu.cn/teajssqxx!getPlJsDataList.action?primarySort=jxcddm%20desc',
                data: roomData,
                header: headers,
                method: 'POST',
                dataType: 'json',
                responseType: 'text',
                success: (result) => {
                  console.log(result.data.rows);
                },
              });
            }
          },
        });
      },
    });
  },
  // 获取openid
  login(){
    wx.cloud.callFunction({
      name:"login",
      success:res=>{
        openid=res.result.openid
        this.judgeLogin()
      }
    })
  },
  // 判断是否登录
  judgeLogin() {
    wx.getStorage({
      key: 'login',
      success: (res) => {
        login = res.data
        if(login==true){
          wx.cloud.database().collection("user_info").where({openid:openid}).get().then(res=>{
            console.log(res);
            this.setData({
              // infoObj:res.data[0]
              count:res.data[0].count,
              pwd:res.data[0].pwd
            })
          })
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