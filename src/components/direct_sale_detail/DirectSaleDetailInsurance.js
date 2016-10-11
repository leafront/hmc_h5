import React from 'react'
import { Link } from 'react-router'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

class DirectSaleDetailInsurance extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div className="insurance">
        <div className="title">好买车交易保障</div>
        <img src="/images/direct_sale_detail/insurance.png"/>
        <div className="moreQA">查看常见问题</div>
      </div>
    )
  }
}

export default DirectSaleDetailInsurance
