// pages/main/teacher/teacher.js
import Data from '../../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    input: "",
    modal: true
  },

  //输入
  input: function (options) {
    let input = options.detail.value
    this.setData({
      input: input
    })
    this.checkDb()
  },

  isModal: function() {
    this.setData({
      modal: true
    })
  },

  copy: function (options) {
    const index = options.currentTarget.dataset.index
    const phone = options.currentTarget.dataset.phone || this.data.result[index][2]
    this.data.modal == false && this.isModal()
    this.record(index)
    wx.setClipboardData({
      data: phone,
      success(res) {
        wx.hideToast()
        wx.showToast({
          title: '已复制：'+phone,
          icon: 'none'
        })
      }
    })
  },

  more: function (options) {
    const index = options.currentTarget.dataset.index
    const phone = this.data.result[index][2]
    this.record(index)
    const more = phone.split("/")
    this.setData({
      modal: false,
      more,
      moreIndex: index
    })
  },

  record: function (index) {
    let history ;
    const name = this.data.result[index][0]
    wx.getStorage({
      key: 'history',
      success(res) {
        history = res.data
        history.unshift(name)
        history = Array.from(new Set(history))
        wx.setStorage({
          key: 'history',
          data: history,
        })
      },
      fail() {
        history = new Array()
        history.unshift(name)
        wx.setStorage({
          key: 'history',
          data: history,
        })
      }
    })
  },

  search: function (options) {
    const value = this.data.input
    const db = wx.getStorageSync("teacherPhone")
    let result = new Array()
    if (value == "") {

    } else {
      for (var i in db) {
        for (var j in db[i]) {
          if (db[i][j][0].search(value) != -1 || db[i][j][1].search(value) != -1) {
            result.push(db[i][j])
          }
        }
      }
    }
    this.setData({
      result
    })
  },

  checkDb: function (options) {
    const that = this
    wx.getStorage({
      key: 'teacherPhone',
      success(res) {
        that.search()
      },
      fail(res) {
        that.getTeacherPhone(true)
      }
    })
  },

  getTeacherPhone: function (options) {
    const that = this
    Data.getTeacherPhone({
      data: {
        token: wx.getStorageSync("token")
      },
      success(res) {
        wx.setStorage({
          key: 'teacherPhone',
          data: res.data.data,
          success(res) {
            options && that.search()
          }
        })
      }
    })
  },

  checkHistory: function (options) {
    this.setData({
      input: options.currentTarget.dataset.input
    }, this.checkDb())
  },

  clearHistory: function (options) {
    this.setData({
      history: []
    })
    wx.removeStorageSync("history")
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTeacherPhone()
    this.setData({
      height: wx.getSystemInfoSync().windowHeight -95,
      history: wx.getStorageSync("history") || ""
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