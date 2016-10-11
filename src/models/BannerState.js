import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

class BannerState {
  @observable bannerListData = []
}

export default BannerState
