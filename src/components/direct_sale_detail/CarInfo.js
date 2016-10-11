import React from 'react'
import { Link } from 'react-router'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

import DirectSaleDetailLandPrice from './DirectSaleDetailLandPrice'
import CarModelDetail from './CarModelDetail'
import DirectSaleDetailGift from './DirectSaleDetailGift'
import DirectSaleDetailInsurance from './DirectSaleDetailInsurance'
import DirectSaleDetailServiceFlow from './DirectSaleDetailServiceFlow'
import DirectCarScroll from '../common/direct_car_scroll'
import Banner from '../common/banner'
import BottomBarLandprice from './BottomBarLandprice'

@observer
class CarInfo extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div className="car_info">
        <DirectSaleDetailLandPrice popupDirectSaleOptionsState={this.props.popupDirectSaleOptionsState}/>
        <CarModelDetail popupDirectSaleOptionsState={this.props.popupDirectSaleOptionsState}/>
        <DirectSaleDetailGift/>
        <DirectSaleDetailInsurance/>
        <DirectSaleDetailServiceFlow/>
        <DirectCarScroll/>
        <Banner/>
        <BottomBarLandprice 
          popupDirectSaleOptionsState={this.props.popupDirectSaleOptionsState}
          getDsCarAddFavorites={this.props.getDsCarAddFavorites} 
          addDsCarFavorites={this.props.addDsCarFavorites}
        />
      </div>
    )
  }
}

export default CarInfo
