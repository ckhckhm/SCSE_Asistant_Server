  import Data from "../../../utils/util.js"
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
    const that = this
    wx.getStorage({
      key: 'booklist',
      success: function(res) {
        that.setData({
          booklist: res.data.data,
          term: res.data.term
        })
      },
      fail(res){
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
    const that = this 
    Data.getBooklist({
      success(res){
        that.setData({
          booklist: res.data.data,
          term: res.data.term
        })
        wx.showToast({
          title: '刷新成功',
          icon: 'none'
        })
        wx.setStorage({
          key: 'booklist',
          data: res.data
        })
      },
      complete(){
        wx.stopPullDownRefresh()
      }
    })
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