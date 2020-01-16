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
  refresh: function (options) {
    const that = this;
    Data.getFeedback({
      data: {
        user: wx.getStorageSync("user").userID,
        token: wx.getStorageSync("token")
      },
      success(res){
        that.setData({
          feedback: res.data.data
        })
      }
    })
  },

  /**
   *
   */
  delMsg: function (options){
    const id = options.currentTarget.dataset.msgid;
    const that = this;
    wx.showModal({
      title: '是否删除数据？',
      content: '',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#FD563C',
      success: function(res) {
        if(res.confirm){
          Data.delFeedback({
            data:{
              user: wx.getStorageSync("user").userID,
              id: id,
              token: wx.getStorageSync("token")              
            },
            success(res){
              that.refresh()
            }
          })                
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.refresh();
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
    this.refresh();
    wx.stopPullDownRefresh();
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