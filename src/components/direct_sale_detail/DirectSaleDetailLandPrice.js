import React from 'react'
import { Link } from 'react-router'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

import { MoneyByTenThousand } from '../../../helpers/formatters'

@observer
class DirectSaleDetailLandPrice extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    const optionsData = this.props.popupDirectSaleOptionsState.optionsData
    const currentCarModelOptionIndex = this.props.popupDirectSaleOptionsState.currentCarModelOptionIndex
    const currentColorOptionIndex = this.props.popupDirectSaleOptionsState.currentColorOptionIndex

    if(optionsData.length === 0){
      return null
    }

    return(
      <div className="landprice">
        <div className="car_price">
          <span>裸车价:</span>
          <span>￥{MoneyByTenThousand(optionsData[currentCarModelOptionIndex].dsrp)}万</span>
        </div>
        <div className="save">
          <span>好买车自营</span>
          <span>
            <i>指导价：￥{MoneyByTenThousand(optionsData[currentCarModelOptionIndex].msrp)}万</i>
            <i>已节省：￥{MoneyByTenThousand(optionsData[currentCarModelOptionIndex].msrp - optionsData[currentCarModelOptionIndex].dsrp)}万</i>
          </span>
        </div>
      </div>
    )
  }
}

export default DirectSaleDetailLandPrice
