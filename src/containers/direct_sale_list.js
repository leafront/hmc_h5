import React from 'react'
import { Link, browserHistory } from 'react-router'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

import { GLOBAL_API_DOMAIN } from '../config'

import TopBar from '../components/common/top_bar'
import Banner from '../components/common/banner'
import DirectSaleListCarFilter from '../components/direct_sale_list/direct_sale_list_car_filter'
import PopupCarOptions from '../components/common/PopupCarOptions'
import BottomBarCommon from '../components/common/bottom_bar_common'

require('../sass/direct_sale_list.scss')

class DirectSaleListState {
  // @observable page = 0
  // @observable modelTypeId = null
  // @observable modelBrandId = null
  // @observable modelMinPrice = null
  // @observable modelMaxPrice = null
  // @observable priceOrderType = null

  totalPages = 0
  @observable currentPage = 0

  @observable directCarListData = []

  @observable queryParams = {
    modelTypeId: null,
    modelBrandId: null,
    modelMinPrice: null,
    modelMaxPrice: null,
    descType: 0
  }

  @computed get queryStringedQueryParams(){
    return {
      modelTypeId: this.queryParams.modelTypeId !== null ? 'modelTypeId=' + this.queryParams.modelTypeId : null,
      modelBrandId: this.queryParams.modelBrandId !== null ? 'modelBrandId=' + this.queryParams.modelBrandId : null,
      modelMinPrice: this.queryParams.modelMinPrice !== null ? 'modelMinPrice=' + this.queryParams.modelMinPrice : null,
      modelMaxPrice: this.queryParams.modelMaxPrice !== null ? 'modelMaxPrice=' + this.queryParams.modelMaxPrice : null,
      descType: 'descType=' + this.queryParams.descType
    }
  }

  increasePageCount(){
    // console.log(this.queryParams.page , this.totalPages)
    if(this.currentPage < this.totalPages - 1){
      this.currentPage++
    }else{
      return false
    }
    return true
  }
  async fetchNextPageData(){
    if(this.increasePageCount()){
      appState.I_M_Fucking_Loading()

      this.changeQueryString()

      await this.getCarListByFilter()

      appState.I_Have_Done_Fucking_Loading()
    }else{

    }
  }
  setCarFilterOptionsByUrl(url){
    let queryParams = {
      modelTypeId: url.query.modelTypeId || null,
      modelBrandId: url.query.modelBrandId || null,
      modelMinPrice: url.query.modelMinPrice || null,
      modelMaxPrice: url.query.modelMaxPrice || null,
      descType: parseInt(url.query.descType, 10) || 0,
    }
    this.queryParams = queryParams
  }

  getCombinedUrlWithQueryString(url, params){
    let queryStrings = ''
    for(let item in params){
      // console.log(params[item])
      if(params[item]){
        if(queryStrings == '' && !/\?/g.test(url)){
          queryStrings += '?' + params[item]
        }else{
          queryStrings += '&' + params[item]
        }
      }
    }
    return url + queryStrings
  }

  changeQueryString(){
    let url = '/direct_sale_list'
    const params = this.queryStringedQueryParams

    url = this.getCombinedUrlWithQueryString(url, params)

    browserHistory.push(url)
  }
  // setFilterParams(routeLocation){
  //   const page = parseInt(routeLocation.query.page, 10) || 0
  //   const modelTypeId = routeLocation.query.modelTypeId
  //   const modelBrandId = routeLocation.query.modelBrandId
  //   const modelMinPrice = routeLocation.query.modelMinPrice
  //   const modelMaxPrice = routeLocation.query.modelMaxPrice
  //   const priceOrderType = routeLocation.query.priceOrderType
  //
  //   this.page = page
  //   this.modelTypeId = modelTypeId
  //   this.modelBrandId = modelBrandId
  //   this.modelMinPrice = modelMinPrice
  //   this.modelMaxPrice = modelMaxPrice
  //   this.priceOrderType = priceOrderType
  // }
  async getCarListByFilter(){
    const time = new Date().getTime()
    const source = 101
    const search = `?time=${time}&source=${source}`
    let url = `${GLOBAL_API_DOMAIN}/ware/ds/310000/car?time=123&source=101`
    let params = this.queryStringedQueryParams
    params.page = 'page=' + (this.currentPage + 1)

    url = this.getCombinedUrlWithQueryString(url, params)
    const Response = await fetch(
      url,
      {
        method:'GET'
      }
    )
    const ResponseOK = await Response.ok
    const ResponseJSON = await Response.json()
    if(ResponseOK && ResponseJSON.status === '1'){
      if(ResponseJSON.data.currentPage - 1 === 0){
        this.directCarListData = ResponseJSON.data.recordList
      }else{
        this.directCarListData = this.directCarListData.concat(ResponseJSON.data.recordList)
      }

      this.totalPages = ResponseJSON.data.pageCount
    }
  }
  checkPageIsLastPages(){
    if(this.totalPages === this.currentPage){
      return true
    }
    return false
  }
}

class PopupCarOptionsState {
  // @observable isPopupCarOptionsVisible = false
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
  @observable highLightedOptionIndex = []

  @observable visiblityClass = 'none'
  @observable carModelListLeft = 'translate(100%,0)'
  @observable carModelListOverFlow = 'scroll'
  isAnimating = false

  switchOptionsButton(buttonGroupIndex, buttonIndex, isMultipleOption){
    const orgOptionLength = this.highLightedOptionIndex[buttonGroupIndex].length
    for(let i = 0; i < this.highLightedOptionIndex[buttonGroupIndex].length; i++){
      if(this.highLightedOptionIndex[buttonGroupIndex][i] === buttonIndex){
        this.highLightedOptionIndex[buttonGroupIndex].splice(i,1)
      }
    }
    if(orgOptionLength === this.highLightedOptionIndex[buttonGroupIndex].length){
      if(!isMultipleOption){
        this.highLightedOptionIndex[buttonGroupIndex].length = 0
      }
      this.highLightedOptionIndex[buttonGroupIndex].push(buttonIndex)
      this.highLightedOptionIndex[buttonGroupIndex].sort((a,b) => a - b)
    }
    // console.log(this.highLightedOptionIndex[0][0])
  }

  // showPopupCarOptions(){
  //   this.isPopupCarOptionsVisible = true
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
    if(e && e.target && !/popup_car_options_wrapper/g.test(e.target.className)){
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
            queryParams.modelMinPrice = optionsData[i].optionsContent.values[highLightedOptionIndex[i][j]].min
            queryParams.modelMaxPrice = optionsData[i].optionsContent.values[highLightedOptionIndex[i][j]].max
          }
          break
        default:
      }
    }
    return queryParams
  }
  resetFilters(){
    for(let i = 0; i < this.highLightedOptionIndex.length; i++){
      this.highLightedOptionIndex[i].length = 0
    }
  }
}

@observer
class DirectSaleList extends React.Component{
  constructor(props){
    super(props)

    this.directSaleListState = new DirectSaleListState()
    this.popupCarOptionsState = new PopupCarOptionsState()
  }
  async componentDidMount(){
    appState.I_M_Fucking_Loading()

    this.directSaleListState.setCarFilterOptionsByUrl(this.props.location)

    await this.getCarFilterOptionsData()

    // this.directSaleListState.setFilterParams(this.props.location)

    await this.directSaleListState.getCarListByFilter()

    appState.I_Have_Done_Fucking_Loading()

  // setTimeout(() => {
  //  this.directSaleListState.page = 2222
  //  this.directSaleListState.changeQueryString()
  // },1000)
  }
  async getCarFilterOptionsData(){
    let optionsData = [
      {
        isMultipleOption: false,
        optionsType: 'brandName',
        optionsTitle:'品牌筛选',
        optionsContent:{
          names:[],
          values:[]
        }
      },
      {
        isMultipleOption: false,
        optionsType: 'carType',
        optionsTitle:'车型筛选',
        optionsContent:{
          names:['SUV','MPV','跑车','轿车','新能源'],
          values:[1, 2, 3, 0, 4]
        }
      },
      {
        isMultipleOption: false,
        optionsType: 'priceRange',
        optionsTitle: '价格筛选',
        optionsContent: {
          names: ['5-10万','10-15万','15-25万','25-35万','35万以上'],
          values: [
            {min:50000,max:100000},
            {min:100000,max:150000},
            {min:150000,max:250000},
            {min:250000,max:350000},
            {min:350000,max:-1},
          ]
        }
      }
    ]

    //initial highLightedOptionIndex , related to optionsData length
    for(var i = 0; i < optionsData.length; i++){
      this.popupCarOptionsState.highLightedOptionIndex.push([])
    }

    const time = new Date().getTime()
    const source = 101
    const cityCode = 310000
    const Response = await fetch(
      `${GLOBAL_API_DOMAIN}/ware/ds/car/brand/${cityCode}?time=${time}&source=${source}`,
      {
        method:'GET'
      }
    )
    const ResponseOK = await Response.ok
    const ResponseJSON = await Response.json()
    if(ResponseOK && ResponseJSON.status === '1'){
      const data = ResponseJSON.data
      let names = []
      let values = []
      for(let item in data){
        names.push(data[item].brandName)
        values.push(data[item].brandId)
      }
      optionsData[0].optionsContent = {
        names: names,
        values: values
      }

      this.popupCarOptionsState.optionsData = optionsData
    }
  }
  render(){
    return(
      <div className="direct_sale_list">
        <TopBar
          pageTitle="好买车自营"
          isIndex={false}
          isShowSearch={true}
        />
        <Banner/>
        <DirectSaleListCarFilter directSaleListState={this.directSaleListState} popupCarOptionsState={this.popupCarOptionsState}/>
        <PopupCarOptions popupCarOptionsState={this.popupCarOptionsState} directSaleListState={this.directSaleListState}/>
        <BottomBarCommon/>
      </div>
    )
  }
}

export default DirectSaleList
