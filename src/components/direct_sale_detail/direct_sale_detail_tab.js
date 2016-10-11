import React from 'react'
import { Link } from 'react-router'
import { observable, computed } from 'mobx'
import { observer } from "mobx-react"

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
// import DirectSaleDetailTabCarTypeContent from '../direct_sale_detail/direct_sale_detail_tab_cartype_content'

import DirectSaleDetailGift from '../components/direct_sale_detail/DirectSaleDetailGift'
import CarParityDetailUserHistory from '../car_parity_detail/car_parity_detail_user_history'

@observer
class DirectSaleDetailPopup extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    return(
      <Popup component={ChooseDirectSale} button={DirectSaleDetailCarType} popupClassName="pop_left" type="left" />
    )
  }
}

@observer
class DirectSaleDetailLandPrice extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    // this.props.dsCarTopInfoState
    return(
      <div className="landprice">
        <div className="car_price">
          <span>裸车价:</span>
          <span>￥万</span>
        </div>
        <div className="save">
          <span>好买车自营</span>
          <span>
            <i>指导价：￥232.99万</i>
            <i>已节省：￥2.00万</i>
          </span>
        </div>
      </div>
    )
  }
}

@observer
class DirectSaleTabCarInfo extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    // <DirectSaleDetailTabCarTypeContent
    //   dsCarTopInfoState={this.props.dsCarTopInfoState}
    // />
    return(
      <div className="car_info">
        <DirectSaleDetailLandPrice/>
        <DirectSaleDetailPopup/>
        <DirectSaleDetailGift/>
      </div>
    )
  }
}

@observer
class DirectSaleTabUserOrder extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div className="user_order">
        <CarParityDetailUserHistory/>
      </div>
    )
  }
}

@observer
class DirectSaleDetailTab extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    Tabs.setUseDefaultStyles(false)
    return (
      <div>
        <Tabs
          onSelect={this.handleSelect}
          selectedIndex={0} //被选中的Tab
        >
          <TabList>
            <Tab>车辆信息</Tab>
            <Tab>配置表</Tab>
            <Tab>用户晒单</Tab>
          </TabList>
          <TabPanel>
            <DirectSaleTabCarInfo
              dsCarTopInfoState={this.props.dsCarTopInfoState}
            />
          </TabPanel>
          <TabPanel>
            <DirectSaleTabConf/>
          </TabPanel>
          <TabPanel>
            <DirectSaleTabUserOrder/>
          </TabPanel>
        </Tabs>
      </div>
    )
  }
}

export default DirectSaleDetailTab
