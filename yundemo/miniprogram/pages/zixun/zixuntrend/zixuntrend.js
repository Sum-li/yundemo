// miniprogram/pages/zixun/zixuntrend/zixuntrend.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    school:[],
    article:[],
    mycss: ['myschool','mycss'],
    is_choose: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this
    var db = wx.cloud.database()
    var is_choose = []
    db.collection('schools').get().then(res =>{
      res.data.forEach(function(v,i){
        is_choose[i] = 0
      })
      is_choose[0] = 1
      self.setData({
        school: res.data,
        is_choose: is_choose
      })
    })
    db.collection('article').where({
      school: '清华大学'
    }).get().then(res => {
      var myarticle = []
      res.data.forEach(function (v, i) {
        myarticle[i] = v
        myarticle[i].pubtime = String(v.pubtime.
          getFullYear()) + '年' + String(v.pubtime.getMonth() + 1) + '月' + String(v.pubtime.getDate()) + '日'
      })
      self.setData({
        article: myarticle
      })
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

  onarticle_content: function(e) {
    wx.navigateTo({
      url: './zixunindex?article_id=' + e.currentTarget.dataset.article_id + '&bm=' + e.currentTarget.dataset.bm
    })
  },

  onschoolevent: function(e) {
    var self = this
    var db = wx.cloud.database()
    var is_choose = []
    this.data.is_choose.forEach(function(v,i){
      is_choose[i] = 0
    })
    is_choose[e.currentTarget.dataset.is_choose] = 1
    this.setData({
      is_choose: is_choose
    })
    db.collection('article').where({
      school: e.currentTarget.dataset.school
    }).get().then(res => {
      var myarticle = []
      res.data.forEach(function (v, i) {
        myarticle[i] = v
        myarticle[i].pubtime = String(v.pubtime.
          getFullYear()) + '年' + String(v.pubtime.getMonth() + 1) + '月' + String(v.pubtime.getDate()) + '日'
      })
      self.setData({
        article: myarticle
      })
    })
  }
})