import React from 'react'
import { Link } from 'react-router'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

import { DiscountCualculator, MoneyByTenThousand } from '../../../helpers/formatters'

@observer
class CustomOffer extends React.Component{
  constructor(props) {
    super(props)
  }
  render(){
    return (
      <div className="custom_offer">
        <div className="car_image"><img src="/images/common/car_placeholder_bg.jpg"/></div>
        <div className="offer_desc">
          <p>没有中意的车型？价格不够低？嫌砍价太麻烦？</p>
          <p className="sub_desc">好买车专业顾问帮您淘一辆底价现车吧&gt;</p>
        </div>
      </div>
    )
  }
}

@observer
class DirectSaleListFilter extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div className="ds_car_filter" onClick={this.props.popupCarOptionsState.showPopupCarOptions.bind(this.props.popupCarOptionsState)}>
        <span>筛选</span>
        <img src="/images/direct_sale_list/filter.png"/>
      </div>
    )
  }
}

@observer
class DirectSaleListCarTypeComponent extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    console.log(this.props.carInfo)
    const saleTagList = this.props.carInfo.tagList && this.props.carInfo.tagList.split('#') || []
    return (
      <li>
        <Link to={'/direct_sale_detail/' + this.props.carInfo.modelType + '/' + this.props.carInfo.modelId}>
          <div className="car_image">
            <img src={this.props.carInfo.modelPhoto}/>
            <div className="discount">{DiscountCualculator(this.props.carInfo.msrp, this.props.carInfo.dsrp)}折</div>
          </div>
          <div className="car_name">
            <p>{this.props.carInfo.modelBrandName}</p>
            <p>{this.props.carInfo.modelTypeName + this.props.carInfo.modelName}</p>
            <ul>
              {
                saleTagList.map(
                  (value, index) => <li>{value}</li>
                )
              }
            </ul>
          </div>
          <div className="car_price">
            <p>{MoneyByTenThousand(this.props.carInfo.dsrp)}万</p>
            <p>{MoneyByTenThousand(this.props.carInfo.msrp)}万</p>
          </div>
        </Link>
      </li>
    )
  }
}

@observer
class DirectSaleListCarType extends React.Component{
  constructor(props){
    super(props)
  }
  async clickMoreCarButton(){
    this.props.directSaleListState.fetchNextPageData()
  }
  render(){
    // console.log(this.props.directSaleListState.directCarListData.length)
    return(
      <div>
        <ul className="ds_car_list_type">
          {
            this.props.directSaleListState.directCarListData.map(
              (carInfo, index) => <DirectSaleListCarTypeComponent carInfo={carInfo}/>
            )
          }
        </ul>
        <div className="more_car_button">
          <button onClick={this.clickMoreCarButton.bind(this)}>更多车型...</button>
        </div>
      </div>
    )
  }
}

@observer
class DirectSaleListCarFilter extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div>
        <DirectSaleListFilter popupCarOptionsState={this.props.popupCarOptionsState}/>
        <DirectSaleListCarType directSaleListState={this.props.directSaleListState}/>
        <CustomOffer/>
      </div>
    )
  }
}

export default DirectSaleListCarFilter
