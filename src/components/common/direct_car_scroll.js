import React from 'react'
import { Link } from 'react-router'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

import { GLOBAL_API_DOMAIN } from '../../config'
import { MoneyByTenThousand } from '../../../helpers/formatters'

import Header from './header'

class DirectCarScrollState {
  @observable recommandDirectSaleCarData = []

  async fetchRecommandDirectSaleCarList(){
    const time = new Date().getTime()
    const search = `?source=101&time=${time}`
    let url = `${GLOBAL_API_DOMAIN}/ware/ds/car/recommend/310000${search}`
    const Response = await fetch(url)
    const ResponseOK = await Response.ok
    const ResponseJSON = await Response.json()
    if (ResponseOK && ResponseJSON.status == 1){
      this.recommandDirectSaleCarData = ResponseJSON.data
    }
  }
}

@observer
class DirectCarScroll extends React.Component {
  constructor(props){
    super(props)

    this.directCarScrollState = new DirectCarScrollState()
  }
  componentDidMount(){
    this.directCarScrollState.fetchRecommandDirectSaleCarList()
  }
  render(){
    const { recommandDirectSaleCarData } = this.directCarScrollState
  	return(
  		<div className="ds_car">
          <Header title="4S店价高服务差？您可以选择好买车自营直销车" />
  				<div className="car_list">
  					<ul style={{width:170 * recommandDirectSaleCarData.length}}>
              {
                recommandDirectSaleCarData.map(
                  (carInfo, index) => {
                    return (
          						<li>
                        <a href={'/direct_sale_detail/' + carInfo.modelType + '/' + carInfo.dsCarId}>
            							<img src={carInfo.modelPhoto}/>
            							<p>{carInfo.modelBrandName} {carInfo.modelTypeName}</p>
            							<p>{carInfo.modelName}</p>
            							<p>
            								<span>{MoneyByTenThousand(carInfo.dsrp)}万</span>
            								<span>{MoneyByTenThousand(carInfo.msrp)}万</span>
            							</p>
                        </a>
          						</li>
                    )
                  }
                )
              }
  					</ul>
  				</div>
  				<div className="more">更多></div>
  		</div>
  	)
  }
}

export default DirectCarScroll
