// pages/manage/manage.js
let week = ""
let newWeek = ""
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
  // 西城
  fress_class_room() {
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
              // 更新西城空闲教室  1.3.5.7.9
              // 一周更新一次
              // let week = 12
              for (let i = 1; i < 8; i++) {//星期
                for (let j = 1; j < 10; j += 2) {//节次
                  for (let k = 1; k < 6; k++) {//分页
                    let roomData = {
                      "xq": i,//星期
                      "zc": week,//周数
                      "jc": "0" + j,//节次
                      "isqy": 1,
                      "curzc": 12,
                      "zhzc": 15,
                      "xnxqdm": 202101,//学年学期
                      "szxqdm": 102940570,//校区代码  1为官渡  2为光华  102940570为西城
                      "ssgnqdm": "",
                      "ssjzwdm": "",
                      "jxcddm": "",
                      "page": k,//分页
                      "rows": 20,
                      "sort": "jxcdbh",
                      "order": "asc",//排序
                    }
                    setTimeout(() => {
                      let id = new Date().getTime() + k
                      wx.cloud.database().collection("xi_cheng_room").add({
                        data: {
                          id: id,
                          week: week,
                          xq: i,
                          jc: j,
                          page: k
                        }
                      }).then(res => {
                        setTimeout(() => {
                          wx.request({
                            url: 'https://jwxt.gdupt.edu.cn/teajssqxx!getPlJsDataList.action?primarySort=jxcddm%20desc',
                            data: roomData,
                            header: headers,
                            method: 'POST',
                            dataType: 'json',
                            responseType: 'text',
                            success: (result) => {
                              console.log(result.data.rows);
                              wx.cloud.database().collection("xi_cheng_room").where({ id: id }).update({
                                data: {
                                  detail: result.data.rows
                                }
                              })
                            },
                          });
                        }, 1000)
                      })
                    }, 1000)

                  }
                }
              }
              wx.showModal({
                title: '提示',
                content: week + '周数据已加载',
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
          },
        });
      },
    });
  },
  // 官渡
  guandu() {
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
              // 更新西城空闲教室  1.3.5.7.9
              // 一周更新一次
              // let week = 12
              for (let i = 1; i < 8; i++) {//星期
                for (let j = 1; j < 10; j += 2) {//节次
                  for (let k = 1; k < 6; k++) {//分页
                    let roomData = {
                      "xq": i,//星期
                      "zc": week,//周数
                      "jc": "0" + j,//节次
                      "isqy": 1,
                      "curzc": 12,
                      "zhzc": 15,
                      "xnxqdm": 202101,//学年学期
                      "szxqdm": 1,//校区代码  1为官渡  2为光华  102940570为西城
                      "ssgnqdm": "",
                      "ssjzwdm": "",
                      "jxcddm": "",
                      "page": k,//分页
                      "rows": 20,
                      "sort": "jxcdbh",
                      "order": "asc",//排序
                    }
                    let id = new Date().getTime() + k
                    wx.cloud.database().collection("guan_du_room").add({
                      data: {
                        id: id,
                        week: week,
                        xq: i,
                        jc: j,
                        page: k
                      }
                    }).then(res => {
                      setTimeout(() => {
                        wx.request({
                          url: 'https://jwxt.gdupt.edu.cn/teajssqxx!getPlJsDataList.action?primarySort=jxcddm%20desc',
                          data: roomData,
                          header: headers,
                          method: 'POST',
                          dataType: 'json',
                          responseType: 'text',
                          success: (result) => {
                            console.log(result.data.rows);
                            wx.cloud.database().collection("guan_du_room").where({ id: id }).update({
                              data: {
                                detail: result.data.rows
                              }
                            })
                          },
                        });
                      }, 1000)
                    })
                  }
                }
              }
              wx.showModal({
                title: '提示',
                content: week + '周数据已加载',
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
          },
        });
      },
    });
  },
  // 光华
  guanghua() {
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
              // 更新西城空闲教室  1.3.5.7.9
              // 一周更新一次
              // let week = 12
              for (let i = 1; i < 8; i++) {//星期
                for (let j = 1; j < 10; j += 2) {//节次
                  for (let k = 1; k < 6; k++) {//分页
                    let roomData = {
                      "xq": i,//星期
                      "zc": week,//周数
                      "jc": "0" + j,//节次
                      "isqy": 1,
                      "curzc": 12,
                      "zhzc": 15,
                      "xnxqdm": 202101,//学年学期
                      "szxqdm": 2,//校区代码  1为官渡  2为光华  102940570为西城
                      "ssgnqdm": "",
                      "ssjzwdm": "",
                      "jxcddm": "",
                      "page": k,//分页
                      "rows": 20,
                      "sort": "jxcdbh",
                      "order": "asc",//排序
                    }
                    let id = new Date().getTime() + k
                    wx.cloud.database().collection("guang_hua_room").add({
                      data: {
                        id: id,
                        week: week,
                        xq: i,
                        jc: j,
                        page: k
                      }
                    }).then(res => {
                      setTimeout(() => {
                        wx.request({
                          url: 'https://jwxt.gdupt.edu.cn/teajssqxx!getPlJsDataList.action?primarySort=jxcddm%20desc',
                          data: roomData,
                          header: headers,
                          method: 'POST',
                          dataType: 'json',
                          responseType: 'text',
                          success: (result) => {
                            console.log(result.data.rows);
                            wx.cloud.database().collection("guang_hua_room").where({ id: id }).update({
                              data: {
                                detail: result.data.rows
                              }
                            })
                          },
                        });
                      }, 1000)
                    })
                  }
                }
              }
              wx.showModal({
                title: '提示',
                content: week + '周数据已加载',
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
          },
        });
      },
    });
  },
  // 整理数据
  end() {
    wx.cloud.callFunction({
      name: "getEndData_2"
    }).then(res => {
      console.log("光华成功");
    })
    wx.cloud.callFunction({
      name: "getEngData_1"
    }).then(res => {
      console.log(res);
      console.log("官渡成功");
    })
    wx.cloud.callFunction({
      name: "getEndData",
    }).then(res => {
      console.log("西城成功");
      wx.showModal({
        title: '提示',
        content: '无效教室已清理',
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
    })
  },
  // 清除无效课表
  kbEnd() {
  },
  // 清除过期教室
  delete_after() {
    wx.cloud.callFunction({
      name: "delete_xicheng",
      data: {
        week: week
      }
    }).then(res => {
      console.log("西城成功");
      wx.cloud.callFunction({
        name: "delete_guandu",
        data: {
          week: week
        }
      }).then(res => {
        console.log("官渡成功");
        wx.cloud.callFunction({
          name: "delete_guanghua",
          data: {
            week: week
          }
        }).then(res => {
          console.log("光华成功");
          wx.showModal({
            title: '提示',
            content: '过期教室已清理',
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
        })
      })
    })
  },
  // 更新用户课表
  update_kb() {
    // wx.cloud.callFunction({
    //   name: "update_kb",
    // }).then(res => {
    //   console.log(res);
    // })
    wx.showToast({
      title: '未完善',
      icon: 'none',
      image: '',
      duration: 1500,
      mask: false,
      success: (result) => {

      },
    });
  },
  // 修改周次
  week(e) {
    // console.log(e);
    newWeek = e.detail.value
  },
  submit() {
    wx.showModal({
      title: '警告',
      content: '当前为:' + week + '修改为:' + newWeek,
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        if (result.confirm) {
          wx.cloud.database().collection("kb_year").where({ id: 0 }).update({
            data: {
              week: Number(newWeek)
            }
          }).then(res => {
            console.log(res);
          })
        }
      },
    });
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
    this.getDate()
    // this.Cvip()
    // 获取周次
    wx.cloud.database().collection("kb_year").get().then(res => {
      // console.log(res);
      week = res.data[0].week
    })
  },
  // 获取数据
  getDate() {
    wx.cloud.callFunction({
      name: "getDate"
    }).then(res => {
      let totalNum = res.result.data.length
      this.setData({
        totalNum: totalNum
      })
    })
  },
  // 重复vip
  Cvip() {
    wx.cloud.callFunction({
      name: "fleshVip"
    }).then(res => {
      // console.log(res);
      let dataLen = res.result.data.length
      let shiftArr = []
      for (let i = 0; i < dataLen; i++) {
        wx.cloud.database().collection("vip_card").where({ card_user: res.result.data[i].card_user }).get().then(res => {
          // console.log(res);
          if (res.data.length > 1) {
            // shiftArr.push(res.data[i])
            console.log(res);
          }
        })
        // console.log(shiftArr[i]);
      }
      console.log(shiftArr);
    })
  },
  // 更新素拓分
  // update_expand() {
  //   // 查询所有用户数据
  //   wx.cloud.callFunction({
  //     name: "getAllUser"
  //   }).then(res => {
  //     console.log(res);
  //     let infoObj = res.result
  //     let infoLen = infoObj.length
  //     let url = "https://jwxt.gdupt.edu.cn/login!doLogin.action"
  //     let arr = []
  //     for (let i = 0; i < 10; i++) {
  //       setTimeout(() => {
  //         let count = infoObj[i].count
  //         let pwd = infoObj[i].pwd
  //         wx.request({
  //           url: url,
  //           method: 'POST',
  //           success: (res) => {
  //             let tempCooike = res.header['Set-Cookie']
  //             let Tcookie = tempCooike.split(";")
  //             let cookie = Tcookie[0]
  //             let headers = {
  //               "cookie": cookie,
  //               "content-type": "application/x-www-form-urlencoded"
  //             }
  //             let data = {
  //               "account": count,
  //               "pwd": pwd,
  //               "verifycode": ""
  //             }
  //             wx.request({
  //               url: url,
  //               data: data,
  //               header: headers,
  //               method: 'POST',
  //               success: (res) => {
  //                 if (res.data.status == "y") {
  //                   let data = {
  //                     xnxqdm: "",
  //                     page: 1,
  //                     rows: 60,
  //                     sort: "cjsj",
  //                     order: "desc",
  //                   }
  //                   wx.request({
  //                     url: 'https://jwxt.gdupt.edu.cn/xsktsbxx!getYxktDataList.action',
  //                     data: data,
  //                     header: headers,
  //                     method: 'POST',
  //                     success: (res) => {
  //                       // console.log(res);
  //                       let expanObj = res.data.rows
  //                       wx.cloud.database().collection("expand_test").where({ count: count }).get().then(res => {
  //                         if (res.data.length == 0) {
  //                           wx.cloud.database().collection("expand_test").add({
  //                             data: {
  //                               count: count,
  //                               expanObj: expanObj
  //                             }
  //                           })
  //                         }
  //                         else {
  //                           wx.cloud.database().collection("expand_test").where({ count: count }).update({
  //                             data: {
  //                               expanObj: expanObj
  //                             }
  //                           }).then(res => {
  //                             console.log(res);
  //                           })
  //                         }
  //                       })
  //                     },
  //                   });
  //                 }
  //                 else {
  //                   // arr.push(infoObj[i])
  //                   console.log("密码错误",infoObj[i].count);
  //                 }
  //               },
  //             });
  //           },
  //         });
  //       }, 2000)
  //     }
  //     // console.log("过期账号", arr);
  //   })
  // },
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