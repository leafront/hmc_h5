import React from 'react'
import { observer } from 'mobx-react'
import OrderOfferPriceDetailList from './order_offer_price_detail_list'

class OrderOfferPriceDetail extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
      <div className="history_price">
        <OrderOfferPriceDetailList {...this.props} />
      </div>
    )
  }
}

export default OrderOfferPriceDetail