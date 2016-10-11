import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

class UserHistoryState {
  @observable isShowMore = false
}

export default UserHistoryState
