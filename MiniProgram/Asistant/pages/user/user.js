import Data from "../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    list: [
      {
        name: 'guide',
        zh: '使用说明'
      },
      {
        name: 'update',
        zh: '更新日志'
      },
      {
        name: 'relation',
        zh: '关于我们'
      }
    ]
  },
  /**
   *
   */
  exit: function (options) {
    const app = getApp()
      this.setData({
        status: 0,
        userID: '' ,
      })
      wx.clearStorageSync();      
      wx.setStorage({
        key: 'status',
        data: 0,
        success(){
          wx.showToast({
            title: '成功解绑',
            icon: 'none',
            image: '',
            duration: 2000,
            mask: true,
            success: function(res) {
              app.login({})
            },
            fail: function(res) {},
            complete: function(res) {},
          })
        }
      })

  },

  login:function(){
    if(this.data.status==0){
      wx.navigateTo({
        url: 'login/login',
      })
    }else{
      wx.navigateTo({
        url: 'user/detail',
      })
    } 
  },

  /**
   * 跳转
   */
  navigator: function (options) {
    const name = options.currentTarget.id;
    const admin = wx.getStorageSync("admin") || false
      if( (name == 'information' || name == 'voting') && admin == false) {
        wx.showToast({
          title: '敬请期待',
          icon: 'none'
        }) 
      }else{
        wx.navigateTo({
          url: name + '/' + name
        })
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
    const that = this;
    wx.getStorage({
      key: 'status',
      success: function (res) {
        if(res.data==1){
          const userID = wx.getStorageSync('user').userID
          const userClass = wx.getStorageSync('info')
          const admin = wx.getStorageSync('admin')
          that.setData({
            userID,
            admin,
            userClass
          })
        }
        that.setData({
          status: res.data,
        })
      }
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