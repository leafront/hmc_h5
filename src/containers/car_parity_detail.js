import React from 'react'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'
import { ToastContainer, ToastMessage } from 'react-toastr'

import TopBar from '../components/common/top_bar'
import * as ajax from '../helpers/ajax'
import AppLoading from '../components/common/AppLoading'
import CarParityState from '../models/CarParityState'
import CarConfigurationState from '../models/CarConfigurationState'
import CarParityDetailTab from '../components/car_parity_detail/car_parity_detail_tab'

const ToastMessageFactory = React.createFactory(ToastMessage.animation)

@observer
class CarParityDetail extends React.Component {
  constructor(props) {
    super(props)

    this.getCarParityUserHistory = this.getCarParityUserHistory.bind(this)
    this.selectCarModel = this.selectCarModel.bind(this)

    this.carParityState = new CarParityState()
    this.carConfigurationState = new CarConfigurationState()

    this.carParityState.carParityData = {
      step: 1,
      selectedTabIndex: 0,
      selectedOptions: {},
      typeId: this.props.params.typeId
    }

    this.state = {
      noMoreRecords: false,
      page: 1,
      userHistoryRecordNum: 0,
      carParityTopInfo: {},
      carParityImages: [],
      carParityUserHistory: [],
      carParityModelList: [],
      carParityHistoryPrice: [],
      carParityColors: [],
      currentProvince: 0,
          currentDistrict: 0,
      currentDistrictLabel: '',
      carParityBusinessDistrict: {}
    }
  }

  getCarParityUserHistory() {
    let typeId = 'a0534c365d8943818bdea8f441020c9f' || this.props.params.typeId
    ajax.getCarParityUserHistory.call(this, typeId, this.state.page)
  }

  selectCarModel(typeId, modelId, modelName) {
    ajax.getCarParityColors.call(this, typeId, modelId)
    this.carParityState.carParityData.selectedOptions.askpModel = modelId
    this.carParityState.carParityData.selectedOptions.askpModelName = modelName
  }

  async componentDidMount() {
    appState.I_M_Fucking_Loading()

    let typeId = this.props.params.typeId
    await ajax.getCarParityTopInfo.call(this, typeId)
    await ajax.getCarParityImages.call(this, typeId)
    await ajax.getCarParityModelList.call(this, typeId)
    await ajax.getCarParityHistoryPrice.call(this, typeId)
    await this.getCarParityUserHistory(this.state.page)

    appState.I_Have_Done_Fucking_Loading()
  }

  render() {
    let { brandName, typeName } = this.state.carParityTopInfo
    let pageTitle = `${brandName} ${typeName}`
    return (
      <div>
        <TopBar
          pageTitle={pageTitle}
          isIndex={false}
          isShowSearch={true}
        />
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="container"
          className="toast-top-center"
        />
        <AppLoading/>
        <CarParityDetailTab
          carParityState={this.carParityState}
          carConfigurationState={this.carConfigurationState}
          {...this.state}
          getCarParityUserHistory={this.getCarParityUserHistory}
          selectCarModel={this.selectCarModel}
          container={this.refs.container}
        />
      </div>
    )
  }
}

export default CarParityDetail
