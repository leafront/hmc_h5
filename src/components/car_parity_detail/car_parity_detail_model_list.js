import React from 'react'
import { observer } from 'mobx-react'
import Header from '../common/header'
import CarParityDetailModelListItem from './car_parity_detail_model_list_item'

@observer
class CarParityDetailModelList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { carParityTopInfo, carParityModelList } = this.props
    let title = carParityTopInfo.typeName + ' 款型列表'
    let items = carParityModelList && carParityModelList.map((model, i) => {
      return (
        <CarParityDetailModelListItem item={model} {...this.props} />
      )
    })

  	return(
  		<div className="model_list">
  			<Header title={title} />
        { items }
  		</div>
  	)
  }
}

export default CarParityDetailModelList
