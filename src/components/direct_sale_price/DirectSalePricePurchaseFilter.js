import React from 'react'
import Popup from '../../components/common/Popup'
import {DirectSalePriceDemand} from '../direct_sale_price/direct_sale_price_popup_demand'
import DirectSaleDetailCarType from '../direct_sale_detail/choose_direct_detail_car_type'
import DirectSalePriceLoanContent , {DirectSalePriceLoan} from '../direct_sale_price/direct_sale_price_popup_loan'
import DirectSalePriceLicenseContent , {DirectSalePriceLicense} from '../direct_sale_price/direct_sale_price_popup_license'
import DirectSalePriceInsuranceContent , {DirectSalePriceInsurance} from '../direct_sale_price/direct_sale_price_popup_insurance'

class DirectSalePricePopup extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
  	return(
  		<div>
        <Popup component={DirectSaleDetailCarType} button={DirectSalePriceDemand} popupClassName="pop_left" type="left" />
        <Popup component={DirectSalePriceLoanContent} button={DirectSalePriceLoan} popupClassName="pop_left" type="left" />
        <Popup component={DirectSalePriceLicenseContent} button={DirectSalePriceLicense} popupClassName="pop_left" type="left" />
        <Popup component={DirectSalePriceInsuranceContent} button={DirectSalePriceInsurance} popupClassName="pop_left" type="left" />
  		</div>
  	)
  }
}

// class DirectSalePricePurchaseFilter extends React.Component{
// 	constructor(props){
// 		super(props)
// 	}
//
// 	render(){
// 		return(
// 			<div>
// 				<DirectSalePricePopup/>
// 			</div>
// 		)
// 	}
// }
//
// export default DirectSalePricePurchaseFilter
