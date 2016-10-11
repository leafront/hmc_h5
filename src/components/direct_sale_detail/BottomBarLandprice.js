import React from 'react'
import { browserHistory } from 'react-router'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

import * as ajax from '../../helpers/ajax'
import * as loginAndReg from '../../helpers/login_and_reg'

require('../../sass/common/bottom_bar.scss')

@observer
class BottomBarLandprice extends React.Component {
  constructor(props){
    super(props)

    //this.getDsCarAddFavorites = this.getDsCarAddFavorites.bind(this)

    // this.state = {
    // 	//dsCarAddSubscribe:{}
    // 	dsCarAddFavorites:this.props.addDsCarFavorites
    // }
  }

  // getDsCarAddFavorites(){
  // 	this.props.getDsCarAddFavorites()
  // }

  async componentDidMount() {
  	//await this.getDsCarAddFavorites()
  }
  confirmCarInfo(){
    const {
      optionsData,
      currentCarTypeId,
      currentCarModelId,
      currentCarModelOptionIndex,
      currentColorOptionIndex,
      currentPayMethodOptionIndex,
      currentLicenseOptionIndex
    } = this.props.popupDirectSaleOptionsState

    browserHistory.push(`/direct_sale_price/${currentCarTypeId}/${currentCarModelId}/${currentColorOptionIndex}/${currentPayMethodOptionIndex}/${currentLicenseOptionIndex}`)
  //   @observable optionsData = [
  //   // {
  //   //   optionsType: 'brandName',
  //   //   optionsTitle:'品牌筛选',
  //   //   optionsContent:{
  //   //     names:[1],
  //   //     values:[1]
  //   //   }
  //   // },
  // ]

  // @observable currentCarModelOptionIndex = 0

  // @observable currentColorOptionIndex = 0

  // @observable currentPayMethodOptionIndex = 0

  // @observable currentLicenseOptionIndex = 0

  }
  render(){
    const { currentCarTypeId, currentCarModelId } = this.props.popupDirectSaleOptionsState
    let accessToken = loginAndReg.GetLocalStorageInfo('HMC_ACCESS_TOKEN') && loginAndReg.GetLocalStorageInfo('HMC_ACCESS_TOKEN').accessToken
  
    return(
  		<div className="bottom_bar_landprice">
  			<ul>
  				<li>
            <img src="/images/common/notice.png"/>
  					<p>降价通知</p>
  				</li>
  				<li onClick={ajax.addDsCarFavorites.bind(this , currentCarTypeId, currentCarModelId , accessToken, function(){console.log(123)})}>
  					<img src="/images/common/like.png"/>
  					<p>收藏</p>
  				</li>
  				<li>
  					<img src="/images/common/IM_blue.png"/>
  					<p className="im">客服</p>
  				</li>
  			</ul>
  			<button onClick={this.confirmCarInfo.bind(this)}>查看落地总价</button>
  		</div>
  	)
  }
}

export default BottomBarLandprice