// pages/more/grade/grade.js
import Data from "../../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select:0,
    loading: false
  },
  /**
   *请求 
   */
  refresh:function(){
    const that = this
    that.setData({
      loading: true
    })
    Data.getGrade({
      success(res) {
        that.setData ({
          grade: res.data
        })
        wx.showToast({
          title: '刷新成功',
          icon: 'none'
        })
        wx.setStorage({
          key: 'grade',
          data: res.data
        })
      },
      complete(res) {
        wx.stopPullDownRefresh()
        that.setData({
          loading: false
        })
      }
    })
  },

  /**
   * select
   */
  showNow: function(){
    this.setData({
      select: 0
    })
  },
  showAll:function(){
    this.setData({
      select: 1
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    let year = ''
    year = year + Data.getWeek().term[0]
    const term = Data.getWeek().term[1]
    that.setData({
      term: year + term
    })
    wx.getStorage({
      key: 'grade',
      success(res) {
        that.setData ({
          grade: res.data
        })
      },
      fail(res) {
        wx.startPullDownRefresh()
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
    if (this.data.loading == true) {
      wx.showToast({
        title: '数据加载中，请勿频繁刷新',
        icon: 'none',
        duration: 2000
      })
    } else {
      this.refresh()
    }
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