import React from 'react'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

import { MoneyByTenThousand, DiscountCualculator } from '../../../helpers/formatters'

@observer
class DirectSalePriceCarType extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    // console.log(this.props.directSalePriceState)
		const { directSalePriceData } = this.props.directSalePriceState

		if(directSalePriceData === null){
			return null
		}

		return(
      <div className="ds_car_price_type">
        <div className="discount">
          <img src={directSalePriceData.dsCarModelPrientVo.modelPhoto}/>
          <div>{DiscountCualculator(directSalePriceData.dsCarModelPrientVo.msrp, directSalePriceData.dsCarModelPrientVo.dsrp)}折</div>
        </div>
        <div className="car_name">
          <p>{directSalePriceData.dsCarModelPrientVo.modelBrandName} {directSalePriceData.dsCarModelPrientVo.modelTypeName}</p>
          <p>{directSalePriceData.dsCarModelPrientVo.modelName}</p>
          <span className="guide_price">指导价{MoneyByTenThousand(directSalePriceData.dsCarModelPrientVo.msrp)}万</span>
          <span className="landprice">{MoneyByTenThousand(directSalePriceData.dsCarModelPrientVo.dsrp)}万</span>
        </div>
      </div>
    )
  }
}

export default DirectSalePriceCarType
