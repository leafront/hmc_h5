import React from 'react'

require('../../sass/common/bottom_bar.scss')

class BottomBarUnsubscribe extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
	return(
		<div className="bottom_bar_unsubscribe">
			<ul>
				<li>
					<img src="/images/common/phone.png"/>
					<p>联系销售员</p>
				</li>
				<li>
					<img src="/images/common/navigation.png"/>
					<p>4S店导航</p>
				</li>
				<li>
					<img src="/images/common/payment.png"/>
					<p>支付凭证</p>
				</li>
			</ul>
			<button>退订</button>
		</div>
	)
  }
}

export default BottomBarUnsubscribe