import React from 'react'
import { observer } from 'mobx-react'
import CarParityDetailHistoryPriceList from './car_parity_detail_history_price_list'

@observer
class CarParityDetailHistoryPrice extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
  	return(
  		<div className="history_price">
  			<CarParityDetailHistoryPriceList {...this.props} />
  		</div>
  	)
  }
}

export default CarParityDetailHistoryPrice
