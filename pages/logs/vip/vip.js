//index.js

//获取应用实例

const app = getApp()

Page({

  data: {
    currentTabIndex: 0,
    idx: 0,
    idIndex:0,
    btns: [
      {
        title:'浏览VIP会员',
        time:'2919-11-11'
      },
      {
        title: '发布VIP会员',
        time: '已到期'
      }
      ],
      listTwo:[
        {
          chargeName:'2年VIP会员',
          chargeNotice:'最多可上线20个项目',
          chargeMoney:'3240'
        },
        {
          top: '1年VIP会员',
          bottom: '最多上线12个项目',
          money: '1890'
        },
        {
          top: '6个月VIP会员',
          bottom: '最多上线6个项目',
          money: '1432'
        },
        {
          top: '3个月VIP会员',
          bottom: '最多上线3个项目',
          money: '891'
        },
      ],
    listOne: [
      {
        top: '一个月VIP会员',
        bottom: '每邀请一个好友赠送一个月',
        money: '0'
      },
      {
        top: '2年浏览项目会员',
        bottom: '0.27元/天',
        money: '299.90'
      },
      {
        top: '1年浏览项目会员',
        bottom: '0.55元/天',
        money: '199.90'
      },
      {
        top: '6个月浏览项目会员',
        bottom: '0.78元/天',
        money: '139.90'
      },
      {
        top: '3个月VIP会员',
        bottom: '0.89元/天',
        money: '79.90'
      },
      {
        top: '1个月VIP会员',
        bottom: '1元/天',
        money: '29.90'
      },
    ],
    

  },
  payFor:function(){
    wx.requestPayment(
      {
        'timeStamp': '1',
        'nonceStr': '1',
        'package': '1',
        'signType': 'MD5',
        'paySign': '1',
        'success': function (res) { 
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 1000,
            mask: true
          })

        },
        'fail': function (res) {
          console.log(res)
          wx.showToast({
            title: '失败',
            icon: 'loading',
            duration: 1000,
            mask: false
          })


         },
        'complete': function (res) {

         }
      }) 

  },
  // 选择 0为浏览，1为发布
  onTabsItemTap: function (event) {
    let index = event.currentTarget.dataset.index;
    let that =  this;
    this.setData({
      currentTabIndex: index
    })
    wx.request({
      url: 'https://www.dikashi.top/house/charge/listCharge',
      data: {
        chargeType:this.data.currentTabIndex,
      },
      success(res) {
        console.log(res.data.data)
        that.setData({
          listOne: res.data.data
        })
      }
    })
  },
  // 点击变色
  goIndex: function (e){
    let index = e.currentTarget.dataset.index;
    //  console.log('每个index',list)
    this.setData({
      idx: index
    })
  },
  getIndex: function (e) {
    let index = e.currentTarget.dataset.index;
    //  console.log('每个index',list)
    this.setData({
      idIndex: index
    })
  },
  onShow() {
    var list = [];
    let that = this;
    wx.request({
      url: 'https://www.dikashi.top/house/charge/listCharge',
      data: {
        chargeType: 0,
      },
      success(res) {
        list = res.data.data
        that.setData({
          listOne:list
        })
      }
    })
  },

  payoff: function (e) {
    var that = this;
    wx.login({
      success: function (res) {
        that.getOpenId(res.code);
      }
    });

  },
  //获取openid
  getOpenId: function (code) {
    var that = this;
    wx.request({
      url: 'https://www.see-source.com/weixinpay/GetOpenId',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: { 'code': code },
      success: function (res) {
        var openId = res.data.openid;
        that.xiadan(openId);
      }
    })
  },
  //下单
  xiadan: function () {
    var that = this;
    wx.request({
      url: 'https://www.see-source.com/weixinpay/xiadan',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        // 'openid': openId 
        'body':"经济圈房通-充值",
        'payNum':123
         },
      success: function (res) {
        var prepay_id = res.data.prepay_id;
        console.log("统一下单返回 prepay_id:" + prepay_id);
        that.sign(prepay_id);
      }
    })
  },
  //签名
  sign: function (prepay_id) {
    var that = this;
    wx.request({
      url: 'https://www.see-source.com/weixinpay/sign',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: { 'repay_id': prepay_id },
      success: function (res) {
        that.requestPayment(res.data);

      }
    })
  },
  //申请支付
  requestPayment: function (obj) {
    wx.requestPayment({
      'timeStamp': obj.timeStamp,
      'nonceStr': obj.nonceStr,
      'package': obj.package,
      'signType': obj.signType,
      'paySign': obj.paySign,
      'success': function (res) {
        
      },
      'fail': function (res) {
      }
    })
  }  


  
})
