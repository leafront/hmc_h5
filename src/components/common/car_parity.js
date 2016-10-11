import React from 'react'
import { observer } from 'mobx-react'
import { browserHistory } from 'react-router'
import { ToastContainer, ToastMessage } from 'react-toastr'

import * as ajax from '../../helpers/ajax'
import * as utils from '../../helpers/util'
import * as loginAndReg from '../../helpers/login_and_reg'
import { getCityAreaData } from '../../data/city_area_data'
import MerchantState from '../../models/MerchantState'
import LoginAndReg from './login_and_reg'
import { ConvertDistanceToKm } from '../../../helpers/formatters'
import CarParityDetailModelListItem from '../car_parity_detail/car_parity_detail_model_list_item'

const ToastMessageFactory = React.createFactory(ToastMessage.animation)

@observer
class CarParityHeader extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="car_parity_header">
        <h2>
          <span onClick={this.props.gotoPrevStep}></span>
          {this.props.title}
        </h2>
      </div>
    )
  }
}

@observer
class CarMerchantsItem extends React.Component {
  constructor(props) {
    super(props)
    this.merchantState = this.props.merchantState
    this.carParityData = this.props.carParityState.carParityData
    this.selectMerchants = this.selectMerchants.bind(this)

    if (this.props.index < 3) {
      this.merchantState.isSelected = true
      this.carParityData.selectedOptions.askpFsname.push(this.props.item.fsAbbrname)
      this.carParityData.selectedOptions.askFs.push(this.props.item.fsId)
    }
  }

  selectMerchants(fsname, fsId) {
    let { merchantSelectedCount } = this.props
    let iFsname = this.carParityData.selectedOptions.askpFsname.indexOf(fsname)
    let iFsId = this.carParityData.selectedOptions.askFs.indexOf(fsId)
    if (merchantSelectedCount.selectedCount === 3 && !this.merchantState.isSelected) {
      this.props.showTips('最多只能选3家4S店')
    } else if (merchantSelectedCount.selectedCount === 3 && this.merchantState.isSelected) {
      this.merchantState.isSelected = !this.merchantState.isSelected
      merchantSelectedCount.selectedCount = merchantSelectedCount.selectedCount - 1
      this.carParityData.selectedOptions.askpFsname.splice(iFsname, 1)
      this.carParityData.selectedOptions.askFs.splice(iFsId, 1)
    } else if (merchantSelectedCount.selectedCount === 2 && this.merchantState.isSelected) {
      this.merchantState.isSelected = !this.merchantState.isSelected
      merchantSelectedCount.selectedCount = merchantSelectedCount.selectedCount - 1
      this.carParityData.selectedOptions.askpFsname.splice(iFsname, 1)
      this.carParityData.selectedOptions.askFs.splice(iFsId, 1)
    } else if (merchantSelectedCount.selectedCount === 1 && this.merchantState.isSelected) {
      this.props.showTips('至少选1家4S店')
    } else {
      this.merchantState.isSelected = !this.merchantState.isSelected
      merchantSelectedCount.selectedCount = merchantSelectedCount.selectedCount + 1
      this.carParityData.selectedOptions.askpFsname.push(fsname)
      this.carParityData.selectedOptions.askFs.push(fsId)
    }
  }

  getMerchantsItem() {
    let activeClass = ''
    let { index, item } = this.props

    if (this.merchantState.isSelected) {
      activeClass = 'fs_seled'
    } else {
      activeClass = ''
    }

    return (
      <table>
        <tbody>
          <tr>
            <td className="fs_td_img">
              <img src={item.fsPic} class="fs_img"/>
            </td>
            <td className="fs_td">
              <b className={activeClass}>{item.fsAbbrname}<i></i></b>
              <strong>{item.fsAddress}</strong>
              <em className={activeClass}>
                {this.props.currentDistrictLabel}
                <i
                  className="chockBoxCls_UI chockBoxCls_UI_ed"
                  onClick={this.selectMerchants.bind(null, item.fsAbbrname, item.fsId)}>
                </i>
              </em>
              <span className={activeClass}>{ ConvertDistanceToKm(item.distance) }km</span>
            </td>
          </tr>
        </tbody>
      </table>
    )
  }

  render() {
    let merchantsItem = this.getMerchantsItem()
    return (
      <li>
        { merchantsItem }
      </li>
    )
  }
}

@observer
class CarMerchants extends React.Component {
  constructor(props) {
    super(props)
    this.merchantState = new MerchantState()
  }

  showTips = (content) => {
    this.refs.container.error(
      ``, `${content}`,
      {
        closeButton: false,
        timeOut: 1400,
        preventDuplicates:false
      }
    )
  }

  render() {
    let nearestThreeMerchantsList = [], leftMerchantsList = []
    let { carParityMerchants } = this.props
    let merchantStates = carParityMerchants.map((merchant, i) => {
      return new MerchantState()
    })

    carParityMerchants.forEach((item, i) => {
      if (i < 3) {
        nearestThreeMerchantsList.push(
          <CarMerchantsItem
            index={i}
            item={item}
            showTips={this.showTips}
            merchantState={merchantStates[i]}
            merchantSelectedCount={this.merchantState}
            carParityState={this.props.carParityState}
            currentDistrictLabel={this.props.currentDistrictLabel}
            {...this.state}
          />
        )
      } else {
        leftMerchantsList.push(
          <CarMerchantsItem
            index={i}
            item={item}
            merchantState={merchantStates[i]}
            showTips={this.showTips}
            merchantSelectedCount={this.merchantState}
            carParityState={this.props.carParityState}
            currentDistrictLabel={this.props.currentDistrictLabel}
            {...this.state}
          />
        )
      }
    })

    return (
      <div className="map_fs_con">
        <div className="merchant_container">
          <ToastContainer
            toastMessageFactory={ToastMessageFactory}
            ref="container"
            className="toast-top-center"
          />
          <ul>{ nearestThreeMerchantsList }</ul>
          <ul>{ leftMerchantsList }</ul>
        </div>
      </div>
    )
  }
}

@observer
class CarParity extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isShowSelectDistrict: false,
      isShowSelectCity: false,
      isSelectForeignLicence: false,
      currentProvince: this.props.currentProvince,
      currentDistrict: this.props.currentDistrict,
      currentDistrictLabel: this.props.currentDistrictLabel,
      carParityColors: [],
      carParityLicenses: [],
      carParityRegions: [],
      carParityBusinessDistrict: this.props.carParityBusinessDistrict,
      carParityMerchants: []
    }

    this.carParityData = this.props.data.carParityData
    this.cityAreaData = getCityAreaData()
    this.gotoPrevStep = this.gotoPrevStep.bind(this)
    this.gotoNextStep = this.gotoNextStep.bind(this)
    this.resetParityStep = this.resetParityStep.bind(this)
    this.cancelParityStep = this.cancelParityStep.bind(this)
    this.continueParityStep = this.continueParityStep.bind(this)
    this.gotoOrderPage = this.gotoOrderPage.bind(this)
    this.selectCarModel = this.selectCarModel.bind(this)
    this.submitParity = this.submitParity.bind(this)
    this.handleLoginAndReg = this.handleLoginAndReg.bind(this)
    this.doAfterLoginAndReg = this.doAfterLoginAndReg.bind(this)
  }

  async componentDidMount() {
    let { carParityTopInfo } = this.props
    this.carParityData.selectedOptions.askpTypeName = carParityTopInfo.typeName
    this.carParityData.selectedOptions.askpType = carParityTopInfo.typeId
    this.carParityData.selectedOptions.cityCode = this.cityCode
    this.carParityData.selectedOptions.askFs = []
    this.carParityData.selectedOptions.askpFsname = []
    this.carParityData.selectedOptions.askpPsyprice = '0'
    this.carParityData.selectedOptions.askpIsfree = '0'
    this.carParityData.selectedOptions.askpIsshop = '0'

    await ajax.getCarParityLicenses.call(this)
    await ajax.getCarParityRegionsFirst.call(this)
  }

  selectCarModel(typeId, modelId, modelName) {
    ajax.getCarParityColors.call(this, typeId, modelId)
    this.gotoNextStep()
    this.carParityData.selectedOptions.askpModel = modelId
    this.carParityData.selectedOptions.askpModelName = modelName
  }

  showTips(content) {
    this.refs.container.error(
      ``, `${content}`,
      {
        closeButton: false,
        timeOut: 1400,
        preventDuplicates:false
      }
    )
  }

  selectColor(color) {
    this.gotoNextStep()
    this.carParityData.selectedOptions.askpOutColor = color
  }

  selectLicence(val) {
    if (val === '1') {
      this.setState({
        isShowSelectDistrict: true,
        isShowSelectCity: false,
        isSelectForeignLicence: true
      })
    } else {
      this.gotoNextStep()
      this.carParityData.selectedOptions.askpLicense = val
    }
  }

  selectLicenceDistrict(index) {
    this.setState({
      isShowSelectDistrict: false,
      isShowSelectCity: true,
      currentProvince: index
    })
    this.refs.license && (this.refs.license.scrollTop = 0)
  }

  selectLicenceCity(val) {
    let askpLicense, selectedProvince = this.cityAreaData.Province[this.state.currentProvince]

    if (this.cityName === selectedProvince) {
      askpLicense = '1'
    } else {
      askpLicense = selectedProvince + ',' + val
    }

    this.gotoNextStep()
    this.carParityData.selectedOptions.askpLicense = askpLicense
    this.setState({
      isShowSelectDistrict: false,
      isShowSelectCity: false,
      isSelectForeignLicence: false
    })
  }

  selectBuyCarMethod(isLoan, isReplace) {
    this.gotoNextStep()
    this.carParityData.selectedOptions.askpLoan = isLoan
    this.carParityData.selectedOptions.askpReplace = isReplace
  }

  selectBuyCarTime(val) {
    this.gotoNextStep()
    this.carParityData.selectedOptions.askpBuyTime = val
  }

  selectBusinessDistrict(brandId, point, areaName) {
    ajax.getCarParityMerchants.call(this, brandId, point)
    this.carParityData.selectedOptions.askpUserArea = `${this.state.currentDistrictLabel},${areaName}`
    this.gotoNextStep()
  }

  submitParity(options, carParityData, loginFlag, container) {
    let convertOptions = Object.assign({}, options)
    ajax.submitParity(convertOptions, carParityData, loginFlag, container)
  }

  doAfterLoginAndReg(data) {
    this.submitParity(this.carParityData.selectedOptions, this.carParityData, true, this.props.container)
  }

  handleLoginAndReg(userPhone, userName, smsCode) {
    ajax.registerAndReg(userPhone, userName, smsCode, this.props.container, this.doAfterLoginAndReg)
  }

  gotoPrevStep() {
    if (this.carParityData.step === 4 || this.carParityData.step === 5) {
      this.setState({
        isShowSelectDistrict: false,
        isShowSelectCity: false,
        isSelectForeignLicence: false
      })
    }
    if (this.carParityData.step === 8 || this.carParityData.step === 9) {
      this.carParityData.selectedOptions.askpFsname = []
      this.carParityData.selectedOptions.askFs = []
    }
    this.carParityData.step = this.carParityData.step - 1
  }

  gotoNextStep() {
    if (this.carParityData.step === 8) {
      this.submitParity(this.carParityData.selectedOptions, this.carParityData, false, this.props.container)
    } else {
      this.carParityData.step = this.carParityData.step + 1
    }
  }

  resetParityStep() {
    this.carParityData.step = 1
    this.props.closeModal()
  }

  cancelParityStep() {
    if (this.carParityData.step === 10) {
      this.gotoOrderPage()
    } else {
      this.carParityData.step = this.carParityData.step + 'cancel'
    }
  }

  continueParityStep() {
    this.carParityData.step = parseInt(this.carParityData.step)
  }

  gotoOrderPage() {
    //console.log('gotoorderpage', browserHistory)
    browserHistory.replace('/')
  }

  getRespondTime() {
    let day, amOrPm, time
    let currentTime = new Date()
    let hours = currentTime.getHours()
    let minutes = currentTime.getMinutes() + hours * 60

    if (minutes === 0 && minutes < (10 * 60 + 16)) {
      day = '今天'
      amOrPm = '上午'
      time = '11:00'
    } else if (minutes > (10 * 60 + 15) && minutes < (13 * 60 + 16)) {
      day = '今天'
      amOrPm = '下午'
      time = '14:00'
    } else if (minutes > (13 * 60 + 15) && minutes < (16 * 60 + 16)) {
      day = '今天'
      amOrPm = '下午'
      time = '17:00'
    } else {
      day = '明天'
      amOrPm = '上午'
      time = '11:00'
    }

    return {
      amOrPm: day + amOrPm,
      time: time
    }
  }

  getParityStepOne() {
    return (
      <div className="demand">
        <div className="demand_title">
          <h3>告诉我们您的购车需求</h3>
          <h6>一个笼统、不透明的报价，会让购车者感到缺乏诚意</h6>
          <p>为此，我们要求认证4S店依据实时更新的库存及用户的购车需求，精准报价花10秒告诉我们你的购车、上牌、贷款需求吧别担心，我们会及时提醒你哪家价格更有诚意；</p>
        </div>
        <img src="/images/car_parity_detail/order_car.png"/>
        <div className="next_step" onClick={this.gotoNextStep}>下一步></div>
      </div>
    )
  }

  getParityStepTwo() {
    let { carParityModelList } = this.props
    let items = carParityModelList.map((model, i) => {
      return (
        <div key={i}>
          <h3>{ model.orderKey }</h3>
          <CarParityDetailModelListItem item={model} {...this.props} selectCarModel={this.selectCarModel} isPopup={true} />
        </div>
      )
    })
    return (
      <div className="car_parity_model model_list">
        <CarParityHeader title="什么样的款型适合您" gotoPrevStep={this.gotoPrevStep}/>
        <div className="model">
          { items }
        </div>
      </div>
    )
  }

  getParityStepThree() {
    let colorList = [], carParityColors

    if (this.state.carParityColors.length > 0) {
      carParityColors = this.state.carParityColors
    } else {
      carParityColors = this.props.carParityColors
    }

    carParityColors.forEach((color, i) => {
      colorList.push(
        <li key={i} onClick={this.selectColor.bind(this, color.colorName)}>
          <div style={{backgroundColor: color.colorValue}}></div>
          <p>{ color.colorName }</p>
        </li>
      )
    })

    return (
      <div className="car_parity_color">
        <CarParityHeader title="您喜欢什么颜色" gotoPrevStep={this.gotoPrevStep}/>
        <div className="color">
          <ul>{ colorList }</ul>
        </div>
      </div>
    )
  }

  getParityStepFour() {
    let provinceList = [], districtList = [], licenseList = [], selectedForeignLicenceClass = ''

    this.cityAreaData.Province.forEach((item, i) => {
      provinceList.push(
        <li key={i} onClick={this.selectLicenceDistrict.bind(this, i)}>{item}</li>
      )
    })

    this.cityAreaData.District[this.state.currentProvince].forEach((item, i) => {
      districtList.push(
        <li key={i} onClick={this.selectLicenceCity.bind(this, item)}>{item}</li>
      )
    })

    this.state.carParityLicenses.forEach((item, i) => {
      licenseList.push(
        <li key={i} onClick={this.selectLicence.bind(this, item.optionType)}>{item.optionBuyerExplain}</li>
      )
    })

    if (this.state.isSelectForeignLicence) {
      selectedForeignLicenceClass = 'active'
    } else {
      selectedForeignLicenceClass = ''
    }

    return (
      <div className="car_parity_license">
        <CarParityHeader title="您想上哪里的牌照" gotoPrevStep={this.gotoPrevStep}/>
        <div className="license" ref="license">
          <div className="license_type">
            <ul className="license_choose">
              {
                this.state.isSelectForeignLicence ? '' : licenseList
              }
              <li className={selectedForeignLicenceClass} onClick={this.selectLicence.bind(this, '1')}>上外牌</li>
            </ul>
            {
              this.state.isShowSelectDistrict ?
                <div className="household">
                  <p>请选择身份证户籍</p>
                  <ul className="common">{ provinceList }</ul>
                </div>
              : null
            }
            {
              this.state.isShowSelectCity ?
                <p className="active_province">{ this.cityAreaData.Province[this.state.currentProvince]}</p>
                : null
            }
            {
              this.state.isShowSelectCity ?
                <div className="city">
                  <p>请选择户籍所在城市</p>
                  <ul className="household_list">{ districtList }</ul>
                </div>
              : null
            }
          </div>
        </div>
      </div>
    )
  }

  getParityStepFive() {
    return (
      <div className="car_parity_purchase_way">
        <CarParityHeader title="您想如何购车" gotoPrevStep={this.gotoPrevStep}/>
        <div className="purchase_way">
          <ul>
            <li onClick={this.selectBuyCarMethod.bind(this, '0', '0')}>全款购车</li>
            <li onClick={this.selectBuyCarMethod.bind(this, '1', '0')}>贷款购车</li>
            <li onClick={this.selectBuyCarMethod.bind(this, '0', '1')}>全款 + 置换购车</li>
            <li onClick={this.selectBuyCarMethod.bind(this, '1', '1')}>贷款 + 置换购车</li>
          </ul>
        </div>
      </div>
    )
  }

  getParityStepSix() {
    return (
      <div className="car_parity_purchase_time">
        <CarParityHeader title="何时迎来激动人心买车时刻" gotoPrevStep={this.gotoPrevStep}/>
        <div className="purchase_time">
          <ul>
            <li onClick={this.selectBuyCarTime.bind(this, '三个月后')}>3个月以后购车</li>
            <li onClick={this.selectBuyCarTime.bind(this, '三个月内')}>3个月内购车</li>
            <li onClick={this.selectBuyCarTime.bind(this, '一个月内')}>1个月内购车</li>
            <li onClick={this.selectBuyCarTime.bind(this, '两周内')}>2周内购车</li>
          </ul>
        </div>
      </div>
    )
  }

  getParityStepSeven() {
    let regionList = [], businessDistrictList = []
    let { carParityRegions } = this.state
    let { carParityBusinessDistrict } = this.state

    carParityRegions.forEach((item, i) => {
      let activeClass = ''
      if (i === this.state.currentDistrict) {
        activeClass = 'active'
      }
      regionList.push(
        <span className={activeClass} key={i} onClick={ajax.getCarParityBusinessDistrict.bind(this, item.areaId, i, item.areaName)}>{ item.areaName }</span>
      )
    })

    for (let i in carParityBusinessDistrict) {
      let a = carParityBusinessDistrict[i].map((item, index) => {
        return (
          <dd key={index}>
            <span onClick={this.selectBusinessDistrict.bind(this, this.props.carParityTopInfo.topBrandId, item.areaPoint, item.areaName)}>{ item.areaName }</span>
          </dd>
        )
      })
      businessDistrictList.push(
        <dl>
          <dt>{ i }</dt>
          { a }
        </dl>
      )
    }

    return (
      <div className="car_parity_area">
        <CarParityHeader title="选择您比价的区域" gotoPrevStep={this.gotoPrevStep}/>
        <div id="map_fs" className="box_shadow">
          <div className="search">
            <input className="text_input" type="text" value={this.state.currentDistrictLabel} disabled="disabled"/>
            <span className="arrow"></span>
          </div>
          <div className="search_area_list hide">
            <div className="area_l">
              { regionList }
            </div>
            <div className="area_r">
              { businessDistrictList }
            </div>
          </div>
        </div>
      </div>
    )
  }

  getParityStepEight() {
    return (
      <div className="car_parity_recommend_store">
        <CarParityHeader title="已为您推荐3家最近的4S店" gotoPrevStep={this.gotoPrevStep}/>
        <div className="next_step" onClick={this.gotoNextStep}>下一步></div>
        <CarMerchants {...this.props} {...this.state}/>
      </div>
    )
  }

  getParityStepNine() {
    let selectedMerchantList = []
    let { carParityMerchants } = this.state
    let { brandName } = this.props.carParityTopInfo
    let askFs = this.props.carParityState.carParityData.selectedOptions.askFs
    let askFsCount = askFs.length

    carParityMerchants.forEach((merchant, i) => {
      if (askFs.indexOf(merchant.fsId) !== -1) {
        selectedMerchantList.push(
          <li key={i}>
            <span className="big_img">
              <img src={merchant.fsPic} />
            </span>
            <span className="small_img">
              <img src={merchant.fsPic} />
            </span>
          </li>
        )
      }
    })

    return (
      <div className="car_parity_login">
        <CarParityHeader title="您的选择很明智" gotoPrevStep={this.gotoPrevStep}/>
        <div className="login_header">
          <h3>{ askFsCount }位{ brandName }销售员已准备好为您PK报价</h3>
          <ul>{ selectedMerchantList }</ul>
        </div>
        <LoginAndReg
          handleLoginAndReg={this.handleLoginAndReg}
          telephoneInputPlaceholderLabel='填写手机号用于短信接收报价单'
          submitButtonLabel='开始比价'
          {...this.props}
        />
      </div>
    )
  }

  getParityStepTen() {
    let respondTime = this.getRespondTime()
    return (
      <div className="car_parity_success">
        <h3>您最迟将于{ respondTime.amOrPm }<em>{ respondTime.time }</em>收到报价</h3>
        <ol>
          <li>接收官方短信，点击链接进入</li>
          <li>登录个人中心，查收报价</li>
          <li>预定或与销售员在线沟通</li>
        </ol>
        <div className="parity_success_footer">
          <button onClick={this.gotoOrderPage}>我知道了</button>
          <p>服务热线：<a href="tel:4008798779"><em>400-879-8779</em></a></p>
        </div>
      </div>
    )
  }

  getParityStepEleven() {
    return (
      <div className="car_parity_login">
        <CarParityHeader title="太可惜了" gotoPrevStep={this.continueParityStep}/>
        <div className="login_header">
          <h3>还差一点就能获得真实、准确的报价了！</h3>
          <img src="/images/car_parity_detail/broken_heart.png"/>
        </div>
        <div className="login_footer">
          <button className="cancel_parity" onClick={this.resetParityStep}>我放弃了</button>
          <button className="continue_parity" onClick={this.continueParityStep}>我要真实报价，不放弃</button>
          <p>服务热线：<a href="tel:4008798779"><em>400-879-8779</em></a></p>
        </div>
      </div>
    )
  }

  showParityStep() {
    let item
    switch(this.carParityData.step) {
      case 1:
        item = this.getParityStepOne()
        break;
      case 2:
        item = this.getParityStepTwo()
        break;
      case 3:
        item = this.getParityStepThree()
        break;
      case 4:
        item = this.getParityStepFour()
        break;
      case 5:
        item = this.getParityStepFive()
        break;
      case 6:
        item = this.getParityStepSix()
        break;
      case 7:
        item = this.getParityStepSeven()
        break;
      case 8:
        item = this.getParityStepEight()
        break;
      case 9:
        item = this.getParityStepNine()
        break;
      case 10:
        item = this.getParityStepTen()
        break;
      default:
        item = this.getParityStepEleven()
    }
    return item
  }

  render() {
    return (
      <div className="car_parity_wrapper">
        { this.showParityStep() }
        {
          typeof this.carParityData.step === 'number' ?
          <button className="close_parity_btn" onClick={this.cancelParityStep}></button> : null
        }
      </div>
    )
  }
}

export default CarParity
