import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

class IndexState {
  @observable carBrandListData = []
}

export default IndexState
