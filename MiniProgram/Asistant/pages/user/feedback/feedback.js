import Data from "../../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    admin: false,
    formData:'',
    formRelation: ''
  },
  submit: function (options){
    wx.showLoading({
      title: '',
    })
    const that = this;
    const relation = options.detail.value.relation
    const content = options.detail.value.content
    const type = options.detail.value.type
    if(content && content.length >4){
      Data.submitFeedback({
        data: {
          ContactInformation: relation,
          text: content,
          Type: type,
          token: wx.getStorageSync('token')
        },
        success(res) {
          that.setData({
            formData: '',
            formRelation: ''
          })
          wx.hideLoading()
          wx.showModal({
            title: '提交成功',
            content: '感谢你提交的问题,后台程序员收到后会努力排查问题并尽快解决',
            showCancel: false,
          })
        }
      })
    }else{
      wx.showToast({
        title: '内容不能少于5个字',
        icon: 'none',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      admin: wx.getStorageSync("admin") || false
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