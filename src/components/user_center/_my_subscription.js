import React from 'react'
import { Link } from 'react-router'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

require('../../sass/user_center/my_subscription.scss')

@observer
class MySubscriptionListComponent extends React.Component {
  constructor(props) {
    super(props)

  }
  render(){
    return (
      <li className="">
        <div className="subscription_title">
          <span>日期:{this.props.subscriptionData.time}</span><span>心理价:{this.props.subscriptionData.priceLine}</span><span>时间:{this.props.subscriptionData.createTime}</span>
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

  }
  render(){
    const testData = [
      {carName:'BMW 3系',carModel:'2017款 340i 手动档',time: '3个月', createTime: '16-04-08', priceLine: '60万', state: 0},
      {carName:'BMW 3系',carModel:'2017款 340i 手动档',time: '3个月', createTime: '16-04-08', priceLine: '60万', state: 1},
      {carName:'BMW 3系',carModel:'2017款 340i 手动档',time: '3个月', createTime: '16-04-08', priceLine: '60万', state: 2},
      {carName:'BMW 3系',carModel:'2017款 340i 手动档',time: '3个月', createTime: '16-04-08', priceLine: '60万', state: 3}
    ]
    return (
      <div className="my_subscription">
        <ul className="subscription_list">
          {
            testData.map(
              (value, index) => <MySubscriptionListComponent subscriptionData={value}/>
            )
          }
        </ul>
        <button className="more_subscription_btn">更多订阅</button>
        <Link className="direct_sale_link" to="">4S店价高服务差？您可以选择好买车自营直销车</Link>
      </div>
    )
  }
}

export default MySubscription
