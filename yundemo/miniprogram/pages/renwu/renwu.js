const app = getApp()

// pages/renwu/renwu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    days:[],
    css:[{
      color:"wdk",
      meg:"打卡"
    },{
        color:"ydk",
      meg:"已签"
    }],
    csscount:0,
    rough: [],
    complete: [],
    input_meg: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this
    self.setData({
      input_meg: ''
    })
    wx.cloud.callFunction({
      name: 'rwinit'
    }).then(res =>{
        self.setData({
          days: [res.result.sign_time, res.result.onlyday],
          rough: res.result.rough,
          complete: res.result.complete
        })
        if (res.result.is_sign) {
          self.setData({
            csscount: 1
          })
        } else {
          self.setData({
            csscount: 0
          })
        }
    }).catch(res =>{
      wx.showToast({
        title: '请先登录',
        icon: 'loading',
        duration: 1500
      })
      setTimeout(function(){
        wx.switchTab({
          url: '/pages/user/user',
        })
      },1500)
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
  ondakaevent: function() {
    var self = this
    if (self.data.csscount == 0) {
      var days = self.data.days
      days[0] = days[0] + 1
      wx.showToast({
        title: '打卡成功，加油',
        image: '../../myicon/fendou.png',
        duration: 1500,
        mask: true
      })
      wx.cloud.callFunction({
        name: 'rw_daka'
      }).then(res => {
      })
      self.setData({
        csscount: 1,
        days: days
      })
    }
  },

  ongettask: function(event) {
    var self = this
    wx.showToast({
      title: '干的不错',
      image: '../../myicon/bucuo.png',
      duration: 1500,
      mask: true
    })
    wx.cloud.callFunction({
      name: 'complete_task',
      data: {
        taskid: event.currentTarget.dataset.taskid
      }
    }).then(res =>{
      self.onLoad()
    })
  },

  onaddtask: function(event) {
    var self = this
    if (event.detail.value.task){
      wx.showToast({
        title: '添加成功',
        image: '../../myicon/tjcg.png',
        duration: 1500,
        mask: true
      })
      wx.cloud.callFunction({
        name: 'add_task',
        data: {
          task: event.detail.value.task
        }
      }).then(res => {
        self.onLoad()
      })
    }
  }
})