import * as ajax from './ajax'
import { browserHistory } from 'react-router'

//#storage function
function removeRefreshToken() {
  localStorage.removeItem('HMC_REFRESH_TOKEN')
}

function removeAccessToken() {
  localStorage.removeItem('HMC_ACCESS_TOKEN')
}

function removeUserName() {
  localStorage.removeItem('HMC_USER_NAME')
}

function removeUserLoginInfo() {
  removeAccessToken()
  removeRefreshToken()
  removeUserName()
}

async function checkLoginExpire() {
  const CurrentTime = new Date().getTime()
  const HMC_REFRESH_TOKEN = GetLocalStorageInfo('HMC_REFRESH_TOKEN') && GetLocalStorageInfo('HMC_REFRESH_TOKEN').refreshToken

  const AccessTokenExpireDate = GetLocalStorageInfo('HMC_ACCESS_TOKEN') && GetLocalStorageInfo('HMC_ACCESS_TOKEN').accessTokenExpiresIn
  if (AccessTokenExpireDate && CurrentTime > AccessTokenExpireDate) {
    removeAccessToken()
  }

  const RefreshTokenExpireDate = GetLocalStorageInfo('HMC_REFRESH_TOKEN') && GetLocalStorageInfo('HMC_REFRESH_TOKEN').refreshTokenExpiresIn
  if (RefreshTokenExpireDate && CurrentTime > RefreshTokenExpireDate) {
    removeRefreshToken()
  } else if (RefreshTokenExpireDate && CurrentTime < RefreshTokenExpireDate) {
    await ajax.getAccessTokenByRefreshToken(HMC_REFRESH_TOKEN)
  }
}

export function SaveLoginInfo(loginInfo = {accessToken: '', refreshToken: '', phoneNumber: '', userName: ''}, isGetAccessTokenByRefreshToken) {
  const HMC_ACCESS_TOKEN = {
    accessToken: loginInfo.accessToken,
    accessTokenExpiresIn: loginInfo.accessTokenExpiresIn + new Date().getTime()
  }
  const HMC_REFRESH_TOKEN = {
    refreshToken: loginInfo.refreshToken,
    refreshTokenExpiresIn: loginInfo.refreshTokenExpiresIn + new Date().getTime()
  }

  SetLocalStorageInfo('HMC_ACCESS_TOKEN',HMC_ACCESS_TOKEN)
  SetLocalStorageInfo('HMC_REFRESH_TOKEN',HMC_REFRESH_TOKEN)

  if (!isGetAccessTokenByRefreshToken) {
    const HMC_USER_LOGIN_INFO = {
      phoneNumber: loginInfo.phoneNumber
    }
    const HMC_USER_NAME = {
      userName: loginInfo.userName
    }

    SetLocalStorageInfo('HMC_USER_LOGIN_INFO',HMC_USER_LOGIN_INFO)
    SetLocalStorageInfo('HMC_USER_NAME',HMC_USER_NAME)
  }
}

//use this function to get localStorageItem
export function GetLocalStorageInfo(localStorageItem) {
  if (localStorage[localStorageItem]) {
    return JSON.parse(localStorage[localStorageItem])
  }
  return null
}

export function SetLocalStorageInfo(localStorageKey, infoObject) {
  window.localStorage[localStorageKey] = JSON.stringify(infoObject)
}

export async function CheckLogin() {
  await checkLoginExpire()
  const HMC_ACCESS_TOKEN = GetLocalStorageInfo('HMC_ACCESS_TOKEN') && GetLocalStorageInfo('HMC_ACCESS_TOKEN').accessToken
  const HMC_REFRESH_TOKEN = GetLocalStorageInfo('HMC_REFRESH_TOKEN') && GetLocalStorageInfo('HMC_REFRESH_TOKEN').refreshToken
  return !!HMC_ACCESS_TOKEN && !!HMC_REFRESH_TOKEN
}

export function GetLoginInfo() {
  const phoneNumber = GetLocalStorageInfo('HMC_USER_LOGIN_INFO') && GetLocalStorageInfo('HMC_USER_LOGIN_INFO').phoneNumber
  const refreshToken = GetLocalStorageInfo('HMC_REFRESH_TOKEN') && GetLocalStorageInfo('HMC_REFRESH_TOKEN').refreshToken
  const accessToken = GetLocalStorageInfo('HMC_ACCESS_TOKEN') && GetLocalStorageInfo('HMC_ACCESS_TOKEN').accessToken
  const userName = GetLocalStorageInfo('HMC_USER_NAME') && GetLocalStorageInfo('HMC_USER_NAME').userName

  return {
    phoneNumber: phoneNumber,
    refreshToken: refreshToken,
    accessToken: accessToken,
    userName: userName
  }
}

export function DoLogout(redirectTo = null) {
  removeUserLoginInfo()
  if (!!redirectTo) {
    browserHistory.replace(redirectTo)
  }
}

export function SaveAccessToken(tokenData) {
  const HMC_ACCESS_TOKEN = {
    accessToken: tokenData.accessToken,
    accessTokenExpiresIn: tokenData.accessTokenExpiresIn + new Date().getTime()
  }
  SetLocalStorageInfo('HMC_ACCESS_TOKEN', HMC_ACCESS_TOKEN)
}
