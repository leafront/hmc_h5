import React from 'react'
import { Link, browserHistory } from 'react-router'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

import InfoTab from '../components/user_center/info_tab'
import InfoTabState from '../models/InfoTabState'
import BottomBarCommon from '../components/common/bottom_bar_common'

import * as ajax from '../helpers/ajax'
import * as loginAndReg from '../helpers/login_and_reg'

require('../sass/my_subscription.scss')

class MySubscriptionState {
  @observable mySubscriptionListData = []
}

@observer
class MySubscriptionListComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    //const { subscribeTime, createTime, subscribePrice } = this.props.userCenterSubscribe
    //<span>日期:{subscribeTime}</span><span>心理价:{subscribePrice}</span><span>时间:{createTime}</span>
    return (
      <li className="">
        <div className="subscription_title">

        </div>
        <div className="subscription_detail clearfix">
          <div className="car_image">
            <img width="100%" src="http://static.haomaiche.com/common/images/type/b509656c684942278092e54fd91fb470.png"/>
          </div>
          <div className="car_desc">
            <p className="car_series_name">BMW 3系</p>
            <p className="car_model_name">340i 3.0T 手自一体</p>
          </div>
          <div className="order_status">
            <p>暂无降价</p>
          </div>
        </div>
      </li>
    )
  }
}

@observer
class MySubscription extends React.Component {
  constructor(props) {
    super(props)

    this.infoTabState = new InfoTabState({currentHighlightTabIndex:1})
    this.MySubscriptionState = new MySubscriptionState()

    this.state = {
      userCenterSubscribe:[]
    }
  }

  async componentDidMount() {
    appState.I_M_Fucking_Loading()

    let isLogin = await loginAndReg.CheckLogin()
    if (isLogin) {
      await this.getSubscribeDsCar()
    } else {
      browserHistory.replace('/login?frompage=user_center/my_subscription')
    }

    appState.I_M_Fucking_Loading()
  }

  async getSubscribeDsCar() {
    let accessToken = loginAndReg.GetLocalStorageInfo('HMC_ACCESS_TOKEN') && loginAndReg.GetLocalStorageInfo('HMC_ACCESS_TOKEN').accessToken
    await ajax.getSubscribeDsCar.call(this, accessToken)
  }

  render() {
     const testData = [
       {carName:'BMW 3系',carModel:'2017款 340i 手动档',time: '3个月', createTime: '16-04-08', priceLine: '60万', state: 0},
       {carName:'BMW 3系',carModel:'2017款 340i 手动档',time: '3个月', createTime: '16-04-08', priceLine: '60万', state: 1},
       {carName:'BMW 3系',carModel:'2017款 340i 手动档',time: '3个月', createTime: '16-04-08', priceLine: '60万', state: 2},
       {carName:'BMW 3系',carModel:'2017款 340i 手动档',time: '3个月', createTime: '16-04-08', priceLine: '60万', state: 3}
     ]

     //let favoriteList = this.state.favoriteList.length > 0 && this.state.favoriteList.map(
     /*let subscribeList = testData.map(
       (value, index) => {
         if (value) {
           return <MySubscriptionListComponent subscriptionData={value}/>
         } else {
           return null
         }
       }
     )*/

    return (
      <div className="my_subscription">
        <InfoTab infoTabState={this.infoTabState}/>
        {
          //this.state.favoriteList.length > 0 ?
          testData.length > 0 ?
            <ul className="subscription_list">
              
            </ul>
          : <p className="no_record">暂无数据！</p>
        }
        <button className="more_subscription_btn">更多订阅</button>
        <BottomBarCommon/>
      </div>
    )
  }
}

export default MySubscription
