import React from 'react'
import { Link } from 'react-router'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

import { GLOBAL_API_DOMAIN } from '../config'

import MainBanner from '../components/index/main_banner'
import CarBrandList from '../components/index/car_brand_list'
import RecommandCarList from '../components/index/recommand_car_list'
import CarModelList from '../components/index/car_model_list'
import AppLoading from '../components/common/AppLoading'
import BottomBarCommon from '../components/common/bottom_bar_common'

import IndexState from '../models/indexState'
import CarModelListState from '../models/CarModelListState'
import RecommandCarListState from '../models/RecommandCarListState'
import CarBrandListState from '../models/CarBrandListState'

// class TestState {
//   @observable hello = 'world'
//
//   makeHelloWorld(){
//     console.log(123)
//     this.hello = 'it works'
//   }
// }
//
// @observer
// class Test extends React.Component {
//   constructor(props) {
//     super(props)
//   }
//   testClick(){
//     this.props.testState.makeHelloWorld()
//   }
//   render(){
//     return (
//       <p onClick={this.testClick.bind(this)}>{this.props.testState.hello}</p>
//     )
//   }
// }

@observer
class Index extends React.Component {
  constructor(props) {
    super(props)

    this.indexState = new IndexState()
    this.carModelListState = new CarModelListState()
    this.recommandCarListState = new RecommandCarListState()
    this.carBrandListState = new CarBrandListState()
  }
  async componentDidMount(){
    //show loading
    // await this.test()
    // await this.test2()
    // await this.getBrandList()

    // await this.getCarModelList()
    appState.I_M_Fucking_Loading()

    await this.getHotCarList()

    await this.getBrandList()

    appState.I_Have_Done_Fucking_Loading()
  }
  async getHotCarList(){
    const time = new Date().getTime()
    const source = 101
    const pageSize = 6
    const Response = await fetch(
      `${GLOBAL_API_DOMAIN}/ware/car/hot-car/310000?time=${time}&source=${source}&pageSize=${pageSize}`,
      {
        method:'GET'
      }
    )
    const ResponseOK = await Response.ok
    const ResponseJSON = await Response.json()

    if(ResponseOK && ResponseJSON.status === '1'){
      this.recommandCarListState.recommandCarListData = ResponseJSON.data
    }
  }

  async getBrandList(){
    const cityCode = 310000
    const source = 101
    const time = new Date().getTime()
    const Response = await fetch(
      `${GLOBAL_API_DOMAIN}/ware/car/car-brand/${cityCode}?source=${source}&time=${time}`,
      {
        method:'GET'
      }
    )
    const ResponseOK = await Response.ok
    const ResponseJSON = await Response.json()
    if(ResponseOK && ResponseJSON.status === '1'){
      this.indexState.carBrandListData = ResponseJSON.data
    }
  }
  render(){
    return (
      <div className="index_container">
        <MainBanner carBrandListState={this.carBrandListState}/>
        <RecommandCarList recommandCarListState={this.recommandCarListState}/>
        <CarBrandList carBrandListState={this.carBrandListState} carBrandListData={this.indexState.carBrandListData} carModelListState={this.carModelListState}/>
        <CarModelList carModelListState={this.carModelListState}/>
        <AppLoading/>
        <BottomBarCommon/>
      </div>
    )
  }
}

export default Index
