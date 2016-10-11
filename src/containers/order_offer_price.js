import React from 'react'
import { Link, browserHistory } from 'react-router'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

import TopBar from '../components/common/top_bar'
import OrderOfferPriceInfo from '../components/order_offer_price/order_offer_price_info'
import OrderOfferPriceDetail from '../components/order_offer_price/order_offer_price_detail'

import DirectCarScroll from '../components/common/direct_car_scroll'
import Banner from '../components/common/banner'
import BottomBarLockPrice from '../components/common/bottom_bar_lock_price'

import * as ajax from '../helpers/ajax'
import * as loginAndReg from '../helpers/login_and_reg'

require('../sass/order_offer_price.scss')
require('../sass/car_parity_detail/history_price.scss')


class OrderOfferPrice extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      orderOfferPriceTopInfo:{},
    	orderOfferPriceDetail:[],
      shopComment:{}
    }
  }

  	async componentDidMount() {
  		appState.I_M_Fucking_Loading()

  		let askpId = this.props.params.askpId
      let shopId = this.state.orderOfferPriceDetail
  		let accessToken = loginAndReg.GetLocalStorageInfo('HMC_ACCESS_TOKEN') && loginAndReg.GetLocalStorageInfo('HMC_ACCESS_TOKEN').accessToken
      await ajax.getOrderOfferPriceDetail.call(this, askpId , accessToken)
      await ajax.getOrderOfferPriceTopInfo.call(this, askpId, accessToken)
      //await ajax.getShopComment.call(this,shopId)

  		appState.I_Have_Done_Fucking_Loading()
    }

  render(){
    console.log(this.state)
    return (
      <div className = "order_offer_price">
        <TopBar
          pageTitle="报价单详情"
          isIndex={false}
          isShowSearch={false}
        />
      	<OrderOfferPriceInfo
          {...this.state}
        />
      	<OrderOfferPriceDetail
      		{...this.state}
      	/>
        <DirectCarScroll/>
      	<Banner/>
      	<BottomBarLockPrice/>
      </div>
    )
  }
}

export default OrderOfferPrice