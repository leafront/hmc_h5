import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

class UserBaseInfoState {
  @observable isUserBaseInfoVisible = false

  hideUserHistory(){
    this.isUserBaseInfoVisible = false
  }
  showUserHistory(){
    this.isUserBaseInfoVisible = true
  }
}

export default UserBaseInfoState
