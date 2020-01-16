//app.js
App({
  onLaunch: function () {
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



  onError: function (e) {

  }
})