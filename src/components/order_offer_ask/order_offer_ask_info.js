import React from 'react'
import { observer } from 'mobx-react'

class OrderOfferAskInfo extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    let info = this.props.orderOfferAskDetail
    return (
      <div className="order_offer_ask_info">
        <div className="discount">
          <img src={info.carTypePic}/>
        </div>
        <div className="car_name">
          <p>{info.typeName}</p>
          <p>{info.modelName}</p>
        </div>
        <div className="understand"></div>
      </div>
    )
  }
}

export default OrderOfferAskInfo