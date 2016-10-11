import React from 'react'
import { observer } from 'mobx-react'

class OrderOfferPriceInfo extends React.Component {
  constructor(props){
    super(props)
  }

  getLicenseType(){
    let licenseType
    switch (this.props.orderOfferPriceTopInfo.askpLicense){
      case '1':
        licenseType ="沪牌"
        break;
      case '2':
        licenseType ="外牌"
        break;
    }
    return licenseType
  }

  getLoanType(){
    let loanType
    switch(this.props.orderOfferPriceTopInfo.askpLoan){
      case '0':
        loanType = "全款"
        break;
      case '1':
        loanType="贷款"
        break;
    }
    return loanType
  }

  getReplaceType(){
    let replaceType
    switch(this.props.orderOfferPriceTopInfo.askpReplace){
      case '0':
        replaceType = ""
        break;
      case '1':
        replaceType = "+置换"
        break;
    }
    return replaceType
  }

  render(){
    let info = this.props.orderOfferPriceTopInfo
    if(!this.props.orderOfferPriceTopInfo){
      return null
    }

    let licenseType = this.getLicenseType()
    let loanType = this.getLoanType()
    let replaceType = this.getReplaceType()

    return (
      <div className = "order_offer_price_info">
      	<p className="order_id">{info.askpId}</p>
      	<div><img src={info.tpicPath}/></div>
      	<p className="car_type">{info.askpTypeName}</p>
      	<div className="car_info">
      		<p className="model_type">{info.askpModelName}  |</p>
      		<p>
      			<span>颜色：{info.askpOutColor}</span>|
      			<span>牌照：{licenseType}</span>|
      		</p>
      		<p>
      			<span>购车方式：{loanType}{replaceType}</span>|
      			<span>购车时间：{info.askpBuyTime}</span>
      		</p>
      	</div>
      </div>
    )
  }
}

export default OrderOfferPriceInfo