import React from 'react'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

@observer
export class DirectSalePriceLicense extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    const { directSalePriceData, currentLicenseGroupIndex, currentLicenseAreaIndex, switchLicenseGroupIndex, switchLicensePlanIndex } = this.props.directSalePriceState
    const { showPopup } = this.props.popupXState
    if(!directSalePriceData){
      return null
    }
    return(
      <div className="ds_car_price_license" onClick={showPopup.bind(this.props.popupXState)}>
        <span>牌照:</span>
        <span>(好买车赠送￥50临时牌照)<i>￥{directSalePriceData.licenses[currentLicenseGroupIndex].locations[currentLicenseAreaIndex].price}</i> ></span>
      </div>
    )
  }
}

@observer
class DirectSalePriceLicenseContent extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    const { directSalePriceData, currentLicenseGroupIndex, currentLicenseAreaIndex, switchLicenseGroupIndex, switchLicensePlanIndex } = this.props.directSalePriceState
    const { hidePopup } = this.props.popupXState
    return(
      <div className="ds_car_price_license_content">
        <div className="popup_title">上牌方式</div>
        <ul className='license_way'>
          {
            directSalePriceData.licenses.map(
              (item, index) => <li className={currentLicenseGroupIndex === index ? 'active' : ''} onClick={switchLicenseGroupIndex.bind(this.props.directSalePriceState, index)}>{item.type}</li>
            )
          }
        </ul>
        <div className="popup_title">牌照选择</div>
        <ul className="license_choose">
          {
            directSalePriceData.licenses[currentLicenseGroupIndex].locations.map(
              (item, index) => {
                return (
                  <li className={currentLicenseAreaIndex === index ? 'active' : ''} onClick={switchLicensePlanIndex.bind(this.props.directSalePriceState, index)}>
                    <span>{item.location}</span>
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

export default DirectSalePriceLicenseContent
