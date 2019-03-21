const shiShenDatas = require('./../databases/shishen.js'); // 式神数据
const fubenDatas = require('./../databases/fuben.js'); // 副本数据
const Helper = {
  /**
   * 获取式神数据 return 一个式神分类数组
   */
  getCurrentShishenDatas() {
    const datas = shiShenDatas;
    let flag = false,  // 默认当前数组对象内没有该type属性
      newDatas = []	//[{ type,datas}]
    for (let j = 0; j < datas.length; j++) {
      for (let i = 0; i < newDatas.length; i++) {  // 查看当前有无重复状态
        if (newDatas[i].type && newDatas[i].type === datas[j].type) { flag = true; break; }
      }
      if (!flag) {  // 有相同的type 式神 就放一起 没有就新建type
        let params = {}
        params.type = datas[j].type
        params.datas = []
        params.datas.push(datas[j])
        newDatas.push(params)
      } else {
        let oIndex = -1; // 回复默认状态
        newDatas.forEach((item, index) => {
          if (item.type === datas[j].type) oIndex = index // 找到相同type类型的下标
        })
        newDatas[oIndex].datas.push(datas[j]) // 将相同数据放一起
        flag = false // 恢复默认状态
      }
    }
    return newDatas
  },
  /**  
   *  搜索数据
  * @param  {Array} oArr [客户端发来的数据]   {Number}  type 1,2  1代表查找副本 2是查找御魂
  * @return {Array}
  */
  getCurrentFubenDatas: (oArr, type) => {
    let datas = type === 1 ? fubenDatas.chapter : fubenDatas.yuhun
    let newDatas = [], // 存储新数据
      params = {},   // 当前 有相关消息的数据
      flag = false;  // 当前数据是否有存在的标志
    datas.forEach(item => {
      let sArr = []  // 存储当前章节怪物信息
      item.monster.forEach(i => {  // 遍历每一关的怪物
        let obj = {}  //保留当前关怪物属性
        oArr.forEach((j, index, self) => {   // 根据发来的数据进行查找
          if (i.detail.hasOwnProperty(j) && i.detail) {  // 当前有匹配该属性的值
            flag = true
            if (i.detail[j]) { obj[j] = i.detail[j] }	// 
          }
        })	// j
        if (Object.keys(obj).length > 0) {   // 去除没有保存怪物属性的对象
          if (!obj.name) obj['name'] = i.name    // 
          if (flag && type === 1) {  // 当前该章节有该式神  type 为1
            let nIndex = item.name.indexOf("章"), // 找到'章'关键字  并将章后面的字全部去掉
              nLength = item.length, // 章节名长度
              repalceStr = item.name.substring(nIndex + 1, nLength),  // 
              chapterStr = item.name.replace(repalceStr, '');
            obj['chapter'] = chapterStr // 章节名
          } else if (flag && type === 2) {
            obj['chapter'] = item.name // 御魂名
          }
          newDatas.push(obj) // 该数据汇总 
        }
      })  // i

      params = {}  // 恢复默认状态
      flag = false
    })// item
    return newDatas
  },

  
}

export { Helper }