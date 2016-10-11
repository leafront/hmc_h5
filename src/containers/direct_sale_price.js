import React from 'react'
import { Link, browserHistory } from 'react-router'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

import { GLOBAL_API_DOMAIN } from '../config'

import TopBar from '../components/common/top_bar'
import DirectSalePriceCarType from '../components/direct_sale_price/DirectSalePriceCarType'
import BottomBarTotalPrice from '../components/common/bottom_bar_total_price'
// import DirectSalePricePurchaseFilter from '../components/direct_sale_price/DirectSalePricePurchaseFilter'
import DirectSalePriceReplace from '../components/direct_sale_price/DirectSalePriceReplace'
import DirectSalePriceAddition from '../components/direct_sale_price/DirectSalePriceAddition'

import Popup from '../components/common/Popup'
import DirectSalePriceDemand, { DirectSalePriceDemandContent } from '../components/direct_sale_price/DirectSalePriceDemand'
// import DirectSalePriceCarType from '../components/direct_sale_price/DirectSalePriceCarType'
import DirectSalePriceLoanContent , { DirectSalePriceLoan } from '../components/direct_sale_price/direct_sale_price_popup_loan'
import DirectSalePriceLicenseContent , { DirectSalePriceLicense } from '../components/direct_sale_price/direct_sale_price_popup_license'
import DirectSalePriceInsuranceContent , { DirectSalePriceInsurance } from '../components/direct_sale_price/direct_sale_price_popup_insurance'

class DirectSalePriceState {
  @observable directSaleCarTypeId = null
  @observable directSaleCarModelId = null

  giftPrice = 4598
  temporaryLicenseFee = 50
  servicePrice = 1000

  @observable directSalePriceData = null
  @observable carModelData = null

  @observable replacementOption = null
  @observable loanList = []

  // @observable currentCarModelOptionIndex = 0
  @observable currentColorOptionIndex = 0
  @observable currentPayMethodOptionIndex = 0
  @observable currentLicenseOptionIndex = 0

  @observable currentLoanBankIndex = 0
  @observable currentLoanPlanIndex = 0

  @observable currentLicenseGroupIndex = 0
  @observable currentLicenseAreaIndex = 0

  @observable currentInsuranceGroupIndex = 0
  @observable currentInsurancePlanIndex = 0

  formatDirectSaleCarInfoOptions(carInfoData){
    let carModelData = null

    for(let i = 0; i < carInfoData.length; i++){
      if(carInfoData[i].modelId == this.directSaleCarModelId){
        carModelData = {
          carModelOptions: carInfoData[i].modelName,
          colorOptions: carInfoData[i].modelColorName.split('#') || [],
          modelPaymentOptions: carInfoData[i].modelPaymentOption.split('#') || [],
          licenseOptions: carInfoData[i].modelLicenseOption.split('#') || [],
          dsrp: carInfoData[i].dsrp,
          msrp: carInfoData[i].msrp,
          carModelId: carInfoData[i].modelId,
          modelPhoto: carInfoData[i].modelPhoto
        }
        return carModelData
      }
    }
  }

  async getDsCarTopInfo(){
    const directSaleCarTypeId = this.directSaleCarTypeId
    const time = new Date().getTime()
    const search = `?source=101&time=${time}`
    let url = `${GLOBAL_API_DOMAIN}/ware/ds/car/${directSaleCarTypeId}${search}`
    const Response = await fetch(url)
    const ResponseOK = await Response.ok
    const ResponseJSON = await Response.json()
    if (ResponseOK && ResponseJSON.status == 1){
      const formatedData = this.formatDirectSaleCarInfoOptions(ResponseJSON.data)

      this.carModelData = formatedData
    }
  }

  async fetchDirectSaleCarSaleOptions(){
    const directSaleCarModelId = this.directSaleCarModelId
    const licenseType = this.licenseOptionType
    // console.log(licenseType)
    const time = new Date().getTime()
    const search = `?source=101&time=${time}`
    let url = `${GLOBAL_API_DOMAIN}/ware/ds/car/purintent/${directSaleCarModelId}/${licenseType}/310000${search}`
    const Response = await fetch(url)
    const ResponseOK = await Response.ok
    const ResponseJSON = await Response.json()
    if (ResponseOK && ResponseJSON.status == 1){
      this.directSalePriceData = ResponseJSON.data

      const carDSRP = ResponseJSON.data.dsCarModelPrientVo.dsrp
      this.initLoanList(carDSRP)
    }
  }
  @computed get totalPrice(){
    const { directSalePriceData, carModelData, servicePrice, carTax, currentInsuranceGroupIndex, currentInsurancePlanIndex, currentLicenseGroupIndex, currentLicenseAreaIndex } = this
    const carInsurancePrice = parseInt(directSalePriceData.insureCompanys[currentInsuranceGroupIndex].types[currentInsurancePlanIndex].price, 10)
    const licensePrice = directSalePriceData.licenses[currentLicenseGroupIndex].locations[currentLicenseAreaIndex].price
    // const servicePrice = servicePrice
    const taxPrice = carTax
    const dsrp = carModelData.dsrp
    return carInsurancePrice + licensePrice + servicePrice + taxPrice + dsrp
  }
  @computed get moneySaved(){
    const { directSalePriceData, carModelData, servicePrice, giftPrice, temporaryLicenseFee, carTax, currentInsuranceGroupIndex, currentInsurancePlanIndex, currentLicenseGroupIndex, currentLicenseAreaIndex } = this

    const dsrp = carModelData.dsrp
    const msrp = carModelData.msrp
    return msrp - dsrp + giftPrice + temporaryLicenseFee
  }
  @computed get licenseOptionType(){
    // console.log(this.carModelData.licenseOptions[this.currentLicenseOptionIndex])
    const licenseType = this.carModelData.licenseOptions[this.currentLicenseOptionIndex] == '沪牌' ? 1 : 2
    return licenseType
  }

  switchColorOptionIndex(toIndex){
    this.currentColorOptionIndex = toIndex

    browserHistory.replace(`/direct_sale_price/${this.directSaleCarTypeId}/${this.directSaleCarModelId}/${this.currentColorOptionIndex}/${this.currentPayMethodOptionIndex}/${this.currentLicenseOptionIndex}`)
  }
  switchPayMethodOptionIndex(toIndex){
    this.currentPayMethodOptionIndex = toIndex

    browserHistory.replace(`/direct_sale_price/${this.directSaleCarTypeId}/${this.directSaleCarModelId}/${this.currentColorOptionIndex}/${this.currentPayMethodOptionIndex}/${this.currentLicenseOptionIndex}`)
  }
  async switchLicenseOptionIndex(toIndex){
    this.currentLicenseOptionIndex = toIndex
    this.currentLicenseGroupIndex = 0
    this.currentLicenseAreaIndex = 0

    browserHistory.replace(`/direct_sale_price/${this.directSaleCarTypeId}/${this.directSaleCarModelId}/${this.currentColorOptionIndex}/${this.currentPayMethodOptionIndex}/${this.currentLicenseOptionIndex}`)
    
    await this.fetchDirectSaleCarSaleOptions()
  }
  getAllOptions(){
    const { directSalePriceData, carTax, servicePrice, moneySaved, totalPrice, carModelData, directSaleCarModelId, loanList, currentColorOptionIndex, currentLoanBankIndex, currentPayMethodOptionIndex, currentLoanPlanIndex, currentLicenseGroupIndex, currentLicenseAreaIndex, currentInsuranceGroupIndex, currentInsurancePlanIndex } = this
    const licenseLocation = directSalePriceData.licenses[currentLicenseGroupIndex].locations[currentLicenseAreaIndex].location
    const piHukou = /上海籍/.test(directSalePriceData.licenses[currentLicenseGroupIndex].type) ? 1 : 0
    const downpaymentPercent = loanList[currentLoanPlanIndex].payPercent + '%'
    const loanInstallmentNum = loanList[currentLoanPlanIndex].stage / 12
    const piLoan = /贷款/.test(carModelData.modelPaymentOptions[currentPayMethodOptionIndex]) ? 1 : 0
    const loanBankId = currentLoanBankIndex
    const loanBankName = directSalePriceData.banks[currentLoanBankIndex]
    const carInsuranceOption = currentInsurancePlanIndex
    const carInsuranceCompanyId = currentInsuranceGroupIndex
    const carInsuranceCompanyName = directSalePriceData.insureCompanys[currentInsuranceGroupIndex].name
    const carInsurancePrice = directSalePriceData.insureCompanys[currentInsuranceGroupIndex].types[currentInsurancePlanIndex].price
    const licensePrice = directSalePriceData.licenses[currentLicenseGroupIndex].locations[currentLicenseAreaIndex].price
    // const servicePrice = 123
    const taxPrice = carTax
    const msrp = carModelData.msrp
    const dsrp = carModelData.dsrp
    const sumPrice = totalPrice
    const piSaveMoney = moneySaved
    const piColorName = carModelData.colorOptions[currentColorOptionIndex]

    // console.log(moneySaved, piColorName)
    
    const requestData = {
      "data": {
        "cityCode": "310000",
        "licenseLocation": licenseLocation,
        "carModelId": directSaleCarModelId,
        "piHukou": piHukou,
        "downpaymentPercent": downpaymentPercent,
        "loanInstallmentNum": loanInstallmentNum,
        "piLoan": piLoan,
        "loanBankId": loanBankId,
        "loanBankName": loanBankName,
        "carInsuranceOption": carInsuranceOption,
        "carInsuranceCompanyId": carInsuranceCompanyId,
        "carInsuranceCompanyName": carInsuranceCompanyName,
        "carInsurancePrice": carInsurancePrice,
        "licensePrice": licensePrice,
        "servicePrice": servicePrice,
        "taxPrice": taxPrice,
        "dsrp": msrp,
        "msrp": dsrp,
        "sumPrice": sumPrice,
        "piSaveMoney": moneySaved,
        "piColorName": piColorName
      }
    }

    return requestData
  }
  async saveOrder(){
    // const directSaleCarTypeId = this.directSaleCarTypeId
    const time = new Date().getTime()
    const source = "101"
    const accessToken = localStorage['HMC_ACCESS_TOKEN'] && JSON.parse(localStorage['HMC_ACCESS_TOKEN']).accessToken
    let requestData = this.getAllOptions()
    requestData.data.isPay = 0
    requestData.time = time
    requestData.source = source
    requestData = JSON.stringify(requestData)

    let url = `${GLOBAL_API_DOMAIN}/ds/trade/purchaseintent`
    const Response = await fetch(url,{
      headers:{
        'Content-Type':'application/json',
        'accessToken':accessToken
      },
      method:'post',
      body:requestData
    })
    const ResponseOK = await Response.ok
    const ResponseJSON = await Response.json()

    if (ResponseOK && ResponseJSON.status == 1){

    }
  }
  async orderRightNow(){
    const time = new Date().getTime()
    const source = "101"
    const accessToken = localStorage['HMC_ACCESS_TOKEN'] && JSON.parse(localStorage['HMC_ACCESS_TOKEN']).accessToken
    let requestData = this.getAllOptions()
    requestData.data.isPay = 1
    requestData.time = time
    requestData.source = source
    requestData = JSON.stringify(requestData)

    let url = `${GLOBAL_API_DOMAIN}/ds/trade/purchaseintent`
    const Response = await fetch(url,{
      headers:{
        'Content-Type':'application/json',
        'accessToken':accessToken
      },
      method:'post',
      body:requestData
    })
    const ResponseOK = await Response.ok
    const ResponseJSON = await Response.json()

    if (ResponseOK && ResponseJSON.status == 1){

    }
  }

  @computed get carTax(){
    if(!this.directSalePriceData) return null
    const carDSRP = this.directSalePriceData.dsCarModelPrientVo.dsrp
    let jiaoqiang = 950 //交强险
    let chesun = 593 + carDSRP * 0.0141 //车损险
    let zeren = 1516 //第三方责任险
    return parseInt((jiaoqiang + ((chesun + zeren) * 1.15) * 0.855) * 1.1)
  }
  @computed get totalLoanFee(){
    if(!this.directSalePriceData){
      return null
    }
    console.log(this.directSalePriceData.insureCompanys[this.currentLoanBankIndex][this.currentLoanPlanIndex])
    return this.directSalePriceData.insureCompanys[this.currentLoanBankIndex][this.currentLoanPlanIndex]
  }
  @computed get totalInsuranceFee(){
    if(!this.directSalePriceData){
      return null
    }
    return this.directSalePriceData.insureCompanys[this.currentInsuranceGroupIndex].types[this.currentInsurancePlanIndex].price
  }
  switchLicenseGroupIndex(toIndex){
    this.currentLicenseGroupIndex = toIndex
    this.switchLicensePlanIndex(0)
  }
  switchLicensePlanIndex(toIndex){
    this.currentLicenseAreaIndex = toIndex
  }
  switchInsuranceGroupIndex(toIndex){
    this.currentInsuranceGroupIndex = toIndex
    this.switchInsurancePlanIndex(0)
  }
  switchInsurancePlanIndex(toIndex){
    this.currentInsurancePlanIndex = toIndex
  }
  switchLoanBankIndex(toIndex){
    this.currentLoanBankIndex = toIndex
  }
  switchLoanPlanIndex(toIndex){
    this.currentLoanPlanIndex = toIndex
  }
  inputReplacementOption(e){
    this.replacementOption = e.target.value
  }
  calculateLoanList(carDSRP) {
    let payPercents = [30, 40, 50, 60, 70] //首付比例
    let stages = [12, 24, 36] //分期几个月
    let loanList = []
    for(var i in payPercents) {
      for(var j in stages) {
        // console.log(carDSRP , payPercents[i])
        let firstPay = parseInt(carDSRP * payPercents[i] / 100, 10)
        let loanNum = parseInt(carDSRP * (1 - (payPercents[i] / 100)), 10)
        let monthPay = parseInt((carDSRP - firstPay) * (1 + stages[j] / 12 * 0.04) / stages[j], 10)
        loanList.push({firstPay: firstPay, loanNum: loanNum, monthPay: monthPay, payPercent: payPercents[i], stage: stages[j]})
      }
    }
    // console.log(loanList)
    return loanList
  }
  initLoanList(carDSRP){
    this.loanList = this.calculateLoanList(carDSRP)
  }
}

class PopupXState {
  @observable isPopupVisible = false
  // @observable sliderPosition = 'translate(100%,0)'
  @observable isSliderVisible = false
  isAnimating = false

  // @computed get visibilityClass(){
  //   if(this.isVisible){
  //     return 'block'
  //   }else{
  //     return 'none'
  //   }
  // }
  @computed get sliderPosition(){
    if(this.isSliderVisible){
      return 'translate(0,0)'
    }else{
      return 'translate(100%,0)'
    }
  }
  @computed get popupStyles(){
    return {
      position:'fixed',
      background:'rgba(0,0,0,0.8)',
      width:'100%',
      height:'100%',
      zIndex:10,
      top:0,
      left:0,
      overflow:'scroll'
    }
  }
  @computed get popupContentStyles(){
    return {
      width: '83%',
      transition:'all 0.5s',
      minHeight:'100%',
      background:'white',
      position:'absolute',
      right:0,
      top:0,
      transform:this.sliderPosition
    }
  }

  showPopup(){
    if(!this.isAnimating){
      this.isAnimating = true
      this.isPopupVisible = true
      setTimeout(() => {
        this.isSliderVisible = true
      },10)
      setTimeout(() => {
        this.isAnimating = false
      },510)
    }
  }
  hidePopup(){
    if(!this.isAnimating){
      this.isAnimating = true
      this.isSliderVisible = false
      setTimeout(() => {
        this.isPopupVisible = false
        this.isAnimating = false
      },510)
    }
  }
  onBackgroundClick(e){
    if(/popup_options_wrapper/.test(e.target.className) && !this.isAnimating){
      this.hidePopup()
    }
  }
}

@observer
class PopupX extends React.Component{
  constructor(props){
    super(props)

    this.popupXState = new PopupXState()
  }
  render(){
    const PreviewComponent = this.props.previewComponent
    const PopupOptions = this.props.popupOptions
    const { isPopupVisible, visibilityClass, sliderPosition, onBackgroundClick, showPopup, popupStyles, popupContentStyles } = this.popupXState

    return(
      <div>
        <PreviewComponent popupXState={this.popupXState} {...this.props}/>
        {
          isPopupVisible ?
            <div className="popup_options_wrapper" style={popupStyles} onClick={onBackgroundClick.bind(this.popupXState)}>
              <div className="popup_options" style={popupContentStyles}>
                <PopupOptions popupXState={this.popupXState} {...this.props}/>
              </div>
            </div>
          : null
        }
      </div>
    )
  }
}

@observer
class DirectSalePrice extends React.Component{
  constructor(props){
    super(props)

    this.directSalePriceState = new DirectSalePriceState()

    this.directSalePriceState.directSaleCarTypeId = this.props.params.directSaleCarTypeId
    this.directSalePriceState.directSaleCarModelId = this.props.params.directSaleCarModelId
  }
// licenseOption  外牌类型  int  是(牌照类型,1沪牌 2外牌)
// dsCarModelId
  initCurrentCarModelOptions(){
    const { directSaleCarTypeId, directSaleCarModelId, carModelOptionIndex, colorOptionIndex, payMethodOptionIndex, licenseOptionIndex } = this.props.params
    const { carModelData, currentCarModelOptionIndex, currentColorOptionIndex, currentPayMethodOptionIndex, currentLicenseOptionIndex } = this.directSalePriceState
    // const carModelListDataLength = carModelData.length
    // console.log(currentCarModelOptionIndex ,carModelListDataLength)
    // const carModelListDataSubOptionsLength = carModelListData[currentCarModelOptionIndex].length
    // if(parseInt(carModelOptionIndex,10) < carModelListDataLength){
    //   this.directSalePriceState.currentCarModelOptionIndex = parseInt(carModelOptionIndex,10)
    // }else{
    //   this.directSalePriceState.currentCarModelOptionIndex = 0
    // }
    if(colorOptionIndex < carModelData.colorOptions.length){
      this.directSalePriceState.currentColorOptionIndex = parseInt(colorOptionIndex,10)
    }else{
      this.directSalePriceState.currentColorOptionIndex = 0
    }
    if(payMethodOptionIndex < carModelData.modelPaymentOptions.length){
      this.directSalePriceState.currentPayMethodOptionIndex = parseInt(payMethodOptionIndex,10)
    }else{
      this.directSalePriceState.currentPayMethodOptionIndex = 0
    }
    if(licenseOptionIndex < carModelData.licenseOptions.length){
      this.directSalePriceState.currentLicenseOptionIndex = parseInt(licenseOptionIndex,10)
    }else{
      this.directSalePriceState.currentLicenseOptionIndex = 0
    }

    // console.log(this.directSalePriceState.currentCarModelOptionIndex)

    browserHistory.replace(`/direct_sale_price/${directSaleCarTypeId}/${directSaleCarModelId}/${this.directSalePriceState.currentColorOptionIndex}/${this.directSalePriceState.currentPayMethodOptionIndex}/${this.directSalePriceState.currentLicenseOptionIndex}`)
  }
  async componentDidMount(){
    await this.directSalePriceState.getDsCarTopInfo()
    await this.directSalePriceState.fetchDirectSaleCarSaleOptions()
    this.initCurrentCarModelOptions()
  }
  render(){
    return(
      <div className="direct_sale_price">
        <TopBar
          pageTitle="计算总价"
          isIndex={false}
          isShowSearch={true}
        />
        <DirectSalePriceCarType directSalePriceState={this.directSalePriceState}/>
        <PopupX previewComponent={DirectSalePriceDemand} popupOptions={DirectSalePriceDemandContent} directSalePriceState={this.directSalePriceState}/>
        <PopupX previewComponent={DirectSalePriceLoan} popupOptions={DirectSalePriceLoanContent} directSalePriceState={this.directSalePriceState}/>
        <PopupX previewComponent={DirectSalePriceLicense} popupOptions={DirectSalePriceLicenseContent} directSalePriceState={this.directSalePriceState}/>
        <PopupX previewComponent={DirectSalePriceInsurance} popupOptions={DirectSalePriceInsuranceContent} directSalePriceState={this.directSalePriceState}/>
        <DirectSalePriceAddition directSalePriceState={this.directSalePriceState}/>
        <DirectSalePriceReplace directSalePriceState={this.directSalePriceState}/>
        <BottomBarTotalPrice directSalePriceState={this.directSalePriceState}/>
      </div>
    )
  }
}

export default DirectSalePrice
