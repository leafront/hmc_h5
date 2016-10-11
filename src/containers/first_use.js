import React from 'react'
import TopBar from '../components/common/top_bar'

export class FirstUseButton extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <span onClick={this.props.openModal}>
        <button className="new_user_btn">初次使用？</button>
      </span>
    )
  }
}

class FirstUse extends React.Component {
  constructor(props) {
    super(props)
    this.scrollToBrandList = this.scrollToBrandList.bind(this)
  }

  scrollToBrandList() {
    this.props.scrollToBrandList()
    this.props.closeModal()
  }

  render() {
    return (
      <div className="first_use">
        <TopBar
          pageTitle="初次使用"
          isIndex={false}
          isShowSearch={true}
          closeModal={this.props.closeModal}
        />
        <div className="content">
          <h3>买车从来不是一件简单的事！</h3>
          <h4>亲，欢迎来到好买车！每天，我们的团队为众多和您一样的会员提供专业服务，这让我们很幸福！我们做得事情很有意义：帮你搞懂（定）车价，买到称心的车子。通过我们，您可以：</h4>
          <p className="bg_01">
            参考其他购车者的历史成交价，了解最真实价格行情走势
          </p>
          <p className="bg_02">
            让300家4S店为您在线PK，得到当前最优惠成交价
          </p>
          <p className="bg_03">
            直接预订好买车的自营直销车，享受现车底价+上门服务”
          </p>
          <button className="select_car_type" onClick={this.scrollToBrandList}>选择车型去试试吧！</button>
        </div>
      </div>
    )
  }
}

export default FirstUse
