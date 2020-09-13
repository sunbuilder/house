// pages/estateDetails/comments/comments.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList:[
      { 
        img :'../../../image/26.jpg',
      },
      {
        img: '../../../image/26.jpg',
      },
      {
        img: '../../../image/26.jpg',
      }
    ],
    comment: [
      {
        name: '孙楠',
        content: '体量：8141套，面积段：68-88-110平，均价：18888元/平。',
        time: '2011-11-11 15：33：33 '
      },
      {
        name: '孙楠',
        content: '体量：8141套，面积段：68-88-110平，均价：18888元/平。',
        time: '201-11-11 15：33：33 '
      },
      {
        name: '孙楠',
        content: '体量：8141套，面积段：68-88-110平，均价：18888元/平。',
        time: '201-11-11 15：33：33 '
      }
    ],
    buildingId:""

  },
  reply: function (e) {
    wx.navigateTo({
      url: '../../estateDetails/reply/reply'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    if (options.id!=""){
      this.setData({
        buildingId:options.buildingId
      })
      wx.request({
        url: 'http://localhost:8080/comment/getComment',
        data: {
          buildingId: that.data.buildingId,
          commentType: 0,
        },
        success(resComment) {
          console.log("测试")
          console.log(resComment)
          that.setData({
            comment: resComment.data.data
          })
        }
      })
    }
   
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