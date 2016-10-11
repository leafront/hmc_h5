import React from 'react'
import { Link } from 'react-router'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

require('../../sass/index/recommand_car_list.scss')

@observer
class RecommandCarListComponent extends React.Component {
  constructor(props) {
    super(props)

  }
  render(){
    return (
      <li>
        <Link to={'/car_parity_detail/' + this.props.carInfo.typeId}>
          <p><img width="80%" src={this.props.carInfo.tpicPath}/></p>
          <p className="car_name">{this.props.carInfo.typeName}</p>
        </Link>
      </li>
    )
  }
}

@observer
class RecommandCarList extends React.Component {
  constructor(props) {
    super(props)

  }
  render(){
    const { recommandCarListData } = this.props.recommandCarListState
    return (
      <div className="recommand_car_list">
        <ul>
          {
            recommandCarListData.map(
              (carInfo, index) => <RecommandCarListComponent carInfo={carInfo}/>
            )
          }
        </ul>
      </div>
    )
  }
}

export default RecommandCarList
