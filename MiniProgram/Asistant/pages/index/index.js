 import Data from '../../utils/util.js'
 const app = getApp()
 Page({
   /**
    * 页面的初始数据
    */
   data: {
     // 菜单加入动态加载
     main: [{
         name: "timetable",
         zh: "课表",
       },
       {
         name: "grade",
         zh: "成绩"
       },
      {
        name: "cet",
        zh: "四六级"
      }
      , {
        name: "map",
        zh: "地图"
      }
      , {
         name: "password",
         zh: "密码"
       },
       {
         name: "teacher",
         zh: "老师查询"
       }
     ]
   },
   /**
    * 跳转
    */
   navigator: function(options) {
     if (this.data.status == 1) {
       const name = options.currentTarget.id
       switch (name) {
         case 'map':
           {
             wx.previewImage({
               urls: ["https://www.sise.edu.cn/Public/images/map.jpg"],
             })
           };
           break;
          case 'github': {
            wx.setClipboardData({
              data: "https://github.com/ckhckhm/SCSE_Asistant_Server",
              success(res){
                wx.showToast({
                  title: '复制成功',
                  icon: 'success'
                })
              }
            })
        }; break;
         default:
           {
             wx.navigateTo({
               url: '../main/' + name + "/" + name,
             })
           }
       }
     } else if (options.currentTarget.id == 'password') {
       {
         wx.navigateTo({
           url: '../main/password/password',
         })
        }
     } else if (options.currentTarget.id == 'teacher'){
      {
        wx.navigateTo({
          url: '../main/teacher/teacher',
        })
       }
     }  else if (options.currentTarget.id == 'github') {
      wx.setClipboardData({
        data: "https://github.com/ckhckhm/SCSE_Asistant_Server",
        success(res){
          wx.showToast({
            title: '复制成功',
            icon: 'success'
          })
        }
      })
      // wx.showModal({
      //   title: '尚未开放',
      //   content: '敬请期待...',
      //   showCancel: false
      // })
     } else if(options.currentTarget.id == 'map') {
      wx.previewImage({
        urls: ["https://www.sise.edu.cn/Public/images/map.jpg"],
      })
     }
      else {
       wx.navigateTo({
         url: '../user/login/login',
       })
     }
   },
   /**
    * 登陆
    */
   login: function(options) {
     wx.navigateTo({
       url: '../user/login/login',
     })
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function(options) {
     this.checkMeuns();
     this.checkStatus();
     wx.getSystemInfo({
       success: (result) => {console.log(result)},
     })

   },

   checkStatus: function(e) {
     const that = this
     const userClass = wx.getStorageSync('info')
     if (wx.getStorageSync("status") == 1 && userClass == '') {
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
     wx.getStorageSync("status") == 1 && Data.getStatus({
       fail(res) {
         console.log(res.data.status)
         switch (res.data.status) {
           case 0:
             {
               console.log(res.data.status)
               wx.setStorage({
                 key: 'status',
                 data: 0,
                 success() {
                   wx.showModal({
                     content: '密码已更改,请重新登陆',
                     showCancel: false,
                     success(res) {
                       if (res.confirm) {
                         wx.navigateTo({
                           url: '../user/login/login',
                         })
                       }
                     }
                   })
                 }
               })
             };
             break;
           case 1:
             {
               Data.getTimetable({
                 success(res) {
                   wx.setStorage({
                     key: 'timetable',
                     data: res.data.timetable,
                     success() {
                       that.onShow()
                     }
                   })
                 }
               })
             };
             break;
           case 2:
             {
               app.globalData.server = -2;
               wx.showModal({
                 title: '服务器维护中',
                 content: '你仍可以查看上次更新的数据，维护时间内不支持刷新数据',
                 showCancel: false
               })
             }
             break;
            case 3:
              {
                app.globalData.server = -2;
                wx.showModal({
                  title: '服务器高峰限制访问',
                  content: '你仍可以查看上次更新的数据，不支持刷新数据',
                  showCancel: false
                })
              }
              break;
         }
       }
     })
   },

   // 检查当前用户满足的主页菜单
   checkMeuns: function(e) {
    const that = this
    Data.getMeuns({
      success(res) {
        that.setData({
          main: res.data.data
        })
      },

    })
   },

   /**
    * 生命周期函数--监听页面初次渲染完成
    */
   onReady: function() {
     //通知
     const showInform = (options) => {
       console.log(new Date(options.sMsg))
       const id = wx.getStorageSync(options.gMsg) || null
       new Date() >= new Date(options.sMsg) && options.mId != id && wx.showModal({
         title: options.tMsg,
         content: options.mMsg + "\r\n\r\n" + "[发布时间：" + options.sMsg + "]",
         cancelText: "不再提示",
         success(t) {
           if (t.confirm) {

           } else {
             wx.setStorageSync(options.gMsg, options.mId)
           }
         }
       })
     }
     Data.update() && Data.getNotice({
       data: {
         username: wx.getStorageSync("user").userID,
         token: wx.getStorageSync("token")
       },
       success(res) {
         const all = res.data.data.all
         const person = res.data.data.person
         if (all != null && person != null) {
           showInform(all, showInform(person))
         } else if (person != null) {
           showInform(person)
         } else if (all != null) {
           showInform(all)
         }
       },
       fail(res) {

       }
     })
   },

   checkExam: function(e) {
     const hour = 3600 * 1000;
     const min = 60 * 1000;
     const now = Date.parse(new Date()); //现在
     const today = Date.parse(Data.formatTime(new Date()).simpledate) + 24 * hour //当天24点
     let hasExam = new Array();
     const that = this
     const getExam = () => {
       wx.getStorage({
         key: 'exam',
         success(res) {
           for (var i in res.data) {
             let date = res.data[i][2].replace(/-/g, "/")
             let time = res.data[i][3].split("-")
             const examDate = Date.parse(new Date(date));
             const oTimeAry = time[1].split(":");
             const sTimeAry = time[0].split(":");
             const overTime = parseInt(oTimeAry[0]) * hour + parseInt(oTimeAry[1]) * min;
             res.data[i][3] = `${sTimeAry[0]}:${sTimeAry[1]} - ${oTimeAry[0]}:${oTimeAry[1]}`
             if (examDate - 24 * hour < now && now < examDate) {
               //考试前一天
               res.data[i].unshift("0")
               hasExam.push(res.data[i])
             } else if (examDate < now && now < (examDate + overTime)) {
               //考试当天
               res.data[i].unshift("1")
               hasExam.push(res.data[i])
             } else if (examDate + overTime < now && now < examDate + 24 * hour) {
               // examDate + overTime < now && now < examDate + 24 * hour
               //已结束
               // res.data[i].unshift("2")
             } else {
               //未到
               // res.data[i].unshift("-1")
             }

           }
           that.setData({
             hasExam
           })
         },
         fail(res) {
           that.setData({
             hasExam: null
           })
         }
       })
     }
     getExam()
   },
   /**
    * 生命周期函数--监听页面显示
    */
   onShow: function() {
     this.checkExam()
     var that = this;
     const week = Data.getWeek().week;
     const today = (new Date()).getDay() + 1;
     const weekday = " 第" + week + "周 " + Data.weekday[today];
     const dateary = Data.formatTime(new Date());
     const time = dateary.time
     const date = dateary.showdate;
     let classtime = Data.classtime();
     let classover = Data.classover;
     // if (today == 6) {
     //   classtime[3] = '13:20 - 14:40';
     //   classtime[4] = '14:50 - 16:10';
     //   classover[3] = 14 * 3600 + 40 * 60;
     //   classover[4] = 16 * 3600 + 10 * 60;
     // }
     that.setData({
       date,
       weekday,
       today,
       time,
       classtime,
       classover,
       admin: wx.getStorageSync("admin") || false
     })
     wx.getStorage({
       key: 'status',
       success: function(res) {
         const status = res.data
         if (status == 1) {
           that.setData({
             status
           })
           try {
             const schedule = Data.getSchedule(week, today);
             that.setData({
               schedule
             })
           } catch (e) {

             wx.onError(e);
           }
         } else {
           that.setData({
             schedule: null,
             classtime: null,
             hasExam: null,
             time: null,
             classover: null,
             status: 0,
           })
           wx.setStorageSync("status", 0)
         }
       },
       fail() {
         that.setData({
           userID: null,
           schedule: null,
           hasExam: null,
           classtime: null,
           time: null,
           classover: null,
           status: 0,
         })
         wx.setStorageSync("status", 0)
       },
       complete() {

       }
     })

   },

   /**
    * 生命周期函数--监听页面隐藏
    */
   onHide: function() {

   },

   /**
    * 生命周期函数--监听页面卸载
    */
   onUnload: function() {

   },

   /**
    * 页面相关事件处理函数--监听用户下拉动作
    */
   onPullDownRefresh: function() {

   },

   /**
    * 页面上拉触底事件的处理函数
    */
   onReachBottom: function() {

   },

   /**
    * 用户点击右上角分享
    */
   onShareAppMessage: function() {

   }
 })