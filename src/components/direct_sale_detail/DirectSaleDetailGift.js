import React from 'react'
import { Link } from 'react-router'
import { observable, computed } from 'mobx'
import { observer } from "mobx-react"

@observer
class DirectSaleDetailGift extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div className="gift">
        <img src="/images/direct_sale_detail/gift.png"/>
        <p>好买车赠送总价值￥2888升级套装包含：Limooking贴膜、12in1急救套装、车载灭火器套装</p>
      </div>
    )
  }
}

export default DirectSaleDetailGift
