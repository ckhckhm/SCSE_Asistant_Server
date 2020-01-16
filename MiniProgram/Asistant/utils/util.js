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






const getStatus = (options) => wxRequest(options, host + "api")


/**
 * 数据处理
 */

const format = (ary, week) => {
  for (var i = 0; i < ary.length; i++) {
    ary[i].unshift(classtime()[i]);
  }
  for (var i = 0; i < ary.length; i++) {
    for (var j = 0; j < ary[i].length; j++) {
      if (ary[i][j] && ary[i][j].length == 1) {
        const sameTime = ary[i][j][0].length
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

const getColortable = (ary, week) => {
  let colortable = new Array(ary.length);
  let newary = new Array(ary.length);
  for (var i = 0; i < ary.length; i++) {
    colortable[i] = new Array(ary[i].length);
    newary[i] = new Array(ary[i].length);
  }
  let m = parseInt(Math.random() * 5)

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


const getWeek = () => {
  const year = new Date().getFullYear()
  let today = new Date(formatTime(new Date()).simpledate);
  let term;
  let schoolstart;
  let nextSchoolstart;

  const tdate = Date.parse(today) + 1
  const ldate = Date.parse(new Date(year + "/3/4"))
  const ndate = Date.parse(new Date(year + "/9/2"))
  /**
   * 
   */

  if (tdate > ldate && tdate < ndate) {
    schoolstart = new Date(year + "/3/2");
    nextSchoolstart = new Date(year + "/9/2");
    term = [year - 1 + '-' + year + '学年', '第二学期']
  } else if (today < ldate) {
    schoolstart = new Date(year - 1 + "/9/2");
    nextSchoolstart = new Date(year + "/3/2");
    term = [year - 1 + '-' + year + '学年', '第一学期'];
  } else {
    schoolstart = new Date(year + "/9/2");
    nextSchoolstart = new Date((year + 1) + "/3/2");
    term = [year + '-' + (year + 1) + '学年', '第一学期']
  }
  let startweekday = schoolstart.getDay();
  let startweek = 6 - startweekday; 
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
  getDateList
}