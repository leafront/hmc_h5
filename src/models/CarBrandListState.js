import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

class CarBrandListState {
  @observable positionOfLetterGroupList = 'absolute'
  @observable offsetTop = 0

  setPositionOfLetterGroupList(positionProp){
    //absolute or fixed
    this.positionOfLetterGroupList = positionProp
  }
}

export default CarBrandListState
