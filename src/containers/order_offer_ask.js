import React from 'react'
import { Link, browserHistory } from 'react-router'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

import TopBar from '../components/common/top_bar'
import OrderOfferAskInfo from '../components/order_offer_ask/order_offer_ask_info'
import OrderOfferAskInfoDetail from '../components/order_offer_ask/order_offer_ask_info_detail'
import OrderOfferAskServiceManager from '../components/order_offer_ask/order_offer_ask_service_manager'
import DirectCarScroll from '../components/common/direct_car_scroll'
import Banner from '../components/common/banner'
import BottomBarUnsubscribe from '../components/common/bottom_bar_unsubscribe'

import * as ajax from '../helpers/ajax'
import * as loginAndReg from '../helpers/login_and_reg'

require('../sass/order_offer_ask.scss')

class OrderOfferAsk extends React.Component {
  constructor(props){
    super(props)

    this.state = {
    	orderOfferAskDetail:{}
    }
  }

  	async componentDidMount() {
  		appState.I_M_Fucking_Loading()

  		let orderId = this.props.params.orderId
      let orderType = this.props.params.orderType
  		let accessToken = loginAndReg.GetLocalStorageInfo('HMC_ACCESS_TOKEN') && loginAndReg.GetLocalStorageInfo('HMC_ACCESS_TOKEN').accessToken
      await ajax.getOrderOfferAskDetail.call(this , orderId , orderType , accessToken)

  		appState.I_Have_Done_Fucking_Loading()
    }

  render(){
    //console.log(this.state.orderOfferAskDetail)
    return (
      <div className = "order_offer_ask">
        <TopBar
          pageTitle="订单详情"
          isIndex={false}
          isShowSearch={false}
        />
        <OrderOfferAskInfo
        {...this.state}
        />
        <OrderOfferAskInfoDetail
        {...this.state}
        />
        <OrderOfferAskServiceManager
        {...this.state}
        />
      	<DirectCarScroll/>
      	<Banner/>
      	<BottomBarUnsubscribe/>
      </div>
    )
  }
}

export default OrderOfferAsk