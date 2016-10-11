import React from 'react'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

require('../../sass/common/bottom_bar.scss')

@observer
class BottomBarTotalPrice extends React.Component {
  constructor(props){
    super(props)
  }
  onSaveButtonClick(){
    this.props.directSalePriceState.saveOrder()
  }
  onOrderNowButtonClick(){
    this.props.directSalePriceState.orderRightNow()
  }
  render(){
    return(
      <div className="bottom_bar_total_price">
        <div className="im">
          <img src="/images/common/IM_blue.png"/>
          <p>咨询客服</p>
        </div>
        <button className="save" onClick={this.onSaveButtonClick.bind(this)}>暂存</button>
        <button className="book" onClick={this.onOrderNowButtonClick.bind(this)}>立即预定</button>
      </div>
    )
  }
}

export default BottomBarTotalPrice