import React from 'react'
import { Link } from 'react-router'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

// import InfoTab from '../components/user_center/info_tab'

// import InfoTabState from '../models/InfoTabState'

require('../sass/user_center/my_subscription_detail.scss')

@observer
class MySubscriptionDetailOrderComponent extends React.Component {
  constructor(props) {
    super(props)

  }
  componentDidMount(){

  }
  render(){
    return (
      <dl className="order_info">
        <dt className="order_time">{this.props.orderInfo.time}</dt>
        {
          this.props.orderInfo.priceInfo.map(
            (value, index) => {
              return (
                <dd>
                  <div className="order_shop">
                    <p>类型：{value.type == 'comptition' ? '比价' : '自营'}</p>
                    <p>4S店：{value.shop}</p>
                  </div>
                  <div className="car_price">直销价:{value.price}</div>
                </dd>
              )
            }
          )
        }
      </dl>
    )
  }
}

@observer
class MySubscriptionDetail extends React.Component {
  constructor(props) {
    super(props)

  }
  componentDidMount(){

  }
  render(){
    const testData = {
      orderSubInfo: {
        date: '16-04-28 18:30',
        hopePrice: '42.50万',
        subscribeTime: '3个月'
      },
      carInfo: {
        carImageLink: 'http://static.haomaiche.com/common/images/type/b509656c684942278092e54fd91fb470.png',
        carSeriesName: 'BMW 3系',
        carModelName: '340i 手自一体'
      },
      carPriceInfoList: [
        {
          time: '2016-08-10',
          priceInfo: [
            {type: 'comptition', shop: '上海宝成真北路店', price: '22.58万'},
            {type: 'comptition', shop: '上海宝成真北路店', price: '22.58万'}
          ]
        }
      ]
    }
    return (
      <div className="my_subscription_detail">
        <div className="order_sub_info">
          <span>日期：{testData.orderSubInfo.date}</span>
          <span>心理价位：{testData.orderSubInfo.hopePrice}</span>
          <span>订阅时间：{testData.orderSubInfo.subscribeTime}</span>
        </div>
        <div className="car_info">
          <div className="car_image">
            <img src={testData.carInfo.carImageLink}/>
          </div>
          <div className="car_desc">
            <p className="car_series_name">{testData.carInfo.carSeriesName}</p>
            <p className="car_model_name">{testData.carInfo.carModelName}</p>
          </div>
          <div className="cancel_btn">
            <button>取消订阅</button>
          </div>
        </div>
        {
          testData.carPriceInfoList.map(
            (value, index) => <MySubscriptionDetailOrderComponent orderInfo={value}/>
          )
        }
      </div>
    )
  }
}

export default MySubscriptionDetail
