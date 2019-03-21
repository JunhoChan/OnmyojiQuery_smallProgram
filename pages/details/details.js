// pages/details/details.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    queryDataArr:[], // 数组存查询数据
    DetailsDatas: [], // 查询后存储数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      queryDataArr: options.shishenData.trim().split(','),// 将查询的字符串转为数组
    })
    this.getSearchDatas()
    app.getCurrentFubenShishenDatas(this.data.queryDataArr)
  },
  /**
   * 获取排序后的数组 按大到小排序
   */
  getsortCurrentArray() {
    let NewDatas   = [], // 排序后的数据
            oArr   = this.data.queryDataArr, //存储当前对应妖怪名称
            oDatas = this.data.DetailsDatas;  // 当前列表数据
    NewDatas = this.sortCurrentArray(oDatas,oArr)
    this.setData({
      DetailsDatas: NewDatas
    })
  },
  /**
   * 排序当前数组 按大到小排序 return Array
   */
  sortCurrentArray(Datas, oArr) {
    let newArr = [], oDatas = Datas, length = oDatas.length;
    if (length > 1 ) { // 当前数据可排序长度一定为2以上
      for(let i=0;i<length;i++) { 
        let oIndex = this.searchMaxNumber(oDatas, oArr)  // 查找最多数量妖怪的数组下标
        newArr.push( oDatas[oIndex]  ) // 
        oDatas.splice( oIndex ,1)  // 删除最多数量妖怪的当前队列
      }
      return newArr;
    }else {
      return oDatas
    }
  },
  /**
   * 寻找最多数量妖怪的数组下标  总数据oDatas   存储妖怪名oArr
   */
  searchMaxNumber(oDatas, oArr) {
    let  max = 0,  // 每关妖怪总数量
         oIndex = -1   // 对应下标
    oDatas.forEach((item, index) => {
      let num = 0 // 当前关妖怪数量
      oArr.forEach(val => {
        if ( item[val] > 0 )  num += parseInt(item[val])
      })
      if(max < num ) { // 找到更大的数
           oIndex = index
           max  = num
      }
    })
    return oIndex
  },

  /**
   * 获取查询的数据 post 方式
   */
  getSearchDatas() {
    wx.showLoading({
      title: '加载中...',
    }) 
    const datas = app.getCurrentFubenShishenDatas(this.data.queryDataArr) //获取副本数据
    this.setData({
      DetailsDatas: datas
    })
    this.getsortCurrentArray() // 数据进行排序
    wx.hideLoading()
  },

})