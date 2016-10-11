import React from 'react'
import { Link } from 'react-router'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

@observer
class CarModelDetail extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    const optionsData = this.props.popupDirectSaleOptionsState.optionsData
    const currentCarModelOptionIndex = this.props.popupDirectSaleOptionsState.currentCarModelOptionIndex
    const currentColorOptionIndex = this.props.popupDirectSaleOptionsState.currentColorOptionIndex
    const currentPayMethodOptionIndex = this.props.popupDirectSaleOptionsState.currentPayMethodOptionIndex
    const currentLicenseOptionIndex = this.props.popupDirectSaleOptionsState.currentLicenseOptionIndex

    if(optionsData.length === 0){
      return null
    }
    // const this.props.popupDirectSaleOptionsState.carModelOptions[currentCarModelOptionIndex]
    return(
      <div className="car_type" onClick={this.props.popupDirectSaleOptionsState.showPopupCarOptions.bind(this.props.popupDirectSaleOptionsState)}>
        <ul>
          <li>
            <span>款型：</span>
            <span>{optionsData[currentCarModelOptionIndex].carModelOptions}</span>
            <i>共{optionsData.length}款</i>
            <span>&gt;</span>
          </li>
          <li>
            <span>颜色：</span>
            <span>外观: {optionsData[currentCarModelOptionIndex].colorOptions[currentColorOptionIndex].split('/')[0]} | 内饰: {optionsData[currentCarModelOptionIndex].colorOptions[currentColorOptionIndex].split('/')[1]}</span>
            <span>&gt;</span>
          </li>
          <li>
            <span>购车方式：</span>
            <span>{optionsData[currentCarModelOptionIndex].modelPaymentOptions[currentPayMethodOptionIndex]}</span>
            <span>&gt;</span>
          </li>
          <li>
            <span>牌照：</span>
            <span>{optionsData[currentCarModelOptionIndex].licenseOptions[currentLicenseOptionIndex]}</span>
            <span>&gt;</span>
          </li>
        </ul>
      </div>
    )
  }
}

export default CarModelDetail
