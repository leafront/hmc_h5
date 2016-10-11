import React from 'react'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

@observer
class DirectSalePriceDemand extends React.Component{
	constructor(props){
		super(props)
	}

	render(){
    const { showPopup } = this.props.popupXState
    const { directSalePriceData, carModelData, currentCarModelOptionIndex, currentColorOptionIndex, currentPayMethodOptionIndex, currentLicenseOptionIndex, currentLicenseGroupIndex, currentLicenseAreaIndex, switchLicenseGroupIndex, switchLicensePlanIndex } = this.props.directSalePriceState
    
    if(carModelData === null){
      return null
    }
		return(
			<div className="ds_car_price_demand" onClick={showPopup.bind(this.props.popupXState)}>
				<span>购车需求：</span>
				<span>
					<i>{carModelData.colorOptions[currentColorOptionIndex]}</i>
					<i>{carModelData.modelPaymentOptions[currentPayMethodOptionIndex]}</i>
					<i>{carModelData.licenseOptions[currentLicenseOptionIndex]}</i>
				</span>
			</div>
		)
	}
}

@observer
export class DirectSalePriceDemandContent extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    const { directSalePriceData, carModelData, currentCarModelOptionIndex, currentColorOptionIndex, currentPayMethodOptionIndex, currentLicenseOptionIndex, currentLicenseGroupIndex, currentLicenseAreaIndex, switchLicenseGroupIndex, switchLicensePlanIndex, switchColorOptionIndex, switchPayMethodOptionIndex, switchLicenseOptionIndex } = this.props.directSalePriceState
    const { hidePopup } = this.props.popupXState
    // console.log(carModelData)
    return(
      <div className="ds_car_price_car_info">
        <div className="popup_title">颜色(外观／内饰)</div>
        <ul className="">
          {
            carModelData.colorOptions.map(
              (item, index) => <li className={currentColorOptionIndex === index ? 'active' : ''} onClick={switchColorOptionIndex.bind(this.props.directSalePriceState, index)}>{item}</li>
            )
          }
        </ul>
        <div className="popup_title">购车方式</div>
        <ul className="">
          {
            carModelData.modelPaymentOptions.map(
              (item, index) => <li className={currentPayMethodOptionIndex === index ? 'active' : ''} onClick={switchPayMethodOptionIndex.bind(this.props.directSalePriceState, index)}>{item}</li>
            )
          }
        </ul>
        <div className="popup_title">牌照</div>
        <ul className="">
          {
            carModelData.licenseOptions.map(
              (item, index) => <li className={currentLicenseOptionIndex === index ? 'active' : ''} onClick={switchLicenseOptionIndex.bind(this.props.directSalePriceState, index)}>{item}</li>
            )
          }
        </ul>
        <button className="choose_confirm" onClick={hidePopup.bind(this.props.popupXState)}>确定</button>
      </div>
    )
  }
}

export default DirectSalePriceDemand
