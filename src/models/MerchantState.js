import { observable } from 'mobx'

class MerchantState {
  @observable isSelected = false
  @observable selectedCount = 3
}

export default MerchantState
