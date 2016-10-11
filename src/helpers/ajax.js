import React from 'react'
import { GLOBAL_API_DOMAIN } from '../config'
import * as loginAndReg from './login_and_reg'

let cityName = '上海'
let cityCode = '310000'
let cityCode2 = '1'
let source = '101'
let options = {
  headers: {'Content-Type': 'application/json'},
  method: 'GET'
}

/**************************************** 比价页面  ************************************************/

//获取比价车顶部基本信息
export async function getCarParityTopInfo(typeId) {
  let time = new Date().getTime()
  let search = `?source=${source}&time=${time}`
  let url = `${GLOBAL_API_DOMAIN}/ware/car/${cityCode}/car-type/${typeId}${search}`
  const Response = await fetch(url, options)
  const ResponseOK = await Response.ok
  const ResponseJSON = await Response.json()
  if (ResponseOK && ResponseJSON.status === '1') {
    this.setState({
      carParityTopInfo: ResponseJSON.data
    })
  }
}

//获取比价车图片列表
export async function getCarParityImages(typeId) {
  let time = new Date().getTime()
  let search = `?source=${source}&time=${time}`
  let url = `${GLOBAL_API_DOMAIN}/ware/car/${cityCode}/car-type/${typeId}/pic${search}`
  const Response = await fetch(url, options)
  const ResponseOK = await Response.ok
  const ResponseJSON = await Response.json()
  if (ResponseOK && ResponseJSON.status === '1') {
    this.setState({
      carParityImages: ResponseJSON.data
    })
    //console.log(ResponseJSON.data)
  }
}

//获取比价车款型列表
export async function getCarParityModelList(typeId) {
  let time = new Date().getTime()
  let search = `?source=${source}&time=${time}`
  let url = `${GLOBAL_API_DOMAIN}/ware/car/${cityCode}/car-type/${typeId}/car-model/ask${search}`
  const Response = await fetch(url, options)
  const ResponseOK = await Response.ok
  const ResponseJSON = await Response.json()
  if (ResponseOK && ResponseJSON.status === '1') {
    this.setState({
      carParityModelList: ResponseJSON.data
    })
    //console.log(ResponseJSON.data)
  }
}

//获取历史比价案例列表
export async function getCarParityHistoryPrice(typeId) {
  let time = new Date().getTime()
  let search = `?source=${source}&time=${time}`
  let url = `${GLOBAL_API_DOMAIN}/respond/show/${cityCode}/${typeId}${search}`
  const Response = await fetch(url, options)
  const ResponseOK = await Response.ok
  const ResponseJSON = await Response.json()
  if (ResponseOK && ResponseJSON.status === '1') {
    this.setState({
      carParityHistoryPrice: ResponseJSON.data
    })
    //console.log(ResponseJSON.data)
  }
}

//获取比价车用户晒单列表
export async function getCarParityUserHistory(typeId, page) {
  let extra = `&typeId=${typeId}&page=${page}&pageSize=3`
  let time = new Date().getTime()
  let search = `?source=${source}&time=${time}`
  let url = `${GLOBAL_API_DOMAIN}/user/member/timeline/${cityCode}${search}${extra}`
  let carParityUserHistory, noMoreRecords
  const Response = await fetch(url, options)
  const ResponseOK = await Response.ok
  const ResponseJSON = await Response.json()
  if (ResponseOK && ResponseJSON.status === '1') {
    carParityUserHistory = this.state.carParityUserHistory.concat(ResponseJSON.data.timelineUsers)
    noMoreRecords = ResponseJSON.data.flag === '0'
    this.setState({
      page: this.state.page + 1,
      noMoreRecords: noMoreRecords,
      userHistoryRecordNum: ResponseJSON.data.total || 0,
      carParityUserHistory: carParityUserHistory
    })
    //console.log(ResponseJSON.data)
  }
}

//获取比价车颜色列表
export async function getCarParityColors(typeId, modelId) {
  let time = new Date().getTime()
  let search = `?source=${source}&time=${time}`
  let url = `${GLOBAL_API_DOMAIN}/ware/car/${this.cityCode}/car-type/${typeId}/model/${modelId}/color${search}`
  const Response = await fetch(url, options)
  const ResponseOK = await Response.ok
  const ResponseJSON = await Response.json()
  if (ResponseOK && ResponseJSON.status === '1') {
    this.setState({
      carParityColors: ResponseJSON.data
    })
    //console.log(ResponseJSON.data)
  }
}

//获取比价车牌照列表
export async function getCarParityLicenses() {
  let time = new Date().getTime()
  let search = `?source=${source}&time=${time}`
  let url = `${GLOBAL_API_DOMAIN}/ask/license/${cityCode}${search}`
  const Response = await fetch(url, options)
  const ResponseOK = await Response.ok
  const ResponseJSON = await Response.json()
  if (ResponseOK && ResponseJSON.status === '1') {
    this.setState({
      carParityLicenses: ResponseJSON.data
    })
    //console.log(ResponseJSON.data)
  }
}

//首次获取比价车区域列表
export async function getCarParityRegionsFirst() {
  let time = new Date().getTime()
  let search = `?source=${source}&time=${time}`
  let url = `${GLOBAL_API_DOMAIN}/area/city-region-business-district${search}`
  const Response = await fetch(url, options)
  const ResponseOK = await Response.ok
  const ResponseJSON = await Response.json()
  if (ResponseOK && ResponseJSON.status === '1') {
    this.setState({
      carParityRegions: ResponseJSON.data.regionList,
      currentDistrictLabel: ResponseJSON.data.regionList[0].areaName,
      carParityBusinessDistrict: ResponseJSON.data.businessAreaList
    })
    //console.log(ResponseJSON.data)
  }
}

//获取比价车区域列表
export async function getCarParityRegions() {
  let time = new Date().getTime()
  let search = `?source=${source}&time=${time}`
  let url = `${GLOBAL_API_DOMAIN}/area/city/${cityCode2}/region${search}`
  const Response = await fetch(url, options)
  const ResponseOK = await Response.ok
  const ResponseJSON = await Response.json()
  if (ResponseOK && ResponseJSON.status === '1') {
    this.setState({
      carParityRegions: ResponseJSON.data
    })
    //console.log(ResponseJSON.data)
  }
}

//获取热点区域列表
export async function getCarParityBusinessDistrict(regionId, index, label) {
  let time = new Date().getTime()
  let search = `?source=${source}&time=${time}`
  let url = `${GLOBAL_API_DOMAIN}/area/city/region/${regionId}/business-district${search}`
  const Response = await fetch(url, options)
  const ResponseOK = await Response.ok
  const ResponseJSON = await Response.json()
  if (ResponseOK && ResponseJSON.status === '1') {
    this.setState({
      carParityBusinessDistrict: ResponseJSON.data,
      currentDistrict: index,
      currentDistrictLabel: label
    })
    //console.log(ResponseJSON.data)
  }
}

//获取比价车4s店列表
export async function getCarParityMerchants(brandId, point) {
  let extra = `&brandId=${brandId}&point=${point}`
  let time = new Date().getTime()
  let search = `?source=${source}&time=${time}`
  let url = `${GLOBAL_API_DOMAIN}/merchant/fs/${cityCode}/fsInfo/position${search}${extra}`
  const Response = await fetch(url, options)
  const ResponseOK = await Response.ok
  const ResponseJSON = await Response.json()
  if (ResponseOK && ResponseJSON.status === '1') {
    this.setState({
      carParityMerchants: ResponseJSON.data
    })
    //console.log(ResponseJSON.data)
  }
}

//发送比价请求
export async function submitParity(ops, carParityData, loginFlag, container) {
  let time = new Date().getTime()
  let url = `${GLOBAL_API_DOMAIN}/ask`
  let isLogin = await loginAndReg.CheckLogin()

  if (!isLogin) {
    carParityData.step = carParityData.step + 1
    return
  }

  let accessToken = loginAndReg.GetLocalStorageInfo('HMC_ACCESS_TOKEN') && loginAndReg.GetLocalStorageInfo('HMC_ACCESS_TOKEN').accessToken
  options.method = 'POST'
  ops.cityCode = cityCode
  ops.askFs = ops.askFs.join(',')
  ops.askpFsname = ops.askpFsname.join(';')
  options.body = JSON.stringify({
    'data': ops,
    'time': String(time),
    'source': source
  })
  options.headers.accessToken = accessToken

  const Response = await fetch(url, options)
  const ResponseOK = await Response.ok
  const ResponseJSON = await Response.json()

  if (ResponseOK && ResponseJSON.status === '1') {
    if (loginFlag) {
      carParityData.step = carParityData.step + 1
    } else {
      carParityData.step = carParityData.step + 2
    }
  } else {
    if (loginFlag) {
      carParityData.step = carParityData.step - 1
    }
    container && container.error(
      ``, `${ResponseJSON.msg}`,
      {
        closeButton: false,
        timeOut: 2500,
        preventDuplicates:false
      }
    )
  }
}

//获取车型配置详情
export async function getCarConfiguration(typeId, modelId, openModel) {
  let time = new Date().getTime()
  let search = `?source=${source}&time=${time}`
  let url = `${GLOBAL_API_DOMAIN}/ware/car/${cityCode}/car-type/${typeId}/model/${modelId}/config${search}&mark=ask`

  const Response = await fetch(url, options)
  const ResponseOK = await Response.ok
  const ResponseJSON = await Response.json()
  if (ResponseOK && ResponseJSON.status === '1') {
    this.props.carConfigurationState.carConfigurationData.configuration = ResponseJSON.data
    openModel && openModel()
    //console.log(ResponseJSON.data)
  }
}

/**************************************** 登录页面  ************************************************/

//验证是否老用户
export async function checkIsOldUser(userPhone) {
  let time = new Date().getTime()
  let url = `${GLOBAL_API_DOMAIN}/user/member/validate-phone`
  options.method = 'POST'
  options.body = JSON.stringify({
    'data': {'userPhone': userPhone},
    'time': String(time),
    'source': source
  })
  const Response = await fetch(url, options)
  const ResponseOK = await Response.ok
  const ResponseJSON = await Response.json()
  if (ResponseOK && ResponseJSON.status === '1') {
    let isOldUser = ResponseJSON.data.flag === '1' ? true : false
    this.setState({
      isOldUser: isOldUser,
      isShowAttentionMessage: true
    })
    //console.log(ResponseJSON.data)
  }
}

//获取短信验证码
export async function getVerifyCode(userPhone) {
  let time = new Date().getTime()
  let url = `${GLOBAL_API_DOMAIN}/user/member/sms-code`
  options.method = 'POST'
  options.body = JSON.stringify({
    'data': {'userPhone': userPhone},
    'time': String(time),
    'source': source
  })
  const Response = await fetch(url, options)
  const ResponseOK = await Response.ok
  const ResponseJSON = await Response.json()
  if (ResponseOK && ResponseJSON.status === '1') {
    console.log(ResponseJSON.data)
  }
}

//用户注册或登录
export async function registerAndReg(userPhone, userName, smsCode, container, callback) {
  let time = new Date().getTime()
  let url = `${GLOBAL_API_DOMAIN}/user/member/login`

  options.method = 'POST'
  options.body = JSON.stringify({
    'data': {'userPhone': userPhone, 'smsCode': smsCode},
    'time': String(time),
    'source': source
  })

  if (userPhone.length === 0 || smsCode.length === 0) {
    return
  }

  if (userName !== null && userName.length === 0) {
    container && container.error(
      ``, `请输入您的称呼`,
      {
        closeButton: false,
        timeOut: 2500,
        preventDuplicates:false
      }
    )
    return
  }

  if (userName) {
    url = `${GLOBAL_API_DOMAIN}/user/member/register`
    options.body = JSON.stringify({
      'data': {'userPhone': userPhone, 'userName': userName, 'smsCode': smsCode},
      'time': String(time),
      'source': source
    })
  }

  const Response = await fetch(url, options)
  const ResponseOK = await Response.ok
  const ResponseJSON = await Response.json()
  if (ResponseOK && ResponseJSON.status === '1') {
    callback && callback(ResponseJSON.data)
    let data = ResponseJSON.data
    let auth = data.auth
    let userInfo = data.userInfo
    loginAndReg.SaveLoginInfo({
      accessToken: auth.accessToken,
      accessTokenExpiresIn: auth.accessToken_expires_in * 1000,
      refreshToken: auth.refreshToken,
      refreshTokenExpiresIn: auth.refreshToken_expires_in * 1000,
      phoneNumber: userInfo.loginCode,
      userName: userInfo.loginUserName
    })
    //console.log(ResponseJSON.data)
  } else {
    container && container.error(
      ``, `${ResponseJSON.msg}`,
      {
        closeButton: false,
        timeOut: 2500,
        preventDuplicates:false
      }
    )
  }
}


/**************************************** 个人中心  ************************************************/
//我的信息
export async function getUserCenterTrackActivity(accessToken) {
  let time = new Date().getTime()
  let url = `${GLOBAL_API_DOMAIN}/user/member/user-info`

  options.method='POST'
  options.body = JSON.stringify({
    'time':String(time),
    'source':source
  })
  options.headers.accessToken = accessToken


  //console.log(options.headers);

  const Response = await fetch(url, options)
  const ResponseOK = await Response.ok
  const ResponseJSON = await Response.json()
  if (ResponseOK && ResponseJSON.status === '1') {
    this.setState({
      userCenterTrackActivity: ResponseJSON.data
    })
    console.log(ResponseJSON.data)
  }
}

//我的订阅

export async function getUserCenterSubscribe(accessToken) {
  let time = new Date().getTime()
  let search = `?source=${source}&time=${time}`
  let url = `${GLOBAL_API_DOMAIN}/user/member/subscribes${search}`
  //console.log(url)

  options.headers.accessToken = accessToken


  const Response = await fetch(url, options)
  const ResponseOK = await Response.ok
  const ResponseJSON = await Response.json()
  if (ResponseOK && ResponseJSON.status === '1') {
    this.setState({
      userCenterSubscribe: ResponseJSON.data
    })
    // console.log(ResponseJSON.data)
  }
}

//通过refreshToken获取新的accessToken和refreshToken
export async function getAccessTokenByRefreshToken(refreshToken) {
  let time = new Date().getTime()
  let url = `${GLOBAL_API_DOMAIN}/user/member/refresh-token`
  options.method = 'POST'
  options.body = JSON.stringify({
    'data': {'refreshToken': refreshToken},
    'time': String(time),
    'source': source
  })
  const Response = await fetch(url, options)
  const ResponseOK = await Response.ok
  const ResponseJSON = await Response.json()
  if (ResponseOK && ResponseJSON.status === '1') {
    let data = ResponseJSON.data
    loginAndReg.SaveLoginInfo({
      accessToken: data.accessToken,
      accessTokenExpiresIn: data.accessToken_expires_in * 1000,
      refreshToken: data.refreshToken,
      refreshTokenExpiresIn: data.refreshToken_expires_in * 1000,
      phoneNumber: '',
      userName: ''
    }, true)
    //console.log(ResponseJSON.data)
  }
}

/**************************************** 直销车详情  ************************************************/
//订阅
// export async function getDsCarAddSubscribe(accessToken) {
//   let time = new Date().getTime()
//   let url = `${GLOBAL_API_DOMAIN}/user/member/subscribe`

//   options.method='POST'
//   options.body = JSON.stringify({
//     'time':String(time),
//     'source':source
//   })
//   options.headers.accessToken = accessToken


//   const Response = await fetch(url, options)
//   const ResponseOK = await Response.ok
//   const ResponseJSON = await Response.json()
//   if (ResponseOK) {
//     this.setState({
//       dsCarAddSubscribe: ResponseJSON.data
//     })
//     console.log(ResponseJSON.data)
//   }
// }

//获取我的收藏列表
export async function getUserCenterFavorite(accessToken) {
  let time = new Date().getTime()
  let search = `?source=${source}&time=${time}`
  let url = `${GLOBAL_API_DOMAIN}/ware/ds/favorite${search}`

  options.method = 'GET'
  options.headers.accessToken = accessToken
  delete options.body

  const Response = await fetch(url, options)
  const ResponseOK = await Response.ok
  const ResponseJSON = await Response.json()
  if (ResponseOK) {
    this.setState({
      favoriteList: ResponseJSON.data
    })
    //console.log(ResponseJSON.data)
  }
}

//获取我的订阅列表
export async function getSubscribeDsCar(accessToken){
  let time = new Date().getTime()
  let search = `?source=${source}&time=${time}`
  let url = `${GLOBAL_API_DOMAIN}/user/member/subscribes${search}`

  options.method = 'GET'
  options.headers.accessToken = accessToken
  delete options.body

  const Response = await fetch(url, options)
  const ResponseOK = await Response.ok
  const ResponseJSON = await Response.json()
  if (ResponseOK) {
    this.setState({
      dsCarAddSubscribe: ResponseJSON.data
    })
    console.log(ResponseJSON.data)
  }
}

//添加收藏
export async function addDsCarFavorites(typeId , modelId , accessToken, callback) {
  let time = new Date().getTime()
  let url = `${GLOBAL_API_DOMAIN}/user/member/favorites`

  options.method = 'POST'
  options.body = JSON.stringify({
    'source':source,
    'time':String(time),
    'data': {'favoriteModelId': modelId, 'favoriteTypeId': typeId}
  })
  options.headers.accessToken = accessToken

  const Response = await fetch(url, options)
  const ResponseOK = await Response.ok
  const ResponseJSON = await Response.json()
  if (ResponseOK && ResponseJSON.status === '1') {
    // this.setState({
    //   dsCarAddFavorites: ResponseJSON.data
    // })
    callback()
  }
}

//取消收藏
// export async function getDsCarCancelFavorites(modelId , accessToken) {
//   let time = new Date().getTime()
//   let search = `?source=${source}&time=${time}`
//   let url = `${GLOBAL_API_DOMAIN}/user/member/favorites/${modelId}${search}`

//   options.method='DELETE'
//   options.headers.accessToken = accessToken


//   const Response = await fetch(url, options)
//   const ResponseOK = await Response.ok
//   const ResponseJSON = await Response.json()
//   if (ResponseOK) {
//     this.setState({
//       dsCarCancelFavorites: ResponseJSON.data
//     })
//     console.log(ResponseJSON.data)
//   }
// }

/**************************************** 单据  ************************************************/
//报价单头部信息
export async function getOrderOfferPriceTopInfo(askpId , accessToken) {
  let time = new Date().getTime()
  let search = `?time=${time}&source=${source}`
  let url = `${GLOBAL_API_DOMAIN}/ask/${askpId}${search}`

  options.headers.accessToken = accessToken

  const Response = await fetch(url, options)
  const ResponseOK = await Response.ok
  const ResponseJSON = await Response.json()
  if (ResponseOK && ResponseJSON.status === '1') {
    this.setState({
      orderOfferPriceTopInfo: ResponseJSON.data
    })
    //console.log(ResponseJSON.data)
  }
}


//报价单详情
export async function getOrderOfferPriceDetail(askpId , accessToken) {
  let time = new Date().getTime()
  let search = `?time=${time}&source=${source}`
  let url = `${GLOBAL_API_DOMAIN}/respond/ask/${askpId}/2${search}`

  options.headers.accessToken = accessToken

  const Response = await fetch(url, options)
  const ResponseOK = await Response.ok
  const ResponseJSON = await Response.json()
  if (ResponseOK && ResponseJSON.status === '1') {
    this.setState({
      orderOfferPriceDetail: ResponseJSON.data
    })
    //console.log(ResponseJSON.data)
  }
}

//订单详情
export async function getOrderOfferAskDetail(orderId , orderType , accessToken) {
  let time = new Date().getTime()
  let search = `?time=${time}&source=${source}`
  let url = `${GLOBAL_API_DOMAIN}/order/${orderType}/${orderId}${search}`

  options.headers.accessToken = accessToken

  const Response = await fetch(url, options)
  const ResponseOK = await Response.ok
  const ResponseJSON = await Response.json()
  if (ResponseOK) {
    this.setState({
      orderOfferAskDetail: ResponseJSON.data
    })
    //console.log(ResponseJSON.data)
  }
}

//报价单列表
export async function getPriceOrderList(accessToken) {
  let time = new Date().getTime()
  let search = `?time=${time}&source=${source}`
  let url = `${GLOBAL_API_DOMAIN}/ask${search}`

  options.headers.accessToken = accessToken

  const Response = await fetch(url, options)
  const ResponseOK = await Response.ok
  const ResponseJSON = await Response.json()
  if (ResponseOK) {
    this.setState({
      priceOrderList: ResponseJSON.data
    })
    //console.log(ResponseJSON.data)
  }
}


//获取4S店评分
export async function getShopComment(shopId) {
  let time = new Date().getTime()
  let search = `?time=${time}&source=${source}`
  let url = `${GLOBAL_API_DOMAIN}/merchant/fs/{shopId}${search}`

  console.log(url)

  const Response = await fetch(url, options)
  const ResponseOK = await Response.ok
  const ResponseJSON = await Response.json()
  if (ResponseOK) {
    this.setState({
      shopComment: ResponseJSON.data
    })
    console.log(ResponseJSON.data)
  }
}

/**************************************** common  ************************************************/


//获取banner图片
export async function getBanner() {
  let time = new Date().getTime()
  let search = `?time=${time}&source=${source}`
  let url = `${GLOBAL_API_DOMAIN}/advert/${cityCode}/0/1${search}`
  const Response = await fetch(url, this.options)
  const ResponseOK = await Response.ok
  const ResponseJSON = await Response.json()
  if (ResponseOK) {
    let banners = ResponseJSON.data
    let bannersItem = banners.map((banner, i) => {
      return (
        <div>
          <a href={banner.advertLink}>
            <img width="100%" src={banner.advertPic}/>
          </a>
        </div>
      )
    })
    this.setState({
      bannersItem: bannersItem
    })
  }
}
