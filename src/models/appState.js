import { observable } from 'mobx'
import { GLOBAL_API_DOMAIN } from '../config'

function GetQueryStringByName(name){
  let result = location.hash.match(new RegExp("[\?\&]" + name + "=([^\&]+)","i"))
  if(result == null || result.length < 1){
    return ""
  }
  return result[1]
}

function setLocalStorageInfo(localStorageKey,infoObject){
  window.localStorage[localStorageKey] = JSON.stringify(infoObject)
}

function CheckUserLocationIsSet(){//->Number?
  let currentCity = GetLocalStorageInfo('HMC_USER_CURRENT_CITY') && GetLocalStorageInfo('HMC_USER_CURRENT_CITY').cityCode
  return currentCity
}

async function getUserLocation(){
  //hangzhou:330100//shanghai:310000
  let cityCode = 310000
  let userCurrentCityCode = CheckUserLocationIsSet()

  const queryCityCode = parseInt(GetQueryStringByName('cityCode'),10)

  if(!!queryCityCode){
    SaveUserLocation(queryCityCode)
    return false
  }

  if(userCurrentCityCode) return false

  SaveUserLocation(310000)

  const Response = await fetch(
    `${GLOBAL_API_DOMAIN}/area/cityCode`,
    {
      method:'get'
    }
  )
  const ResponseOK = await Response.ok
  const ResponseJSON = await Response.json()
  if(ResponseOK && ResponseJSON.status === '1'){
    cityCode = Number(ResponseJSON.data)
    SaveUserLocation(cityCode)
  }
}

function saveUserLocation(cityCode){
  setLocalStorageInfo('HMC_USER_CURRENT_CITY',{cityCode:cityCode})
}

var appState = {
  @observable isLockScreen: false,
  @observable isLoading: false,

  async initUserLocation(){
    await getUserLocation()
  },
  I_M_Fucking_Loading(){
    this.isLoading = true
  },
  I_Have_Done_Fucking_Loading(){
    this.isLoading = false
  }
}

export default appState
