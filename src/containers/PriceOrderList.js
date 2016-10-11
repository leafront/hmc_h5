import React from 'react'
import { Link, browserHistory } from 'react-router'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

import TopBar from '../components/common/top_bar'
import PriceOrderListDetail from '../components/price_order_list/price_order_list_detail'
import AppLoading from '../components/common/AppLoading'
import BottomBarCommon from '../components/common/bottom_bar_common'

import * as ajax from '../helpers/ajax'
import * as loginAndReg from '../helpers/login_and_reg'

require('../sass/price_order_list.scss')

@observer
class PriceOrderList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      priceOrderList:[]
    }
  }

  async componentDidMount() {
    appState.I_M_Fucking_Loading()

    let accessToken = loginAndReg.GetLocalStorageInfo('HMC_ACCESS_TOKEN') && loginAndReg.GetLocalStorageInfo('HMC_ACCESS_TOKEN').accessToken
    await ajax.getPriceOrderList.call(this ,accessToken)    

    appState.I_Have_Done_Fucking_Loading()
  }

  render(){
    return (
      <div className = "price_order_list">
        <TopBar
          pageTitle=""
          isIndex={false}
          isShowSearch={false}
        />
      	<PriceOrderListDetail
          {...this.state}
        />
        <BottomBarCommon/>
      </div>
    )
  }
}

export default PriceOrderList