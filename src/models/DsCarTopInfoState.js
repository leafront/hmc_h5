import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

class DsCarTopInfoState {
  // @observable dsCarTopInfoData = []
  @observable carPriceCurveData = {}

  @observable currentTabIndex = 0
  tabList = ['车辆信息','配置表','用户晒单']

  switchTab(toIndex){
    this.currentTabIndex = toIndex
  }
}

export default DsCarTopInfoState
