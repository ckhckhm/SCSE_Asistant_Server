const host = ''
const hosts = ''

//上课时间
const classtime = () => {
  return ["09:00 - 10:20", "10:40 - 12:00", "12:30 - 13:50", "14:00 - 15:20", "15:30 - 16:50", "17:00 - 18:20", "19:00 - 20:20", "20:30 - 21:50"]
}
const classover = [10 * 3600 + 20 * 60, 12 * 3600, 13 * 3600 + 50 * 60, 15 * 3600 + 20 * 60, 16 * 3600 + 50 * 60, 18 * 3600 + 20 * 60, 20 * 3600 + 20 * 60, 21 * 3600 + 50 * 60]

//星期
const weekday = ["", "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]

//课表颜色表
const color = ["#a8d640", " #ff8793", "#3cd3aa", "#ba94e7", "#ffa844", "#f860a7", "#51b5a7", "#6eaed8", "#836feB", "#e9967a", "#5684ec"]

/**
 * 数据请求
 */
const wxRequest = (options, url) => {
  const app = getApp()
  const that = this
  const load = () => wx.request({
    url: url,
    method: options.method || 'POST',
    data: options.data || {
      username: wx.getStorageSync("user").userID,
      password: wx.getStorageSync("user").userPwd,
      token: wx.getStorageSync("token")
    },
    header: {
      'content-type': options.headerType || 'application/x-www-form-urlencoded'
    },
    success: (res) => {
      console.log("请求接口:", url, res)
      console.log(res.data.success == true && res.data.code == 1)
      if (res.statusCode == 200) {
        if (res.data.success == true && res.data.code == 1) {
          options.success && options.success(res);
        } else if (res.data.success == false) {
          if (options.fail) {
            options.fail(res)
          } else {
            wx.showModal({
              content: res.data.err_msg,
              showCancel: false
            })
          }
        }

        switch (res.data.code) {
          case -1:
            console.log(-1);
            break;
          case -2:
            console.log(-2);
            break;
          case -3:
            console.log(-3);
            break;
          case -4:
            console.log(-4);
            break;
          case -5:
            wx.showModal({
              content: res.data.err_msg,
              showCancel: false
            })
            break;
          case -6:
            console.log(-6);
            options.dataRepeat && options.dataRepeat();
            options.searchNone && options.searchNone();
            break;
          case -7:
            console.log(-7);
            options.exceed && options.exceed(res);
            break;
          case -8:
            console.log(-8);
            break;
        }
      } else {
        wx.showToast({
          title: '服务器异常',
          icon: 'none'
        })
      }
    },
    fail: (res) => {
      if (options.fail) {
        options.fail(res)
      } else {
        wx.showModal({
          title: '加载异常',
          content: '请检查网络后再连接',
          showCancel: false
        })
        console.log(res)
      }
    },
    complete: (res) => {
      options.complete && options.complete(res)
    }
  })
  if (app.globalData.server == -2 && !options.data) {
    options.error && options.error()
    wx.stopPullDownRefresh()
    wx.showToast({
      title: '服务器维护中',
      icon: 'none'
    })
  } else {
    if (update()) {
      load()
    } else {
      app.login(options, load)
    }
  }
}

/**
 * Myscse
 */

//登陆
const getStatus = (options) => wxRequest(options, host + "api")
//保存登录
const saveStatus = (options) => wxRequest(options, host + "api/api")
//个人信息
const getInfo = (options) => wxRequest(options, host + "studentinfo")
//成绩
const getGrade = (options) => wxRequest(options, host + "mark/info")
//课表
const getTimetable = (options) => wxRequest(options, host + "timetable")
//新学期课表
const getNewTimetable = (options) => wxRequest(options, host + "timetable/new")
//考勤
const getAttendance = (options) => wxRequest(options, host + "attendance/info")
//平时成绩
const getBehavior = (options) => wxRequest(options, host + "usual/grades")
//考试安排
const getExam = (options) => wxRequest(options, host + "exam/info")
//书单
const getBooklist = (options) => wxRequest(options, host + "books/list")
//费用
const getBill = (options) => wxRequest(options, host + "charge/details")

const getMeuns = (options) => wxRequest(options, host + "main/menus")
//老师电话查询
const getTeacherPhone = (options) => wxRequest(options, host + "api/teacher")
//通知
const getNotice = (options) => wxRequest(options, host + "msg")
const setNotice = (options) => wxRequest(options, host + "msg/push")
/**
 * 其他数据
 */
//Cet准考证储存
const submitCet = (options) => wxRequest(options, hosts + "cet")
//Cet准考证获取
const getCet = (options) => wxRequest(options, hosts + "cet/get")
//Cet准考证修改
const updateCet = (options) => wxRequest(options, hosts + "cet/update")
//反馈信息提交
const submitFeedback = (options) => wxRequest(options, hosts + "feedback")
//反馈信息获取
const getFeedback = (options) => wxRequest(options, hosts + "feedback/admingetinfo")
//反馈信息删除
const delFeedback = (options) => wxRequest(options, hosts + "feedback/deleteitem")
//拾卡数据添加
const addFound = (options) => wxRequest(options, hosts + "findcard")
//拾卡数据删除
const delFound = (options) => wxRequest(options, hosts + "findcard/delete")
//个人拾卡数据
const getMyFound = (options) => wxRequest(options, hosts + "findcard/getinfo")
//全部拾卡数据
const getAllFound = (options) => wxRequest(options, hosts + "findcard/get")
//失卡数据添加
const addLost = (options) => wxRequest(options, hosts + "lostcard")
//失卡数据删除
const delLost = (options) => wxRequest(options, hosts + "lostcard/delete")
//个人失卡数据
const getMyLost = (options) => wxRequest(options, hosts + "lostcard/getinfo")
//全部失卡数据
const getAllLost = (options) => wxRequest(options, hosts + "lostcard/get")
//搜索卡
const searchCard = (options) => wxRequest(options, hosts + "api/query")

/**
 * 数据处理
 */
//课表统一
const format = (ary, week) => {
  for (var i = 0; i < ary.length; i++) {
    ary[i].unshift(classtime()[i]);
  }
  for (var i = 0; i < ary.length; i++) {
    for (var j = 0; j < ary[i].length; j++) {
      if (ary[i][j] && ary[i][j].length == 1) {
        const sameTime = ary[i][j][0].length //同一时间不同课程
        for (var k = 0; k < sameTime; k++) {
          if (ary[i][j][0][k][4].find((value) => value == week) && ary[i][j][0][k][2] != "在线课") {
            const aryTemp = ary[i][j][0][k]
            ary[i][j] = new Array(5)
            for (var l = 0; l < aryTemp.length; l++) {
              ary[i][j][l] = aryTemp[l]
            }
            break;
          } else {
            console.log(i, j, k)
          }
        }
      }
    }
  }
  return ary;
}
//课表日期列表
const getDateList = (week, term) => {
  let schoolstart;
  if (term) {
    schoolstart = getWeek().schoolstart
  } else {
    schoolstart = getWeek().nextSchoolstart
  }
  schoolstart = Date.parse(schoolstart) + ((week - 1) * 7 - schoolstart.getDay()) * 24 * 3600 * 1000
  let dateList = new Array(8)

  for (var i = 0; i < 7; i++) {
    const date = new Date(schoolstart + i * 24 * 3600 * 1000)
    let month = date.getMonth() + 1;
    month = month > 9 ? month : '0' + month
    let day = date.getDate();
    day = day > 9 ? day : '0' + day
    dateList[i + 1] = month + "-" + day
  }
  return {
    dateList
  };
}
//获取课程代码
const getSubjectCode = (timetable) => {
  const grade = wx.getStorageSync("grade")
  const compulsory = grade.compulsory
  const optional = grade.optional
  var codeAry = new Array(timetable.length);
  for (var i = 0; i < timetable.length; i++) {
    codeAry[i] = new Array(timetable[i].length);
  }
  const find = (subject, ary) => {
    for (var k = 0; k < ary.length; k++) {
      if (ary[k][1] == subject) {
        codeAry[i][j][0] = ary[k][0]
      }
    }
  }
  const findDouble = (subject, ary) => {
    for (var k = 0; k < ary.length; k++) {
      if (ary[k][1] == subject) {
        codeAry[i][j][1] = ary[k][0]
      }
    }
  }
  const findCompulsory = (compulsory, subject, subject2) => {
    if (subject2) {
      for (var l = 0; l < compulsory.length; l++) {
        findDouble(subject2, compulsory[l])
      }
    } else {
      for (var l = 0; l < compulsory.length; l++) {
        find(subject, compulsory[l])
      }
    }

  }

  for (var i = 0; i < timetable.length; i++) {
    for (var j = 1; j < timetable[i].length; j++) {
      if (timetable[i][j] && timetable[i][j].length == 5) {
        codeAry[i][j] = new Array(1)
        findCompulsory(compulsory, timetable[i][j][0], false)
        optional && find(timetable[i][j][0], optional)

      } else if (timetable[i][j] && timetable[i][j].length == 1) {
        codeAry[i][j] = new Array(2)
        compulsory && findCompulsory(compulsory, timetable[i][j][0][0][0], false)
        compulsory && findCompulsory(compulsory, timetable[i][j][0][0][0], timetable[i][j][0][1][0])
        optional && find(timetable[i][j][0][0][0], optional)
        optional && findDouble(timetable[i][j][0][1][0], optional)

      }
    }
  }
  return codeAry;
}
//获取当日课表
const getSchedule = (week, today) => {
  const ary = format(wx.getStorageSync("timetable"), week)
  let schedule = new Array()
  for (var i = 0; i < ary.length; i++) {
    if (ary[i][today] && ary[i][today].length == 5) {
      if (ary[i][today][4].find((value) => value == week)) {
        ary[i][today].push(i)
        schedule.push(ary[i][today])
      }
    }
  }
  return schedule;
}
//颜色//颜色表与课表下标对应
const getColortable = (ary, week) => {
  let colortable = new Array(ary.length);
  let newary = new Array(ary.length);
  for (var i = 0; i < ary.length; i++) {
    colortable[i] = new Array(ary[i].length);
    newary[i] = new Array(ary[i].length);
  }
  let m = parseInt(Math.random() * 5) //随机颜色

  for (var i = 0; i < ary.length; i++) {
    for (var j = 1; j < ary[i].length; j++) {
      if (ary[i][j] && ary[i][j].length == 5) {
        newary[i][j] = ary[i][j][0]
      }
    }
  }
  for (var i = 0; i < ary.length; i++) {
    for (var j = 1; j < ary[i].length; j++) {
      if (newary[i][j]) {
        var ex = newary[i][j];
        newary[i][j] = null;
        colortable[i][j] = color[m];
        for (var k = 0; k < 8; k++) {
          var idex = newary[k].findIndex((value) => value == ex)
          if (idex == -1) {

          } else {
            newary[k][idex] = null;
            colortable[k][idex] = color[m];
            k -= 1;
          }
        }
        if (m == color.length - 1) {
          m = 0;
        } else {
          m++;
        }
      }
    }
  }
  if (week == 0) {

  } else {
    for (var i = 0; i < ary.length; i++) {
      for (var j = 1; j < ary[i].length; j++) {
        if (ary[i][j] && ary[i][j].length == 5) {
          if (!colortable[i][j]) {
            colortable[i][j] = color[m];
            if (m == color.length - 1) {
              m = 0;
            } else {
              m++;
            }
          } else if (!ary[i][j][4].find((value) => value == week)) {
            colortable[i][j] = "#ccc";
          }
        }
      }
    }
  }
  return colortable;
}
/**
 * 获取日期列表与简化日期格式(如：2017/6/29)
 */
const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  const weekday = date.getDay();
  const simpledate = year + "/" + month + "/" + day;
  const showdate = `${year}-${month > 9 ? month : '0' + month}-${day > 9 ? day : '0' + day}`
  const time = hour * 60 * 60 + minute * 60 + second;
  return {
    simpledate,
    time,
    showdate
  };
}
//token更新
const update = () => {
  const date = new Date(formatTime(new Date()).simpledate);
  const tdate = Date.parse(date) + 3 * 3600 * 1000;
  const ydate = tdate - 24 * 3600 * 1000;
  const now = Date.parse(new Date())
  const update = wx.getStorageSync('update')
  if (now < tdate && update > ydate) {
    return true;
  } else if (update > tdate) {
    return true;
  } else {
    return false;
  }
}

//按开学日期获取当前周数、星期(返回下标)
const getWeek = () => {
  const year = new Date().getFullYear()
  let today = new Date(formatTime(new Date()).simpledate);
  let term;
  let schoolstart;
  let nextSchoolstart;
  /***
   * 临时修改
   */
  const tdate = Date.parse(today) + 1
  const ldate = Date.parse(new Date(year + "/3/9"))
  const ndate = Date.parse(new Date(year + "/9/14"))
  /**
   *
   */

  if (tdate > ldate && tdate < ndate) {
    schoolstart = new Date(year + "/3/9");
    nextSchoolstart = new Date(year + "/9/14");
    term = [year - 1 + '-' + year + '学年', '第二学期']
  } else if (today < ldate) {
    schoolstart = new Date(year - 1 + "/9/14");
    nextSchoolstart = new Date(year + "/3/9");
    term = [year - 1 + '-' + year + '学年', '第一学期'];
  } else {
    schoolstart = new Date(year + "/9/14");
    nextSchoolstart = new Date((year + 1) + "/3/9");
    term = [year + '-' + (year + 1) + '学年', '第一学期']
  }
  let startweekday = schoolstart.getDay();
  let startweek = 6 - startweekday; //开学当周天数
  let week = (((today - schoolstart) / 24 / 60 / 60 / 1000) - startweek) / 7;
  week = Math.ceil(week) + 1;
  console.log(term)
  return {
    week,
    term,
    schoolstart,
    nextSchoolstart
  }
}

/**
 * 其他数据请求
 */


//
module.exports = {
  update,
  classtime,
  classover,
  weekday,
  formatTime,
  format,
  getWeek,
  getSubjectCode,
  getDateList,
  getTimetable,
  getNewTimetable,
  getColortable,
  getStatus,
  saveStatus,
  getInfo,
  getGrade,
  getSchedule,
  getMeuns,
  getExam,
  getAttendance,
  getBehavior,
  getBill,
  getBooklist,
  submitCet,
  updateCet,
  getCet,
  submitFeedback,
  delFeedback,
  getFeedback,
  addFound,
  addLost,
  delFound,
  delLost,
  getMyFound,
  getMyLost,
  getAllFound,
  getAllLost,
  searchCard,
  getTeacherPhone,
  getNotice,
  setNotice
}