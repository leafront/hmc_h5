import React from 'react'
import { Link, browserHistory } from 'react-router'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

import * as ajax from '../helpers/ajax'
import * as loginAndReg from '../helpers/login_and_reg'

import TopBar from '../components/common/top_bar'
import Modal from 'react-modal'
import ModalState from '../models/ModalState'
import DirectSaleDetailImgSlide from '../components/direct_sale_detail/direct_sale_detail_img_slide'
import Tabs from '../components/direct_sale_detail/Tabs'
import TabPanels from '../components/direct_sale_detail/TabPanels'
import AppLoading from '../components/common/AppLoading'

import { GLOBAL_API_DOMAIN } from '../config'

import DsCarTopInfoState from '../models/DsCarTopInfoState'

require('../sass/direct_sale_detail.scss')

@observer
class CarModelOptions extends React.Component {
  constructor(props){
    super(props)
  }
  switchOption(toIndex){
    this.props.popupDirectSaleOptionsState.switchCarModelOption(toIndex)
    this.props.popupDirectSaleOptionsState.resetOtherOptions()
  }
  render(){
    const optionsData = this.props.popupDirectSaleOptionsState.optionsData
    const currentCarModelOptionIndex = this.props.popupDirectSaleOptionsState.currentCarModelOptionIndex

    return (
      <dl className='model_options'>
        <dt>车型</dt>
        <dd>
          {
            optionsData.map(
              (option, index) => <button onClick={this.switchOption.bind(this, index)} className={currentCarModelOptionIndex === index ? 'active' : ''}>{option.carModelOptions}</button>
            )
          }
        </dd>
      </dl>
    )
  }
}

@observer
class ColorOptions extends React.Component {
  constructor(props){
    super(props)
  }
  switchOption(toIndex){
    this.props.popupDirectSaleOptionsState.switchColorOption(toIndex)
  }
  render(){
    const optionsData = this.props.popupDirectSaleOptionsState.optionsData
    const currentCarModelOptionIndex = this.props.popupDirectSaleOptionsState.currentCarModelOptionIndex
    const currentColorOptionIndex = this.props.popupDirectSaleOptionsState.currentColorOptionIndex

    if(optionsData.length === 0 || optionsData[currentCarModelOptionIndex].colorOptions.length === 0){
      return null
    }

    return (
      <dl>
        <dt>颜色(外观／内饰)</dt>
        <dd>
          {
            optionsData[currentCarModelOptionIndex].colorOptions.map(
              (option, index) => <button onClick={this.switchOption.bind(this, index)} className={currentColorOptionIndex === index ? 'active' : ''}>{option}</button>
            )
          }
        </dd>
      </dl>
    )
  }
}

@observer
class PayMethodOptions extends React.Component {
  constructor(props){
    super(props)
  }
  switchOption(toIndex){
    this.props.popupDirectSaleOptionsState.switchPayMethodOption(toIndex)
  }
  render(){
    const optionsData = this.props.popupDirectSaleOptionsState.optionsData
    const currentCarModelOptionIndex = this.props.popupDirectSaleOptionsState.currentCarModelOptionIndex
    const currentPayMethodOptionIndex = this.props.popupDirectSaleOptionsState.currentPayMethodOptionIndex
    if(optionsData.length === 0 || optionsData[currentCarModelOptionIndex].modelPaymentOptions.length === 0){
      return null
    }

    return (
      <dl>
        <dt>购车方式</dt>
        <dd>
          {
            optionsData[currentCarModelOptionIndex].modelPaymentOptions.map(
              (option, index) => <button onClick={this.switchOption.bind(this, index)} className={currentPayMethodOptionIndex === index ? 'active' : ''}>{option}</button>
            )
          }
        </dd>
      </dl>
    )
  }
}

@observer
class LicenseOptions extends React.Component {
  constructor(props){
    super(props)
  }
  switchOption(toIndex){
    this.props.popupDirectSaleOptionsState.switchLicenseOption(toIndex)
  }
  render(){
    const optionsData = this.props.popupDirectSaleOptionsState.optionsData
    const currentCarModelOptionIndex = this.props.popupDirectSaleOptionsState.currentCarModelOptionIndex
    const currentLicenseOptionIndex = this.props.popupDirectSaleOptionsState.currentLicenseOptionIndex
    if(optionsData.length === 0 || optionsData[currentCarModelOptionIndex].licenseOptions.length === 0){
      return null
    }

    return (
      <dl>
        <dt>牌照</dt>
        <dd>
          {
            optionsData[currentCarModelOptionIndex].licenseOptions.map(
              (option, index) => <button onClick={this.switchOption.bind(this, index)} className={currentLicenseOptionIndex === index ? 'active' : ''}>{option}</button>
            )
          }
        </dd>
      </dl>
    )
  }
}

@observer
class PopupDirectSaleOptions extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
      <div className="popup_direct_sale_options_wrapper" style={{display:this.props.popupDirectSaleOptionsState.visiblityClass}} onClick={this.props.popupDirectSaleOptionsState.hidePopupCarOptions.bind(this.props.popupDirectSaleOptionsState)}>
        <div className="popup_direct_sale_options" style={{transform:this.props.popupDirectSaleOptionsState.carModelListLeft}}>
          <div className="options_buttons">
            <CarModelOptions popupDirectSaleOptionsState={this.props.popupDirectSaleOptionsState}/>
            <div className="more_cars_btn"><button>没有您要的款型？好买车帮您代购</button></div>
            <ColorOptions popupDirectSaleOptionsState={this.props.popupDirectSaleOptionsState}/>
            <PayMethodOptions popupDirectSaleOptionsState={this.props.popupDirectSaleOptionsState}/>
            <LicenseOptions popupDirectSaleOptionsState={this.props.popupDirectSaleOptionsState}/>
          </div>
          <div className="confirm_buttons">
            <button onClick={this.props.popupDirectSaleOptionsState.confirmOptions.bind(this.props.popupDirectSaleOptionsState)} className="choose_confirm">确定</button>
          </div>
        </div>
      </div>
    )
  }
}

class PopupDirectSaleOptionsState {
  @observable optionsData = [
    // {
    //   optionsType: 'brandName',
    //   optionsTitle:'品牌筛选',
    //   optionsContent:{
    //     names:[1],
    //     values:[1]
    //   }
    // },
  ]

  @observable currentCarTypeId = null
  @observable currentCarModelId = null

  @observable currentCarModelOptionIndex = 0

  @observable currentColorOptionIndex = 0

  @observable currentPayMethodOptionIndex = 0

  @observable currentLicenseOptionIndex = 0

  @observable visiblityClass = 'none'
  @observable carModelListLeft = 'translate(100%,0)'
  @observable carModelListOverFlow = 'scroll'
  isAnimating = false

  confirmOptions(){
    this.hidePopupCarOptions()
    this.currentCarModelId = this.optionsData[this.currentCarModelOptionIndex].carModelId

    browserHistory.replace(`/direct_sale_detail/${this.currentCarTypeId}/${this.currentCarModelId}`)
  }
  switchCarModelOption(toIndex){
    this.currentCarModelOptionIndex = toIndex
  }
  switchColorOption(toIndex){
    this.currentColorOptionIndex = toIndex
  }
  switchPayMethodOption(toIndex){
    this.currentPayMethodOptionIndex = toIndex
  }
  switchLicenseOption(toIndex){
    this.currentLicenseOptionIndex = toIndex
  }

  resetOtherOptions(){
    this.switchColorOption(0)
    this.switchPayMethodOption(0)
    this.switchLicenseOption(0)
  }
  // switchOptionsButton(buttonGroupIndex, buttonIndex){
  //   for(let i = 0; i < this.highLightedOptionIndex[buttonGroupIndex].length; i++){
  //     if(this.highLightedOptionIndex[buttonGroupIndex][i] === buttonIndex){
  //       this.highLightedOptionIndex[buttonGroupIndex][i] = buttonIndex
  //     }
  //   }
  // }
  // switchCarModelOption(toIndex){
  //   this.highLightedOptionIndex[0] = toIndex
  // }
  // switchColorOption(toIndex){
  //   this.highLightedOptionIndex[1] = toIndex
  // }
  // switchPayMethodOption(toIndex){
  //   this.highLightedOptionIndex[2] = toIndex
  // }
  // switchLicenseOption(toIndex){
  //   this.highLightedOptionIndex[3] = toIndex
  // }
  showPopupCarOptions(){
    if(this.isAnimating){
      return false
    }

    this.isAnimating = true
    this.visiblityClass = 'block'

    window.setTimeout(() => {
      this.carModelListLeft = 'translate(0,0)'
    },10)

    window.setTimeout(() => {
      this.carModelListOverFlow = 'scroll'
      this.isAnimating = false
    },500)
  }
  hidePopupCarOptions(e){
    if(e && e.target && !/popup_direct_sale_options_wrapper/g.test(e.target.className)){
      return false
    }
    if(this.isAnimating){
      return false
    }

    this.isAnimating = true
    this.carModelListLeft = 'translate(100%,0)'
    this.carModelListOverFlow = 'hidden'

    window.setTimeout(() => {
      this.visiblityClass = 'none'
      this.isAnimating = false
    },500)
  }
  getChoosedOptions(){
    let queryParams = {
      page: 0,
      modelTypeId: null,
      modelBrandId: null,
      modelMinPrice: null,
      modelMaxPrice: null,
      // priceOrderType: null,
      descType: 0
    }
    const highLightedOptionIndex = this.highLightedOptionIndex
    const optionsData = this.optionsData
    for(var i = 0; i < highLightedOptionIndex.length; i++){
      switch(optionsData[i].optionsType){
        case 'brandName':
          for(var j = 0; j < highLightedOptionIndex[i].length; j++){
            queryParams.modelBrandId = optionsData[i].optionsContent.values[highLightedOptionIndex[i][j]]
          }
          break
        case 'carType':
          for(var j = 0; j < highLightedOptionIndex[i].length; j++){
            queryParams.modelTypeId = optionsData[i].optionsContent.values[highLightedOptionIndex[i][j]]
          }
          break
        case 'priceRange':
          for(var j = 0; j < highLightedOptionIndex[i].length; j++){
            queryParams.modelMinPrice = optionsData[i].optionsContent.values[highLightedOptionIndex[i][j]].max
            queryParams.modelMaxPrice = optionsData[i].optionsContent.values[highLightedOptionIndex[i][j]].min
          }
          break
        default:
      }
    }
    return queryParams
  }
}

@observer
class DirectSaleDetail extends React.Component{
  constructor(props){
    super(props)

    this.cityCode = '310000'
    this.directSaleCarTypeId = this.props.params.directSaleCarTypeId
    this.directSaleCarModelId = this.props.params.directSaleCarModelId

    this.source = '101'
    this.time = new Date().getTime()
    this.search = '?' + 'source=' + this.source + '&time=' + this.time
    this.options = {
      method: 'GET'
    }

    this.dsCarTopInfoState = new DsCarTopInfoState()

    this.popupDirectSaleOptionsState = new PopupDirectSaleOptionsState()
    this.popupDirectSaleOptionsState.currentCarTypeId = this.props.params.directSaleCarTypeId
    this.popupDirectSaleOptionsState.currentCarModelId = this.props.params.directSaleCarModelId


    // this.state = {
    //   dsCarAddFavorites:{}
    // }

  }

  async componentDidMount() {
    appState.I_M_Fucking_Loading()
    
    await this.getDsCarTopInfo()

    appState.I_Have_Done_Fucking_Loading()  
  }

  async getDsCarTopInfo(){
    let url = `${GLOBAL_API_DOMAIN}/ware/ds/car/${this.directSaleCarTypeId}${this.search}`
    const Response = await fetch(url, this.options)
    const ResponseOK = await Response.ok
    const ResponseJSON = await Response.json()
    if (ResponseOK) {
      const formatedData = this.formatDirectSaleCarInfoOptions(ResponseJSON.data)
      // const formatedData = this.formatDirectSaleCarInfoOptions(testData)

      this.popupDirectSaleOptionsState.optionsData = formatedData

      this.dsCarTopInfoState.dsCarTopInfoData = ResponseJSON.data
    }
  }
  formatDirectSaleCarInfoOptions(carInfoData){

    let allOptions = []

    for(let i = 0; i < carInfoData.length; i++){
      const dataComponent = {
        carModelOptions: carInfoData[i].modelName,
        colorOptions: carInfoData[i].modelColorName.split('#') || [],
        modelPaymentOptions: carInfoData[i].modelPaymentOption.split('#') || [],
        licenseOptions: carInfoData[i].modelLicenseOption.split('#') || [],
        dsrp: carInfoData[i].dsrp,
        msrp: carInfoData[i].msrp,
        carModelId: carInfoData[i].modelId,
        modelPhoto: carInfoData[i].modelPhoto
      }

      allOptions.push(dataComponent)

      if(this.popupDirectSaleOptionsState.currentCarModelId == carInfoData[i].modelId){
        this.popupDirectSaleOptionsState.currentCarModelOptionIndex = i
      }
    }
    return allOptions
  }
  async getCarPriceChart(){
    const currentCarModelId = this.popupDirectSaleOptionsState.currentCarModelId
    let url = `${GLOBAL_API_DOMAIN}/ware/ds/car/priceCurve/${currentCarModelId}${this.search}`
    const Response = await fetch(url, this.options)
    const ResponseOK = await Response.ok
    const ResponseJSON = await Response.json()
    if (ResponseOK) {
      // console.log(ResponseJSON.data.priceCurve)
      this.dsCarTopInfoState.carPriceCurveData = ResponseJSON.data.priceCurve
    }
  }


  // async getDsCarAddFavorites(){
  //   let typeId = this.props.params.directSaleCarTypeId
  //   let modelId = this.props.params.directSaleCarModelId
  //   let accessToken = loginAndReg.GetLocalStorageInfo('HMC_ACCESS_TOKEN') && loginAndReg.GetLocalStorageInfo('HMC_ACCESS_TOKEN').accessToken
  //   ajax.getDsCarAddFavorites.call(this , typeId , modelId , accessToken)
  // }

  // async getCarParityUserHistory() {
  //  let extra = '&typeId=' + /*this.carType*/'a0534c365d8943818bdea8f441020c9f' + '&page=' + this.state.page + '&pageSize=3'
  //  let url = GLOBAL_API_DOMAIN + '/user/member/timeline/' + this.cityCode + this.search + extra
  //  let carParityUserHistory, noMoreRecords
 //     const Response = await fetch(url, this.options)
 //     const ResponseOK = await Response.ok
 //     const ResponseJSON = await Response.json()
 //     if (ResponseOK) {
  //    carParityUserHistory = this.state.carParityUserHistory.concat(ResponseJSON.data.timelineUsers)
  //    noMoreRecords = ResponseJSON.data.flag === '0'
  //    this.setState({
  //      page: this.state.page + 1,
  //      noMoreRecords: noMoreRecords,
  //      userHistoryRecordNum: ResponseJSON.data.totalNum || 100,
  //      carParityUserHistory: carParityUserHistory
  //    })
  //    //console.log(ResponseJSON.data)
 //     }
 //   }

  render(){
    console.log(this.popupDirectSaleOptionsState)
    return(
      <div className="direct_sale_detail">
        <TopBar
          pageTitle=""
          isIndex={false}
          isShowSearch={true}
        />
        <DirectSaleDetailImgSlide popupDirectSaleOptionsState={this.popupDirectSaleOptionsState}/>
        <Tabs className="tabs" dsCarTopInfoState={this.dsCarTopInfoState}/>
        <TabPanels 
          dsCarTopInfoState={this.dsCarTopInfoState}
          popupDirectSaleOptionsState={this.popupDirectSaleOptionsState} 
          {...this.state} 
          addDsCarFavorites={this.addDsCarFavorites}
        />
        <PopupDirectSaleOptions popupDirectSaleOptionsState={this.popupDirectSaleOptionsState} dsCarTopInfoState={this.dsCarTopInfoState}/>
        <AppLoading/>
      </div>
    )
  }
}

export default DirectSaleDetail
