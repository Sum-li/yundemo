// miniprogram/pages/cms/add_article/add_article.js
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

  onadd_article: function(e) {
    var self = this
    var db = wx.cloud.database()
    var path = 'zixun/'+e.detail.value.title
    if (e.detail.value.bianma && e.detail.value.title && e.detail.value.school && self.data.filepath) {
      wx.cloud.uploadFile({
        cloudPath: path,
        filePath: self.data.filepath
      }).then(res => {
        db.collection('article').add({
          data: {
            article_id: res.fileID,
            bianma: e.detail.value.bianma,
            pubtime: db.serverDate(),
            school: e.detail.value.school,
            title: e.detail.value.title
          }
        })
      })
      this.setData({
        value: ''
      })
      wx.showToast({
        title: '添加成功',
      })
    }
  },

  myupload: function() {
    var self = this
    wx.chooseMessageFile({
      success: function (res) {
        self.setData({
          filepath: res.tempFiles[0].path
        })
      }})
  }
})