import React from 'react'

require('../../sass/common/bottom_bar.scss')

class BottomBarLockPrice extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
	return(
		<div className="bottom_bar_lock_price">
			<div className="im">
				<img src="/images/common/IM_blue.png"/>
				<p>去砍价</p>
			</div>
			<button className="lock">支付定金，锁定价格</button>
		</div>
	)
  }
}

export default BottomBarLockPrice