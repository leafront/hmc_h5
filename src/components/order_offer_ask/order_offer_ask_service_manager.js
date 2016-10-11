import React from 'react'
import { observer } from 'mobx-react'

class OrderOfferAskServiceManager extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    let manager = this.props.orderOfferAskDetail

    if(typeof(this.props.orderOfferAskDetail.webRespondSource) == "undefined"){
      return null;
    }

    return (
      <div className="order_offer_ask_service_manager">
        <div className="manager">
          <img src={manager.empPic}/>
        </div>
        <div className="manager_info">
          <p>{manager.fsAbbrname}</p>
          <p>{manager.empName} {manager.empPost}</p>
          <p>联系电话：{manager.empPhone}</p>
        </div>
      </div>
    )
  }
}

export default OrderOfferAskServiceManager