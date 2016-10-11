import React from 'react'
import { Link, browserHistory } from 'react-router'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

import * as ajax from '../helpers/ajax'
import * as loginAndReg from '../helpers/login_and_reg'
import { DiscountCualculator, MoneyByTenThousand } from '../../helpers/formatters'

require('../sass/my_favorite.scss')

import InfoTab from '../components/user_center/info_tab'
import Banner from '../components/common/banner'
import DirectCarScroll from '../components/common/direct_car_scroll'

import InfoTabState from '../models/InfoTabState'
import BottomBarCommon from '../components/common/bottom_bar_common'

class MyFavoriteState {
  @observable myFavoriteList = []
}

@observer
class MyFavoriteComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  goToDirectSalePage(typeId, modelId) {
    let url = `/direct_sale_detail/${typeId}/${modelId}`
    browserHistory.push(url)
  }

  render() {
    if (!this.props.favoriteCarInfo) {
      return
    }

    let priceTags = []

    if (this.props.favoriteCarInfo.tagList) {
      priceTags = this.props.favoriteCarInfo.tagList.split('#')
    }

    return (
      <li onClick={this.goToDirectSalePage.bind(this, this.props.favoriteCarInfo.modelType, this.props.favoriteCarInfo.modelBrand)}>
        <div className="car_image">
          {
            this.props.favoriteCarInfo.modelPhoto ?
            <img src={this.props.favoriteCarInfo.modelPhoto}/> : null
          }
          <b className="discount">{DiscountCualculator(this.props.favoriteCarInfo.msrp, this.props.favoriteCarInfo.dsrp)}折</b>
        </div>
        <div className="car_desc">
          <p className="car_series_name">{this.props.favoriteCarInfo.modelBrandName} {this.props.favoriteCarInfo.modelTypeName}</p>
          <p className="car_model_name">{this.props.favoriteCarInfo.modelName}</p>
          <p className="type_tag">
            {
              priceTags.length > 0 && priceTags.join(' | ')
            }
          </p>
        </div>
        <div className="price">
          <p className="dsrp">{ MoneyByTenThousand(this.props.favoriteCarInfo.dsrp) }万</p>
          <p className="msrp">{ MoneyByTenThousand(this.props.favoriteCarInfo.msrp) }万</p>
        </div>
      </li>
    )
  }
}

@observer
class MyFavorite extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      favoriteList: []
    }

    this.infoTabState = new InfoTabState({currentHighlightTabIndex:2})
    this.myFavoriteState = new MyFavoriteState()
  }

  async componentDidMount() {
    appState.I_M_Fucking_Loading()

    let isLogin = await loginAndReg.CheckLogin()
    if (isLogin) {
      await this.getUserCenterFavorite()
    } else {
      browserHistory.replace('/login?frompage=user_center/my_favorite')
    }

    appState.I_M_Fucking_Loading()
  }

  async getUserCenterFavorite() {
    let accessToken = loginAndReg.GetLocalStorageInfo('HMC_ACCESS_TOKEN') && loginAndReg.GetLocalStorageInfo('HMC_ACCESS_TOKEN').accessToken
    await ajax.getUserCenterFavorite.call(this, accessToken)
  }

  render() {
    let favoriteList = this.state.favoriteList.length > 0 && this.state.favoriteList.map(
      (value, index) => {
        if (value) {
          return <MyFavoriteComponent favoriteCarInfo={value}/>
        } else {
          return null
        }
      }
    )

    return (
      <div className="my_favorite">
        <InfoTab infoTabState={this.infoTabState}/>
        {
          this.state.favoriteList.length > 0 ?
            <ul className="favorite_list">
              { favoriteList }
            </ul>
          : <p className="no_record">暂无数据！</p>
        }
        <DirectCarScroll/>
        <Banner/>
        <BottomBarCommon/>
      </div>
    )
  }
}

export default MyFavorite
