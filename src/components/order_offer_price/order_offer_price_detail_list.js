import React from 'react'
import { observer } from 'mobx-react'
import Popup from '../common/Popup'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import OrderQuestionList, { OrderQuestionListBtn } from '../car_parity_detail/order_question_list'
import { CarParityButtonOne } from '../car_parity_detail/car_parity_detail_button'
import CarParity from '../common/car_parity'
import ShopComment from '../order_offer_price/shop_comment'

@observer
class HistoryPriceListItem extends React.Component {
  constructor(props) {
    super(props)
  }

  getStorage() {
    let { item } = this.props
    let storage
    switch (item.respondReasonableType) {
      case 0:
        storage = '停售'
        break;
      case 1:
        storage = '有现车'
        break;
      case 2:
        storage = '无现车'
        break;
    }
    return storage
  }

  getTip() {
    let { item } = this.props
    let tip
    switch (item.respondReasonableType) {
      case 1:
        tip = '报价过低：建议咨询是否包含加装等隐性收费'
        break;
      case 2:
        tip = '报价合理：建议在线预订,享受好买车3倍赔付保障'
        break;
      case 3:
        tip = '报价过高：建议在线砍价'
        break;
    }
    return tip
  }

  render() {
    let { item } = this.props
    let tip = this.getTip()
    let storage = this.getStorage()
    console.log(item.respondState)
    return (
      <ul>
        {
          item.respondState == "14" ?
          <li>
            <div className="history_price_header">
              <div className="store_parity_user_img">
                <span className="img_wrapper">
                  <img src={ item.empPic } />
                </span>
              </div>
              <p>
                <strong>{ item.fsAbbrname }</strong>
                <span>{ item.empName } { item.empPost }</span>
                <span>报价日期：{ item.respondTime }</span>
              </p>
            </div>
            <div className="history_price_content">
              <div className="content_item">
                <p>
                  <span>到手总价</span>
                  <strong>￥<em>{ item.webRespondSource.sourceSum }</em>万</strong>
                </p>
              </div>
              <div className="content_item">
                <p>
                  <span>厂商指导价</span>
                  <strong><strike>￥{ item.askpModelPrice }万</strike></strong>
                </p>
                <p>
                  <span>裸车价</span>
                  <strong>￥{ item.askpModelPrice }万</strong>
                </p>
                <p>
                  <span>裸车让利</span>
                  <strong>￥{ item.webRespondSource.sourcePrice }万</strong>
                </p>
              </div>
              <div className="content_item">
                <p>
                  <b>{ tip }</b>
                </p>
                <p>
                  <span>库存</span>
                  <strong>{ storage }</strong>
                </p>
              </div>
              <div className="content_item extra_info">
                <p>
                  <span>购置税</span>
                  <strong>{ item.webRespondSource.sourceTax }元</strong>
                </p>
                <p>
                  <span>商保险费</span>
                  <strong>{ item.webRespondSource.sourceInsure }元</strong>
                </p>
                <p>
                  <span>贷款手续费</span>
                  <strong>{ item.webRespondSource.sourceLoanCharge }元</strong>
                </p>
                <p>
                  <span>贷款补贴</span>
                  <strong>{ item.webRespondSource.sourceLoan }元</strong>
                </p>
                <p>
                  <span>置换补贴</span>
                  <strong>{ item.webRespondSource.sourceReplace }元</strong>
                </p>
              </div>
              <div className="content_item extra_info">
                <p>
                  <span>加装费用</span>
                  <strong>{ item.webRespondSource.sourceBindPrice }元</strong>
                </p>
                <p>
                  <span>加装项目</span>
                  <strong>{ item.sourceBind }</strong>
                </p>
                <p>
                  <span>装潢赠送</span>
                  <strong>{ item.packOptionname }</strong>
                </p>
              </div>
              <div className="content_item extra_info last_item">
                <p>
                  <span>补充说明</span>
                  <strong>{ item.descContent }</strong>
                </p>
                <p className="over_time">
                  <i></i><br/>
                  <span>截止 { item.validDate } 有效</span><br/>
                  <Popup
                    component={OrderQuestionList}
                    button={OrderQuestionListBtn}
                    popupClassName="pop_bottom animated"
                    animateClass="slideInUp"
                    type="bottom"
                  />
                </p>
              </div>
            </div>
          </li>
          :null
        }
        {
          item.respondState == "1"?
          <div>
            <p>报价中...</p>
            <p>报价中...预计最长等待时间</p>
          </div>
          :null
        }
        {
          item.respondState == "2"?
          <div>
            <p>很遗憾</p>
            <p>很遗憾该4S店销售员忙晕了，超时未报价好买车将自动降低该4S店排名</p>
          </div>
          :null
        }
        <ShopComment
          {...this.props}
        />
      </ul>
     
    
    )
  }
}

@observer
class OrderOfferPriceDetailList extends React.Component {
  constructor(props) {
    super(props)
  }

  getHistoryPriceListLabel() {
    let { orderOfferPriceDetail } = this.props
    return (
      orderOfferPriceDetail && orderOfferPriceDetail.map((historyPrice, i) => {
        return <Tab>{historyPrice.fsAbbrname}</Tab>
      })
    )
  }

  getHistoryPriceListData() {
    let { orderOfferPriceDetail } = this.props
    console.log(this.props)
    return (
      orderOfferPriceDetail && orderOfferPriceDetail.map((historyPrice, i) => {
        return <TabPanel><HistoryPriceListItem item={historyPrice} {...this.props}/></TabPanel>
      })
    )
  }

  render() {
    //console.log(this.props.orderOfferPriceDetail)
    return(
      <div className="history_price_list">
        <Tabs
          onSelect={this.handleSelect}
          selectedIndex={0} //被选中的Tab
        >
          <TabList>
            {this.getHistoryPriceListLabel()}
          </TabList>
          {this.getHistoryPriceListData()}
        </Tabs>
      </div>
    )
  }
}

export default OrderOfferPriceDetailList
