import Data from "../../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },


  
  rePaint: function () {
    const bill = wx.getStorageSync("bill")
    const length = bill.Amount_paid.length
    var term = new Array(length)
      var count = new Array(length)
      for (var i = 0; i < length; i++) {
        count[i] = new Array()
        term[i] = bill.Amount_paid[i][0]
        let monthCount = 0;
        let j = 0;
        if( bill.Amount_used[i] != null ) {
          while (j < bill.Amount_used[i].length) {
            monthCount = monthCount + parseFloat(bill.Amount_used[i][j][1]);
            j++;
          }
          count[i].push ( monthCount.toFixed(2) )
        }else {
          count[i].push ( (0).toFixed(2) )
        }
        count[i].push(bill.Amount_paid[i][1])
        count[i].push((bill.Amount_paid[i][1] - count[i][0]).toFixed(2) )
      }
      this.setData({
        select: 0,
        bill,
        count,
        term,
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    wx.getStorage({
      key: 'bill',
      success() {
        that.rePaint()
      },
      fail() {
        wx.startPullDownRefresh()
      }
    })
  },

  btn: function (options) {
    const select = options.detail.value
    this.setData({
      select
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