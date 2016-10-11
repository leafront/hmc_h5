import React from 'react'
import { Link } from 'react-router'
import Popup from './Popup'
import IM, { IMButtonOne } from './im'

require('../../sass/common/bottom_bar.scss')

class BottomBarCommon extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    let bottom_bar_url = location.pathname.split("/")[1]
    return(
      <div className="bottom_bar_common">
        <ul>
          <li>
          {
            bottom_bar_url == "" ?
            <Link to="/">
              <img src="/images/common/homepage_blue.png"/>
              <p className="active">主页</p>
            </Link>
            :<Link to="/">
              <img src="/images/common/homepage.png"/>
              <p>主页</p>
            </Link>
          }
          </li>
          <li>
          {
            bottom_bar_url == "direct_sale_list" ?
            <Link to="/direct_sale_list">
              <img src="/images/common/ds_car_blue.png"/>
              <p className="active">自营</p>
            </Link>
            :<Link to="/direct_sale_list">
              <img src="/images/common/ds_car.png"/>
              <p>自营</p>
            </Link>
          }
          </li>
          <li>
            <Popup
              component={IM}
              button={IMButtonOne}
              popupClassName="popup_im animated"
              animateClass="bounceIn"
              type="center"
            />
          </li>
          <li>
            {
              bottom_bar_url == "order_offer_list" ?
              <Link to="/order_offer_list">
                <img src="/images/common/order_blue.png"/>
                <p className="active">单据</p>
              </Link>
              :<Link to="/order_offer_list">
                <img src="/images/common/order.png"/>
                <p>单据</p>
              </Link>
            }
          </li>
          <li>
            {
              bottom_bar_url == "user_center" ?
              <Link to="/user_center/my_info">
                <img src="/images/common/user_center_blue.png"/>
                <p className="active">我的</p>
              </Link>
              :<Link to="/user_center/my_info">
                <img src="/images/common/user_center.png"/>
                <p>我的</p>
              </Link>
            }
          </li>
        </ul>
      </div>
    )
  }
}

export default BottomBarCommon
