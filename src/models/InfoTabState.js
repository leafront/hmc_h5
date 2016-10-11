import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

class InfoTabState {
  @observable currentHighlightTabIndex = 0

  constructor(props){
    this.currentHighlightTabIndex = props.currentHighlightTabIndex
  }
}

export default InfoTabState
