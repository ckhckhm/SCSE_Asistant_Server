// pages/login/login.js
import Data from "../../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clear: 'none', 
    Eye: 'none', 
    isHide: true,
    load: "绑定学号"
  },

  /**
   * 
   */
  showClear: function(options) {
    if (options.detail.value) {
      this.setData({
        clear: 'auto'
      })
    } else {
      this.setData({
        clear: 'none'
      })
    }
  },

  clear: function(options) {
    this.setData({
      clear: 'none',
      Eye: 'none',
    })
  },
  /**
   * 查看密码
   */

  showEye: function(options) {
    if (options.detail.value) {
      this.setData({
        Eye: 'auto'
      })
    } else {
      this.setData({
        Eye: 'none'
      })
    }
  },
  showPwd: function(options) {
    var isHide = !this.data.isHide
    this.setData({
      isHide
    })
  },
  /**
   * 登陆
   */
  login: function(options) {
    var that = this;
    let userID = options.detail.value.userID
    let userPwd = options.detail.value.userPwd
    if (userID && userPwd) {
      that.setData({
        load: ""
      })
      wx.setStorage({
        key: 'user',
        data: {
          userID: userID,
          userPwd: userPwd,
        },
        success(res) {
          wx.showToast({
            title: '为了正在运营的小程序的稳定性，撤销所有服务器请求接口，如需实现登录等操作，请自行配置服务器及请求连接',
            icon: 'none'
          })
        }
      })
    } else {
      wx.showToast({
        title: '请输入账号和密码',
        icon: 'none'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          width: res.screenWidth,
          height: res.screenHeight
        });
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    const that = this
    setTimeout(function() {
      that.setData({
        t: true
      })
    }, 50)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let userID = wx.getStorageSync("user").userID;
    let userPwd = wx.getStorageSync("user").userPwd;
    if (userID && userPwd) {
      this.setData({
        userID,
        userPwd
      })
    } else {
      this.setData({
        userID: "",
        userPwd: ""
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})