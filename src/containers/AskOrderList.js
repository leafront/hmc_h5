import React from 'react'
import { Link } from 'react-router'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

import { GLOBAL_API_DOMAIN } from '../config'
import TopBar from '../components/common/top_bar'

import * as loginAndReg from '../helpers/login_and_reg'
import AppLoading from '../components/common/AppLoading'

require('../sass/ask_order_list.scss')

class AskOrderListState {
  @observable askOrderListData = []

  async fetchAskOrderListData(){
    let accessToken = loginAndReg.GetLocalStorageInfo('HMC_ACCESS_TOKEN') && loginAndReg.GetLocalStorageInfo('HMC_ACCESS_TOKEN').accessToken
    const time = new Date().getTime()
    const source = 101
    const search = `?source=${source}&time=${time}`
    const Response = await fetch(
      `${GLOBAL_API_DOMAIN}/order${search}`,
      {
        headers:{
          accessToken:accessToken
        }
      }
    )
    const ResponseOK = await Response.ok
    const ResponseJSON = await Response.json()
    if(ResponseOK && ResponseJSON.status === '1'){
      this.askOrderListData = ResponseJSON.data
    }
  }
}

@observer
class DirectSaleAskOrderListComponent extends React.Component {
  constructor(props) {
    super(props)

  }
  render(){
    const { item } = this.props
    return (
      <Link to={"/order_offer_ask/" + item.orderId + "/" + item.orderType}>
        <li className="status_1 direct_sale">
          <div className="order_time">
            <span>直销:{item.createTime}</span><span>预定:{item.reserveTime}</span>
          </div>
          <div className="order_detail">
            <div className="car_image"><img src={item.carTypePic}/></div>
            <div className="car_desc">
              <div>{item.typeName}</div>
              <div className="car_model_name">款型:{item.modelName}</div>
            </div>
          </div>
          <div className="order_buttons">
            <div className="status">
              {
                item.orderState == 0 ?
                  <p>待支付</p>
                : null
              }
              {
                item.orderState == 2 ?
                  <p>支付成功</p>
                : null
              }
              {
                item.orderState == 5 ?
                  <p>已取消<br/>定金退还中</p>
                : null
              }
              {
                item.orderState == 6 ?
                  <p>已退款</p>
                : null
              }
              {
                item.orderState == 7 ?
                  <p>已售罄</p>
                : null
              }
            </div>
            <div className="cancel_btn"><button>退订</button></div>
            <div className="pay_result"><button>支付凭证</button></div>
          </div>
        </li>
      </Link>
    )
  }
}

@observer
class CompetitionAskOrderListComponent extends React.Component {
  constructor(props) {
    super(props)

  }
  render(){
    const { item } = this.props
    return (
      <Link to={"/order_offer_ask/" + item.orderId + "/" + item.orderType}>
        <li className="status_1 competition">
          <div className="order_time">
            <span>比价:{item.createTime}</span><span>预定:{item.reserveTime}</span>
          </div>
          <div className="order_detail">
            <div className="car_image"><img src={item.carTypePic}/></div>
            <div className="car_desc">
              <div>{item.typeName}</div>
              <div>款型:{item.modelName}</div>
            </div>
          </div>
          <div className="order_buttons">
            <div className="status">已取消<br/>定金退还中</div>
            <div className="cancel_btn"><button>退订</button></div>
            <div className="pay_result"><button>支付凭证</button></div>
          </div>
        </li>
      </Link>
    )
  }
}

@observer
class AskOrderList extends React.Component {
  constructor(props) {
    super(props)

    this.askOrderListState = new AskOrderListState()
  }
  componentDidMount() {
    this.askOrderListState.fetchAskOrderListData()
  }
  render(){
    const { askOrderListData } = this.askOrderListState

    return (
      <div>
        <TopBar
          pageTitle=""
          isIndex={false}
          isShowSearch={false}
        />
        <div className="ask_order_list">
          <ul>
              {
                askOrderListData.map(
                  (item, index) => {
                    return item.orderType == "2"
                    ? <DirectSaleAskOrderListComponent item={item}/>
                    : <CompetitionAskOrderListComponent item={item}/> 
                  }
                )
              }
            
          </ul>
        </div>
      </div>
    )
  }
}

export default AskOrderList