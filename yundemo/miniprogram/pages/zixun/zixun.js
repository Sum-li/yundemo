const app = getApp()

// pages/zixun/zixun.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "imgUrls": ['../../myicon/lizhi1.jpg', '../../myicon/lizhi2.jpg', '../../myicon/lizhi3.jpg', '../../myicon/lizhi4.jpg']
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

  },
  onPullDownRefresh: function() {
    wx.stopPullDownRefresh()
  },
  onnavigate1: function() {
    wx.navigateTo({
      url: 'zixuninfo/zixuninfo'
    })
  },
  onnavigate2: function () {
    wx.navigateTo({
      url: 'zixuntrend/zixuntrend'
    })
  },
  onnavigate3: function () {
    wx.navigateTo({
      url: 'zixunsum-up/zixunsum-up'
    })
  }
})