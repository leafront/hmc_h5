import React, { Component, PropTypes } from 'react'
import Popup from './Popup'

export class IMButtonOne extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div onClick={this.props.openModal}>
        <img src="/images/common/IM.png"/>
        <p>咨询</p>
      </div>
    )
  }
}

class IM extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
      <div className="im car_parity_wrapper">
        <span className="img_wrapper">
          <img src="http://www.easybuycar.com/upload/finalFileDir/employ/22c0f08463e646d5bfd0fe3f28b99f8b.png"/>
        </span>
        <h3>是否拨打客服电话以解决您的问题</h3>
        <p>我们将对您的电话号码进行加密，防止泄露</p>
        <a href="tel:4008798779">拨打客服电话</a>
        <button className="close_parity_btn" onClick={this.props.closeModal}></button>
      </div>
		)
	}
}

export default IM
