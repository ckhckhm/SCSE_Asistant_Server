import Data from "../../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false
  },



  select: function (options) {
    wx.navigateTo({
      url: 'detail?idx=' + options.currentTarget.dataset.idx
    })
  },

  count: function (options) {
    const length = options.length
    let gradeCount = new Array (length)
    for(var i=0; i<length; i++) {
      let count = 0;
      for(var j=1; j<options[i][2].length-1; j++) {
        if (options[i][2][j][3]==null){
          count = null;
          break;
        } else if (options[i][2][j][2] == 100){
          count = count + ( Number(options[i][2][j][3]) * parseInt(options[i][2][j][1]) / 100.0 )
        }else {
          count = count + Number(options[i][2][j][3])
        }
      }
      if(count == null){

      }else{
        gradeCount[i] = count.toFixed(1);
      }
    }
    this.setData({
      behavior: options,
      gradeCount
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    wx.getStorage({
      key: 'behavior',
      success(res) {
        that.count(res.data)
      },
      fail() {
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
    if(this.data.loading == true){
      wx.showToast({
        title: '数据加载中，请勿频繁刷新',
        icon: 'none',
        duration: 2000
      })
    }else{
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