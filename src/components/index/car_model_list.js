import React from 'react'
import { Link } from 'react-router'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

import CarModelListState from '../../models/CarModelListState'

require('../../sass/index/car_model_list.scss')

@observer
class CarModelListComponent extends React.Component {
  constructor(props) {
    super(props)

  }
  render(){
    return (
      <dl>
        <dt>{this.props.carInfo.brandName}</dt>
        {
          this.props.carInfo.typeList.map(
            (carInfo, index) => {
              return (
                <dd>
                  <Link to={'/car_parity_detail/' + carInfo.typeId}>
                    <div className="car_image fl"><img width="" src={carInfo.tpicPath}/></div>
                    <div className="car_desc fl">
                      <p className="car_name">{carInfo.typeName}</p>
                      <p className="car_price">指导价:¥{carInfo.typeMinPrice} ~ ¥{carInfo.typeMaxPrice}</p>
                    </div>
                  </Link>
                </dd>
              )
            }
          )
        }
      </dl>
    )
  }
}

@observer
class CarModelList extends React.Component {
  constructor(props) {
    super(props)

  }
  render(){
    return (
      <div className="car_model_list_wrapper" style={{display:this.props.carModelListState.visiblityClass}} onClick={this.props.carModelListState.hideCarModelList.bind(this.props.carModelListState)}>
        <div className="car_model_list" style={{transform:this.props.carModelListState.carModelListLeft}}>
          {
            this.props.carModelListState.carModelListData.map(
              (carInfo, index) => <CarModelListComponent carInfo={carInfo}/>
            )
          }
        </div>
      </div>
    )
  }
}

export default CarModelList
