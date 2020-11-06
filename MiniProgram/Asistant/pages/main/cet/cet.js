import Data from '../../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cet: ''
  },
  input: function (options) {
    this.setData({
      cet: options.detail.value
    })
  },
  copy: function (options) {
    const cet = this.data.cet
    if(cet.length == 15){
      wx.setClipboardData({
        data: cet,
        success(res){
          wx.showToast({
            title: '复制成功',
            icon: 'success'
          })
        }
      })
    }else{
      wx.showToast({
        title: '请先保存你的CET准考证',
        icon: 'none'
      })
    }
  },
  submit: function (options) {
    const cet = this.data.cet
    if(cet.length==15){
      wx.showModal({
        title: '请确认是否输入正确',
        content: cet,
        success(res){
          if(res.confirm){
            if (wx.getStorageSync('cet')){
              Data.updateCet({
                data:{
                  sno: wx.getStorageSync('user').userID,
                  CET_num: cet,
                  token: wx.getStorageSync('token')
                },
                success(res) {
                  wx.showToast({
                    title: '保存成功',
                    icon: 'success'
                  })
                  wx.setStorage({
                    key: 'cet',
                    data: cet,
                  })
                },
                fail() {
                  wx.showToast({
                    title: '保存失败',
                    icon: 'none'
                  })
                },
                exceed(res){
                  wx.showModal({
                    title: '保存的次数过多',
                    content: '请联系客服解决',
                    showCancel: false,
                  })
                }
              })
            }else{
              Data.submitCet({
                data: {
                  sno: wx.getStorageSync('user').userID,
                  CET_num: cet,
                  CET_type: 1,
                  token: wx.getStorageSync('token')
                },
                success(res) {
                  wx.showToast({
                    title: '保存成功',
                    icon: 'success'
                  })
                  wx.setStorage({
                    key: 'cet',
                    data: cet,
                  })
                },
                fail() {
                  wx.showToast({
                    title: '保存失败',
                    icon: 'none'
                  })
                }
              })
            }
          }
        }
      })
    }else{
      wx.showModal({
        title: '保存失败',
        content: '请输入15位数的准考证号',
        showCancel: false,
      })
    } 
  },
  retrieve: function (options){
    wx.navigateTo({
      url: '../password/password'
    })
  },
  method: function (options) {
    const id = options.currentTarget.id
    switch (id) {
      case '1': {
        // wx.navigateToMiniProgram({
        //   appId: 'wxed549e2b383ce84d',
        //   path: 'pages/collegeEnglishTest/index/index',
        //   fail() {
        //     wx.showModal({
        //       title: '打开失败',
        //       content: '请手动搜索“华软四六级查询助手”',
        //       showCancel: false,
        //     })
        //   }
        // })
        wx.showToast({
          title: '查询渠道1尚未开通',
          icon: 'none'
        })
      }; break;
      case '2': {
        wx.showToast({
          title: '查询渠道2尚未开通',
          icon: 'none'
        })
      }; break;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    wx.getStorage({
      key: 'cet',
      success(res) {
        that.setData({
          cet: res.data
        })
      },
      fail(res){
        Data.getCet({
          data:{
            sno: wx.getStorageSync('user').userID,
            token: wx.getStorageSync('token')
          },
          success(res){
            if(res.data.code != -6){
              that.setData({
                cet: res.data.data.CET_num
              })
              wx.setStorage({
                key: 'cet',
                data: res.data.data.CET_num,
              }) 
            }
          }
        })
      }
    })
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