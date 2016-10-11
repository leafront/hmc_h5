import React from 'react'
import { observer } from 'mobx-react'
import Banner from '../common/banner'
import DirectCarScroll from '../common/direct_car_scroll'
import CarParityDetailBaseinfo from './car_parity_detail_baseinfo'
import CarParityDetailModelList from './car_parity_detail_model_list'

import PriceCurve from '../common/PriceCurve'

@observer
class CarParityDetailInfo extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { typeId } = this.props.carParityState.carParityData
  	return(
  		<div className="car_info">
  			<CarParityDetailBaseinfo {...this.props}/>
        <PriceCurve carTypeId={typeId}/>
        <CarParityDetailModelList {...this.props}/>
        <DirectCarScroll/>
        <div className="banner_wrapper">
          <Banner/>
        </div>
  		</div>
  	)
  }
}

export default CarParityDetailInfo
