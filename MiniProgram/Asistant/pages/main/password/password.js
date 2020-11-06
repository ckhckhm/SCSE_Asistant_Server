// pages/main/password/password.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wifiPwd:[
      ["SISE-WLAN-STU", "SCSE8122"],
      ["SISE-WLAN-TCH", "SISE8122"],
      ["SISE-WLAN-NEWLIB", "SISE8122"]
    ],
    ftpPwd:[
      ["172.16.3.230", "已经使用http协议，浏览器访问http://172.16.3.230"],
      ["172.16.3.240/241/242（下载课件）", "账号=密码：kjdown或者kj"],
      ["kj.sise.com.cn（下载课件）{外网}", "账号=密码：kjdown或者kj"],
      ["kj1.sise.com.cn（下载课件）{外网}", "账号=密码：kjdown或者kj"],
      ["kj2.sise.com.cn（下载课件）{外网}", "账号=密码：kjdown或者kj"],
      ["172.16.3.240/241/242（上传作业）{外网地址同上}", "账号=密码：“upload_” +（教师工号）"]
    ],
    initPwd:[
      ["Myscse/信息系统", "年级+省份代码+准考证号", "如：18+44+0883102383"],
      ["华软邮箱", "身份证后6位", "如第一位为0，则密码为前5位"],
      [ "蝴蝶", "身份证后6位"],
      [ "校园卡初始密码", "身份证后6位"],
      [ "校园卡消费查询", "123456或888888" ],
      [ "新生临时卡密码", "888888" ],
      [ "图书馆查询系统", "0000 "],
      [ 'CA新报修系统', "ca" ]
    ]
  },
  copy: function (options) {
    const pwd = options.currentTarget.dataset.password
    wx.setClipboardData({
      data: pwd,
      success(){
        wx.showToast({
          title: '复制成功',
          icon: 'success'
        })
      },
      fail(){
        wx.showToast({
          title: '复制失败,请手动复制',
          icon: 'none'
        })
      }
    })
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