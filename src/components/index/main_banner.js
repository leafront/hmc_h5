import React from 'react'
import { browserHistory } from 'react-router'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'
import TopBar from '../common/top_bar'
import Popup from '../common/Popup'
import FirstUse, { FirstUseButton } from '../../containers/first_use'

require('../../sass/index/main_banner.scss')

@observer
class MainBanner extends React.Component {
  constructor(props) {
    super(props)
    this.scrollToBrandList = this.scrollToBrandList.bind(this)
  }
  scrollToBrandList(){
    const { offsetTop } = this.props.carBrandListState
    window.scrollTo(0, offsetTop)
  }
  goToFirstUsePage() {
    browserHistory.push('first_use')
  }
  render() {
    return (
      <div className="main_banner">
        <TopBar
          isIndex={true}
          isShowSearch={true}
        />
        <div className="price_curve_demo"><img width="215" src="/images/index/price_curve.png"/></div>
        <div className="titles">
          <h2 className="main_title">60秒,成为新车价格行家</h2>
          <h3 className="sub_title">上海300家4S店在线比价，让你买车不花冤枉钱</h3>
        </div>
        <button className="select_car_btn" onClick={this.scrollToBrandList}>选择车型</button>
        <Popup
          component={FirstUse}
          button={FirstUseButton}
          popupClassName="popup_first_use animated"
          animateClass="slideInLeft"
          scrollToBrandList={this.scrollToBrandList}
          carBrandListState={this.props.carBrandListState}
          type="left"
        />
      </div>
    )
  }
}

export default MainBanner
