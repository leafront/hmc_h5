import React from 'react'
import { observer } from 'mobx-react'
import CarParityDetailUserHistoryList from './car_parity_detail_user_history_list'

@observer
class CarParityDetailUserHistory extends React.Component {
  constructor(props) {
    super(props)
    this.getCarParityUserHistory = this.getCarParityUserHistory.bind(this)
  }

  getCarParityUserHistory() {
    this.props.carParityState.carParityData.selectedTabIndex = 2
    this.props.getCarParityUserHistory()
  }

  render() {
  	return(
  		<div className="car_user_history">
  			<CarParityDetailUserHistoryList {...this.props} />
        <p className="more_records">
        {
          this.props.noMoreRecords ?
            null :
            <button onClick={this.getCarParityUserHistory}>更多用户晒单...</button>
        }
        </p>
  		</div>
  	)
  }
}

export default CarParityDetailUserHistory
