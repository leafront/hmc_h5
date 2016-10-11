import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

class PopupSearchState {
  @observable isPopupSearchVisible = false

  showPopupSearch(){
    this.isPopupSearchVisible = true
  }
  hidePopupSearch(){
    this.isPopupSearchVisible = false
  }
}

export default PopupSearchState
