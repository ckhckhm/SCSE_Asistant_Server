//app.js
App({
  onLaunch: function () {
    this.login({})
    // this.systemInfo = wx.getSystemInfoSync()
    const updateManager = wx.getUpdateManager()
    updateManager.onUpdateReady(function(){
      wx.showModal({
        title: '检测到新版本',
        content: '请点击更新',
        showCancel: false,
        success: function(res) {
          if(res.confirm){
            wx.setStorage({
              key: 'newVersion',
              data: true,
              success(){
                updateManager.applyUpdate()
              }
            })
          }
        },
      })
    })
    const path = wx.getLaunchOptionsSync().scene
    if((path==1007 || path == 1008) && wx.getStorageSync("status") == 0){
      wx.showModal({
        title: '你尚未登录',
        content: '点击前往登录界面',
        showCancel: false,
        success(res){
          wx.navigateTo({
            url: '/pages/user/login/login',
          })
        }
      })
    }
  },

  globalData: {
    userInfo: null,
    server: 1
  },

  login :function (options,load){
    const that = this
    wx.login({
      // 获取token 验证用户身份
      success(res) {
        wx.request({
          url: '',
          data: {
            code: res.code
          },
          method: 'POST',

          header: { 'content-type': 'application/x-www-form-urlencoded' },
          success(res) {
            wx.setStorageSync('token', res.data.token)
            wx.setStorageSync('update', Date.parse(new Date()))
            load && load()
          },
          fail(res){
            wx.showModal({
              title: '服务器维护中',
              content: '请稍后再试',
              showCancel: false
            })
          }
        })
      },fail(res){
        wx.showModal({
          title: '网络异常',
          content: '请检查网络连接',
          showCancel: false
        })
        options.fail && options.fail(res)
      },
      complete(res){
        options.complete && options.complete(res)
      }
    })
  },

  onError: function (e) {
    // const Data = require('/utils/util.js')
    // wx.getStorageSync("status") == 1 && Data.submitFeedback({
    //   data: {
    //     sno: wx.getStorageSync('user').userID,
    //     password: wx.getStorageSync('user').userPwd,
    //     ContactInformation: null,
    //     text: e,
    //     Type: 3,
    //     token: wx.getStorageSync('token')
    //   }
    // })
  }
})