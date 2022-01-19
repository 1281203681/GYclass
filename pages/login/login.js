let search = ""
let type = ""

Page({
  /**
   * 页面的初始数据
   */
  data: {
    num_arr: [...Array(100)].map((k, i) => i + 1),
    bookMess: "",
    url: "",
    count: 1,
    messArr: "",
    detailArr: "",
    bookTitle: "",
    active: false,
    // 翻页数据
    startX: "",
    towards: ""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options == undefined) {
      this.test_1(search, type, this.data.count)
    }
    else {
      search = options.search
      type = options.type
      this.test_1(search, type, this.data.count)
      this.setData({
        book_name: options.search
      })
    }
  },
  // 增加页面
  add() {
    if (this.data.bookMess.length < 20) {
      wx.showToast({
        title: '没有更多啦',
        icon: 'none',
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
          this.setData({
            count: this.data.count + 1
          })
          this.onLoad()
          wx.pageScrollTo({
            scrollTop: 0,
          });
          wx.hideLoading();
        },
      });
    }
  },
  // 减少页面
  sub() {
    if (this.data.count > 1) {
      wx.showLoading({
        title: "请稍候",
        mask: true,
        success: (result) => {
          this.setData({
            count: this.data.count - 1
          })
          this.onLoad()
          wx.pageScrollTo({
            scrollTop: 0,
          });
          wx.hideLoading();
        },
      });
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
    // this.test_1()
  },
  test_1(search, value, count) {
    wx.cloud.callFunction({
      name: "httpTest",
      data: {
        search: search,
        value: value,
        count: count
      }
    }).then(res => {
      // console.log(res);
      let str = res.result
      let new_str = str.match(/<p>.*?<\/p>/g)//书名
      let url = str.match(/href=".*?"/g)//链接
      let dataLen = new_str.length
      let urlLen = url.length
      let new_arr = []
      let urlArr = []
      let end_Arr = []
      // 构建书名数组
      for (let i = 0; i < dataLen; i++) {
        let temp = new_str[i].replace(/<p>|<\/p>/g, "")
        new_arr.push(temp)
      }
      // 构建链接数组
      if (this.data.count == 1) {
        for (let j = 2; j < urlLen - 1; j++) {
          let temp1 = url[j].replace(/href="|"/g, "")
          urlArr.push(temp1)
        }
      }
      else {
        for (let j = 2; j < urlLen - 2; j++) {
          let temp1 = url[j].replace(/href="|"/g, "")
          urlArr.push(temp1)
        }
      }
      //构建最终书名数据
      for (let k = 0; k < dataLen; k += 3) {
        end_Arr.push(new_arr.slice(k, k + 3))
      }
      this.setData({
        bookMess: end_Arr,
        url: urlArr
      })
    })
  },
  // 获取图书详情
  getBookDetail(e) {
    // console.log(e);
    let index = e.currentTarget.dataset.index
    let url = this.data.url[index]
    wx.showLoading({
      title: "查询中",
      mask: true,
      success: (result) => {
        wx.cloud.callFunction({
          name: "bookDetail",
          data: {
            url: url
          }
        }).then(res => {
          // console.log(res);
          let html = res.result
          let title = html.match(/<title>.*?<\/title>/g)
          title = title[0].replace(/<title>|<\/title>/g, "")//书名

          let detail = html.match(/<th.*?<\/th>/g)
          let temp_detailArr = []
          let detailArr = []

          let mess = html.match(/<td>.*?<\/td>/g)
          // console.log(mess);
          let tempMessArr = []
          let messArr = []
          // for(let k=0;k<mess.length;k++){

          // }
          for (let i = 0; i < detail.length; i++) {
            temp_detailArr.push(detail[i].replace(/<th width="120">|<\/th>/g, ""))
            tempMessArr.push(mess[i].replace(/<td>|<\/td>/g, ""))
          }
          for (let j = 0; j < detail.length; j += 6) {
            detailArr.push(temp_detailArr.slice(j, j + 6))
            messArr.push(tempMessArr.slice(j, j + 6))
          }
          // console.log(messArr);
          this.setData({
            detailArr: detailArr,
            messArr: messArr,
            bookTitle: title,
            active: true
          })
          wx.hideLoading();
        })
      },
      fail: () => { },
      complete: () => {
      }
    });
  },
  // 左右滑动
  touchStart(e) {
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
    // count++
    // this.onLoad()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})