//app.js
import { Helper } from './utils/helper.js' // 业务都集中在这里
App({
  // 获取当前式神数据
  getCurrentShishenDatas() {
    return Helper.getCurrentShishenDatas()
  },
  // oArr 查询式神名
  getCurrentFubenShishenDatas(oArr) {
    const fubenDatas =  Helper.getCurrentFubenDatas(oArr,1),
          yuhunDatas =  Helper.getCurrentFubenDatas(oArr,2)
    const newDatas = fubenDatas.concat(yuhunDatas)
    return newDatas // 返回整合后的数据
  },
})