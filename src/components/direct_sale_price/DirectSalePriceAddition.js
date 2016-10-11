import React from 'react'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

@observer
class DirectSalePriceAddition extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    const { carTax, totalInsuranceFee } = this.props.directSalePriceState
    return(
      <div className="ds_car_price_addition">
        <ul>
          <li>
            <span>服务费:</span>
            <span>￥1000 &nbsp;&nbsp;</span>
          </li>
          <li>
            <span>购置税:</span>
            <span>￥{carTax} &nbsp;&nbsp;</span>
          </li>
          <li>
            <span>配置升级</span>
            <span>(好买车赠送) <o style={{textDecoration:'line-through'}}>￥4598</o> &gt;</span>
          </li>
        </ul>
      </div>
    )
  }
}

export default DirectSalePriceAddition
