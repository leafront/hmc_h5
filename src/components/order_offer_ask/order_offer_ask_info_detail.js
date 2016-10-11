import React from 'react'
import { observer } from 'mobx-react'

class OrderOfferAskBasicInfo extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    let info = this.props.orderOfferAskDetail
    console.log(this.props.orderOfferAskDetail)
    return (
      <div className="order_offer_ask_basic_info">
        <ul>
          <li>
            <span>颜色:</span>
            <span>{info.color}</span>
          </li>
          <li>
            <span>牌照:</span>
            <span>{info.license}</span>
          </li>
          <li>
            <span>购车方式</span>
            <span>{info.buyType}</span>
          </li>
          <li>
            <span>时间</span>
            <span>333</span>
          </li>
        </ul>
      </div>
    )
  }
}

class OrderOfferAskPriceInfo extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    let price = this.props.orderOfferAskDetail.webRespondSource

    if(typeof(this.props.orderOfferAskDetail.webRespondSource) == "undefined"){
      return null;
    }
    
    return (
      <div className="order_offer_ask_price_info">
        <ul>
          <li>
            <span>到手总价</span>
            <span>￥{price.sourceSum}</span>
          </li>
          <li>
            <span>厂商指导价</span>
            <span>￥{this.props.orderOfferAskDetail.askpModelPrice}</span>
          </li>
          <li>
            <span>裸车价</span>
            <span>333</span>
          </li>
          <li>
            <span>裸车让利</span>
            <span>333</span>
          </li>
          <li>
            <span>库存</span>
            <span>333</span>
          </li>
        </ul>
      </div>
    )
  }
}

class OrderOfferAskTaxInfo extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    let price = this.props.orderOfferAskDetail.webRespondSource

    if(typeof(this.props.orderOfferAskDetail.webRespondSource) == "undefined"){
      return null;
    }

    return (
      <div className="order_offer_ask_tax_info">
        <ul>
          <li>
            <span>购置税</span>
            <span>(金额为估值，按发票多退少补)￥{price.sourceTax}</span>
          </li>
          <li>
            <span>保险费</span>
            <span>(金额为估值，按发票多退少补)￥{price.sourceInsure}</span>
          </li>
          <li>
            <span>贷款手续费</span>
            <span>{price.sourceLoanCharge}</span>
          </li>
          <li>
            <span>贷款补贴</span>
            <span>{price.sourceLoan}</span>
          </li>
          <li>
            <span>置换补贴</span>
            <span>{price.sourceReplace}</span>
          </li>
        </ul>
      </div>
    )
  }
}

class OrderOfferAskDecorationInfo extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    let decoration = this.props.orderOfferAskDetail

    if(typeof(this.props.orderOfferAskDetail.webRespondSource) == "undefined"){
      return null;
    }
    return (
      <div className="order_offer_ask_decoration_info">
        <ul>
          <li>
            <span>加装费用</span>
            <span>￥{decoration.webRespondSource.sourceBindPrice}</span>
          </li>
          <li>
            <span>加装项目</span>
            <span>{decoration.sourceBind}</span>
          </li>
          <li>
            <span>装潢赠送</span>
            <span>{decoration.packOptionname}</span>
          </li>
        </ul>
      </div>
    )
  }
}

class OrderOfferAskExtraInfo extends React.Component {
  constructor(props){
    super(props)
  }
  render(){

    if(typeof(this.props.orderOfferAskDetail.webRespondSource) == "undefined"){
      return null;
    }
    return (
      <div className="order_offer_ask_extra_info">
        <span>补充说明</span>
        <span>{this.props.orderOfferAskDetail.descContent}</span>
      </div>
    )
  }
}

class OrderOfferAskInfoDetail extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
      <div className="order_offer_ask_info_detail">
        <OrderOfferAskBasicInfo/>
        <OrderOfferAskPriceInfo
          {...this.props}
        />
        <OrderOfferAskTaxInfo
          {...this.props}
        />
        <OrderOfferAskDecorationInfo
          {...this.props}
        />
        <OrderOfferAskExtraInfo
          {...this.props}
        />
      </div>
    )
  }
}

export default OrderOfferAskInfoDetail