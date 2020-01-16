import Data from "../../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message : ["课程代码","课程名称","考试日期","考试时间","考场编码","考场名称","考试座位","考试状态"],

  },
  /**
   *陈列细节 
   */

  showDetail: function (options) {
    let id = options.currentTarget.id
    const oldID = this.data.id
    if(id == oldID){
      id = null;
    }
    this.setData({
      id,
    })
  },


  formatColor: function (options) {
    const hour = 3600 * 1000;
    const second = 60 * 1000;
    let timeColor = new Array()
    const advance = (date, time) => {
      const hour = 3600 * 1000;
      const second = 60 * 1000;
      const now = Date.parse(new Date()); //现在
      const examDate = Date.parse(new Date(date)); //考试当天0点 
      const timeStr = time.split(":");
      const overTime = parseInt(timeStr[0]) * hour + parseInt(timeStr[1]) * second;
      if (examDate - 24 * hour < now && now < examDate) {
        timeColor.push("orange")
      } else if (examDate < now && now < (examDate + overTime)) {
        timeColor.push("#51b5a7")
      } else if (now > (examDate + overTime)) {
        timeColor.push("#888888")
      } else {
        timeColor.push("#6173a1")
      }
    }
    for (var i in options) {
      let date = options[i][2].replace(/-/g, "/")
      let time = options[i][3].split("-")
      advance(date, time[1])
    }
    this.setData({
      exam: options,
      timeColor
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    wx.getStorage({
      key: 'info',
      success(res) {
        that.setData({
          info: res.data
        })
      }, fail(res) {
        Data.getInfo({
          success(res) {
            wx.setStorage({
              key: 'info',
              data: res.data.data,
            })
            that.setData({
              info: res.data.data
            })
          }
        })
      }
    })
    wx.getStorage({
      key: 'exam',
      success(res) {
        that.formatColor(res.data)
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