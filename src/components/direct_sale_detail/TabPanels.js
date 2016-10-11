import React from 'react'
import { Link } from 'react-router'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

import CarInfo from './CarInfo'
import CarConfiguration from './CarConfiguration'
import CarParityDetailUserHistory from '../car_parity_detail/car_parity_detail_user_history'

@observer
class TabPanels extends React.Component{
  constructor(props){
    super(props)

  }
  render(){
    const { currentTabIndex } = this.props.dsCarTopInfoState
    return(
      <div>
        {
          currentTabIndex === 0 ? <CarInfo 
            popupDirectSaleOptionsState={this.props.popupDirectSaleOptionsState} 
            getDsCarAddFavorites={this.props.getDsCarAddFavorites} 
            addDsCarFavorites={this.props.addDsCarFavorites}/>
          : null
        }
        {
          currentTabIndex === 1 ? <CarConfiguration popupDirectSaleOptionsState={this.props.popupDirectSaleOptionsState}/> : null
        }
        {
          currentTabIndex === 2 ? <CarParityDetailUserHistory/> : null
        }
      </div>
    )
  }
}

export default TabPanels
