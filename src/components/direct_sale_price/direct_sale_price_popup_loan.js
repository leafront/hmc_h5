import React from 'react'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

@observer
export class DirectSalePriceLoan extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    const { showPopup } = this.props.popupXState
    const { directSalePriceData, carModelData, currentPayMethodOptionIndex } = this.props.directSalePriceState
    if(!directSalePriceData || !/贷款/.test(carModelData.modelPaymentOptions[currentPayMethodOptionIndex])){
      return  null
    }
    return(
      <div className="ds_car_price_loan" onClick={showPopup.bind(this.props.popupXState)}>
        <span>贷款方案:</span>
        <span>(按实收取)<i>￥30240</i> &gt;</span>
      </div>
    )
  }
}

@observer
class DirectSalePriceLoanContent extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    const { directSalePriceData, loanList, currentLoanBankIndex, currentLoanPlanIndex, switchLoanBankIndex, switchLoanPlanIndex } = this.props.directSalePriceState
    const { hidePopup } = this.props.popupXState
    if(!directSalePriceData){
      return null
    }
    console.log(loanList)
    return(
      <div className="ds_car_price_loan_content">
        <div className="popup_title">贷款银行</div>
        <ul className='bank'>
          {
            directSalePriceData.banks.map(
              (value, index) => <li className={currentLoanBankIndex === index ? 'active' : ''} onClick={switchLoanBankIndex.bind(this.props.directSalePriceState, index)}>{value}</li>
            )
          }
        </ul>
        <div className="popup_title">贷款方案</div>
        <ul className="loan_way">
          {
            loanList.map(
              (item, index) => {
                return (
                  <li className={currentLoanPlanIndex === index ? 'active' : ''}  onClick={switchLoanPlanIndex.bind(this.props.directSalePriceState, index)}>
                    <p>首付{item.firstPay}万</p>
                    <p>首付 {item.payPercent}% | 分期 {item.monthPay}个月 | 贷款 {item.loanNum}元 | 月供(含利息) {item.monthPay}元</p>
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

export default DirectSalePriceLoanContent
