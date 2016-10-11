import React from 'react'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

@observer
export class DirectSalePriceInsurance extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    const { totalInsuranceFee } = this.props.directSalePriceState
    const { showPopup } = this.props.popupXState
    return(
      <div className="ds_car_price_insurance" onClick={showPopup.bind(this.props.popupXState)}>
        <span>车辆保险:</span>
        <span>￥{totalInsuranceFee} &gt;</span>
      </div>
    )
  }
}

@observer
class DirectSalePriceInsuranceContent extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    const { directSalePriceData, currentInsuranceGroupIndex, currentInsurancePlanIndex, switchInsuranceGroupIndex, switchInsurancePlanIndex } = this.props.directSalePriceState
    const { hidePopup } = this.props.popupXState
    return(
      <div className="ds_car_price_insurance_content">
        <div className="popup_title">投保公司</div>
        <ul className="insurance_choose">
          {
            directSalePriceData.insureCompanys.map(
              (item, index) => {
                return (
                  <li className={currentInsuranceGroupIndex === index ? 'active' : ''} onClick={switchInsuranceGroupIndex.bind(this.props.directSalePriceState, index)}>
                    <span>{item.name}</span>
                  </li>
                )
              }
            )
          }
        </ul>
        <div className="popup_title">保险方案</div>
        <ul className="insurance_choose">
          {
            directSalePriceData.insureCompanys[currentInsuranceGroupIndex].types.map(
              (item, index) => {
                return (
                  <li className={currentInsurancePlanIndex === index ? 'active' : ''} onClick={switchInsurancePlanIndex.bind(this.props.directSalePriceState, index)}>
                    <span>{item.insureComb}</span>
                    <span>{item.price}元</span>
                  </li>
                )
              }
            )
          }
        </ul>
        <button className="choose_confirm" onClick={hidePopup.bind(this.props.popupXState)}>确定</button>
      </div>
    )
  }
}

export default DirectSalePriceInsuranceContent
