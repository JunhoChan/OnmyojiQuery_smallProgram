//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    storeSelectedArr: [],// 存储选中的值
    IndexDatas:[],  // 首页的数据
  },
  onLoad: function () {
    this.getIndexDatas() // 获取首页数据
  },

  // 获取首页数据
  getIndexDatas() {
    const that = this,
         datas = app.getCurrentShishenDatas() // 获取副本信息
    wx.showLoading({
      title: '加载中...',
    })
    this.setData({
      IndexDatas: datas
    })
    if (this.data.IndexDatas.length > 0 ) wx.hideLoading() // 有数据就取消加载
  },
  // 选择式神时触发
  selectedVal(event) {
    const id = event.target.dataset.id,  // 获取页面中data-的数据
        name = event.target.dataset.name,
         obj = {}
    let selectedIdArr = this.data.storeSelectedArr,
               oIndex = this.searchSameNumber(selectedIdArr, id)
    if (  oIndex  === -1 ) { // 不存在
      if (this.data.storeSelectedArr.length === 5) { // 选择5个不可以操作
              wx.showToast({  //提示
                title: '最多选5个式神',
                icon: 'success',
                duration: 1000,
                mask: true
              })
            return false; 
        }
            if( id && name ) {  // 排除空的对象
                obj.id = id
                obj.name = name
                selectedIdArr.push(obj)
            }
    } else {  //过滤掉不选择的数据
          selectedIdArr.splice(oIndex, 1); // 删除重复项
    }
    this.setData({
      storeSelectedArr: selectedIdArr
    });
  },
  // 找到当前有重复项的下标
  searchSameNumber(datas,id) {
    let oIndex = -1
      for(let j=0;j<datas.length;j++) {
      if (datas[j].id === id) {
          oIndex = j
          break 
      }
    }
    return oIndex
  },
  // 取消当前选中数据
  cancelItem(event) {
    const id = event.target.dataset.id
    let selectedIdArr = this.data.storeSelectedArr
    const oIndex = this.searchSameNumber(selectedIdArr, id) // 找到有相同成员的下标
    selectedIdArr.splice(oIndex, 1);
    this.setData({
      storeSelectedArr: selectedIdArr
    });
  },
  // 提交按钮
  submitData() {
      let newArr = [] // 存储式神名字
      this.data.storeSelectedArr.forEach(item => {
        newArr.push(item.name)
      })
    if (newArr.length === 0 ) return;
    wx.navigateTo({
      url: './../details/details?shishenData='+newArr.join(',')
    })
  }

})
