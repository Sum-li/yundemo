// pages/user/user.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_login: 0,
    userinfo: {},
    task_count: 0,
    is_host: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var self = this
    wx.cloud.callFunction({
      name: 'get_count'
    }).then(res =>{
      self.setData({
        task_count: res.result.count
      })
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

  },

  onuserinfo: function(event) {
    this.setData({
      userinfo: event.detail.userInfo
    })
  },

  onloginevent: function() {
    var self = this
    if (self.data.is_login) {
      self.setData({
        is_login: 0,
        userinfo: {}
      })
    } else {
      wx.cloud.callFunction({
        name: 'login',
        success(res) {
          self.setData({
            is_login: 1,
            task_count: res.result.task_counts,
            is_host: res.result.is_host
          })
        },
        fail:console.error
      })
    }
  },

  ontaskevent: function() {
    wx.switchTab({
      url: '/pages/renwu/renwu',
    })
  },

  onzixunevent:function() {
    wx.navigateTo({
      url: '/pages/zixun/zixuntrend/zixuntrend',
    })
  },

  oncmsevent: function() {
    wx.navigateTo({
      url: '/pages/cms/index',
    })
  }
})