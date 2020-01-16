// pages/more/attendance/attendance.js
import Data from "../../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  /**
   *
   */
  refresh:function(){
    const that = this

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    wx.getStorage({
      key: 'info',
      success(res) {
        that.setData({
          userName: res.data[1][1]
        })
      },fail(res){
        Data.getInfo({
          success(res){
            wx.setStorage({
              key: 'info',
              data: res.data.data,
            })
            that.setData({
              userName: res.data.data[1][1]
            })
          }
        })
      }
    })
    const term = Data.getWeek().term[0] + Data.getWeek().term[1]
    const attendance =wx.getStorageSync('attendance') || null
    this.setData({
      term,
      attendance
    })
    if (this.data.attendance == null || !this.data.attendance) {
      wx.startPullDownRefresh()
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
    this.refresh()
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