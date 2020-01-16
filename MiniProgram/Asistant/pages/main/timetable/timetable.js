import Data from "../../../utils/util.js"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    weekcount: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],
    term: true,
    newTerm: false,
    isShow: true,
    isShare: false,
    transfrom: false
  },
  /**
   * 简
   */
  share: function (options) {
    if(this.data.isShare){
       this.setData({
         isShare: !this.data.isShare
       })
      wx.setNavigationBarTitle({
        title: '第' + this.data.week + '周',
      })
      wx.setStorageSync('isShare', false)
    }else{
      let shareColor = Data.getColortable(this.data.timetable, 0);
      this.setData({
        isShare: !this.data.isShare,
        shareColor
      })
      wx.setNavigationBarTitle({
        title: '简约课表',
      })
      wx.setStorageSync('isShare', true)
    }
  },
  /**
   * 显示选择周数
   */
  showSelectWeek: function (options) {
    const transfrom = this.data.transfrom
    const height = this.data.winHeight
    const width = this.data.winWidth
    const that = this;
    if(transfrom){
      this.setData({
        height: height - (width / 750) * 95,
        transfrom: !transfrom
      })
      if(this.data.term == false) {
        wx.showModal({
          content: '是否返回本学期课表',
          success(res) {
            if (res.confirm) {
              that.exchang()
            }
          }
        })
      }
      else {
        wx.showModal({
          content: '是否返回本周课表',
          success(res) {
            if(res.confirm) {
              that.selectWeek(that.data.week)
            }
          }
        })
      }
    }else{
      this.setData({
        height: height - (width / 750) * 215 ,
        transfrom: !transfrom
      })
    }
  },
  /**
   * 选择周数
   */
  selectWeek: function(options){
    let id = typeof(options) == 'number'? options : parseInt(options.detail.value) + 1;
    this.setData({
      selectWeek: id
    })
    const that = this
    if(this.data.term){
      this.refresh(true)
      wx.setNavigationBarTitle({
        title: '第' + that.data.selectWeek + '周',
      })
    }else{
      this.refresh(false)
    }
  },

  /**
   * 选择周数->课表刷新
   */
  refresh: function (term) {
    const that = this;
    let today = (new Date()).getDay()+1;
    const dateList = Data.getDateList(this.data.selectWeek, term).dateList    
    let weekday = Data.weekday;
    if(term){
      var timetable = wx.getStorageSync("timetable");
    }else{
      var timetable = wx.getStorageSync("newTimetable");
    }
    timetable = Data.format(timetable, this.data.selectWeek)
    let colortable = Data.getColortable(timetable, this.data.selectWeek);
    wx.getStorage({
      key: 'grade',
      success: function(res) {
        const subjectCode = Data.getSubjectCode(timetable);
        that.setData({
          subjectCode
        })
      },
      fail() {
        Data.getGrade({
          success(res) {
            wx.setStorage({
              key: 'grade',
              data: res.data,
              success() {
                const subjectCode = Data.getSubjectCode(timetable);
                that.setData({
                  subjectCode
                })
              }
            })
          },
          fail(res) { }
        })
      }
    })    
    this.setData({ today, weekday, timetable, colortable, dateList});
  },
/**
 * 点击刷新课表数据
 */
  reset: function (options) {
    const that = this
    that.setData({
      load: true
    })
    Data.getTimetable({
      success(resNow) {
        // 新课表待独立
        Data.getNewTimetable({
          success(res) {
            wx.setStorage({
              key: 'newTimetable',
              data: res.data.timetable,
              success(res) {
                that.setData({
                  newTerm: true
                })
              }
            })
          },
          fail(res){

          }
        })
        wx.setStorage({
          key: 'timetable',
          data: resNow.data.timetable,
          success(res) {
            that.setData({
              selectWeek: that.data.week,
              scrollweek: "week",
              term: true
            })
            that.refresh(true)
            wx.setNavigationBarTitle({
              title: '第' + that.data.week + '周',
            })
            wx.showToast({
              title: '刷新成功',
              icon: 'none'
            })
            
          }
        })
      },
      fail(res){
        wx.showToast({
          title: '刷新失败',
          icon: 'none'
        })
      },
      complete(res){
        that.setData({
          load: false
        })
      },
      error(){
        that.setData({
          load: false
        })
      }
    })
  },
  /**
   * 更换新旧学期课表
   */
  exchang: function () {
    const that = this
    if(this.data.newTerm){
      let term = !that.data.term
      if (term) {
        that.setData({
          selectWeek: that.data.week,
          scrollweek: "week",
          term
        })
        that.refresh(term)
      } else {
        that.setData({
          selectWeek: 1,
          scrollweek: "idx1",
          term
        })
        wx.getStorage({
          key: 'newTimetable',
          success(res) {
            that.refresh(term)
          }
        })
        wx.setNavigationBarTitle({
          title: '新学期课表',
        })
      }
    }else{
      wx.showToast({
        title: '新学期课表尚未公布',
        icon: 'none',
        duration: 2000,
      })
    }
  },

  show: function (options) {
    this.setData({
      isShow: !this.data.isShow
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    const res = wx.getSystemInfoSync()
    const height = res.windowHeight;
    const width = res.windowWidth;
    const sHeight = height * 12 * 98 * 10 / 1000000 
    const backHeight = height * 0.04  
    const week = Data.getWeek().week;
    if(week > 20) {
      wx.setNavigationBarTitle({
        title: '课表',
      })
    }else {
      wx.setNavigationBarTitle({
        title: '第' + week + '周',
      })
    }
    this.setData({
      winWidth: width,
      winHeight: height,
      height: height - (width / 750) * 100,
      sHeight,
      backHeight,
      week,
      selectWeek: week,
      scrollweek: "week",
    })
    that.refresh(true);
    // that.isNew()
  },

  isNew: function () {
    const that = this
    Data.getNewTimetable({
      success(res) {
        wx.setStorage({
          key: 'newTimetable',
          data: res.data.timetable,
          success() {
            that.setData({
              newTerm: true
            })
            // that.showSelectWeek()
          }
        })
      },
      fail(res) {
        console.log("新课表未出")
        if (res.data.code && res.data.code == 404 && wx.getStorageSync("newTimetable")) {
          that.setData({
            newTerm: true
          })
        }else{
          wx.getStorage({
            key: 'newTimetable',
            success: function(res) {
              that.setData({
                newTerm: true
              })
            },
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const that = this
    wx.getStorage({
      key: 'isShare',
      success(res) {
        if(res.data == true) {
          that.share()
        }
      },
    })
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