// pages/user/user/detail.js
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
        if (res.data == 1) {
          const userID = wx.getStorageSync('user').userID
          const userClass = wx.getStorageSync('info')
          // Data.getInfo({
          //   success(res) {
          //     console.log(res)
          //     wx.setStorage({
          //       data: res.data.data,
          //       key: 'info',
          //     })
          //   }
          // })
          wx.getStorage({
            key: 'details_update',
            success: function (res) {
              console.log(Math.round(new Date() / 1000) - res.data >  86400)
              if (Math.round(new Date() / 1000) - res.data > 86400) {
                wx.setStorage({
                    data: Math.round(new Date() / 1000),
                    key: 'details_update',
                  }),
                  Data.getInfo({
                    success(res) {
                      console.log(res)
                      wx.setStorage({
                        data: res.data.data,
                        key: 'info',
                      })

                      that.setData({
                        userID,
                        userClass: res.data.data
                      })
                    }
                  })
              }
            }
          })
          wx.setStorage({
            data: Math.round(new Date() / 1000),
            key: 'details_update',
          })
          wx.getStorage({
            key: 'info',
            success(res) {
              console.log(res.data)
            }
          })
          // if (new Date())
          // if (userClass == '') {
          //   Data.getInfo({
          //     success(res) {
          //       wx.setStorage({
          //         key: 'info',
          //         data: res.data.data,
          //       })
          //       that.setData({
          //         info: res.data.data
          //       })
          //     }
          //   })
          // }
          that.setData({
            userID,
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