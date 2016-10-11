import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

import { GLOBAL_API_DOMAIN } from '../config'

class CarModelListState {
  @observable visiblityClass = 'none'
  @observable carModelListLeft = 'translate(100%,0)'
  @observable carModelListOverFlow = 'scroll'
  @observable carModelListData = []
  isAnimating = false

  async getCarModelListData(carBrandId){
    const time = new Date().getTime()
    const source = 101
    const Response = await fetch(
      `${GLOBAL_API_DOMAIN}/ware/car/310000/${carBrandId}/car-type?source=${source}&time=${time}`,
      {
        method:'GET'
      }
    )
    const ResponseOK = await Response.ok
    const ResponseJSON = await Response.json()

    if(ResponseOK && ResponseJSON.status === '1'){
      this.carModelListData = ResponseJSON.data.carTypeList
    }
  }
  async showCarModelList(carBrandId){
    if(this.isAnimating){
      return false
    }
    appState.I_M_Fucking_Loading()
    await this.getCarModelListData(carBrandId)
    appState.I_Have_Done_Fucking_Loading()

    this.isAnimating = true
    this.visiblityClass = 'block'

    window.setTimeout(() => {
      this.carModelListLeft = 'translate(0,0)'
    },10)

    window.setTimeout(() => {
      this.carModelListOverFlow = 'scroll'
      this.isAnimating = false
    },500)
  }
  hideCarModelList(){
    if(this.isAnimating){
      return false
    }

    this.isAnimating = true
    this.carModelListLeft = 'translate(100%,0)'
    this.carModelListOverFlow = 'hidden'

    window.setTimeout(() => {
      this.visiblityClass = 'none'
      this.isAnimating = false
    },500)
  }
}

export default CarModelListState
