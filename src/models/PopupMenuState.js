import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

class PopupMenuState {
  @observable isPopupMenuVisible = false

  showPopupMenu(){
    this.isPopupMenuVisible = true
  }
  hidePopupMenu(){
    this.isPopupMenuVisible = false
  }
}

export default PopupMenuState
